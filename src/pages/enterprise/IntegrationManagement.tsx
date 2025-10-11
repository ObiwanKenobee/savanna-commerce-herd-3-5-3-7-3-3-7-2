import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceManager } from "@/services/ServiceManager";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import {
  Network,
  Database,
  Cloud,
  Server,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  Settings,
  RefreshCw,
  Download,
  Search,
  Filter,
  Play,
  Pause,
  Stop,
  RotateCcw,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Globe,
  Shield,
  Lock,
  Unlock,
  Key,
  FileText,
  Code,
  Terminal,
  Cpu,
  HardDrive,
  Wifi,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Users,
  Building,
  Star,
  Award,
  Target,
  Lightbulb,
  AlertCircle,
  Info,
  XCircle,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  type: "api" | "database" | "file-transfer" | "message-queue" | "webhook";
  provider: string;
  status: "active" | "inactive" | "error" | "pending" | "maintenance";
  healthScore: number;
  lastSync: Date;
  syncFrequency: string;
  dataVolume: number;
  latency: number;
  errorRate: number;
  throughput: number;
  authentication: "oauth2" | "api-key" | "basic-auth" | "certificate";
  environment: "production" | "staging" | "development";
}

interface APIEndpoint {
  id: string;
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  integration: string;
  requests24h: number;
  avgResponseTime: number;
  errorRate: number;
  uptime: number;
  version: string;
  authentication: boolean;
  rateLimit: number;
  lastAccessed: Date;
}

interface DataFlow {
  id: string;
  name: string;
  source: string;
  destination: string;
  dataType: "json" | "xml" | "csv" | "binary" | "text";
  status: "running" | "stopped" | "error" | "paused";
  recordsProcessed: number;
  processingRate: number;
  errorCount: number;
  lastRun: Date;
  schedule: string;
  transformation: boolean;
}

interface WebhookSubscription {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "active" | "inactive" | "failed";
  deliveries24h: number;
  successRate: number;
  lastDelivery: Date;
  retryPolicy: string;
  secret: boolean;
}

interface SystemConnector {
  id: string;
  name: string;
  system: string;
  type: "erp" | "crm" | "hr" | "financial" | "marketing" | "analytics";
  version: string;
  status: "connected" | "disconnected" | "error" | "syncing";
  lastSync: Date;
  syncHealth: number;
  recordCount: number;
  features: string[];
}

