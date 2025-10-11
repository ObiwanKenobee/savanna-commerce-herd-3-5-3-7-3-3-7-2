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
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  CreditCard,
  BarChart3,
  PieChart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Percent,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Download,
  Filter,
  Eye,
  Settings,
  Zap,
  Crown,
  Calculator,
  FileText,
  Phone,
  Mail,
  Infinity,
} from "lucide-react";

interface RevenueMetrics {
  totalRevenue: number;
  recurringRevenue: number;
  consumptionRevenue: number;
  oneTimeRevenue: number;
  growth: number;
  churn: number;
  expansion: number;
}

interface CustomerSegment {
  tier: string;
  count: number;
  revenue: number;
  arpu: number;
  ltv: number;
  churnRate: number;
  expansionRate: number;
  icon: string;
}

interface RevenueOpportunity {
  id: string;
  type: "upsell" | "cross-sell" | "renewal" | "expansion";
  customer: string;
  value: number;
  probability: number;
  timeline: string;
  owner: string;
  status:
    | "qualified"
    | "proposal"
    | "negotiation"
    | "closed-won"
    | "closed-lost";
}

interface PricingStrategy {
  tier: string;
  currentPrice: number;
  recommendedPrice: number;
  priceElasticity: number;
  revenueImpact: number;
  customerImpact: number;
}

