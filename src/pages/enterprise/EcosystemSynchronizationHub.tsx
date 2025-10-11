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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEnterpriseTier } from "@/hooks/useEnterpriseTier";
import { TierRestriction } from "@/components/enterprise/TierRestriction";
import {
  Network,
  Zap,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Users,
  Package,
  Truck,
  Factory,
  Globe,
  Database,
  Activity,
  TrendingUp,
  TrendingDown,
  Eye,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Filter,
  Search,
  Bell,
  Shield,
  Calendar,
  ArrowRight,
  ArrowLeft,
  CircleDot,
} from "lucide-react";

interface SyncMetrics {
  totalConnections: number;
  activeSync: number;
  dataPointsProcessed: number;
  syncSuccess: number;
  avgLatency: number;
  errorRate: number;
  throughput: number;
}

interface Connection {
  id: string;
  name: string;
  source: "retailer" | "supplier" | "logistics";
  target: "retailer" | "supplier" | "logistics";
  type: "real-time" | "batch" | "event-driven";
  status: "active" | "paused" | "error" | "syncing";
  dataFlow: string;
  lastSync: string;
  successRate: number;
  volume: number;
  latency: number;
}

interface DataFlow {
  id: string;
  name: string;
  description: string;
  stakeholders: string[];
  frequency: string;
  status: "running" | "stopped" | "error";
  lastRun: string;
  recordsProcessed: number;
  accuracy: number;
}

interface Alert {
  id: string;
  type: "error" | "warning" | "info";
  title: string;
  message: string;
  timestamp: string;
  source: string;
  resolved: boolean;
}

interface EcosystemMetric {
  stakeholder: string;
  orders: number;
  revenue: number;
  satisfaction: number;
  efficiency: number;
  trend: "up" | "down" | "stable";
}