const IntegrationManagement: React.FC = () => {
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "salesforce-crm",
      name: "Salesforce CRM Integration",
      type: "api",
      provider: "Salesforce",
      status: "active",
      healthScore: 96.8,
      lastSync: new Date("2024-01-20T15:30:00"),
      syncFrequency: "Real-time",
      dataVolume: 2847592,
      latency: 120,
      errorRate: 0.3,
      throughput: 1250,
      authentication: "oauth2",
      environment: "production",
    },
    {
      id: "sap-erp",
      name: "SAP ERP System",
      type: "database",
      provider: "SAP",
      status: "active",
      healthScore: 94.2,
      lastSync: new Date("2024-01-20T15:28:00"),
      syncFrequency: "Every 15 minutes",
      dataVolume: 5629384,
      latency: 280,
      errorRate: 1.2,
      throughput: 850,
      authentication: "certificate",
      environment: "production",
    },
    {
      id: "hubspot-marketing",
      name: "HubSpot Marketing Hub",
      type: "api",
      provider: "HubSpot",
      status: "active",
      healthScore: 91.7,
      lastSync: new Date("2024-01-20T15:25:00"),
      syncFrequency: "Hourly",
      dataVolume: 892745,
      latency: 95,
      errorRate: 2.1,
      throughput: 650,
      authentication: "api-key",
      environment: "production",
    },
    {
      id: "quickbooks-finance",
      name: "QuickBooks Financial",
      type: "api",
      provider: "Intuit",
      status: "error",
      healthScore: 67.3,
      lastSync: new Date("2024-01-20T14:30:00"),
      syncFrequency: "Daily",
      dataVolume: 245892,
      latency: 450,
      errorRate: 8.7,
      throughput: 120,
      authentication: "oauth2",
      environment: "production",
    },
    {
      id: "slack-notifications",
      name: "Slack Notification Service",
      type: "webhook",
      provider: "Slack",
      status: "active",
      healthScore: 98.1,
      lastSync: new Date("2024-01-20T15:32:00"),
      syncFrequency: "Event-driven",
      dataVolume: 15847,
      latency: 35,
      errorRate: 0.1,
      throughput: 2500,
      authentication: "api-key",
      environment: "production",
    },
  ]);

  const [apiEndpoints, setApiEndpoints] = useState<APIEndpoint[]>([
    {
      id: "customers-api",
      path: "/api/v1/customers",
      method: "GET",
      integration: "salesforce-crm",
      requests24h: 15847,
      avgResponseTime: 245,
      errorRate: 1.2,
      uptime: 99.8,
      version: "1.0",
      authentication: true,
      rateLimit: 1000,
      lastAccessed: new Date("2024-01-20T15:30:00"),
    },
    {
      id: "orders-api",
      path: "/api/v1/orders",
      method: "POST",
      integration: "sap-erp",
      requests24h: 8934,
      avgResponseTime: 380,
      errorRate: 2.1,
      uptime: 99.2,
      version: "2.1",
      authentication: true,
      rateLimit: 500,
      lastAccessed: new Date("2024-01-20T15:28:00"),
    },
    {
      id: "leads-api",
      path: "/api/v2/leads",
      method: "PUT",
      integration: "hubspot-marketing",
      requests24h: 12456,
      avgResponseTime: 156,
      errorRate: 0.8,
      uptime: 99.9,
      version: "2.0",
      authentication: true,
      rateLimit: 2000,
      lastAccessed: new Date("2024-01-20T15:25:00"),
    },
  ]);

  const [dataFlows, setDataFlows] = useState<DataFlow[]>([
    {
      id: "customer-sync",
      name: "Customer Data Synchronization",
      source: "Salesforce CRM",
      destination: "Data Warehouse",
      dataType: "json",
      status: "running",
      recordsProcessed: 284759,
      processingRate: 1250,
      errorCount: 12,
      lastRun: new Date("2024-01-20T15:30:00"),
      schedule: "Real-time",
      transformation: true,
    },
    {
      id: "financial-import",
      name: "Financial Data Import",
      source: "QuickBooks",
      destination: "Analytics Platform",
      dataType: "csv",
      status: "error",
      recordsProcessed: 0,
      processingRate: 0,
      errorCount: 45,
      lastRun: new Date("2024-01-20T14:30:00"),
      schedule: "Daily at 2 AM",
      transformation: true,
    },
    {
      id: "marketing-export",
      name: "Marketing Campaign Export",
      source: "HubSpot",
      destination: "Reporting System",
      dataType: "json",
      status: "running",
      recordsProcessed: 89274,
      processingRate: 650,
      errorCount: 3,
      lastRun: new Date("2024-01-20T15:25:00"),
      schedule: "Hourly",
      transformation: false,
    },
  ]);

  const [webhooks, setWebhooks] = useState<WebhookSubscription[]>([
    {
      id: "order-notifications",
      name: "Order Status Notifications",
      url: "https://api.company.com/webhooks/orders",
      events: ["order.created", "order.updated", "order.completed"],
      status: "active",
      deliveries24h: 2847,
      successRate: 98.5,
      lastDelivery: new Date("2024-01-20T15:30:00"),
      retryPolicy: "3 attempts, exponential backoff",
      secret: true,
    },
    {
      id: "payment-events",
      name: "Payment Event Webhooks",
      url: "https://api.company.com/webhooks/payments",
      events: ["payment.succeeded", "payment.failed", "payment.refunded"],
      status: "active",
      deliveries24h: 1586,
      successRate: 97.2,
      lastDelivery: new Date("2024-01-20T15:28:00"),
      retryPolicy: "5 attempts, linear backoff",
      secret: true,
    },
    {
      id: "user-activity",
      name: "User Activity Tracking",
      url: "https://analytics.company.com/events",
      events: ["user.login", "user.logout", "user.action"],
      status: "failed",
      deliveries24h: 0,
      successRate: 0,
      lastDelivery: new Date("2024-01-19T18:45:00"),
      retryPolicy: "3 attempts, exponential backoff",
      secret: false,
    },
  ]);

  const [systemConnectors, setSystemConnectors] = useState<SystemConnector[]>([
    {
      id: "salesforce-connector",
      name: "Salesforce CRM Connector",
      system: "Salesforce",
      type: "crm",
      version: "v52.0",
      status: "connected",
      lastSync: new Date("2024-01-20T15:30:00"),
      syncHealth: 96.8,
      recordCount: 284759,
      features: ["Contacts", "Opportunities", "Accounts", "Custom Objects"],
    },
    {
      id: "sap-connector",
      name: "SAP ERP Connector",
      system: "SAP S/4HANA",
      type: "erp",
      version: "2021",
      status: "connected",
      lastSync: new Date("2024-01-20T15:28:00"),
      syncHealth: 94.2,
      recordCount: 562938,
      features: ["Financial", "Inventory", "Purchasing", "Manufacturing"],
    },
    {
      id: "workday-connector",
      name: "Workday HR Connector",
      system: "Workday",
      type: "hr",
      version: "2023R2",
      status: "syncing",
      lastSync: new Date("2024-01-20T15:20:00"),
      syncHealth: 92.1,
      recordCount: 23847,
      features: ["Employees", "Payroll", "Benefits", "Time Tracking"],
    },
  ]);

  useEffect(() => {
    loadIntegrationData();
  }, [selectedEnvironment, selectedStatus]);

  const loadIntegrationData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real implementation, fetch integration data based on filters
    } catch (error) {
      console.error("Failed to load integration data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "connected":
      case "running":
        return "text-green-600";
      case "syncing":
      case "pending":
        return "text-blue-600";
      case "inactive":
      case "paused":
      case "stopped":
        return "text-yellow-600";
      case "error":
      case "failed":
      case "disconnected":
        return "text-red-600";
      case "maintenance":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "connected":
      case "running":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "syncing":
      case "pending":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "inactive":
      case "paused":
      case "stopped":
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case "error":
      case "failed":
      case "disconnected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "maintenance":
        return <Settings className="h-4 w-4 text-purple-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "api":
        return <Cloud className="h-4 w-4 text-blue-600" />;
      case "database":
        return <Database className="h-4 w-4 text-green-600" />;
      case "file-transfer":
        return <FileText className="h-4 w-4 text-purple-600" />;
      case "message-queue":
        return <MessageSquare className="h-4 w-4 text-orange-600" />;
      case "webhook":
        return <Zap className="h-4 w-4 text-yellow-600" />;
      case "crm":
        return <Users className="h-4 w-4 text-blue-600" />;
      case "erp":
        return <Building className="h-4 w-4 text-green-600" />;
      case "hr":
        return <Users className="h-4 w-4 text-purple-600" />;
      case "financial":
        return <Cpu className="h-4 w-4 text-orange-600" />;
      case "marketing":
        return <Star className="h-4 w-4 text-pink-600" />;
      case "analytics":
        return <BarChart3 className="h-4 w-4 text-indigo-600" />;
      default:
        return <Network className="h-4 w-4 text-gray-600" />;
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Integration Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Integrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">
                {integrations.filter((i) => i.status === "active").length}
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">Healthy</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {integrations.length} total integrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Data Volume (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(
                  integrations.reduce((sum, i) => sum + i.dataVolume, 0) /
                    1000000,
                )}
                M
              </div>
              <div className="flex items-center text-blue-600">
                <Database className="h-4 w-4 mr-1" />
                <span className="text-sm">Records</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Processed today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(
                  integrations.reduce((sum, i) => sum + i.latency, 0) /
                    integrations.length,
                )}
                ms
              </div>
              <div className="flex items-center text-purple-600">
                <Activity className="h-4 w-4 mr-1" />
                <span className="text-sm">Fast</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Across all APIs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Error Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-orange-600">
                {(
                  integrations.reduce((sum, i) => sum + i.errorRate, 0) /
                  integrations.length
                ).toFixed(1)}
                %
              </div>
              <div className="flex items-center text-orange-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm">Monitor</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Average error rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5 text-blue-600" />
            <span>Integration Status Overview</span>
          </CardTitle>
          <CardDescription>
            Real-time status of all system integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(integration.status)}
                    {getTypeIcon(integration.type)}
                    <div>
                      <h4 className="font-semibold">{integration.name}</h4>
                      <p className="text-sm text-slate-600">
                        {integration.provider} • {integration.environment}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      variant={
                        integration.status === "active"
                          ? "default"
                          : integration.status === "error"
                            ? "destructive"
                            : integration.status === "maintenance"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {integration.status}
                    </Badge>
                    <Badge variant="outline">{integration.type}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {integration.healthScore}%
                    </div>
                    <div className="text-xs text-slate-600">Health Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {integration.latency}ms
                    </div>
                    <div className="text-xs text-slate-600">Latency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {integration.throughput}/min
                    </div>
                    <div className="text-xs text-slate-600">Throughput</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {integration.errorRate}%
                    </div>
                    <div className="text-xs text-slate-600">Error Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">
                      {integration.syncFrequency}
                    </div>
                    <div className="text-xs text-slate-600">Sync Frequency</div>
                  </div>
                </div>

                <Progress value={integration.healthScore} className="mb-3" />

                <div className="flex space-x-2">
                  <Button size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Sync Now
                  </Button>
                  {integration.status === "error" && (
                    <Button size="sm" variant="outline">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Critical Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Critical Issues</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>QuickBooks Integration Failure</AlertTitle>
                <AlertDescription>
                  API authentication failed. Error rate at 8.7%. Immediate
                  attention required.
                </AlertDescription>
              </Alert>
              <Alert className="border-yellow-200 bg-yellow-50">
                <Clock className="h-4 w-4" />
                <AlertTitle>Webhook Delivery Failures</AlertTitle>
                <AlertDescription>
                  User activity webhook has failed for 18+ hours. Check endpoint
                  availability.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Performance Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-sm font-medium">Average Uptime</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-green-600">
                    99.3%
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium">Data Throughput</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-blue-600">
                    3.9M/day
                  </span>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-sm font-medium">Response Time</span>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-purple-600">
                    198ms
                  </span>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAPITab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cloud className="h-5 w-5 text-blue-600" />
            <span>API Endpoint Management</span>
          </CardTitle>
          <CardDescription>
            Monitor and manage all API endpoints and their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Endpoint</th>
                  <th className="text-left p-3">Method</th>
                  <th className="text-left p-3">Integration</th>
                  <th className="text-left p-3">Requests (24h)</th>
                  <th className="text-left p-3">Response Time</th>
                  <th className="text-left p-3">Error Rate</th>
                  <th className="text-left p-3">Uptime</th>
                  <th className="text-left p-3">Rate Limit</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((endpoint) => (
                  <tr key={endpoint.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Code className="h-4 w-4 text-gray-600" />
                        <div>
                          <span className="font-medium">{endpoint.path}</span>
                          <p className="text-xs text-slate-600">
                            v{endpoint.version}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          endpoint.method === "GET"
                            ? "outline"
                            : endpoint.method === "POST"
                              ? "default"
                              : endpoint.method === "PUT"
                                ? "secondary"
                                : "destructive"
                        }
                      >
                        {endpoint.method}
                      </Badge>
                    </td>
                    <td className="p-3">{endpoint.integration}</td>
                    <td className="p-3">
                      {endpoint.requests24h.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          endpoint.avgResponseTime < 200
                            ? "text-green-600"
                            : endpoint.avgResponseTime < 500
                              ? "text-yellow-600"
                              : "text-red-600"
                        }
                      >
                        {endpoint.avgResponseTime}ms
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          endpoint.errorRate < 1
                            ? "text-green-600"
                            : endpoint.errorRate < 5
                              ? "text-yellow-600"
                              : "text-red-600"
                        }
                      >
                        {endpoint.errorRate}%
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-green-600">{endpoint.uptime}%</span>
                    </td>
                    <td className="p-3">{endpoint.rateLimit}/min</td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Terminal className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Webhook Subscriptions</span>
          </CardTitle>
          <CardDescription>
            Manage webhook endpoints and event subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(webhook.status)}
                    <div>
                      <h4 className="font-semibold">{webhook.name}</h4>
                      <p className="text-sm text-slate-600">{webhook.url}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      variant={
                        webhook.status === "active"
                          ? "default"
                          : webhook.status === "failed"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {webhook.status}
                    </Badge>
                    {webhook.secret && (
                      <Badge variant="outline">
                        <Lock className="h-3 w-3 mr-1" />
                        Secured
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {webhook.deliveries24h}
                    </div>
                    <div className="text-xs text-slate-600">
                      Deliveries (24h)
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {webhook.successRate}%
                    </div>
                    <div className="text-xs text-slate-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {webhook.lastDelivery.toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-slate-600">Last Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {webhook.retryPolicy.split(",")[0]}
                    </div>
                    <div className="text-xs text-slate-600">Retry Policy</div>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-slate-500 text-sm">Events:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {webhook.events.map((event, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <Zap className="h-3 w-3 mr-1" />
                    Test
                  </Button>
                  {webhook.status === "failed" && (
                    <Button size="sm" variant="outline">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDataFlowsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-green-600" />
            <span>Data Flow Management</span>
          </CardTitle>
          <CardDescription>
            Monitor and control data flows between systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataFlows.map((flow) => (
              <div
                key={flow.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(flow.status)}
                    <div>
                      <h4 className="font-semibold">{flow.name}</h4>
                      <p className="text-sm text-slate-600">
                        {flow.source} → {flow.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      variant={
                        flow.status === "running"
                          ? "default"
                          : flow.status === "error"
                            ? "destructive"
                            : flow.status === "paused"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {flow.status}
                    </Badge>
                    <Badge variant="outline">{flow.dataType}</Badge>
                    {flow.transformation && (
                      <Badge variant="outline">
                        <Zap className="h-3 w-3 mr-1" />
                        Transform
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {flow.recordsProcessed.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-600">
                      Records Processed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {flow.processingRate}/min
                    </div>
                    <div className="text-xs text-slate-600">
                      Processing Rate
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">
                      {flow.errorCount}
                    </div>
                    <div className="text-xs text-slate-600">Errors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {flow.lastRun.toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-slate-600">Last Run</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {flow.schedule}
                    </div>
                    <div className="text-xs text-slate-600">Schedule</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {flow.status === "running" ? (
                    <Button size="sm" variant="outline">
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                  ) : flow.status === "paused" ? (
                    <Button size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Resume
                    </Button>
                  ) : flow.status === "error" ? (
                    <Button size="sm">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-3 w-3 mr-1" />
                    Logs
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConnectorsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-purple-600" />
            <span>System Connectors</span>
          </CardTitle>
          <CardDescription>
            Pre-built connectors for enterprise systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {systemConnectors.map((connector) => (
              <Card key={connector.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(connector.type)}
                      <CardTitle className="text-lg">
                        {connector.name}
                      </CardTitle>
                    </div>
                    <Badge
                      variant={
                        connector.status === "connected"
                          ? "default"
                          : connector.status === "syncing"
                            ? "secondary"
                            : connector.status === "error"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {connector.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {connector.system} {connector.version}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          {connector.syncHealth}%
                        </div>
                        <div className="text-xs text-slate-600">
                          Health Score
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          {connector.recordCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600">Records</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">
                          {connector.lastSync.toLocaleTimeString()}
                        </div>
                        <div className="text-xs text-slate-600">Last Sync</div>
                      </div>
                    </div>

                    <Progress value={connector.syncHealth} className="h-2" />

                    <div>
                      <span className="text-slate-500 text-sm">Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {connector.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Sync
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Connectors */}
      <Card>
        <CardHeader>
          <CardTitle>Available Connectors</CardTitle>
          <CardDescription>
            Expand your integration capabilities with additional connectors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Microsoft Dynamics 365", type: "ERP", available: true },
              { name: "Oracle NetSuite", type: "ERP", available: true },
              { name: "Zendesk", type: "Customer Support", available: true },
              { name: "Jira", type: "Project Management", available: true },
              { name: "Shopify", type: "E-commerce", available: false },
              { name: "Magento", type: "E-commerce", available: false },
            ].map((connector, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{connector.name}</h4>
                  <Badge variant="outline">{connector.type}</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" disabled={!connector.available}>
                    {connector.available ? "Install" : "Coming Soon"}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Info className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EnhancedNavigation />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-2">
                  <Network className="h-8 w-8 text-blue-600" />
                  <span>Integration Management Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Centralized API management, data flows, and system
                  integrations
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedEnvironment}
                  onValueChange={setSelectedEnvironment}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Environments</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={loadIntegrationData}
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Main Dashboard */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Integration Overview</TabsTrigger>
              <TabsTrigger value="apis">APIs & Webhooks</TabsTrigger>
              <TabsTrigger value="data-flows">Data Flows</TabsTrigger>
              <TabsTrigger value="connectors">System Connectors</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">{renderOverviewTab()}</TabsContent>
            <TabsContent value="apis">{renderAPITab()}</TabsContent>
            <TabsContent value="data-flows">{renderDataFlowsTab()}</TabsContent>
            <TabsContent value="connectors">
              {renderConnectorsTab()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default IntegrationManagement;
