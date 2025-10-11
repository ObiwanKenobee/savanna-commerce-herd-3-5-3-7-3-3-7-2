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
  Calculator,
  PieChart,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Target,
  Zap,
  CreditCard,
  Bank,
  Receipt,
  FileText,
  Calendar,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Percent,
  Building,
  Users,
  Globe,
  Eye,
  Settings,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  Award,
  Star,
} from "lucide-react";

interface FinancialMetrics {
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
  cashFlow: number;
  burnRate: number;
  runway: number;
  growth: number;
}

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  utilization: number;
  forecast: number;
  variance: number;
  status: "on-track" | "over-budget" | "under-budget";
}

interface CashFlowItem {
  category: string;
  amount: number;
  trend: number;
  period: string;
  type: "inflow" | "outflow";
}

interface ComplianceItem {
  id: string;
  requirement: string;
  status: "compliant" | "warning" | "non-compliant";
  deadline: Date;
  responsible: string;
  priority: "high" | "medium" | "low";
}

interface RiskAssessment {
  id: string;
  type: string;
  description: string;
  impact: "high" | "medium" | "low";
  probability: "high" | "medium" | "low";
  mitigation: string;
  status: "active" | "monitoring" | "resolved";
}

const FinancialControl: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current-quarter");
  const [selectedView, setSelectedView] = useState("summary");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const [financialMetrics, setFinancialMetrics] = useState<FinancialMetrics>({
    revenue: 12450000,
    expenses: 8340000,
    profit: 4110000,
    margin: 33.0,
    cashFlow: 2890000,
    burnRate: 890000,
    runway: 18.5,
    growth: 23.4,
  });

  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    {
      id: "personnel",
      name: "Personnel & Benefits",
      allocated: 3500000,
      spent: 2890000,
      remaining: 610000,
      utilization: 82.6,
      forecast: 3420000,
      variance: -80000,
      status: "on-track",
    },
    {
      id: "technology",
      name: "Technology & Infrastructure",
      allocated: 1200000,
      spent: 1340000,
      remaining: -140000,
      utilization: 111.7,
      forecast: 1450000,
      variance: 250000,
      status: "over-budget",
    },
    {
      id: "marketing",
      name: "Marketing & Sales",
      allocated: 800000,
      spent: 620000,
      remaining: 180000,
      utilization: 77.5,
      forecast: 750000,
      variance: -50000,
      status: "under-budget",
    },
    {
      id: "operations",
      name: "Operations & Logistics",
      allocated: 2100000,
      spent: 1780000,
      remaining: 320000,
      utilization: 84.8,
      forecast: 2050000,
      variance: -50000,
      status: "on-track",
    },
    {
      id: "rd",
      name: "Research & Development",
      allocated: 950000,
      spent: 740000,
      remaining: 210000,
      utilization: 77.9,
      forecast: 920000,
      variance: -30000,
      status: "on-track",
    },
  ]);

  const [cashFlowItems, setCashFlowItems] = useState<CashFlowItem[]>([
    {
      category: "Product Sales",
      amount: 8940000,
      trend: 18.2,
      period: "Q2",
      type: "inflow",
    },
    {
      category: "Service Revenue",
      amount: 2890000,
      trend: 34.1,
      period: "Q2",
      type: "inflow",
    },
    {
      category: "Licensing",
      amount: 620000,
      trend: 12.5,
      period: "Q2",
      type: "inflow",
    },
    {
      category: "Salaries & Benefits",
      amount: -2890000,
      trend: 8.3,
      period: "Q2",
      type: "outflow",
    },
    {
      category: "Infrastructure",
      amount: -1340000,
      trend: 15.7,
      period: "Q2",
      type: "outflow",
    },
    {
      category: "Marketing",
      amount: -620000,
      trend: -12.3,
      period: "Q2",
      type: "outflow",
    },
    {
      category: "Operations",
      amount: -1780000,
      trend: 5.2,
      period: "Q2",
      type: "outflow",
    },
  ]);

  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: "sox-404",
      requirement: "SOX 404 Internal Controls Assessment",
      status: "compliant",
      deadline: new Date("2024-03-31"),
      responsible: "Internal Audit",
      priority: "high",
    },
    {
      id: "tax-filing",
      requirement: "Quarterly Tax Filing",
      status: "warning",
      deadline: new Date("2024-01-31"),
      responsible: "Tax Department",
      priority: "high",
    },
    {
      id: "financial-reporting",
      requirement: "Financial Reporting Standards Update",
      status: "compliant",
      deadline: new Date("2024-06-30"),
      responsible: "Finance Team",
      priority: "medium",
    },
    {
      id: "audit-preparation",
      requirement: "Annual Audit Preparation",
      status: "non-compliant",
      deadline: new Date("2024-02-15"),
      responsible: "CFO Office",
      priority: "high",
    },
  ]);

  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([
    {
      id: "currency-risk",
      type: "Currency Risk",
      description:
        "Exposure to foreign exchange rate fluctuations in international operations",
      impact: "high",
      probability: "medium",
      mitigation: "Implement hedging strategies and currency forward contracts",
      status: "active",
    },
    {
      id: "credit-risk",
      type: "Credit Risk",
      description: "Customer payment defaults and extended payment terms",
      impact: "medium",
      probability: "low",
      mitigation: "Enhanced credit scoring and payment term adjustments",
      status: "monitoring",
    },
    {
      id: "liquidity-risk",
      type: "Liquidity Risk",
      description: "Insufficient cash reserves during market downturns",
      impact: "high",
      probability: "low",
      mitigation:
        "Maintain 6-month operating expense reserve and credit facilities",
      status: "resolved",
    },
    {
      id: "operational-risk",
      type: "Operational Risk",
      description: "Supply chain disruptions affecting cash flow timing",
      impact: "medium",
      probability: "medium",
      mitigation: "Diversify supplier base and implement contingency planning",
      status: "active",
    },
  ]);

  useEffect(() => {
    loadFinancialData();
  }, [selectedPeriod]);

  const loadFinancialData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real implementation, fetch data based on selected period
    } catch (error) {
      console.error("Failed to load financial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
      case "on-track":
      case "resolved":
        return "text-green-600";
      case "warning":
      case "monitoring":
        return "text-yellow-600";
      case "non-compliant":
      case "over-budget":
      case "active":
        return "text-red-600";
      case "under-budget":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
      case "on-track":
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
      case "monitoring":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "non-compliant":
      case "over-budget":
      case "active":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
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
      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(financialMetrics.revenue)}
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+{financialMetrics.growth}%</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">vs last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(financialMetrics.profit)}
              </div>
              <div className="flex items-center text-blue-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+15.2%</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {financialMetrics.margin}% margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Cash Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(financialMetrics.cashFlow)}
              </div>
              <div className="flex items-center text-purple-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+8.7%</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">positive flow</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Cash Runway
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-orange-600">
                {financialMetrics.runway} mo
              </div>
              <div className="flex items-center text-orange-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Healthy</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">at current burn</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget vs Actual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <span>Budget Performance</span>
          </CardTitle>
          <CardDescription>
            Budget allocation vs actual spending across departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetCategories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(category.status)}
                    <h4 className="font-medium">{category.name}</h4>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-slate-600">
                      {formatCurrency(category.spent)} /{" "}
                      {formatCurrency(category.allocated)}
                    </span>
                    <Badge
                      variant={
                        category.status === "on-track"
                          ? "default"
                          : category.status === "over-budget"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {category.utilization}%
                    </Badge>
                  </div>
                </div>
                <Progress value={category.utilization} className="h-2" />
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Remaining: {formatCurrency(category.remaining)}</span>
                  <span>Forecast: {formatCurrency(category.forecast)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Cash Flow Breakdown</span>
            </CardTitle>
            <CardDescription>Inflows and outflows by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cashFlowItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    item.type === "inflow"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  } border`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.type === "inflow" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-semibold ${
                        item.type === "inflow"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(Math.abs(item.amount))}
                    </div>
                    <div
                      className={`text-xs flex items-center ${
                        item.trend >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.trend >= 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(item.trend)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span>Financial Health Score</span>
            </CardTitle>
            <CardDescription>
              Overall financial performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">92</div>
                <div className="text-sm text-green-700">
                  Excellent Financial Health
                </div>
                <Progress value={92} className="mt-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Liquidity Ratio</span>
                  <span className="font-medium text-green-600">2.4:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt-to-Equity</span>
                  <span className="font-medium text-green-600">0.3:1</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating Margin</span>
                  <span className="font-medium text-green-600">33%</span>
                </div>
                <div className="flex justify-between">
                  <span>ROI</span>
                  <span className="font-medium text-green-600">24%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderComplianceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Compliance Status</span>
            </CardTitle>
            <CardDescription>
              Regulatory compliance tracking and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <h4 className="font-semibold">{item.requirement}</h4>
                    </div>
                    <Badge
                      variant={
                        item.priority === "high"
                          ? "destructive"
                          : item.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {item.priority}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Deadline:</span>
                      <p className="font-medium">
                        {item.deadline.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Responsible:</span>
                      <p className="font-medium">{item.responsible}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" disabled={item.status === "compliant"}>
                      {item.status === "compliant" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : item.status === "warning" ? (
                        <Clock className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {item.status === "compliant"
                        ? "Compliant"
                        : item.status === "warning"
                          ? "Review"
                          : "Action Required"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Risk Assessment</span>
            </CardTitle>
            <CardDescription>
              Financial risk monitoring and mitigation strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAssessments.map((risk) => (
                <div
                  key={risk.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{risk.type}</h4>
                    <div className="flex space-x-2">
                      <Badge
                        variant={
                          risk.impact === "high"
                            ? "destructive"
                            : risk.impact === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {risk.impact} impact
                      </Badge>
                      <Badge
                        variant={
                          risk.probability === "high"
                            ? "destructive"
                            : risk.probability === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {risk.probability} prob
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    {risk.description}
                  </p>
                  <div className="mb-3">
                    <span className="text-slate-500 text-sm">Mitigation:</span>
                    <p className="text-sm font-medium">{risk.mitigation}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        risk.status === "resolved"
                          ? "default"
                          : risk.status === "monitoring"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {risk.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" disabled={risk.status === "resolved"}>
                        {risk.status === "resolved" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : risk.status === "monitoring" ? (
                          <Eye className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {risk.status === "resolved"
                          ? "Resolved"
                          : risk.status === "monitoring"
                            ? "Monitor"
                            : "Mitigate"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Financial Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>
              Monthly revenue and growth analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">
                  Revenue trend chart would display here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>
              Cost distribution and optimization opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">
                  Expense breakdown chart would display here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Forecasting */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Forecasting</CardTitle>
          <CardDescription>
            Projected financial performance and scenario analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600">
                Financial forecasting models would display here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderControlsTab = () => (
    <div className="space-y-6">
      {/* Budget Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-blue-600" />
            <span>Budget Controls & Approvals</span>
          </CardTitle>
          <CardDescription>
            Spending controls and approval workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Approval Thresholds</h4>
              {[
                {
                  level: "Department Head",
                  amount: "$5,000",
                  approval: "Auto-approved",
                },
                {
                  level: "Director",
                  amount: "$25,000",
                  approval: "Email approval",
                },
                {
                  level: "VP/CFO",
                  amount: "$100,000",
                  approval: "Meeting required",
                },
                {
                  level: "Board",
                  amount: "$500,000+",
                  approval: "Board resolution",
                },
              ].map((threshold, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{threshold.level}</span>
                    <p className="text-sm text-slate-600">{threshold.amount}</p>
                  </div>
                  <Badge variant="outline">{threshold.approval}</Badge>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Current Approval Queue</h4>
              {[
                {
                  item: "Marketing Campaign Budget",
                  amount: "$45,000",
                  requestor: "Marketing Director",
                  status: "pending",
                },
                {
                  item: "New Server Infrastructure",
                  amount: "$120,000",
                  requestor: "IT Director",
                  status: "approved",
                },
                {
                  item: "Office Renovation",
                  amount: "$85,000",
                  requestor: "Operations Manager",
                  status: "pending",
                },
              ].map((request, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{request.item}</span>
                    <p className="text-sm text-slate-600">
                      {request.amount} • {request.requestor}
                    </p>
                  </div>
                  <Badge
                    variant={
                      request.status === "approved" ? "default" : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              ))}
              <Button className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View All Pending Approvals
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automated Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span>Automated Financial Controls</span>
          </CardTitle>
          <CardDescription>
            AI-powered financial monitoring and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Budget Variance Alert",
                description:
                  "Automatic alerts when departments exceed 90% of budget",
                status: "active",
                triggers: 15,
              },
              {
                name: "Duplicate Payment Detection",
                description:
                  "AI detection of potential duplicate invoices and payments",
                status: "active",
                triggers: 3,
              },
              {
                name: "Cash Flow Prediction",
                description:
                  "Weekly cash flow forecasting with early warning system",
                status: "active",
                triggers: 0,
              },
              {
                name: "Expense Policy Compliance",
                description:
                  "Automatic flagging of expenses that violate company policy",
                status: "active",
                triggers: 8,
              },
            ].map((control, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${control.status === "active" ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                  <div>
                    <h4 className="font-semibold">{control.name}</h4>
                    <p className="text-sm text-slate-600">
                      {control.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">
                      {control.triggers}
                    </div>
                    <div className="text-xs text-slate-600">This Month</div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
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
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <span>Financial Control Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Advanced financial analytics, compliance, and risk management
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-quarter">
                      Current Quarter
                    </SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="current-year">Current Year</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={loadFinancialData}
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
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
              <TabsTrigger value="overview">Financial Overview</TabsTrigger>
              <TabsTrigger value="compliance">Compliance & Risk</TabsTrigger>
              <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
              <TabsTrigger value="controls">Controls & Approvals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">{renderOverviewTab()}</TabsContent>
            <TabsContent value="compliance">
              {renderComplianceTab()}
            </TabsContent>
            <TabsContent value="analytics">{renderAnalyticsTab()}</TabsContent>
            <TabsContent value="controls">{renderControlsTab()}</TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default FinancialControl;
