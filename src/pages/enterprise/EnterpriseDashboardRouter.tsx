import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { serviceManager } from "@/services/ServiceManager";
import { DASHBOARD_MODULES } from "@/config/microservices";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import {
  Crown,
  BarChart3,
  DollarSign,
  Network,
  Shield,
  Zap,
  Settings,
  Users,
  Globe,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Rocket,
  Target,
  TrendingUp,
  Eye,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

interface DashboardStatus {
  moduleId: string;
  name: string;
  status: "active" | "loading" | "error" | "maintenance";
  healthScore: number;
  lastUpdate: Date;
  activeUsers: number;
  criticalAlerts: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  priority: "high" | "medium" | "low";
  estimatedTime: string;
}

const EnterpriseDashboardRouter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [systemHealth, setSystemHealth] = useState<any>(null);

  const [dashboardStatuses, setDashboardStatuses] = useState<DashboardStatus[]>(
    [
      {
        moduleId: "EXECUTIVE_OVERVIEW",
        name: "Executive Command Center",
        status: "active",
        healthScore: 98.5,
        lastUpdate: new Date(),
        activeUsers: 12,
        criticalAlerts: 1,
      },
      {
        moduleId: "REVENUE_OPERATIONS",
        name: "Revenue Operations",
        status: "active",
        healthScore: 97.2,
        lastUpdate: new Date(),
        activeUsers: 34,
        criticalAlerts: 0,
      },
      {
        moduleId: "SUPPLY_CHAIN_COMMAND",
        name: "Supply Chain Command",
        status: "active",
        healthScore: 95.8,
        lastUpdate: new Date(),
        activeUsers: 89,
        criticalAlerts: 2,
      },
      {
        moduleId: "OPERATIONAL_EXCELLENCE",
        name: "Operational Excellence",
        status: "loading",
        healthScore: 0,
        lastUpdate: new Date(),
        activeUsers: 0,
        criticalAlerts: 0,
      },
      {
        moduleId: "FINANCIAL_CONTROL",
        name: "Financial Control Center",
        status: "active",
        healthScore: 96.1,
        lastUpdate: new Date(),
        activeUsers: 23,
        criticalAlerts: 1,
      },
      {
        moduleId: "COMPLIANCE_GOVERNANCE",
        name: "Compliance & Governance",
        status: "active",
        healthScore: 99.2,
        lastUpdate: new Date(),
        activeUsers: 15,
        criticalAlerts: 0,
      },
      {
        moduleId: "SECURITY_OPERATIONS",
        name: "Security Operations Center",
        status: "active",
        healthScore: 94.7,
        lastUpdate: new Date(),
        activeUsers: 8,
        criticalAlerts: 3,
      },
      {
        moduleId: "AI_INTELLIGENCE",
        name: "AI Intelligence Hub",
        status: "active",
        healthScore: 97.9,
        lastUpdate: new Date(),
        activeUsers: 45,
        criticalAlerts: 0,
      },
      {
        moduleId: "INTEGRATION_MANAGEMENT",
        name: "Integration Management",
        status: "active",
        healthScore: 93.4,
        lastUpdate: new Date(),
        activeUsers: 67,
        criticalAlerts: 1,
      },
      {
        moduleId: "BUSINESS_INTELLIGENCE",
        name: "Business Intelligence",
        status: "active",
        healthScore: 98.8,
        lastUpdate: new Date(),
        activeUsers: 156,
        criticalAlerts: 0,
      },
    ],
  );

  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    {
      id: "revenue-forecast",
      title: "Review Q2 Revenue Forecast",
      description:
        "Analyze projected revenue and identify optimization opportunities",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      route: "/enterprise/revenue-operations",
      priority: "high",
      estimatedTime: "15 min",
    },
    {
      id: "supply-chain-alerts",
      title: "Address Supply Chain Alerts",
      description: "2 critical alerts requiring immediate attention",
      icon: <Network className="h-5 w-5 text-red-600" />,
      route: "/enterprise/supply-chain-command",
      priority: "high",
      estimatedTime: "30 min",
    },
    {
      id: "security-review",
      title: "Weekly Security Review",
      description: "Review security incidents and compliance status",
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      route: "/enterprise/security-operations",
      priority: "medium",
      estimatedTime: "20 min",
    },
    {
      id: "ai-insights",
      title: "Review AI Recommendations",
      description: "New predictive insights available for decision making",
      icon: <Zap className="h-5 w-5 text-purple-600" />,
      route: "/enterprise/ai-intelligence",
      priority: "medium",
      estimatedTime: "10 min",
    },
  ]);

  useEffect(() => {
    loadSystemHealth();
    const interval = setInterval(loadSystemHealth, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const loadSystemHealth = async () => {
    setLoading(true);
    try {
      const health = await serviceManager.getSystemHealth();
      setSystemHealth(health);
    } catch (error) {
      console.error("Failed to load system health:", error);
    } finally {
      setLoading(false);
    }
  };

  const getModuleIcon = (moduleId: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      EXECUTIVE_OVERVIEW: <Crown className="h-6 w-6 text-yellow-600" />,
      REVENUE_OPERATIONS: <DollarSign className="h-6 w-6 text-green-600" />,
      SUPPLY_CHAIN_COMMAND: <Network className="h-6 w-6 text-blue-600" />,
      OPERATIONAL_EXCELLENCE: <Target className="h-6 w-6 text-purple-600" />,
      FINANCIAL_CONTROL: <BarChart3 className="h-6 w-6 text-orange-600" />,
      COMPLIANCE_GOVERNANCE: <Shield className="h-6 w-6 text-red-600" />,
      SECURITY_OPERATIONS: <Shield className="h-6 w-6 text-gray-600" />,
      AI_INTELLIGENCE: <Zap className="h-6 w-6 text-purple-600" />,
      INTEGRATION_MANAGEMENT: <Database className="h-6 w-6 text-blue-600" />,
      BUSINESS_INTELLIGENCE: <BarChart3 className="h-6 w-6 text-green-600" />,
    };
    return iconMap[moduleId] || <Activity className="h-6 w-6 text-gray-600" />;
  };

  const getRouteForModule = (moduleId: string): string => {
    const module = DASHBOARD_MODULES[moduleId];
    return module?.route || "/enterprise";
  };

  const renderSystemOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                System Health
              </p>
              <p className="text-2xl font-bold text-green-600">
                {systemHealth?.overall === "healthy"
                  ? "98.5%"
                  : systemHealth?.overall === "degraded"
                    ? "87.2%"
                    : "45.8%"}
              </p>
              <p className="text-xs text-green-500 flex items-center mt-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                All systems operational
              </p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Active Modules
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {dashboardStatuses.filter((d) => d.status === "active").length}
              </p>
              <p className="text-xs text-blue-500 flex items-center mt-1">
                <Globe className="h-3 w-3 mr-1" />
                {dashboardStatuses.length} total modules
              </p>
            </div>
            <Database className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Users</p>
              <p className="text-2xl font-bold text-purple-600">
                {dashboardStatuses.reduce((sum, d) => sum + d.activeUsers, 0)}
              </p>
              <p className="text-xs text-purple-500 flex items-center mt-1">
                <Users className="h-3 w-3 mr-1" />
                Across all modules
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">
                Critical Alerts
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {dashboardStatuses.reduce(
                  (sum, d) => sum + d.criticalAlerts,
                  0,
                )}
              </p>
              <p className="text-xs text-orange-500 flex items-center mt-1">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Require attention
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboardModules = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardStatuses.map((dashboard) => {
        const moduleConfig = DASHBOARD_MODULES[dashboard.moduleId];
        return (
          <Card
            key={dashboard.moduleId}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => navigate(getRouteForModule(dashboard.moduleId))}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getModuleIcon(dashboard.moduleId)}
                  <div>
                    <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {moduleConfig?.description ||
                        "Enterprise dashboard module"}
                    </CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    dashboard.status === "active"
                      ? "default"
                      : dashboard.status === "loading"
                        ? "secondary"
                        : dashboard.status === "error"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {dashboard.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboard.status === "active" && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span>Health Score</span>
                      <span className="font-medium">
                        {dashboard.healthScore}%
                      </span>
                    </div>
                    <Progress value={dashboard.healthScore} className="h-2" />
                  </>
                )}

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-blue-600">
                      {dashboard.activeUsers}
                    </div>
                    <div className="text-xs text-slate-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-orange-600">
                      {dashboard.criticalAlerts}
                    </div>
                    <div className="text-xs text-slate-600">Alerts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">
                      {dashboard.lastUpdate.toLocaleTimeString().slice(0, 5)}
                    </div>
                    <div className="text-xs text-slate-600">Last Update</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    className="flex-1 mr-2"
                    disabled={dashboard.status !== "active"}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Open Dashboard
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderQuickActions = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Rocket className="h-5 w-5 text-blue-600" />
          <span>Quick Actions</span>
        </CardTitle>
        <CardDescription>
          Recommended actions based on current system status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {quickActions.map((action) => (
            <div
              key={action.id}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              onClick={() => navigate(action.route)}
            >
              <div className="flex items-center space-x-3">
                {action.icon}
                <div>
                  <h4 className="font-semibold text-sm">{action.title}</h4>
                  <p className="text-xs text-slate-600">{action.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    action.priority === "high"
                      ? "destructive"
                      : action.priority === "medium"
                        ? "outline"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {action.priority.toUpperCase()}
                </Badge>
                <span className="text-xs text-slate-500">
                  {action.estimatedTime}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderSystemAlerts = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <span>System Alerts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Supply Chain Disruption</AlertTitle>
            <AlertDescription>
              2 suppliers experiencing delays due to weather conditions.
              Estimated impact: 48-72 hour delivery delays.
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-200 bg-blue-50">
            <Clock className="h-4 w-4" />
            <AlertTitle>Scheduled Maintenance</AlertTitle>
            <AlertDescription>
              AI Intelligence Hub will undergo maintenance on Sunday 2:00-4:00
              AM UTC. No service interruption expected.
            </AlertDescription>
          </Alert>

          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Performance Improvement</AlertTitle>
            <AlertDescription>
              Revenue Operations dashboard now 23% faster with new
              optimizations. All features fully operational.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
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
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
                  <Crown className="h-8 w-8 text-yellow-600" />
                  <span>Enterprise Mission Control</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Unified command center for all enterprise operations and
                  intelligence
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={loadSystemHealth}
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh Status
                </Button>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </div>

          {/* System Overview */}
          {renderSystemOverview()}

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Enterprise Dashboard Modules
                </h2>
                {renderDashboardModules()}
              </div>
            </div>

            <div className="space-y-6">
              {renderQuickActions()}
              {renderSystemAlerts()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnterpriseDashboardRouter;
