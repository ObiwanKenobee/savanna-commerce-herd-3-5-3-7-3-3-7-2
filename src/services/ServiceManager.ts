import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  MICROSERVICES,
  MicroserviceConfig,
  getServiceUrl,
  getServiceEndpoint,
  HEALTH_CHECK_CONFIG,
  CIRCUIT_BREAKER_CONFIG,
} from "@/config/microservices";

// Circuit Breaker States
enum CircuitBreakerState {
  CLOSED = "CLOSED",
  OPEN = "OPEN",
  HALF_OPEN = "HALF_OPEN",
}

// Service Health Status
interface ServiceHealth {
  serviceName: string;
  status: "healthy" | "unhealthy" | "degraded";
  lastCheck: Date;
  responseTime: number;
  errorCount: number;
  consecutiveFailures: number;
}

// Circuit Breaker Implementation
class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.CLOSED;
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private successCount: number = 0;

  constructor(private serviceName: string) {}

  async call<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === CircuitBreakerState.OPEN) {
      if (
        Date.now() - this.lastFailureTime >
        CIRCUIT_BREAKER_CONFIG.resetTimeout
      ) {
        this.state = CircuitBreakerState.HALF_OPEN;
        this.successCount = 0;
      } else {
        throw new Error(
          `Circuit breaker is OPEN for service ${this.serviceName}`,
        );
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    if (this.state === CircuitBreakerState.HALF_OPEN) {
      this.successCount++;
      if (this.successCount >= 3) {
        this.state = CircuitBreakerState.CLOSED;
      }
    }
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= CIRCUIT_BREAKER_CONFIG.errorThreshold) {
      this.state = CircuitBreakerState.OPEN;
    }
  }

  getState(): CircuitBreakerState {
    return this.state;
  }
}

// Enhanced Service Client
class EnhancedServiceClient {
  private client: AxiosInstance;
  private circuitBreaker?: CircuitBreaker;
  private config: MicroserviceConfig;
  private health: ServiceHealth;

  constructor(serviceName: string) {
    this.config = MICROSERVICES[serviceName];
    if (!this.config) {
      throw new Error(`Service configuration not found for: ${serviceName}`);
    }

    this.client = axios.create({
      baseURL: getServiceUrl(serviceName),
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json",
        "X-Service-Name": serviceName,
        "X-Client-Version": "1.0.0",
      },
    });

    if (this.config.circuitBreaker) {
      this.circuitBreaker = new CircuitBreaker(serviceName);
    }

    this.health = {
      serviceName,
      status: "healthy",
      lastCheck: new Date(),
      responseTime: 0,
      errorCount: 0,
      consecutiveFailures: 0,
    };

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add authentication headers
        const token = this.getAuthToken();
        if (token && this.config.authentication === "bearer") {
          config.headers.Authorization = `Bearer ${token}`;
        } else if (this.config.authentication === "api-key") {
          const apiKey = this.getApiKey();
          if (apiKey) {
            config.headers["X-API-Key"] = apiKey;
          }
        }

