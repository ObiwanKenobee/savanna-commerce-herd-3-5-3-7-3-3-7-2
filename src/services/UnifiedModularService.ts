/**
 * Unified Frontend Service Adapter
 * Replaces all individual microservices with modular monolith calls
 */

import { ModuleResponse } from "./core/ModularMonolithService";

interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
}

class UnifiedModularService {
  private config: ApiConfig;
  private cache = new Map<string, { data: any; expires: number }>();

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = {
      baseUrl: import.meta.env.VITE_API_URL || "/api",
      timeout: 30000,
      retries: 3,
      ...config,
    };
  }

  // Core Request Method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useCache = false,
    cacheTtl = 300000, // 5 minutes
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const cacheKey = `${url}_${JSON.stringify(options)}`;

    // Check cache first
    if (useCache) {
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() < cached.expires) {
        return cached.data;
      }
    }

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      timeout: this.config.timeout,
      ...options,
    };

    // Add authentication token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    let lastError: Error;

    // Retry logic
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const response = await fetch(url, defaultOptions);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              `HTTP ${response.status}: ${response.statusText}`,
          );
        }

        const data = await response.json();

        // Cache successful responses
        if (useCache) {
          this.cache.set(cacheKey, {
            data,
            expires: Date.now() + cacheTtl,
          });
        }

        return data;
      } catch (error) {
        lastError =
          error instanceof Error ? error : new Error("Request failed");

        if (attempt === this.config.retries) {
          break;
        }

        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000),
        );
      }
    }

    throw lastError!;
  }

  // Authentication Services
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: any }> {
    const response = await this.request<{ token: string; user: any }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      },
    );

    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }

    return response;
  }

  async register(userData: any): Promise<{ token: string; user: any }> {
    const response = await this.request<{ token: string; user: any }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(userData),
      },
    );

    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }

    return response;
  }

  async logout(): Promise<void> {
    localStorage.removeItem("authToken");
  }

  // Retailer Services
  async createRetailer(retailerData: any): Promise<any> {
    return this.request("/retailers", {
      method: "POST",
      body: JSON.stringify(retailerData),
    });
  }

  async getRetailer(retailerId: string): Promise<any> {
    return this.request(`/retailers/${retailerId}`, {}, true);
  }

  async updateRetailer(retailerId: string, updates: any): Promise<any> {
    return this.request(`/retailers/${retailerId}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  async listRetailers(filters: any = {}): Promise<any[]> {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/retailers?${queryParams}`, {}, true, 60000); // 1 minute cache
  }

  // Order Services
  async createOrder(orderData: any): Promise<any> {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(orderId: string): Promise<any> {
    return this.request(`/orders/${orderId}`, {}, true);
  }

  async updateOrderStatus(orderId: string, status: string): Promise<any> {
    return this.request(`/orders/${orderId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  async listOrders(filters: any = {}): Promise<any[]> {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/orders?${queryParams}`, {}, true, 30000); // 30 seconds cache
  }

  // Supplier Services
  async createSupplier(supplierData: any): Promise<any> {
    return this.request("/suppliers", {
      method: "POST",
      body: JSON.stringify(supplierData),
    });
  }

  async getSupplier(supplierId: string): Promise<any> {
    return this.request(`/suppliers/${supplierId}`, {}, true);
  }

  async updateSupplier(supplierId: string, updates: any): Promise<any> {
    return this.request(`/suppliers/${supplierId}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  async listSuppliers(filters: any = {}): Promise<any[]> {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/suppliers?${queryParams}`, {}, true, 60000);
  }

  // Product Services
  async createProduct(supplierId: string, productData: any): Promise<any> {
    return this.request(`/suppliers/${supplierId}/products`, {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  async getSupplierProducts(supplierId: string): Promise<any[]> {
    return this.request(`/suppliers/${supplierId}/products`, {}, true, 120000); // 2 minutes cache
  }

  async updateProductStock(productId: string, quantity: number): Promise<any> {
    return this.request(`/products/${productId}/stock`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
  }

  // Logistics Services
  async trackDelivery(trackingNumber: string): Promise<any> {
    return this.request(`/deliveries/track/${trackingNumber}`, {}, true, 30000);
  }

  async listDeliveries(filters: any = {}): Promise<any[]> {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/deliveries?${queryParams}`, {}, true, 30000);
  }

  async updateDeliveryStatus(deliveryId: string, status: string): Promise<any> {
    return this.request(`/deliveries/${deliveryId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  async createVehicle(vehicleData: any): Promise<any> {
    return this.request("/vehicles", {
      method: "POST",
      body: JSON.stringify(vehicleData),
    });
  }

  async getVehicles(filters: any = {}): Promise<any[]> {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/vehicles?${queryParams}`, {}, true, 60000);
  }

  async updateVehicleLocation(vehicleId: string, location: any): Promise<any> {
    return this.request(`/vehicles/${vehicleId}/location`, {
      method: "PUT",
      body: JSON.stringify({ location }),
    });
  }

  async createDriver(driverData: any): Promise<any> {
    return this.request("/drivers", {
      method: "POST",
      body: JSON.stringify(driverData),
    });
  }

  async getDrivers(filters: any = {}): Promise<any[]> {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/drivers?${queryParams}`, {}, true, 60000);
  }

  async optimizeRoutes(zone: string, date: string): Promise<any> {
    return this.request("/routes/optimize", {
      method: "POST",
      body: JSON.stringify({ zone, date }),
    });
  }

  async calculateDeliveryCost(params: any): Promise<any> {
    return this.request("/delivery-cost", {
      method: "POST",
      body: JSON.stringify(params),
    });
  }

  // Analytics Services
  async getRetailerAnalytics(
    retailerId: string,
    timeframe: string = "30d",
  ): Promise<any> {
    return this.request(
      `/analytics/retailers/${retailerId}?timeframe=${timeframe}`,
      {},
      true,
      300000,
    ); // 5 minutes cache
  }

  async getSupplierAnalytics(
    supplierId: string,
    timeframe: string = "30d",
  ): Promise<any> {
    return this.request(
      `/analytics/suppliers/${supplierId}?timeframe=${timeframe}`,
      {},
      true,
      300000,
    );
  }

  async getLogisticsAnalytics(timeframe: string = "30d"): Promise<any> {
    return this.request(
      `/analytics/logistics?timeframe=${timeframe}`,
      {},
      true,
      300000,
    );
  }

  // Health and Status
  async getHealthStatus(): Promise<any> {
    return this.request("/health", {}, false);
  }

  // Utility Methods
  clearCache(): void {
    this.cache.clear();
  }

  invalidateCache(pattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  // Real-time Event Subscriptions (WebSocket-like functionality)
  private eventListeners = new Map<string, Function[]>();

  addEventListener(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  removeEventListener(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }

  // Batch Operations
  async batchRequest(
    requests: Array<{ endpoint: string; options?: RequestInit }>,
  ): Promise<any[]> {
    const promises = requests.map((req) =>
      this.request(req.endpoint, req.options).catch((error) => ({
        error: error.message,
      })),
    );

    return Promise.all(promises);
  }

  // Legacy Service Compatibility Methods
  // These maintain compatibility with existing code while routing through the monolith

  async getEnterpriseMetrics(): Promise<any> {
    return this.getLogisticsAnalytics();
  }

  async getTradingHubs(): Promise<any[]> {
    return this.listSuppliers({ category: "trading_hub" });
  }

  async getBusinessProfiles(): Promise<any[]> {
    return this.listRetailers();
  }

  async updateInventory(retailerId: string, items: any[]): Promise<any> {
    // This would be routed through the retailer module
    return this.request(`/retailers/${retailerId}/inventory`, {
      method: "PUT",
      body: JSON.stringify({ action: "update", items }),
    });
  }

  async processPayment(orderId: string, paymentData: any): Promise<any> {
    // Route through the appropriate payment processing module
    return this.request(`/orders/${orderId}/payment`, {
      method: "POST",
      body: JSON.stringify(paymentData),
    });
  }

  // Performance monitoring
  private performanceMetrics = {
    requestCount: 0,
    averageResponseTime: 0,
    errorRate: 0,
  };

  getPerformanceMetrics() {
    return { ...this.performanceMetrics };
  }

  resetPerformanceMetrics() {
    this.performanceMetrics = {
      requestCount: 0,
      averageResponseTime: 0,
      errorRate: 0,
    };
  }
}

// Export singleton instance
export const unifiedService = new UnifiedModularService();

// Export class for custom instances
export default UnifiedModularService;

// Legacy compatibility exports
export { unifiedService as serviceManager };
export { unifiedService as crudService };
export { unifiedService as enterpriseService };
export { unifiedService as logisticsService };
export { unifiedService as supplierAnalyticsService };

// Type exports for TypeScript compatibility
export type { ModuleResponse };