const EcosystemSynchronizationHub: React.FC = () => {
  const { currentTier, hasAccess } = useEnterpriseTier();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [metrics, setMetrics] = useState<SyncMetrics>({
    totalConnections: 24,
    activeSync: 18,
    dataPointsProcessed: 1234567,
    syncSuccess: 98.7,
    avgLatency: 120,
    errorRate: 1.3,
    throughput: 2400,
  });

  const [connections, setConnections] = useState<Connection[]>([
    {
      id: "CONN001",
      name: "Retailer Orders → Supplier System",
      source: "retailer",
      target: "supplier",
      type: "real-time",
      status: "active",
      dataFlow: "Order placement, inventory updates",
      lastSync: "2 minutes ago",
      successRate: 99.2,
      volume: 1250,
      latency: 85,
    },
    {
      id: "CONN002",
      name: "Supplier Inventory → Logistics Hub",
      source: "supplier",
      target: "logistics",
      type: "batch",
      status: "syncing",
      dataFlow: "Stock levels, delivery schedules",
      lastSync: "15 minutes ago",
      successRate: 97.8,
      volume: 890,
      latency: 150,
    },
    {
      id: "CONN003",
      name: "Logistics Tracking → Retailer Dashboard",
      source: "logistics",
      target: "retailer",
      type: "event-driven",
      status: "active",
      dataFlow: "Delivery status, ETA updates",
      lastSync: "1 minute ago",
      successRate: 98.9,
      volume: 2100,
      latency: 45,
    },
    {
      id: "CONN004",
      name: "Cross-Platform Analytics Sync",
      source: "retailer",
      target: "supplier",
      type: "batch",
      status: "error",
      dataFlow: "Sales data, demand forecasting",
      lastSync: "2 hours ago",
      successRate: 94.5,
      volume: 560,
      latency: 300,
    },
  ]);

  const [dataFlows, setDataFlows] = useState<DataFlow[]>([
    {
      id: "FLOW001",
      name: "Order-to-Delivery Pipeline",
      description:
        "End-to-end order processing from retailer to customer delivery",
      stakeholders: ["Retailer", "Supplier", "Logistics"],
      frequency: "Real-time",
      status: "running",
      lastRun: "2 minutes ago",
      recordsProcessed: 1547,
      accuracy: 99.1,
    },
    {
      id: "FLOW002",
      name: "Inventory Synchronization",
      description: "Multi-platform inventory level synchronization",
      stakeholders: ["Retailer", "Supplier"],
      frequency: "Every 15 minutes",
      status: "running",
      lastRun: "8 minutes ago",
      recordsProcessed: 892,
      accuracy: 97.6,
    },
    {
      id: "FLOW003",
      name: "Financial Reconciliation",
      description: "Cross-platform payment and settlement sync",
      stakeholders: ["Retailer", "Supplier", "Logistics"],
      frequency: "Daily",
      status: "stopped",
      lastRun: "6 hours ago",
      recordsProcessed: 234,
      accuracy: 100.0,
    },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "ALT001",
      type: "error",
      title: "Connection Timeout",
      message: "Cross-Platform Analytics Sync has been failing for 2 hours",
      timestamp: "2 hours ago",
      source: "CONN004",
      resolved: false,
    },
    {
      id: "ALT002",
      type: "warning",
      title: "High Latency Detected",
      message: "Supplier Inventory sync latency exceeded threshold (300ms)",
      timestamp: "45 minutes ago",
      source: "CONN002",
      resolved: false,
    },
    {
      id: "ALT003",
      type: "info",
      title: "Maintenance Window",
      message: "Scheduled maintenance for Financial Reconciliation flow",
      timestamp: "6 hours ago",
      source: "FLOW003",
      resolved: true,
    },
  ]);

  const [ecosystemMetrics, setEcosystemMetrics] = useState<EcosystemMetric[]>([
    {
      stakeholder: "Retailers",
      orders: 1247,
      revenue: 2400000,
      satisfaction: 94.2,
      efficiency: 87.5,
      trend: "up",
    },
    {
      stakeholder: "Suppliers",
      orders: 892,
      revenue: 1800000,
      satisfaction: 91.8,
      efficiency: 92.1,
      trend: "up",
    },
    {
      stakeholder: "Logistics",
      orders: 1156,
      revenue: 450000,
      satisfaction: 88.9,
      efficiency: 85.3,
      trend: "stable",
    },
  ]);

  if (!hasAccess("ecosystem")) {
    return (
      <TierRestriction
        title="Ecosystem Synchronization Hub"
        description="Unified data flow management across retailers, suppliers, and logistics"
        requiredTier="platinum"
        currentTier={currentTier}
        features={[
          "Real-time cross-platform synchronization",
          "Advanced data flow orchestration",
          "Unified ecosystem analytics",
          "Automated conflict resolution",
          "Performance monitoring & alerts",
        ]}
        benefits={[
          "Eliminate data silos across platforms",
          "Reduce manual data entry by 90%",
          "Improve decision-making accuracy",
          "Enhance stakeholder collaboration",
        ]}
      />
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "running":
        return "bg-green-100 text-green-800";
      case "syncing":
        return "bg-blue-100 text-blue-800";
      case "paused":
      case "stopped":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "real-time":
        return "bg-purple-100 text-purple-800";
      case "batch":
        return "bg-blue-100 text-blue-800";
      case "event-driven":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStakeholderIcon = (stakeholder: string) => {
    switch (stakeholder.toLowerCase()) {
      case "retailer":
      case "retailers":
        return <Users className="h-4 w-4" />;
      case "supplier":
      case "suppliers":
        return <Factory className="h-4 w-4" />;
      case "logistics":
        return <Truck className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <CircleDot className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Network className="h-8 w-8 text-blue-600" />
              Ecosystem Synchronization Hub
            </h1>
            <p className="text-gray-600 mt-1">
              Real-time data orchestration across retailers, suppliers, and
              logistics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24H</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? "bg-green-50" : ""}
            >
              {autoRefresh ? (
                <Pause className="h-4 w-4 mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Auto Refresh
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Connections
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.totalConnections}
                  </p>
                </div>
                <Network className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-gray-600">
                  {metrics.activeSync} active
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Data Points
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(metrics.dataPointsProcessed / 1000000).toFixed(1)}M
                  </p>
                </div>
                <Database className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">
                  +{metrics.throughput}/min
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Success Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.syncSuccess}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2">
                <Progress value={metrics.syncSuccess} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Latency
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.avgLatency}ms
                  </p>
                </div>
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-gray-600">
                  Error rate: {metrics.errorRate}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts */}
        {alerts.filter((alert) => !alert.resolved).length > 0 && (
          <div className="space-y-2">
            {alerts
              .filter((alert) => !alert.resolved)
              .map((alert) => (
                <Alert key={alert.id} className={getAlertColor(alert.type)}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="flex items-center justify-between">
                    {alert.title}
                    <Badge variant="outline" className="text-xs">
                      {alert.timestamp}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
              ))}
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="dataflows">Data Flows</TabsTrigger>
            <TabsTrigger value="ecosystem">Ecosystem Health</TabsTrigger>
          </TabsList>

          {/* System Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Real-time Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Order Sync Completed</p>
                          <p className="text-sm text-gray-600">
                            Retailer → Supplier
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                        <div>
                          <p className="font-medium">Inventory Update</p>
                          <p className="text-sm text-gray-600">
                            Processing 892 records
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5 text-orange-600" />
                        <div>
                          <p className="font-medium">Delivery Status Update</p>
                          <p className="text-sm text-gray-600">
                            Logistics → Retailer
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">1 min ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Throughput</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {metrics.throughput}
                      </p>
                      <p className="text-xs text-gray-500">records/min</p>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Avg Latency</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {metrics.avgLatency}
                      </p>
                      <p className="text-xs text-gray-500">milliseconds</p>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold text-green-600">
                        {metrics.syncSuccess}%
                      </p>
                      <p className="text-xs text-gray-500">last 24h</p>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Error Rate</p>
                      <p className="text-2xl font-bold text-red-600">
                        {metrics.errorRate}%
                      </p>
                      <p className="text-xs text-gray-500">last 24h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Connections */}
          <TabsContent value="connections" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Connections</h2>
              <Button>
                <Network className="h-4 w-4 mr-2" />
                New Connection
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Connection</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Latency</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {connections.map((connection) => (
                      <TableRow key={connection.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{connection.name}</p>
                            <p className="text-sm text-gray-600">
                              {connection.dataFlow}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(connection.type)}>
                            {connection.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(connection.status)}>
                            {connection.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{connection.successRate}%</span>
                            <Progress
                              value={connection.successRate}
                              className="w-16 h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {connection.volume.toLocaleString()}
                        </TableCell>
                        <TableCell>{connection.latency}ms</TableCell>
                        <TableCell>{connection.lastSync}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Flows */}
          <TabsContent value="dataflows" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Data Flow Orchestration</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Flow
              </Button>
            </div>

            <div className="grid gap-4">
              {dataFlows.map((flow) => (
                <Card key={flow.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Database className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{flow.name}</h3>
                          <p className="text-gray-600">{flow.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm text-gray-600">
                              Stakeholders:
                            </span>
                            <div className="flex gap-1">
                              {flow.stakeholders.map((stakeholder, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {getStakeholderIcon(stakeholder)}
                                  <span className="ml-1">{stakeholder}</span>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Status</p>
                          <Badge className={getStatusColor(flow.status)}>
                            {flow.status}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Frequency</p>
                          <p className="font-semibold">{flow.frequency}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Records</p>
                          <p className="font-semibold">
                            {flow.recordsProcessed.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Accuracy</p>
                          <p className="font-semibold text-green-600">
                            {flow.accuracy}%
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Monitor
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Ecosystem Health */}
          <TabsContent value="ecosystem" className="space-y-4">
            <h2 className="text-xl font-semibold">
              Ecosystem Health Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ecosystemMetrics.map((metric) => (
                <Card key={metric.stakeholder}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStakeholderIcon(metric.stakeholder)}
                        {metric.stakeholder}
                      </div>
                      {getTrendIcon(metric.trend)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Orders</p>
                        <p className="text-xl font-bold text-blue-600">
                          {metric.orders.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="text-xl font-bold text-green-600">
                          KSh {(metric.revenue / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Satisfaction</span>
                          <span className="text-sm font-semibold">
                            {metric.satisfaction}%
                          </span>
                        </div>
                        <Progress value={metric.satisfaction} />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Efficiency</span>
                          <span className="text-sm font-semibold">
                            {metric.efficiency}%
                          </span>
                        </div>
                        <Progress value={metric.efficiency} />
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Cross-Platform Synchronization Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold">
                          Order Processing Pipeline
                        </p>
                        <p className="text-sm text-gray-600">
                          All stakeholders synchronized
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Healthy
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                      <div>
                        <p className="font-semibold">
                          Inventory Synchronization
                        </p>
                        <p className="text-sm text-gray-600">
                          Minor delays in batch processing
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Warning
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-semibold">
                          Financial Reconciliation
                        </p>
                        <p className="text-sm text-gray-600">
                          Scheduled maintenance window active
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      Maintenance
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EcosystemSynchronizationHub;
