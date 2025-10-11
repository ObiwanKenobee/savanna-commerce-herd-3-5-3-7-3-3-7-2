/**
 * Microservices Architecture Configuration
 * Defines the distributed services architecture for the enterprise ecosystem
 */

export interface MicroserviceConfig {
  name: string;
  baseUrl: string;
  version: string;
  healthCheck: string;
  authentication: "bearer" | "api-key" | "oauth" | "none";
  timeout: number;
  retries: number;
  circuitBreaker: boolean;
}

export interface ServiceEndpoints {
  [key: string]: string;
}

// Core Microservices Configuration
export const MICROSERVICES: Record<string, MicroserviceConfig> = {
  // Core Platform Services
  USER_MANAGEMENT: {
    name: "User Management Service",
    baseUrl: process.env.VITE_USER_SERVICE_URL || "http://localhost:3001",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 10000,
    retries: 3,
    circuitBreaker: true,
  },

  ENTERPRISE_CORE: {
    name: "Enterprise Core Service",
    baseUrl: process.env.VITE_ENTERPRISE_SERVICE_URL || "http://localhost:3002",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 15000,
    retries: 3,
    circuitBreaker: true,
  },

  // Analytics & Business Intelligence
  ANALYTICS_ENGINE: {
    name: "Analytics Engine",
    baseUrl: process.env.VITE_ANALYTICS_SERVICE_URL || "http://localhost:3003",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 20000,
    retries: 2,
    circuitBreaker: true,
  },

  REVENUE_INTELLIGENCE: {
    name: "Revenue Intelligence Service",
    baseUrl: process.env.VITE_REVENUE_SERVICE_URL || "http://localhost:3004",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 15000,
    retries: 3,
    circuitBreaker: true,
  },

  // Operational Services
  SUPPLY_CHAIN: {
    name: "Supply Chain Management",
    baseUrl:
      process.env.VITE_SUPPLY_CHAIN_SERVICE_URL || "http://localhost:3005",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 12000,
    retries: 3,
    circuitBreaker: true,
  },

  INVENTORY_MANAGEMENT: {
    name: "Inventory Management Service",
    baseUrl: process.env.VITE_INVENTORY_SERVICE_URL || "http://localhost:3006",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 10000,
    retries: 3,
    circuitBreaker: true,
  },

  LOGISTICS_OPTIMIZATION: {
    name: "Logistics Optimization Service",
    baseUrl: process.env.VITE_LOGISTICS_SERVICE_URL || "http://localhost:3007",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 15000,
    retries: 2,
    circuitBreaker: true,
  },

  // Financial Services
  BILLING_ENGINE: {
    name: "Billing & Payment Engine",
    baseUrl: process.env.VITE_BILLING_SERVICE_URL || "http://localhost:3008",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 10000,
    retries: 3,
    circuitBreaker: true,
  },

  FINANCIAL_ANALYTICS: {
    name: "Financial Analytics Service",
    baseUrl: process.env.VITE_FINANCIAL_SERVICE_URL || "http://localhost:3009",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 15000,
    retries: 2,
    circuitBreaker: true,
  },

  // Compliance & Security
  COMPLIANCE_ENGINE: {
    name: "Compliance & Audit Service",
    baseUrl: process.env.VITE_COMPLIANCE_SERVICE_URL || "http://localhost:3010",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 20000,
    retries: 3,
    circuitBreaker: true,
  },

  SECURITY_CENTER: {
    name: "Security Operations Center",
    baseUrl: process.env.VITE_SECURITY_SERVICE_URL || "http://localhost:3011",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 8000,
    retries: 3,
    circuitBreaker: true,
  },

  // AI & Machine Learning
  AI_INSIGHTS: {
    name: "AI Insights Engine",
    baseUrl: process.env.VITE_AI_SERVICE_URL || "http://localhost:3012",
    version: "v1",
    healthCheck: "/health",
    authentication: "api-key",
    timeout: 30000,
    retries: 2,
    circuitBreaker: true,
  },

  PREDICTIVE_ANALYTICS: {
    name: "Predictive Analytics Service",
    baseUrl: process.env.VITE_PREDICTIVE_SERVICE_URL || "http://localhost:3013",
    version: "v1",
    healthCheck: "/health",
    authentication: "api-key",
    timeout: 25000,
    retries: 2,
    circuitBreaker: true,
  },

  // Communication & Notifications
  NOTIFICATION_HUB: {
    name: "Notification Hub",
    baseUrl:
      process.env.VITE_NOTIFICATION_SERVICE_URL || "http://localhost:3014",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 8000,
    retries: 3,
    circuitBreaker: true,
  },

  COMMUNICATION_CENTER: {
    name: "Communication Center",
    baseUrl:
      process.env.VITE_COMMUNICATION_SERVICE_URL || "http://localhost:3015",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 10000,
    retries: 3,
    circuitBreaker: true,
  },

  // Integration & Data Services
  INTEGRATION_HUB: {
    name: "Enterprise Integration Hub",
    baseUrl:
      process.env.VITE_INTEGRATION_SERVICE_URL || "http://localhost:3016",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 20000,
    retries: 3,
    circuitBreaker: true,
  },

  DATA_PIPELINE: {
    name: "Data Pipeline Service",
    baseUrl:
      process.env.VITE_DATA_PIPELINE_SERVICE_URL || "http://localhost:3017",
    version: "v1",
    healthCheck: "/health",
    authentication: "api-key",
    timeout: 25000,
    retries: 2,
    circuitBreaker: true,
  },

  // Monitoring & Observability
  MONITORING_SERVICE: {
    name: "Monitoring & Observability",
    baseUrl: process.env.VITE_MONITORING_SERVICE_URL || "http://localhost:3018",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 5000,
    retries: 3,
    circuitBreaker: false,
  },

  // Reporting & Business Intelligence
  REPORTING_ENGINE: {
    name: "Enterprise Reporting Engine",
    baseUrl: process.env.VITE_REPORTING_SERVICE_URL || "http://localhost:3019",
    version: "v1",
    healthCheck: "/health",
    authentication: "bearer",
    timeout: 30000,
    retries: 2,
    circuitBreaker: true,
  },
};