        // Add request timestamp
        config.metadata = { startTime: Date.now() };
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        const responseTime = Date.now() - response.config.metadata?.startTime;
        this.updateHealth("healthy", responseTime);
        return response;
      },
      (error) => {
        const responseTime =
          Date.now() - error.config?.metadata?.startTime || 0;
        this.updateHealth("unhealthy", responseTime);
        return Promise.reject(error);
      },
    );
  }

  private getAuthToken(): string | null {
    return (
      localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token")
    );
  }

  private getApiKey(): string | null {
    return process.env.VITE_API_KEY || localStorage.getItem("api_key");
  }

  private updateHealth(
    status: "healthy" | "unhealthy",
    responseTime: number,
  ): void {
    this.health.lastCheck = new Date();
    this.health.responseTime = responseTime;

    if (status === "unhealthy") {
      this.health.errorCount++;
      this.health.consecutiveFailures++;
      this.health.status =
        this.health.consecutiveFailures > 3 ? "unhealthy" : "degraded";
    } else {
      this.health.consecutiveFailures = 0;
      this.health.status = "healthy";
    }
  }

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    const operation = async () => {
      const response: AxiosResponse<T> = await this.client.request(config);
      return response.data;
    };

    if (this.circuitBreaker) {
      return this.circuitBreaker.call(operation);
    } else {
      return operation();
    }
  }

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET", url: endpoint });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, method: "POST", url: endpoint, data });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, method: "PUT", url: endpoint, data });
  }

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE", url: endpoint });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH", url: endpoint, data });
  }

  getHealth(): ServiceHealth {
    return { ...this.health };
  }

  getCircuitBreakerState(): CircuitBreakerState | null {
    return this.circuitBreaker?.getState() || null;
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.get(this.config.healthCheck);
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Service Manager - Central orchestrator for all microservices
class ServiceManager {
  private services: Map<string, EnhancedServiceClient> = new Map();
  private healthMonitor: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeServices();
    this.startHealthMonitoring();
  }

  private initializeServices(): void {
    Object.keys(MICROSERVICES).forEach((serviceName) => {
      this.services.set(serviceName, new EnhancedServiceClient(serviceName));
    });
  }

  private startHealthMonitoring(): void {
    this.healthMonitor = setInterval(async () => {
      const healthChecks = Array.from(this.services.entries()).map(
        async ([name, client]) => {
          try {
            const isHealthy = await client.healthCheck();
            return { name, healthy: isHealthy, health: client.getHealth() };
          } catch (error) {
            return { name, healthy: false, health: client.getHealth(), error };
          }
        },
      );

      const results = await Promise.allSettled(healthChecks);

      // Log health status (in production, this would go to monitoring system)
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const { name, healthy, health } = result.value;
          if (!healthy) {
            console.warn(`Service ${name} health check failed:`, health);
          }
        }
      });
    }, HEALTH_CHECK_CONFIG.interval);
  }

  getService(serviceName: string): EnhancedServiceClient {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not initialized`);
    }
    return service;
  }

  async getServiceHealth(): Promise<Record<string, ServiceHealth>> {
    const health: Record<string, ServiceHealth> = {};

    this.services.forEach((client, name) => {
      health[name] = client.getHealth();
    });

    return health;
  }

  async getSystemHealth(): Promise<{
    overall: "healthy" | "degraded" | "unhealthy";
    services: Record<string, ServiceHealth>;
    circuitBreakers: Record<string, CircuitBreakerState | null>;
  }> {
    const services = await this.getServiceHealth();
    const circuitBreakers: Record<string, CircuitBreakerState | null> = {};

    this.services.forEach((client, name) => {
      circuitBreakers[name] = client.getCircuitBreakerState();
    });

    const healthyCount = Object.values(services).filter(
      (s) => s.status === "healthy",
    ).length;
    const totalCount = Object.values(services).length;

    let overall: "healthy" | "degraded" | "unhealthy";
    if (healthyCount === totalCount) {
      overall = "healthy";
    } else if (healthyCount > totalCount * 0.7) {
      overall = "degraded";
    } else {
      overall = "unhealthy";
    }

    return { overall, services, circuitBreakers };
  }

  // High-level service methods for enterprise dashboards
  async getEnterpriseMetrics(timeframe: string = "30d") {
    const enterpriseCore = this.getService("ENTERPRISE_CORE");
    const analytics = this.getService("ANALYTICS_ENGINE");
    const revenue = this.getService("REVENUE_INTELLIGENCE");

    const [dashboardData, analyticsData, revenueData] =
      await Promise.allSettled([
        enterpriseCore.get("/dashboard", { params: { timeframe } }),
        analytics.get("/analytics/enterprise", { params: { timeframe } }),
        revenue.get("/revenue/overview", { params: { timeframe } }),
      ]);

    return {
      dashboard:
        dashboardData.status === "fulfilled" ? dashboardData.value : null,
      analytics:
        analyticsData.status === "fulfilled" ? analyticsData.value : null,
      revenue: revenueData.status === "fulfilled" ? revenueData.value : null,
    };
  }

  async getSupplyChainInsights() {
    const supplyChain = this.getService("SUPPLY_CHAIN");
    const inventory = this.getService("INVENTORY_MANAGEMENT");
    const logistics = this.getService("LOGISTICS_OPTIMIZATION");

    const [supplyData, inventoryData, logisticsData] = await Promise.allSettled(
      [
        supplyChain.get("/supply-chain/overview"),
        inventory.get("/inventory/overview"),
        logistics.get("/logistics/overview"),
      ],
    );

    return {
      supplyChain: supplyData.status === "fulfilled" ? supplyData.value : null,
      inventory:
        inventoryData.status === "fulfilled" ? inventoryData.value : null,
      logistics:
        logisticsData.status === "fulfilled" ? logisticsData.value : null,
    };
  }

  async getFinancialOverview() {
    const billing = this.getService("BILLING_ENGINE");
    const financial = this.getService("FINANCIAL_ANALYTICS");

    const [billingData, financialData] = await Promise.allSettled([
      billing.get("/billing/overview"),
      financial.get("/financial/overview"),
    ]);

    return {
      billing: billingData.status === "fulfilled" ? billingData.value : null,
      financial:
        financialData.status === "fulfilled" ? financialData.value : null,
    };
  }

  async getAIInsights() {
    const aiInsights = this.getService("AI_INSIGHTS");
    const predictive = this.getService("PREDICTIVE_ANALYTICS");

    const [insights, predictions] = await Promise.allSettled([
      aiInsights.get("/ai/insights"),
      predictive.get("/predictions/enterprise"),
    ]);

    return {
      insights: insights.status === "fulfilled" ? insights.value : null,
      predictions:
        predictions.status === "fulfilled" ? predictions.value : null,
    };
  }

  destroy(): void {
    if (this.healthMonitor) {
      clearInterval(this.healthMonitor);
      this.healthMonitor = null;
    }
  }
}

// Export singleton instance
export const serviceManager = new ServiceManager();

// Export types and classes for advanced usage
export { EnhancedServiceClient, CircuitBreakerState, type ServiceHealth };
