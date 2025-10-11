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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import { useLocation } from "react-router-dom";
import {
  Crown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Globe,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Shield,
  Clock,
  Award,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  Calendar,
  Download,
  RefreshCw,
  Settings,
  ArrowUp,
  ArrowDown,
  Percent,
  Building,
  Network,
  Database,
  Cloud,
  Lock,
  Infinity,
} from "lucide-react";

interface RevenueMetrics {
  totalSpend: number;
  monthlyRecurring: number;
  consumptionCosts: number;
  addonCosts: number;
  projectedAnnual: number;
  savingsRealized: number;
  roi: number;
}

interface UsageMetrics {
  apiCalls: number;
  transactions: number;
  dataProcessed: number;
  activeUsers: number;
  integrations: number;
}

interface PerformanceMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
}

interface UpsellOpportunity {
  id: string;
  title: string;
  description: string;
  potentialValue: number;
  roi: string;
  effort: "Low" | "Medium" | "High";
  priority: "High" | "Medium" | "Low";
  icon: string;
}

const EnterpriseDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("30d");
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();

  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics>({
    totalSpend: 485000,
    monthlyRecurring: 125000,
    consumptionCosts: 89000,
    addonCosts: 145000,
    projectedAnnual: 1650000,
    savingsRealized: 2300000,
    roi: 274,
  });

  const [usageMetrics, setUsageMetrics] = useState<UsageMetrics>({
    apiCalls: 2847000,
    transactions: 156000,
    dataProcessed: 847,
    activeUsers: 2340,
    integrations: 47,
  });

  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetrics>({
      uptime: 99.997,
      responseTime: 23,
      errorRate: 0.003,
      throughput: 15680,
    });

  const upsellOpportunities: UpsellOpportunity[] = [
    {
      id: "digital-twin-upgrade",
      title: "Mission-Critical Digital Twin",
      description:
        "Upgrade to real-time supply chain simulation with AI optimization",
      potentialValue: 150000,
      roi: "40% efficiency gain",
      effort: "Medium",
      priority: "High",
      icon: "🔄",
    },
    {
      id: "exclusive-networks",
      title: "Executive Deal Rooms",
      description: "Access Fortune 100 exclusive partnership opportunities",
      potentialValue: 500000,
      roi: "Access to $B+ deals",
      effort: "Low",
      priority: "High",
      icon: "🤝",
    },
    {
      id: "ai-expansion",
      title: "Advanced AI Suite",
      description:
        "Predictive analytics and automated decision-making capabilities",
      potentialValue: 200000,
      roi: "35% cost reduction",
      effort: "High",
      priority: "Medium",
      icon: "🤖",
    },
    {
      id: "global-expansion",
      title: "Global Compliance Package",
      description: "Multi-region regulatory compliance and data localization",
      potentialValue: 300000,
      roi: "Regulatory compliance",
      effort: "High",
      priority: "Medium",
      icon: "🌍",
    },
  ];

  const recentAlerts = [
    {
      type: "success",
      title: "Revenue Milestone Achieved",
      message:
        "Your platform has processed $500M in transactions this quarter. Unlock volume discounts.",
      time: "2 hours ago",
    },
    {
      type: "info",
      title: "New Integration Available",
      message:
        "SAP S/4HANA connector is now available for your enterprise tier.",
      time: "1 day ago",
    },
    {
      type: "warning",
      title: "Approaching API Limits",
      message:
        "You've used 87% of your monthly API calls. Consider upgrading for unlimited access.",
      time: "3 days ago",
    },
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Revenue Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">
                  Total Monthly Spend
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ${revenueMetrics.totalSpend.toLocaleString()}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subscription</span>
                  <span>
                    ${revenueMetrics.monthlyRecurring.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Consumption</span>
                  <span>
                    ${revenueMetrics.consumptionCosts.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Add-ons</span>
                  <span>${revenueMetrics.addonCosts.toLocaleString()}</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">
                    Projected Annual
                  </span>
                  <span className="text-lg font-semibold">
                    ${(revenueMetrics.projectedAnnual / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ROI Realized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {revenueMetrics.roi}%
              </div>
              <div className="text-sm text-slate-600 mt-2">
                Return on Investment
              </div>
              <div className="text-lg font-semibold text-green-600 mt-4">
                ${(revenueMetrics.savingsRealized / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-slate-600">
                Total Savings Realized
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Uptime</span>
                <span className="font-semibold text-green-600">
                  {performanceMetrics.uptime}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Response Time</span>
                <span className="font-semibold">
                  {performanceMetrics.responseTime}ms
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Error Rate</span>
                <span className="font-semibold text-green-600">
                  {performanceMetrics.errorRate}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Throughput</span>
                <span className="font-semibold">
                  {performanceMetrics.throughput.toLocaleString()}/h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {(usageMetrics.apiCalls / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-slate-600">API Calls</div>
            <div className="text-xs text-green-500 flex items-center justify-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              +23% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {usageMetrics.transactions.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Transactions</div>
            <div className="text-xs text-green-500 flex items-center justify-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              +18% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {usageMetrics.dataProcessed} TB
            </div>
            <div className="text-sm text-slate-600">Data Processed</div>
            <div className="text-xs text-green-500 flex items-center justify-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              +31% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {usageMetrics.activeUsers.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Active Users</div>
            <div className="text-xs text-green-500 flex items-center justify-center mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              +12% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {usageMetrics.integrations}
            </div>
            <div className="text-sm text-slate-600">Integrations</div>
            <div className="text-xs text-blue-500 flex items-center justify-center mt-1">
              <Info className="h-3 w-3 mr-1" />
              All systems active
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span>Recent Alerts & Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <Alert
                key={index}
                className={
                  alert.type === "success"
                    ? "border-green-200 bg-green-50"
                    : alert.type === "warning"
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-blue-200 bg-blue-50"
                }
              >
                <div className="flex items-start space-x-3">
                  {alert.type === "success" && (
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  )}
                  {alert.type === "warning" && (
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  )}
                  {alert.type === "info" && (
                    <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <AlertTitle className="text-sm font-semibold">
                      {alert.title}
                    </AlertTitle>
                    <AlertDescription className="text-sm">
                      {alert.message}
                    </AlertDescription>
                    <div className="text-xs text-slate-500 mt-1">
                      {alert.time}
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRevenueTab = () => (
    <div className="space-y-6">
      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Monthly spending distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Base Subscription</span>
                </div>
                <span className="font-semibold">
                  ${revenueMetrics.monthlyRecurring.toLocaleString()}
                </span>
              </div>
              <Progress value={25.7} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Consumption (APIs, Data)</span>
                </div>
                <span className="font-semibold">
                  ${revenueMetrics.consumptionCosts.toLocaleString()}
                </span>
              </div>
              <Progress value={18.4} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Premium Add-ons</span>
                </div>
                <span className="font-semibold">
                  ${revenueMetrics.addonCosts.toLocaleString()}
                </span>
              </div>
              <Progress value={29.9} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Analysis</CardTitle>
            <CardDescription>Cost optimization opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  ${(revenueMetrics.savingsRealized / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-green-700">
                  Total Savings Realized
                </div>
                <div className="text-xs text-green-600 mt-1">
                  vs traditional solutions
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Operational Efficiency</span>
                  <span className="text-green-600">$1.2M saved</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Integration Costs</span>
                  <span className="text-green-600">$650K saved</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Staff Productivity</span>
                  <span className="text-green-600">$450K saved</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Consumption Trends</CardTitle>
          <CardDescription>Usage-based pricing over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600">
                Consumption analytics chart would be displayed here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUpsellTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Revenue Expansion Opportunities
        </h2>
        <p className="text-slate-600">
          Unlock additional value with these premium features and services
        </p>
      </div>

      <div className="grid gap-6">
        {upsellOpportunities.map((opportunity) => (
          <Card
            key={opportunity.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{opportunity.icon}</div>
                  <div>
                    <CardTitle className="text-xl">
                      {opportunity.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {opportunity.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      opportunity.priority === "High"
                        ? "bg-red-600"
                        : opportunity.priority === "Medium"
                          ? "bg-yellow-600"
                          : "bg-green-600"
                    }
                  >
                    {opportunity.priority} Priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    ${(opportunity.potentialValue / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-slate-600">Annual Value</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {opportunity.roi}
                  </div>
                  <div className="text-xs text-slate-600">Expected ROI</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {opportunity.effort}
                  </div>
                  <div className="text-xs text-slate-600">Implementation</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">
                    30-60d
                  </div>
                  <div className="text-xs text-slate-600">Timeline</div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Request Proposal
                </Button>
                <Button variant="outline">Schedule Demo</Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Solutions */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-600" />
            <span>Custom Enterprise Solutions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 mb-4">
            Need something specific? Our enterprise team can create custom
            solutions tailored to your unique requirements and industry needs.
          </p>
          <div className="flex space-x-3">
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Phone className="h-4 w-4 mr-2" />
              Contact Enterprise Team
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Request Custom Quote
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {performanceMetrics.uptime}%
              </div>
              <div className="text-sm text-slate-600 mt-2">Last 30 days</div>
              <Progress value={performanceMetrics.uptime} className="mt-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {performanceMetrics.responseTime}ms
              </div>
              <div className="text-sm text-slate-600 mt-2">Average</div>
              <div className="text-xs text-green-500 mt-1">
                -12% vs last month
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {performanceMetrics.errorRate}%
              </div>
              <div className="text-sm text-slate-600 mt-2">Last 30 days</div>
              <div className="text-xs text-green-500 mt-1">Well below SLA</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {(performanceMetrics.throughput / 1000).toFixed(1)}K
              </div>
              <div className="text-sm text-slate-600 mt-2">Requests/hour</div>
              <div className="text-xs text-green-500 mt-1">
                +8% vs last month
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Analytics</CardTitle>
            <CardDescription>
              Detailed usage patterns and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">
                  Usage analytics chart would be displayed here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Optimization</CardTitle>
            <CardDescription>
              Recommendations for cost efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>Optimization Opportunity</AlertTitle>
                <AlertDescription>
                  Switching to annual billing could save you $45K annually with
                  our 15% discount.
                </AlertDescription>
              </Alert>

              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4" />
                <AlertTitle>Usage Efficiency</AlertTitle>
                <AlertDescription>
                  Your API usage is 23% more efficient than industry average,
                  saving ~$12K monthly.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <EnhancedNavigation />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-2">
                  <Crown className="h-8 w-8 text-yellow-600" />
                  <span>Enterprise Command Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Real-time insights into your infinite revenue loop ecosystem
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
                    <SelectItem value="90d">Last 3 months</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Tier Badge */}
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-2">
                👑 Platinum Tier Enterprise
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Infinity className="h-3 w-3" />
                <span>Infinite Revenue Loop Active</span>
              </Badge>
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                SLA: 99.999% Uptime
              </Badge>
            </div>
          </div>

          {/* Main Dashboard */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
              <TabsTrigger value="upsell">Growth Opportunities</TabsTrigger>
              <TabsTrigger value="analytics">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">{renderOverviewTab()}</TabsContent>

            <TabsContent value="revenue">{renderRevenueTab()}</TabsContent>

            <TabsContent value="upsell">{renderUpsellTab()}</TabsContent>

            <TabsContent value="analytics">{renderAnalyticsTab()}</TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EnterpriseDashboard;