// Service Endpoints Configuration
export const SERVICE_ENDPOINTS: Record<string, ServiceEndpoints> = {
  ENTERPRISE_CORE: {
    dashboard: "/dashboard",
    metrics: "/metrics",
    onboarding: "/onboarding",
    configuration: "/configuration",
    tiers: "/tiers",
    upsell: "/upsell-opportunities",
  },

  ANALYTICS_ENGINE: {
    realtime: "/analytics/realtime",
    historical: "/analytics/historical",
    custom: "/analytics/custom",
    reports: "/analytics/reports",
    insights: "/analytics/insights",
  },

  REVENUE_INTELLIGENCE: {
    revenue: "/revenue",
    forecasting: "/forecasting",
    optimization: "/optimization",
    pricing: "/pricing",
    contracts: "/contracts",
  },

  SUPPLY_CHAIN: {
    overview: "/supply-chain/overview",
    suppliers: "/supply-chain/suppliers",
    procurement: "/supply-chain/procurement",
    risk: "/supply-chain/risk",
    optimization: "/supply-chain/optimization",
  },

  INVENTORY_MANAGEMENT: {
    overview: "/inventory/overview",
    stock: "/inventory/stock",
    forecasting: "/inventory/forecasting",
    optimization: "/inventory/optimization",
    alerts: "/inventory/alerts",
  },

  LOGISTICS_OPTIMIZATION: {
    overview: "/logistics/overview",
    routes: "/logistics/routes",
    carriers: "/logistics/carriers",
    tracking: "/logistics/tracking",
    analytics: "/logistics/analytics",
  },

  BILLING_ENGINE: {
    overview: "/billing/overview",
    invoices: "/billing/invoices",
    payments: "/billing/payments",
    subscriptions: "/billing/subscriptions",
    disputes: "/billing/disputes",
  },

  FINANCIAL_ANALYTICS: {
    overview: "/financial/overview",
    profitability: "/financial/profitability",
    cashflow: "/financial/cashflow",
    budgeting: "/financial/budgeting",
    forecasting: "/financial/forecasting",
  },

  COMPLIANCE_ENGINE: {
    overview: "/compliance/overview",
    audits: "/compliance/audits",
    regulations: "/compliance/regulations",
    reports: "/compliance/reports",
    monitoring: "/compliance/monitoring",
  },

  SECURITY_CENTER: {
    overview: "/security/overview",
    threats: "/security/threats",
    incidents: "/security/incidents",
    compliance: "/security/compliance",
    monitoring: "/security/monitoring",
  },

  AI_INSIGHTS: {
    predictions: "/ai/predictions",
    recommendations: "/ai/recommendations",
    anomalies: "/ai/anomalies",
    optimization: "/ai/optimization",
    insights: "/ai/insights",
  },

  NOTIFICATION_HUB: {
    notifications: "/notifications",
    alerts: "/notifications/alerts",
    templates: "/notifications/templates",
    preferences: "/notifications/preferences",
    history: "/notifications/history",
  },

  INTEGRATION_HUB: {
    connections: "/integrations/connections",
    apis: "/integrations/apis",
    webhooks: "/integrations/webhooks",
    mappings: "/integrations/mappings",
    monitoring: "/integrations/monitoring",
  },

  MONITORING_SERVICE: {
    health: "/monitoring/health",
    performance: "/monitoring/performance",
    logs: "/monitoring/logs",
    metrics: "/monitoring/metrics",
    alerts: "/monitoring/alerts",
  },

  REPORTING_ENGINE: {
    dashboard: "/reports/dashboard",
    custom: "/reports/custom",
    scheduled: "/reports/scheduled",
    exports: "/reports/exports",
    templates: "/reports/templates",
  },
};