const RevenueOperations: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("30d");
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<string>("all");

  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics>({
    totalRevenue: 2847000,
    recurringRevenue: 1950000,
    consumptionRevenue: 745000,
    oneTimeRevenue: 152000,
    growth: 23.5,
    churn: 2.1,
    expansion: 127.8,
  });

  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([
    {
      tier: "Platinum Enterprise",
      count: 23,
      revenue: 1245000,
      arpu: 54130,
      ltv: 847000,
      churnRate: 0.8,
      expansionRate: 145.2,
      icon: "👑",
    },
    {
      tier: "Gold Enterprise",
      count: 89,
      revenue: 1156000,
      arpu: 12989,
      ltv: 234000,
      churnRate: 1.9,
      expansionRate: 128.7,
      icon: "🥇",
    },
    {
      tier: "Silver Enterprise",
      count: 234,
      revenue: 446000,
      arpu: 1906,
      ltv: 89000,
      churnRate: 3.2,
      expansionRate: 118.4,
      icon: "🥈",
    },
  ]);

  const [revenueOpportunities, setRevenueOpportunities] = useState<
    RevenueOpportunity[]
  >([
    {
      id: "opp_001",
      type: "upsell",
      customer: "Fortune Global Corp",
      value: 450000,
      probability: 85,
      timeline: "Q2 2024",
      owner: "Sarah Johnson",
      status: "negotiation",
    },
    {
      id: "opp_002",
      type: "expansion",
      customer: "TechCorp Industries",
      value: 285000,
      probability: 72,
      timeline: "Q1 2024",
      owner: "Michael Chen",
      status: "proposal",
    },
    {
      id: "opp_003",
      type: "renewal",
      customer: "Global Manufacturing LLC",
      value: 675000,
      probability: 94,
      timeline: "Q1 2024",
      owner: "Jennifer Martinez",
      status: "qualified",
    },
    {
      id: "opp_004",
      type: "cross-sell",
      customer: "International Retail Group",
      value: 125000,
      probability: 65,
      timeline: "Q2 2024",
      owner: "David Rodriguez",
      status: "proposal",
    },
  ]);

  const [pricingStrategies, setPricingStrategies] = useState<PricingStrategy[]>(
    [
      {
        tier: "Platinum",
        currentPrice: 25000,
        recommendedPrice: 28000,
        priceElasticity: -0.8,
        revenueImpact: 245000,
        customerImpact: -2.1,
      },
      {
        tier: "Gold",
        currentPrice: 15000,
        recommendedPrice: 16500,
        priceElasticity: -1.2,
        revenueImpact: 156000,
        customerImpact: -4.3,
      },
      {
        tier: "Silver",
        currentPrice: 5000,
        recommendedPrice: 5500,
        priceElasticity: -1.8,
        revenueImpact: 67000,
        customerImpact: -8.7,
      },
    ],
  );

  useEffect(() => {
    loadRevenueData();
    const interval = setInterval(loadRevenueData, 300000);
    return () => clearInterval(interval);
  }, [timeframe, selectedSegment]);

  const loadRevenueData = async () => {
    setLoading(true);
    try {
      const data = await serviceManager.getFinancialOverview();
      // Process and update state with real data
    } catch (error) {
      console.error("Failed to load revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderRevenueOverview = () => (
    <div className="space-y-6">
      {/* Primary Revenue Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Total Revenue</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-green-600">
                  ${(revenueMetrics.totalRevenue / 1000000).toFixed(2)}M
                </span>
                <div className="flex items-center space-x-1">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">
                    +{revenueMetrics.growth}%
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">
                    Recurring Revenue
                  </span>
                  <span className="font-medium">
                    ${(revenueMetrics.recurringRevenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <Progress
                  value={
                    (revenueMetrics.recurringRevenue /
                      revenueMetrics.totalRevenue) *
                    100
                  }
                  className="h-2"
                />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">
                    Consumption Revenue
                  </span>
                  <span className="font-medium">
                    ${(revenueMetrics.consumptionRevenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <Progress
                  value={
                    (revenueMetrics.consumptionRevenue /
                      revenueMetrics.totalRevenue) *
                    100
                  }
                  className="h-2"
                />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">
                    One-time Revenue
                  </span>
                  <span className="font-medium">
                    ${(revenueMetrics.oneTimeRevenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <Progress
                  value={
                    (revenueMetrics.oneTimeRevenue /
                      revenueMetrics.totalRevenue) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Net Revenue Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {revenueMetrics.expansion}%
              </div>
              <div className="text-sm text-slate-600 mt-2">Last 12 months</div>
              <div className="text-xs text-purple-500 mt-1">
                Target: &gt;120%
              </div>
              <Progress
                value={Math.min(100, (revenueMetrics.expansion / 150) * 100)}
                className="mt-3"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {revenueMetrics.churn}%
              </div>
              <div className="text-sm text-slate-600 mt-2">Monthly churn</div>
              <div className="text-xs text-green-500 mt-1 flex items-center justify-center">
                <ArrowDown className="h-3 w-3 mr-1" />
                -0.3% vs last month
              </div>
              <Progress
                value={((5 - revenueMetrics.churn) / 5) * 100}
                className="mt-3"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Composition Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Composition</CardTitle>
            <CardDescription>
              Breakdown by revenue type and growth trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">Revenue composition chart</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth Trajectory</CardTitle>
            <CardDescription>
              Monthly and quarterly growth patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">Growth trajectory chart</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCustomerSegments = () => (
    <div className="space-y-6">
      {customerSegments.map((segment, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{segment.icon}</div>
                <div>
                  <CardTitle className="text-xl">{segment.tier}</CardTitle>
                  <CardDescription>{segment.count} customers</CardDescription>
                </div>
              </div>
              <Badge className="bg-green-600 text-white">
                ${(segment.revenue / 1000000).toFixed(1)}M Revenue
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  ${(segment.arpu / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-slate-600">ARPU</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  ${(segment.ltv / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-slate-600">LTV</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">
                  {segment.churnRate}%
                </div>
                <div className="text-xs text-slate-600">Churn Rate</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {segment.expansionRate}%
                </div>
                <div className="text-xs text-slate-600">Expansion</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">
                  {((segment.ltv / segment.arpu) * 12).toFixed(1)}
                </div>
                <div className="text-xs text-slate-600">LTV:CAC</div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button size="sm" variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Target Upsells
              </Button>
              <Button size="sm" variant="outline">
                <Calculator className="h-4 w-4 mr-2" />
                Optimize Pricing
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderRevenueOpportunities = () => (
    <div className="space-y-4">
      {revenueOpportunities.map((opportunity) => (
        <Card
          key={opportunity.id}
          className="hover:shadow-md transition-shadow"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span>{opportunity.customer}</span>
                  <Badge
                    variant="outline"
                    className={
                      opportunity.type === "upsell"
                        ? "border-green-300 text-green-700"
                        : opportunity.type === "cross-sell"
                          ? "border-blue-300 text-blue-700"
                          : opportunity.type === "expansion"
                            ? "border-purple-300 text-purple-700"
                            : "border-orange-300 text-orange-700"
                    }
                  >
                    {opportunity.type.toUpperCase()}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Owner: {opportunity.owner} • Timeline: {opportunity.timeline}
                </CardDescription>
              </div>
              <Badge
                variant={
                  opportunity.status === "qualified"
                    ? "secondary"
                    : opportunity.status === "proposal"
                      ? "outline"
                      : opportunity.status === "negotiation"
                        ? "default"
                        : opportunity.status === "closed-won"
                          ? "default"
                          : "destructive"
                }
              >
                {opportunity.status.replace("-", " ").toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  ${(opportunity.value / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-slate-600">Deal Value</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {opportunity.probability}%
                </div>
                <div className="text-xs text-slate-600">Probability</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  $
                  {(
                    (opportunity.value * opportunity.probability) /
                    100 /
                    1000
                  ).toFixed(0)}
                  K
                </div>
                <div className="text-xs text-slate-600">Weighted Value</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">
                  {opportunity.timeline}
                </div>
                <div className="text-xs text-slate-600">Expected Close</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Customer
              </Button>
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Send Proposal
              </Button>
              <Button size="sm" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Infinity className="h-5 w-5 text-yellow-600" />
            <span>Pipeline Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                $
                {revenueOpportunities.reduce((sum, opp) => sum + opp.value, 0) /
                  1000}
                K
              </div>
              <div className="text-sm text-slate-600">Total Pipeline</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                $
                {revenueOpportunities.reduce(
                  (sum, opp) => sum + (opp.value * opp.probability) / 100,
                  0,
                ) / 1000}
                K
              </div>
              <div className="text-sm text-slate-600">Weighted Pipeline</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {revenueOpportunities.length}
              </div>
              <div className="text-sm text-slate-600">Active Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {(
                  revenueOpportunities.reduce(
                    (sum, opp) => sum + opp.probability,
                    0,
                  ) / revenueOpportunities.length
                ).toFixed(0)}
                %
              </div>
              <div className="text-sm text-slate-600">Avg Probability</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPricingOptimization = () => (
    <div className="space-y-6">
      {pricingStrategies.map((strategy, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {strategy.tier} Tier Pricing
              </CardTitle>
              <Badge
                variant={
                  strategy.revenueImpact > 200000 ? "default" : "secondary"
                }
              >
                ${(strategy.revenueImpact / 1000).toFixed(0)}K Impact
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-slate-600">
                    ${(strategy.currentPrice / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-slate-600">Current Price</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    ${(strategy.recommendedPrice / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-slate-600">Recommended</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {strategy.priceElasticity}
                  </div>
                  <div className="text-xs text-slate-600">Elasticity</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {strategy.customerImpact}%
                  </div>
                  <div className="text-xs text-slate-600">Customer Impact</div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">
                  Recommendation
                </h4>
                <p className="text-sm text-green-700">
                  Increase {strategy.tier} tier pricing by{" "}
                  {(
                    ((strategy.recommendedPrice - strategy.currentPrice) /
                      strategy.currentPrice) *
                    100
                  ).toFixed(1)}
                  % to generate additional $
                  {(strategy.revenueImpact / 1000).toFixed(0)}K annual revenue.
                  Expected customer churn: {Math.abs(strategy.customerImpact)}%.
                </p>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Change
                </Button>
                <Button size="sm" variant="outline">
                  <Calculator className="h-4 w-4 mr-2" />
                  Run Simulation
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
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
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <span>Revenue Operations Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Complete revenue lifecycle management and optimization
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
                  onClick={loadRevenueData}
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
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
              <TabsTrigger value="segments">Customer Segments</TabsTrigger>
              <TabsTrigger value="opportunities">
                Pipeline & Opportunities
              </TabsTrigger>
              <TabsTrigger value="pricing">Pricing Optimization</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {renderRevenueOverview()}
            </TabsContent>

            <TabsContent value="segments">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Customer Segments Analysis
                  </h2>
                  <p className="text-slate-600">
                    Revenue performance by customer tier and segment
                  </p>
                </div>
                {renderCustomerSegments()}
              </div>
            </TabsContent>

            <TabsContent value="opportunities">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Revenue Pipeline & Opportunities
                  </h2>
                  <p className="text-slate-600">
                    Active deals and expansion opportunities
                  </p>
                </div>
                {renderRevenueOpportunities()}
              </div>
            </TabsContent>

            <TabsContent value="pricing">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Pricing Strategy & Optimization
                  </h2>
                  <p className="text-slate-600">
                    AI-driven pricing recommendations for revenue growth
                  </p>
                </div>
                {renderPricingOptimization()}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default RevenueOperations;
