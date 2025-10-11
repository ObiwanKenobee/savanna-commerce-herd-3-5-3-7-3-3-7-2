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
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  DollarSign,
  Globe,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Search,
  Filter,
  Share,
  Star,
  Award,
  CheckCircle,
  AlertTriangle,
  Info,
  Activity,
  Database,
  FileText,
  Lightbulb,
  Zap,
  Brain,
  ArrowUp,
  ArrowDown,
  Percent,
  Clock,
  Building,
  Factory,
  ShoppingCart,
  CreditCard,
  Phone,
  Mail,
  MessageSquare,
  PlayCircle,
  PauseCircle,
  StopCircle,
} from "lucide-react";

interface KPIDashboard {
  id: string;
  name: string;
  category: "financial" | "operational" | "customer" | "marketing" | "hr";
  metrics: KPIMetric[];
  lastUpdated: Date;
  refreshRate: "real-time" | "hourly" | "daily" | "weekly";
  owner: string;
}

interface KPIMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: number;
  status: "above-target" | "on-target" | "below-target" | "critical";
  sparklineData: number[];
}

interface DataSource {
  id: string;
  name: string;
  type: "database" | "api" | "file" | "cloud-service";
  status: "connected" | "disconnected" | "error" | "syncing";
  lastSync: Date;
  recordCount: number;
  healthScore: number;
  latency: number;
}

interface Report {
  id: string;
  title: string;
  description: string;
  category: "executive" | "operational" | "financial" | "compliance" | "custom";
  format: "dashboard" | "pdf" | "excel" | "powerpoint";
  schedule: "on-demand" | "daily" | "weekly" | "monthly" | "quarterly";
  recipients: string[];
  lastGenerated: Date;
  status: "active" | "draft" | "archived";
}

interface Insight {
  id: string;
  title: string;
  description: string;
  type: "trend" | "anomaly" | "correlation" | "prediction" | "recommendation";
  importance: "high" | "medium" | "low";
  confidence: number;
  impact: string;
  actionable: boolean;
  metrics: string[];
  generatedAt: Date;
}