// Dashboard Module Configuration
export interface DashboardModule {
  id: string;
  name: string;
  description: string;
  route: string;
  services: string[];
  permissions: string[];
  features: string[];
}

export const DASHBOARD_MODULES: Record<string, DashboardModule> = {
  EXECUTIVE_OVERVIEW: {
    id: "executive-overview",
    name: "Executive Overview",
    description: "C-level executive dashboard with strategic insights",
    route: "/enterprise/executive-overview",
    services: ["ENTERPRISE_CORE", "REVENUE_INTELLIGENCE", "ANALYTICS_ENGINE"],
    permissions: ["executive.view", "strategic.insights"],
    features: ["realtime-metrics", "strategic-kpis", "executive-alerts"],
  },

  REVENUE_OPERATIONS: {
    id: "revenue-operations",
    name: "Revenue Operations",
    description: "Complete revenue lifecycle management and optimization",
    route: "/enterprise/revenue-operations",
    services: ["REVENUE_INTELLIGENCE", "BILLING_ENGINE", "FINANCIAL_ANALYTICS"],
    permissions: ["revenue.view", "financial.view"],
    features: [
      "revenue-tracking",
      "pricing-optimization",
      "billing-automation",
    ],
  },

  SUPPLY_CHAIN_COMMAND: {
    id: "supply-chain-command",
    name: "Supply Chain Command Center",
    description: "End-to-end supply chain visibility and control",
    route: "/enterprise/supply-chain-command",
    services: [
      "SUPPLY_CHAIN",
      "INVENTORY_MANAGEMENT",
      "LOGISTICS_OPTIMIZATION",
    ],
    permissions: ["supply-chain.view", "inventory.manage"],
    features: ["real-time-tracking", "demand-planning", "supplier-management"],
  },

  OPERATIONAL_EXCELLENCE: {
    id: "operational-excellence",
    name: "Operational Excellence",
    description: "Operations monitoring and performance optimization",
    route: "/enterprise/operational-excellence",
    services: ["ANALYTICS_ENGINE", "MONITORING_SERVICE", "AI_INSIGHTS"],
    permissions: ["operations.view", "performance.monitor"],
    features: [
      "performance-monitoring",
      "process-optimization",
      "quality-metrics",
    ],
  },

  FINANCIAL_CONTROL: {
    id: "financial-control",
    name: "Financial Control Center",
    description: "Comprehensive financial management and reporting",
    route: "/enterprise/financial-control",
    services: ["FINANCIAL_ANALYTICS", "BILLING_ENGINE", "COMPLIANCE_ENGINE"],
    permissions: ["financial.view", "accounting.manage"],
    features: ["financial-reporting", "budget-management", "cost-analysis"],
  },

  COMPLIANCE_GOVERNANCE: {
    id: "compliance-governance",
    name: "Compliance & Governance",
    description: "Regulatory compliance and risk management",
    route: "/enterprise/compliance-governance",
    services: ["COMPLIANCE_ENGINE", "SECURITY_CENTER", "MONITORING_SERVICE"],
    permissions: ["compliance.view", "audit.manage"],
    features: ["compliance-monitoring", "audit-trails", "risk-assessment"],
  },

  SECURITY_OPERATIONS: {
    id: "security-operations",
    name: "Security Operations Center",
    description: "Cybersecurity monitoring and incident response",
    route: "/enterprise/security-operations",
    services: ["SECURITY_CENTER", "MONITORING_SERVICE", "COMPLIANCE_ENGINE"],
    permissions: ["security.view", "incidents.manage"],
    features: ["threat-monitoring", "incident-response", "security-analytics"],
  },

  AI_INTELLIGENCE: {
    id: "ai-intelligence",
    name: "AI Intelligence Hub",
    description: "AI-powered insights and predictive analytics",
    route: "/enterprise/ai-intelligence",
    services: ["AI_INSIGHTS", "PREDICTIVE_ANALYTICS", "ANALYTICS_ENGINE"],
    permissions: ["ai.view", "predictions.access"],
    features: [
      "predictive-modeling",
      "anomaly-detection",
      "ai-recommendations",
    ],
  },

  INTEGRATION_MANAGEMENT: {
    id: "integration-management",
    name: "Integration Management",
    description: "Enterprise integration and API management",
    route: "/enterprise/integration-management",
    services: ["INTEGRATION_HUB", "DATA_PIPELINE", "MONITORING_SERVICE"],
    permissions: ["integrations.view", "apis.manage"],
    features: ["api-management", "data-integration", "workflow-automation"],
  },

  BUSINESS_INTELLIGENCE: {
    id: "business-intelligence",
    name: "Business Intelligence",
    description: "Advanced analytics and business insights",
    route: "/enterprise/business-intelligence",
    services: ["ANALYTICS_ENGINE", "REPORTING_ENGINE", "DATA_PIPELINE"],
    permissions: ["analytics.view", "reports.create"],
    features: ["advanced-analytics", "custom-reporting", "data-visualization"],
  },
};

// Environment-specific configurations
export const getServiceUrl = (serviceName: string): string => {
  const service = MICROSERVICES[serviceName];
  if (!service) {
    throw new Error(`Service ${serviceName} not found in configuration`);
  }
  return `${service.baseUrl}/api/${service.version}`;
};

export const getServiceEndpoint = (
  serviceName: string,
  endpoint: string,
): string => {
  const baseUrl = getServiceUrl(serviceName);
  const endpoints = SERVICE_ENDPOINTS[serviceName];

  if (!endpoints || !endpoints[endpoint]) {
    throw new Error(
      `Endpoint ${endpoint} not found for service ${serviceName}`,
    );
  }

  return `${baseUrl}${endpoints[endpoint]}`;
};

// Health check configuration
export const HEALTH_CHECK_CONFIG = {
  interval: 30000, // 30 seconds
  timeout: 5000, // 5 seconds
  retries: 3,
  gracePeriod: 60000, // 1 minute
};

// Circuit breaker configuration
export const CIRCUIT_BREAKER_CONFIG = {
  errorThreshold: 5,
  timeout: 60000, // 1 minute
  monitoringPeriod: 10000, // 10 seconds
  resetTimeout: 120000, // 2 minutes
};
