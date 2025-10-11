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
  Crown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Globe,
  Target,
  Zap,
  Shield,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Phone,
  Mail,
  FileText,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Percent,
  Clock,
  Building,
  Briefcase,
  Lightbulb,
  Rocket,
  Gauge,
} from "lucide-react";

interface ExecutiveKPI {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "stable";
  target?: string;
  status: "excellent" | "good" | "warning" | "critical";
  description: string;
}

interface StrategicInitiative {
  id: string;
  name: string;
  progress: number;
  status: "on-track" | "at-risk" | "delayed" | "completed";
  budget: number;
  impact: "high" | "medium" | "low";
  timeline: string;
  owner: string;
}

interface MarketIntelligence {
  segment: string;
  growth: number;
  opportunity: string;
  threat: string;
  recommendation: string;
  priority: "high" | "medium" | "low";
}

const ExecutiveOverview: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("30d");
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Executive KPIs
  const [executiveKPIs, setExecutiveKPIs] = useState<ExecutiveKPI[]>([
    {
      id: "revenue",
      title: "Total Revenue",
      value: "$2.8M",
      change: 23.5,
      trend: "up",
      target: "$3.2M",
      status: "good",
      description: "Monthly recurring + consumption revenue",
    },
    {
      id: "growth",
      title: "Growth Rate",
      value: "47%",
      change: 12.3,
      trend: "up",
      target: "50%",
      status: "excellent",
      description: "Year-over-year revenue growth",
    },
    {
      id: "customers",
      title: "Enterprise Customers",
      value: "156",
      change: 8.7,
      trend: "up",
      target: "200",
      status: "good",
      description: "Active enterprise tier customers",
    },
    {
      id: "nps",
      title: "Net Promoter Score",
      value: "78",
      change: -2.1,
      trend: "down",
      target: "80",
      status: "warning",
      description: "Customer satisfaction metric",
    },
    {
      id: "churn",
      title: "Churn Rate",
      value: "2.1%",
      change: -0.5,
      trend: "up",
      target: "<2%",
      status: "warning",
      description: "Monthly customer churn rate",
    },
    {
      id: "ltv",
      title: "Customer LTV",
      value: "$847K",
      change: 15.2,
      trend: "up",
      target: "$1M",
      status: "excellent",
      description: "Average customer lifetime value",
    },
  ]);

  // Strategic Initiatives
  const [strategicInitiatives, setStrategicInitiatives] = useState<
    StrategicInitiative[]
  >([
    {
      id: "ai-expansion",
      name: "AI-Powered Supply Chain Optimization",
      progress: 67,
      status: "on-track",
      budget: 2500000,
      impact: "high",
      timeline: "Q2 2024",
      owner: "Sarah Chen - CTO",
    },
    {
      id: "market-expansion",
      name: "African Market Expansion",
      progress: 34,
      status: "at-risk",
      budget: 5000000,
      impact: "high",
      timeline: "Q3 2024",
      owner: "David Okonkwo - VP Growth",
    },
    {
      id: "compliance",
      name: "Global Compliance Framework",
      progress: 89,
      status: "on-track",
      budget: 800000,
      impact: "medium",
      timeline: "Q1 2024",
      owner: "Maria Santos - Chief Compliance Officer",
    },
    {
      id: "digital-twin",
      name: "Digital Twin Platform",
      progress: 45,
      status: "delayed",
      budget: 3200000,
      impact: "high",
      timeline: "Q4 2024",
      owner: "Michael Zhang - Head of Innovation",
    },
  ]);

  // Market Intelligence
  const [marketIntelligence, setMarketIntelligence] = useState<
    MarketIntelligence[]
  >([
    {
      segment: "Enterprise B2B Marketplaces",
      growth: 34.5,
      opportunity: "$850B global market by 2025",
      threat: "New AI-first competitors emerging",
      recommendation: "Accelerate AI integration and partnerships",
      priority: "high",
    },
    {
      segment: "African Digital Commerce",
      growth: 67.2,
      opportunity: "First-mover advantage in key markets",
      threat: "Regulatory uncertainty in some regions",
      recommendation: "Expand compliance team and local partnerships",
      priority: "high",
    },
    {
      segment: "Supply Chain Technology",
      growth: 28.9,
      opportunity: "Digital twin adoption accelerating",
      threat: "Traditional players developing alternatives",
      recommendation: "Patent key innovations and build ecosystem",
      priority: "medium",
    },
  ]);

  useEffect(() => {
    loadExecutiveData();
    const interval = setInterval(loadExecutiveData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [timeframe]);

  const loadExecutiveData = async () => {
    setLoading(true);
    try {
      const data = await serviceManager.getEnterpriseMetrics(timeframe);
      // Process and update state with real data
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Failed to load executive data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderExecutiveKPIs = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {executiveKPIs.map((kpi) => (
        <Card
          key={kpi.id}
          className={`relative overflow-hidden ${
            kpi.status === "excellent"
              ? "border-green-200 bg-green-50"
              : kpi.status === "good"
                ? "border-blue-200 bg-blue-50"
                : kpi.status === "warning"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-red-200 bg-red-50"
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-slate-600">
                {kpi.title}
              </CardTitle>
              <Badge
                variant={
                  kpi.status === "excellent"
                    ? "default"
                    : kpi.status === "good"
                      ? "secondary"
                      : kpi.status === "warning"
                        ? "outline"
                        : "destructive"
                }
              >
                {kpi.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">{kpi.value}</span>
                {kpi.target && (
                  <span className="text-sm text-slate-500">/ {kpi.target}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {kpi.trend === "up" ? (
                  <ArrowUp
                    className={`h-4 w-4 ${kpi.change > 0 ? "text-green-500" : "text-red-500"}`}
                  />
                ) : kpi.trend === "down" ? (
                  <ArrowDown
                    className={`h-4 w-4 ${kpi.change > 0 ? "text-red-500" : "text-green-500"}`}
                  />
                ) : (
                  <div className="w-4 h-4" />
                )}
                <span
                  className={`text-sm font-medium ${
                    Math.abs(kpi.change) > 5
                      ? "text-green-600"
                      : "text-slate-600"
                  }`}
                >
                  {kpi.change > 0 ? "+" : ""}
                  {kpi.change}%
                </span>
                <span className="text-xs text-slate-500">vs last month</span>
              </div>

              <p className="text-xs text-slate-600">{kpi.description}</p>

              {kpi.target && (
                <Progress
                  value={
                    (parseFloat(kpi.value.replace(/[^0-9.]/g, "")) /
                      parseFloat(kpi.target.replace(/[^0-9.]/g, ""))) *
                    100
                  }
                  className="h-2"
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderStrategicInitiatives = () => (
    <div className="space-y-4">
      {strategicInitiatives.map((initiative) => (
        <Card key={initiative.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{initiative.name}</CardTitle>
                <CardDescription>
                  Owner: {initiative.owner} • Timeline: {initiative.timeline}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    initiative.status === "on-track"
                      ? "default"
                      : initiative.status === "at-risk"
                        ? "outline"
                        : initiative.status === "delayed"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {initiative.status.replace("-", " ").toUpperCase()}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    initiative.impact === "high"
                      ? "border-red-300 text-red-700"
                      : initiative.impact === "medium"
                        ? "border-yellow-300 text-yellow-700"
                        : "border-green-300 text-green-700"
                  }
                >
                  {initiative.impact.toUpperCase()} IMPACT
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{initiative.progress}%</span>
              </div>
              <Progress value={initiative.progress} className="h-3" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Budget</span>
                  <div className="font-semibold">
                    ${(initiative.budget / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div>
                  <span className="text-slate-600">Status</span>
                  <div className="font-semibold capitalize">
                    {initiative.status.replace("-", " ")}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMarketIntelligence = () => (
    <div className="space-y-4">
      {marketIntelligence.map((intelligence, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {intelligence.segment}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-600">
                    +{intelligence.growth}% growth
                  </span>
                </div>
              </div>
              <Badge
                variant={
                  intelligence.priority === "high"
                    ? "destructive"
                    : intelligence.priority === "medium"
                      ? "outline"
                      : "secondary"
                }
              >
                {intelligence.priority.toUpperCase()} PRIORITY
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-green-700 mb-1">
                  Opportunity
                </h4>
                <p className="text-sm text-slate-600">
                  {intelligence.opportunity}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-1">
                  Threat
                </h4>
                <p className="text-sm text-slate-600">{intelligence.threat}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-700 mb-1">
                  Recommendation
                </h4>
                <p className="text-sm text-slate-600">
                  {intelligence.recommendation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderExecutiveAlerts = () => (
    <div className="space-y-3">
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Critical: Market Expansion at Risk</AlertTitle>
        <AlertDescription>
          African expansion timeline delayed due to regulatory challenges in 3
          key markets. Requires immediate C-level attention and legal
          escalation.
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-200 bg-yellow-50">
        <Clock className="h-4 w-4" />
        <AlertTitle>Attention: NPS Score Declining</AlertTitle>
        <AlertDescription>
          Customer satisfaction down 2.1% this month. Customer success team
          recommends executive customer calls and product roadmap review.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success: Revenue Target Exceeded</AlertTitle>
        <AlertDescription>
          Q1 revenue target exceeded by 23.5%. Enterprise customers showing
          strong adoption of premium features and add-ons.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-200 bg-blue-50">
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Opportunity: AI Integration ROI</AlertTitle>
        <AlertDescription>
          Early AI features showing 340% ROI. Recommend accelerating AI roadmap
          and increasing engineering allocation.
        </AlertDescription>
      </Alert>
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
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
                  <Crown className="h-8 w-8 text-yellow-600" />
                  <span>Executive Command Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Strategic oversight and C-level insights for enterprise
                  operations
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last quarter</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={loadExecutiveData}
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

            {/* Status Bar */}
            <div className="flex items-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span>All Systems Operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Last Updated: {lastUpdate.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>156 Enterprise Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>23 Countries</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Strategic Overview</TabsTrigger>
              <TabsTrigger value="initiatives">Key Initiatives</TabsTrigger>
              <TabsTrigger value="intelligence">
                Market Intelligence
              </TabsTrigger>
              <TabsTrigger value="alerts">Executive Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Executive KPIs</h2>
                  {renderExecutiveKPIs()}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Trajectory</CardTitle>
                      <CardDescription>
                        Monthly revenue growth and projections
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-600">Revenue growth chart</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Growth</CardTitle>
                      <CardDescription>
                        Enterprise customer acquisition and retention
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                        <div className="text-center">
                          <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                          <p className="text-slate-600">
                            Customer segments breakdown
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="initiatives">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Strategic Initiatives
                  </h2>
                  <Button>
                    <Rocket className="h-4 w-4 mr-2" />
                    New Initiative
                  </Button>
                </div>
                {renderStrategicInitiatives()}
              </div>
            </TabsContent>

            <TabsContent value="intelligence">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Market Intelligence</h2>
                  <p className="text-slate-600">
                    Real-time market insights and competitive analysis
                  </p>
                </div>
                {renderMarketIntelligence()}
              </div>
            </TabsContent>

            <TabsContent value="alerts">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Executive Alerts</h2>
                  <p className="text-slate-600">
                    Critical updates requiring executive attention
                  </p>
                </div>
                {renderExecutiveAlerts()}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveOverview;