const BusinessIntelligence: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const [kpiDashboards, setKpiDashboards] = useState<KPIDashboard[]>([
    {
      id: "executive-dashboard",
      name: "Executive Overview",
      category: "financial",
      metrics: [
        {
          name: "Total Revenue",
          value: 12450000,
          target: 12000000,
          unit: "$",
          trend: 8.3,
          status: "above-target",
          sparklineData: [10.2, 10.8, 11.1, 11.5, 11.9, 12.4],
        },
        {
          name: "Profit Margin",
          value: 23.5,
          target: 25.0,
          unit: "%",
          trend: -1.2,
          status: "below-target",
          sparklineData: [24.1, 24.3, 23.9, 23.7, 23.2, 23.5],
        },
        {
          name: "Customer Acquisition Cost",
          value: 245,
          target: 200,
          unit: "$",
          trend: -5.8,
          status: "above-target",
          sparklineData: [280, 260, 255, 250, 248, 245],
        },
      ],
      lastUpdated: new Date("2024-01-20T15:30:00"),
      refreshRate: "real-time",
      owner: "C-Suite",
    },
    {
      id: "operations-dashboard",
      name: "Operational Metrics",
      category: "operational",
      metrics: [
        {
          name: "Production Efficiency",
          value: 87.3,
          target: 90.0,
          unit: "%",
          trend: 2.1,
          status: "below-target",
          sparklineData: [85.1, 85.8, 86.2, 86.9, 87.0, 87.3],
        },
        {
          name: "Order Fulfillment Time",
          value: 2.4,
          target: 2.0,
          unit: "days",
          trend: -8.5,
          status: "above-target",
          sparklineData: [2.8, 2.7, 2.6, 2.5, 2.4, 2.4],
        },
        {
          name: "Quality Score",
          value: 94.8,
          target: 95.0,
          unit: "%",
          trend: 0.5,
          status: "on-target",
          sparklineData: [94.2, 94.4, 94.6, 94.7, 94.8, 94.8],
        },
      ],
      lastUpdated: new Date("2024-01-20T15:25:00"),
      refreshRate: "hourly",
      owner: "Operations Team",
    },
    {
      id: "customer-dashboard",
      name: "Customer Analytics",
      category: "customer",
      metrics: [
        {
          name: "Customer Satisfaction",
          value: 4.2,
          target: 4.5,
          unit: "/5",
          trend: 3.1,
          status: "below-target",
          sparklineData: [4.0, 4.1, 4.1, 4.2, 4.2, 4.2],
        },
        {
          name: "Churn Rate",
          value: 2.8,
          target: 3.0,
          unit: "%",
          trend: -12.5,
          status: "above-target",
          sparklineData: [3.2, 3.1, 3.0, 2.9, 2.8, 2.8],
        },
        {
          name: "Net Promoter Score",
          value: 72,
          target: 70,
          unit: "",
          trend: 8.2,
          status: "above-target",
          sparklineData: [65, 67, 69, 70, 71, 72],
        },
      ],
      lastUpdated: new Date("2024-01-20T14:45:00"),
      refreshRate: "daily",
      owner: "Customer Success",
    },
  ]);

  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "crm-salesforce",
      name: "Salesforce CRM",
      type: "cloud-service",
      status: "connected",
      lastSync: new Date("2024-01-20T15:30:00"),
      recordCount: 2847592,
      healthScore: 98.5,
      latency: 120,
    },
    {
      id: "erp-sap",
      name: "SAP ERP System",
      type: "database",
      status: "connected",
      lastSync: new Date("2024-01-20T15:28:00"),
      recordCount: 5629384,
      healthScore: 94.2,
      latency: 280,
    },
    {
      id: "marketing-hubspot",
      name: "HubSpot Marketing",
      type: "api",
      status: "syncing",
      lastSync: new Date("2024-01-20T15:25:00"),
      recordCount: 892745,
      healthScore: 91.7,
      latency: 95,
    },
    {
      id: "finance-quickbooks",
      name: "QuickBooks Financial",
      type: "api",
      status: "error",
      lastSync: new Date("2024-01-20T14:30:00"),
      recordCount: 245892,
      healthScore: 67.3,
      latency: 450,
    },
    {
      id: "hr-workday",
      name: "Workday HR",
      type: "cloud-service",
      status: "connected",
      lastSync: new Date("2024-01-20T15:20:00"),
      recordCount: 23847,
      healthScore: 96.8,
      latency: 150,
    },
  ]);

  const [reports, setReports] = useState<Report[]>([
    {
      id: "monthly-exec",
      title: "Monthly Executive Summary",
      description: "Comprehensive monthly performance report for C-suite",
      category: "executive",
      format: "pdf",
      schedule: "monthly",
      recipients: ["CEO", "CFO", "COO", "Board Members"],
      lastGenerated: new Date("2024-01-01T09:00:00"),
      status: "active",
    },
    {
      id: "weekly-ops",
      title: "Weekly Operations Report",
      description: "Operational KPIs and performance metrics",
      category: "operational",
      format: "dashboard",
      schedule: "weekly",
      recipients: ["Operations Manager", "VPs"],
      lastGenerated: new Date("2024-01-15T08:00:00"),
      status: "active",
    },
    {
      id: "daily-sales",
      title: "Daily Sales Dashboard",
      description: "Real-time sales performance and pipeline updates",
      category: "operational",
      format: "dashboard",
      schedule: "daily",
      recipients: ["Sales Team", "Sales Director"],
      lastGenerated: new Date("2024-01-20T07:00:00"),
      status: "active",
    },
    {
      id: "compliance-quarterly",
      title: "Quarterly Compliance Report",
      description: "Regulatory compliance status and audit preparation",
      category: "compliance",
      format: "pdf",
      schedule: "quarterly",
      recipients: ["Compliance Officer", "Legal Team", "Auditors"],
      lastGenerated: new Date("2024-01-01T12:00:00"),
      status: "active",
    },
  ]);

  const [insights, setInsights] = useState<Insight[]>([
    {
      id: "insight-001",
      title: "Customer Acquisition Cost Optimization",
      description:
        "Marketing spend efficiency has improved 15% in Q1, suggesting optimal channel allocation",
      type: "trend",
      importance: "high",
      confidence: 92.5,
      impact: "Potential $180K annual savings",
      actionable: true,
      metrics: ["Customer Acquisition Cost", "Marketing ROI"],
      generatedAt: new Date("2024-01-20T14:30:00"),
    },
    {
      id: "insight-002",
      title: "Supply Chain Bottleneck Prediction",
      description:
        "Historical patterns suggest 67% probability of supplier delays in March 2024",
      type: "prediction",
      importance: "high",
      confidence: 78.3,
      impact: "3-5 day delivery delays",
      actionable: true,
      metrics: ["Supplier Performance", "Inventory Levels"],
      generatedAt: new Date("2024-01-20T13:15:00"),
    },
    {
      id: "insight-003",
      title: "Revenue Growth Correlation",
      description:
        "Strong correlation (0.87) between customer training completion and revenue per account",
      type: "correlation",
      importance: "medium",
      confidence: 89.1,
      impact: "12% revenue increase potential",
      actionable: true,
      metrics: ["Training Completion", "Revenue per Customer"],
      generatedAt: new Date("2024-01-20T12:00:00"),
    },
    {
      id: "insight-004",
      title: "Anomalous User Behavior Pattern",
      description:
        "Unusual spike in API calls from specific user segment detected",
      type: "anomaly",
      importance: "medium",
      confidence: 85.7,
      impact: "Potential system performance impact",
      actionable: true,
      metrics: ["API Usage", "User Activity"],
      generatedAt: new Date("2024-01-20T11:30:00"),
    },
  ]);

  useEffect(() => {
    loadBIData();
  }, [selectedCategory, selectedTimeframe]);

  const loadBIData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real implementation, fetch BI data based on filters
    } catch (error) {
      console.error("Failed to load BI data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
      case "above-target":
        return "text-green-600";
      case "syncing":
      case "on-target":
        return "text-blue-600";
      case "below-target":
      case "draft":
        return "text-yellow-600";
      case "error":
      case "disconnected":
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
      case "active":
      case "above-target":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "syncing":
      case "on-target":
        return <Activity className="h-4 w-4 text-blue-600" />;
      case "below-target":
      case "draft":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error":
      case "disconnected":
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* BI Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">
                {dataSources.filter((ds) => ds.status === "connected").length}
              </div>
              <div className="flex items-center text-green-600">
                <Database className="h-4 w-4 mr-1" />
                <span className="text-sm">Connected</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {dataSources.length} total sources
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Dashboards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                {kpiDashboards.length}
              </div>
              <div className="flex items-center text-blue-600">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span className="text-sm">Live</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Real-time monitoring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-600">
                {insights.filter((i) => i.importance === "high").length}
              </div>
              <div className="flex items-center text-purple-600">
                <Brain className="h-4 w-4 mr-1" />
                <span className="text-sm">High Priority</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {insights.length} total insights
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Report Automation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-orange-600">
                {reports.filter((r) => r.status === "active").length}
              </div>
              <div className="flex items-center text-orange-600">
                <FileText className="h-4 w-4 mr-1" />
                <span className="text-sm">Automated</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Scheduled reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Executive KPI Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Executive KPI Summary</span>
          </CardTitle>
          <CardDescription>
            Key performance indicators across all business units
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {kpiDashboards.map((dashboard) => (
              <div key={dashboard.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{dashboard.name}</h4>
                  <Badge variant="outline">{dashboard.category}</Badge>
                </div>
                {dashboard.metrics.map((metric, index) => (
                  <div key={index} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <div className="flex items-center space-x-1">
                        {metric.trend >= 0 ? (
                          <ArrowUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-600" />
                        )}
                        <span
                          className={`text-xs ${metric.trend >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {Math.abs(metric.trend)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">
                          {metric.unit === "$"
                            ? formatCurrency(metric.value)
                            : `${metric.value}${metric.unit}`}
                        </div>
                        <div className="text-xs text-slate-600">
                          Target:{" "}
                          {metric.unit === "$"
                            ? formatCurrency(metric.target)
                            : `${metric.target}${metric.unit}`}
                        </div>
                      </div>
                      <Badge
                        variant={
                          metric.status === "above-target"
                            ? "default"
                            : metric.status === "on-target"
                              ? "secondary"
                              : metric.status === "below-target"
                                ? "outline"
                                : "destructive"
                        }
                        className="text-xs"
                      >
                        {metric.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Sources Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-green-600" />
            <span>Data Sources Health</span>
          </CardTitle>
          <CardDescription>
            Real-time status of all integrated data sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {dataSources.map((source) => (
              <div
                key={source.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(source.status)}
                  <div>
                    <h4 className="font-semibold">{source.name}</h4>
                    <p className="text-sm text-slate-600">
                      {source.recordCount.toLocaleString()} records •{" "}
                      {source.type}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">
                    {source.healthScore}%
                  </div>
                  <div className="text-xs text-slate-600">
                    {source.latency}ms latency
                  </div>
                  <div className="text-xs text-slate-600">
                    Last sync: {source.lastSync.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI-Generated Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <span>AI-Generated Insights</span>
          </CardTitle>
          <CardDescription>
            Intelligent analysis and recommendations from your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${getImportanceColor(insight.importance)}`}
                    ></div>
                    <h4 className="font-semibold">{insight.title}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      variant={
                        insight.type === "prediction"
                          ? "default"
                          : insight.type === "trend"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {insight.type}
                    </Badge>
                    <Badge variant="outline">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  {insight.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-slate-500">Impact:</span>
                    <span className="font-medium ml-1">{insight.impact}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" disabled={!insight.actionable}>
                      <PlayCircle className="h-3 w-3 mr-1" />
                      Take Action
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboardsTab = () => (
    <div className="space-y-6">
      {kpiDashboards.map((dashboard) => (
        <Card key={dashboard.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <span>{dashboard.name}</span>
                </CardTitle>
                <CardDescription>
                  Owner: {dashboard.owner} • Refresh Rate:{" "}
                  {dashboard.refreshRate}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Badge variant="outline">{dashboard.category}</Badge>
                <Button size="sm" variant="outline">
                  <Settings className="h-3 w-3 mr-1" />
                  Configure
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboard.metrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">
                          {metric.unit === "$"
                            ? formatCurrency(metric.value)
                            : `${metric.value}${metric.unit}`}
                        </div>
                        <div className="flex items-center space-x-1">
                          {metric.trend >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span
                            className={`text-sm ${metric.trend >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {Math.abs(metric.trend)}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">
                          Target:{" "}
                          {metric.unit === "$"
                            ? formatCurrency(metric.target)
                            : `${metric.target}${metric.unit}`}
                        </span>
                        <Badge
                          variant={
                            metric.status === "above-target"
                              ? "default"
                              : metric.status === "on-target"
                                ? "secondary"
                                : metric.status === "below-target"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {metric.status.replace("-", " ")}
                        </Badge>
                      </div>

                      <Progress
                        value={(metric.value / metric.target) * 100}
                        className="h-2"
                      />

                      <div className="h-16 bg-slate-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Activity className="h-6 w-6 text-slate-400 mx-auto mb-1" />
                          <p className="text-xs text-slate-500">
                            Sparkline chart
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button>
                <Eye className="h-4 w-4 mr-2" />
                View Full Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Automated Reports</span>
          </CardTitle>
          <CardDescription>
            Scheduled reports and analytics delivery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Report</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Format</th>
                  <th className="text-left p-3">Schedule</th>
                  <th className="text-left p-3">Recipients</th>
                  <th className="text-left p-3">Last Generated</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      <div>
                        <span className="font-medium">{report.title}</span>
                        <p className="text-xs text-slate-600">
                          {report.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{report.category}</Badge>
                    </td>
                    <td className="p-3">{report.format}</td>
                    <td className="p-3">{report.schedule}</td>
                    <td className="p-3">
                      <div className="text-xs">
                        {report.recipients
                          .slice(0, 2)
                          .map((recipient, index) => (
                            <div key={index}>{recipient}</div>
                          ))}
                        {report.recipients.length > 2 && (
                          <div className="text-slate-500">
                            +{report.recipients.length - 2} more
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      {report.lastGenerated.toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          report.status === "active"
                            ? "default"
                            : report.status === "draft"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {report.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
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

      {/* Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Report Generation</CardTitle>
            <CardDescription>
              Generate on-demand reports and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Executive Summary Report",
                "Financial Performance Analysis",
                "Operational Metrics Report",
                "Customer Analytics Report",
                "Sales Pipeline Report",
                "Compliance Status Report",
              ].map((reportType, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <span className="font-medium">{reportType}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Analytics</CardTitle>
            <CardDescription>Usage and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">
                  Reports Generated This Month
                </span>
                <span className="text-lg font-bold text-blue-600">127</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">
                  Average Generation Time
                </span>
                <span className="text-lg font-bold text-green-600">2.3s</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">
                  Most Requested Report
                </span>
                <span className="text-lg font-bold text-purple-600">
                  Executive Summary
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium">
                  Automation Success Rate
                </span>
                <span className="text-lg font-bold text-green-600">99.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Advanced Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends Analysis</CardTitle>
            <CardDescription>
              Multi-dimensional revenue analysis with predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">
                  Advanced revenue analytics would display here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Segmentation</CardTitle>
            <CardDescription>
              AI-powered customer behavior analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">
                  Customer segmentation chart would display here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>Predictive Analytics</span>
          </CardTitle>
          <CardDescription>
            AI-powered forecasting and trend analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Revenue Forecast",
                current: "$12.45M",
                predicted: "$14.8M",
                confidence: "89%",
                timeframe: "Next Quarter",
                trend: "up",
              },
              {
                title: "Customer Churn Risk",
                current: "2.8%",
                predicted: "2.1%",
                confidence: "92%",
                timeframe: "Next Month",
                trend: "down",
              },
              {
                title: "Market Demand",
                current: "High",
                predicted: "Very High",
                confidence: "76%",
                timeframe: "Next 6 Months",
                trend: "up",
              },
            ].map((prediction, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{prediction.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Current:</span>
                      <span className="font-semibold">
                        {prediction.current}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Predicted:</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold">
                          {prediction.predicted}
                        </span>
                        {prediction.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        Confidence:
                      </span>
                      <Badge variant="outline">{prediction.confidence}</Badge>
                    </div>
                    <div className="text-xs text-slate-500 text-center">
                      {prediction.timeframe}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-green-600" />
            <span>Data Quality & Governance</span>
          </CardTitle>
          <CardDescription>
            Data integrity and quality monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Data Quality Scores</h4>
              {[
                { source: "Salesforce CRM", quality: 98.5, issues: 12 },
                { source: "SAP ERP", quality: 94.2, issues: 34 },
                { source: "HubSpot Marketing", quality: 91.7, issues: 28 },
                { source: "QuickBooks Financial", quality: 87.3, issues: 56 },
                { source: "Workday HR", quality: 96.8, issues: 8 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-sm">{item.source}</span>
                    <p className="text-xs text-slate-600">
                      {item.issues} data quality issues
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">
                      {item.quality}%
                    </div>
                    <Progress value={item.quality} className="w-16 h-1 mt-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Governance Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-lg font-bold text-green-600">99.1%</div>
                  <div className="text-xs text-green-700">
                    Data Lineage Tracked
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-600">94.7%</div>
                  <div className="text-xs text-blue-700">Schema Compliance</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-lg font-bold text-purple-600">87.3%</div>
                  <div className="text-xs text-purple-700">
                    Data Catalog Coverage
                  </div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-lg font-bold text-orange-600">92.1%</div>
                  <div className="text-xs text-orange-700">
                    Privacy Compliance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <EnhancedNavigation />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-2">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                  <span>Business Intelligence Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Advanced analytics, reporting, and AI-powered business
                  insights
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedTimeframe}
                  onValueChange={setSelectedTimeframe}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 3 Months</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={loadBIData}
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
              <TabsTrigger value="overview">BI Overview</TabsTrigger>
              <TabsTrigger value="dashboards">Live Dashboards</TabsTrigger>
              <TabsTrigger value="reports">Reports & Automation</TabsTrigger>
              <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">{renderOverviewTab()}</TabsContent>
            <TabsContent value="dashboards">
              {renderDashboardsTab()}
            </TabsContent>
            <TabsContent value="reports">{renderReportsTab()}</TabsContent>
            <TabsContent value="analytics">{renderAnalyticsTab()}</TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default BusinessIntelligence;
