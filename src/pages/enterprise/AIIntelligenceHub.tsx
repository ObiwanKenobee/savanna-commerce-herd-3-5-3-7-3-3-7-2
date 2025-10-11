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
import { useEnterpriseTier } from "@/hooks/useEnterpriseTier";
import TierRestriction from "@/components/enterprise/TierRestriction";
import {
  Zap,
  Brain,
  TrendingUp,
  Target,
  Eye,
  Settings,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RotateCcw,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb,
  Bot,
  Database,
  Network,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Globe,
  Star,
  Award,
  Shield,
  Lock,
  Unlock,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  Percent,
  DollarSign,
  Calendar,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Cpu,
  HardDrive,
  Wifi,
  CloudCog,
} from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  type: "prediction" | "classification" | "optimization" | "generation";
  status: "active" | "training" | "paused" | "error";
  accuracy: number;
  confidence: number;
  lastTrained: Date;
  predictions: number;
  domain: string;
}

interface AIInsight {
  id: string;
  title: string;
  description: string;
  category: "revenue" | "operations" | "risk" | "customer" | "market";
  impact: "high" | "medium" | "low";
  confidence: number;
  timeframe: string;
  actionable: boolean;
  value: number;
}

interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  triggers: string[];
  actions: string[];
  status: "active" | "paused" | "draft";
  executions: number;
  successRate: number;
  timeSaved: number;
  costSaved: number;
}

interface PredictiveAnalytics {
  category: string;
  current: number;
  predicted: number;
  confidence: number;
  trend: "up" | "down" | "stable";
  factors: string[];
}

const AIIntelligenceHub: React.FC = () => {
  const { canAccess } = useEnterpriseTier();
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  // Check tier access - AI requires Platinum
  if (!canAccess("platinum")) {
    return (
      <TierRestriction
        requiredTier="platinum"
        feature="AI Intelligence Hub"
        description="Unlock AI-powered insights, predictive analytics, and intelligent automation with Platinum tier."
        showPreview={true}
      >
        <div className="h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">AI-Powered Analytics</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-semibold">Revenue Prediction</span>
              </div>
              <div className="text-sm text-gray-600">
                AI predicts 18% revenue increase with optimized pricing strategy
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold">Automated Insights</span>
              </div>
              <div className="text-sm text-gray-600">
                Real-time anomaly detection and predictive recommendations
              </div>
            </div>
          </div>
        </div>
      </TierRestriction>
    );
  }

  const [aiModels, setAiModels] = useState<AIModel[]>([
    {
      id: "demand-forecasting",
      name: "Demand Forecasting Model",
      type: "prediction",
      status: "active",
      accuracy: 94.7,
      confidence: 87.3,
      lastTrained: new Date("2024-01-15"),
      predictions: 15680,
      domain: "Supply Chain",
    },
    {
      id: "customer-churn",
      name: "Customer Churn Prediction",
      type: "classification",
      status: "active",
      accuracy: 89.2,
      confidence: 82.1,
      lastTrained: new Date("2024-01-18"),
      predictions: 8934,
      domain: "Customer Success",
    },
    {
      id: "price-optimization",
      name: "Dynamic Pricing Optimizer",
      type: "optimization",
      status: "training",
      accuracy: 91.5,
      confidence: 85.6,
      lastTrained: new Date("2024-01-20"),
      predictions: 23456,
      domain: "Revenue",
    },
    {
      id: "fraud-detection",
      name: "Fraud Detection System",
      type: "classification",
      status: "active",
      accuracy: 98.1,
      confidence: 95.8,
      lastTrained: new Date("2024-01-19"),
      predictions: 45123,
      domain: "Security",
    },
    {
      id: "content-generation",
      name: "Content Generation Engine",
      type: "generation",
      status: "paused",
      accuracy: 87.9,
      confidence: 79.4,
      lastTrained: new Date("2024-01-14"),
      predictions: 3245,
      domain: "Marketing",
    },
  ]);

  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      id: "revenue-opportunity",
      title: "Revenue Optimization Opportunity",
      description:
        "AI models predict 18% revenue increase by adjusting pricing strategy for premium tier customers in Q2",
      category: "revenue",
      impact: "high",
      confidence: 89.3,
      timeframe: "Next Quarter",
      actionable: true,
      value: 2340000,
    },
    {
      id: "churn-risk",
      title: "High-Value Customer Churn Risk",
      description:
        "23 enterprise customers showing early churn indicators. Immediate intervention recommended",
      category: "customer",
      impact: "high",
      confidence: 94.7,
      timeframe: "Next 30 days",
      actionable: true,
      value: 890000,
    },
    {
      id: "supply-disruption",
      title: "Supply Chain Disruption Forecast",
      description:
        "Weather patterns suggest 67% probability of supplier delays in Southeast Asia region",
      category: "operations",
      impact: "medium",
      confidence: 76.2,
      timeframe: "Next 14 days",
      actionable: true,
      value: 450000,
    },
    {
      id: "market-expansion",
      title: "Market Expansion Opportunity",
      description:
        "AI analysis identifies optimal timing for European market entry with 73% success probability",
      category: "market",
      impact: "high",
      confidence: 82.4,
      timeframe: "Q3 2024",
      actionable: true,
      value: 5600000,
    },
    {
      id: "cost-optimization",
      title: "Operational Cost Reduction",
      description:
        "Machine learning identifies 15% cost reduction opportunity in logistics operations",
      category: "operations",
      impact: "medium",
      confidence: 91.8,
      timeframe: "Next Quarter",
      actionable: true,
      value: 1200000,
    },
  ]);

  const [automationWorkflows, setAutomationWorkflows] = useState<
    AutomationWorkflow[]
  >([
    {
      id: "customer-onboarding",
      name: "Intelligent Customer Onboarding",
      description:
        "Automated customer verification, document processing, and account setup workflow",
      triggers: [
        "New customer signup",
        "KYC document upload",
        "Payment verification",
      ],
      actions: [
        "Document verification",
        "Credit check",
        "Account provisioning",
        "Welcome sequence",
      ],
      status: "active",
      executions: 2847,
      successRate: 94.3,
      timeSaved: 168.5,
      costSaved: 145000,
    },
    {
      id: "inventory-optimization",
      name: "Smart Inventory Management",
      description:
        "AI-driven inventory optimization with automated reordering and supplier management",
      triggers: [
        "Low stock alert",
        "Demand forecast update",
        "Supplier price change",
      ],
      actions: [
        "Calculate optimal order quantity",
        "Generate purchase orders",
        "Notify suppliers",
        "Update forecasts",
      ],
      status: "active",
      executions: 1523,
      successRate: 97.1,
      timeSaved: 234.7,
      costSaved: 320000,
    },
    {
      id: "fraud-response",
      name: "Automated Fraud Response",
      description:
        "Real-time fraud detection with immediate response and investigation workflows",
      triggers: [
        "Fraud score threshold",
        "Suspicious pattern detected",
        "Manual review flag",
      ],
      actions: [
        "Freeze transaction",
        "Notify security team",
        "Gather evidence",
        "Generate report",
      ],
      status: "active",
      executions: 456,
      successRate: 98.9,
      timeSaved: 89.3,
      costSaved: 890000,
    },
    {
      id: "marketing-personalization",
      name: "Personalized Marketing Campaigns",
      description:
        "AI-powered customer segmentation and automated personalized campaign creation",
      triggers: [
        "Customer behavior change",
        "Lifecycle stage transition",
        "Engagement drop",
      ],
      actions: [
        "Segment customers",
        "Generate personalized content",
        "Schedule campaigns",
        "Track performance",
      ],
      status: "draft",
      executions: 0,
      successRate: 0,
      timeSaved: 0,
      costSaved: 0,
    },
  ]);

  const [predictiveAnalytics, setPredictiveAnalytics] = useState<
    PredictiveAnalytics[]
  >([
    {
      category: "Monthly Revenue",
      current: 12450000,
      predicted: 14230000,
      confidence: 87.3,
      trend: "up",
      factors: ["Seasonal demand", "New product launch", "Market expansion"],
    },
    {
      category: "Customer Acquisition Cost",
      current: 245,
      predicted: 198,
      confidence: 91.7,
      trend: "down",
      factors: [
        "Marketing optimization",
        "Referral program",
        "Brand recognition",
      ],
    },
    {
      category: "Churn Rate",
      current: 3.2,
      predicted: 2.8,
      confidence: 84.1,
      trend: "down",
      factors: [
        "Product improvements",
        "Customer success",
        "Pricing adjustments",
      ],
    },
    {
      category: "Operational Efficiency",
      current: 87.4,
      predicted: 92.1,
      confidence: 89.5,
      trend: "up",
      factors: ["Process automation", "AI optimization", "Staff training"],
    },
  ]);

  useEffect(() => {
    loadAIData();
  }, [selectedTimeframe, selectedDomain]);

  const loadAIData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real implementation, fetch AI data based on timeframe and domain
    } catch (error) {
      console.error("Failed to load AI data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "training":
        return "text-blue-600";
      case "paused":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      case "draft":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "training":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "paused":
        return <PauseCircle className="h-4 w-4 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "draft":
        return <FileText className="h-4 w-4 text-gray-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
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
      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active AI Models
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                {aiModels.filter((m) => m.status === "active").length}
              </div>
              <div className="flex items-center text-blue-600">
                <Bot className="h-4 w-4 mr-1" />
                <span className="text-sm">Online</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {aiModels.length} total models
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg Model Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">
                {(
                  aiModels.reduce((sum, m) => sum + m.accuracy, 0) /
                  aiModels.length
                ).toFixed(1)}
                %
              </div>
              <div className="flex items-center text-green-600">
                <Target className="h-4 w-4 mr-1" />
                <span className="text-sm">High</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Above 90% target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-600">
                {(
                  aiModels.reduce((sum, m) => sum + m.predictions, 0) / 1000
                ).toFixed(0)}
                K
              </div>
              <div className="flex items-center text-purple-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+15%</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Cost Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(
                  automationWorkflows.reduce((sum, w) => sum + w.costSaved, 0),
                )}
              </div>
              <div className="flex items-center text-orange-600">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="text-sm">YTD</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">From automation</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <span>AI-Generated Insights</span>
          </CardTitle>
          <CardDescription>
            Actionable intelligence from your AI models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        insight.impact === "high"
                          ? "bg-red-500"
                          : insight.impact === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <h4 className="font-semibold">{insight.title}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      variant={
                        insight.impact === "high"
                          ? "destructive"
                          : insight.impact === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {insight.impact} impact
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
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-slate-500">
                      Value: {formatCurrency(insight.value)}
                    </span>
                    <span className="text-slate-500">
                      Timeframe: {insight.timeframe}
                    </span>
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

      {/* Model Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>Model Performance</span>
            </CardTitle>
            <CardDescription>Accuracy and confidence metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiModels.slice(0, 3).map((model) => (
                <div
                  key={model.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(model.status)}
                    <div>
                      <h4 className="font-medium">{model.name}</h4>
                      <p className="text-sm text-slate-600">{model.domain}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      Accuracy:{" "}
                      <span className="text-green-600">{model.accuracy}%</span>
                    </div>
                    <div className="text-xs text-slate-600">
                      Confidence: {model.confidence}%
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
              <Zap className="h-5 w-5 text-yellow-600" />
              <span>Automation Status</span>
            </CardTitle>
            <CardDescription>Active workflow performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automationWorkflows
                .filter((w) => w.status === "active")
                .map((workflow) => (
                  <div
                    key={workflow.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <h4 className="font-medium">{workflow.name}</h4>
                        <p className="text-sm text-slate-600">
                          {workflow.executions} executions
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Success:{" "}
                        <span className="text-green-600">
                          {workflow.successRate}%
                        </span>
                      </div>
                      <div className="text-xs text-slate-600">
                        Saved: {formatCurrency(workflow.costSaved)}
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

  const renderModelsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Model Management</CardTitle>
          <CardDescription>
            Monitor and manage all AI models across your enterprise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Model</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Accuracy</th>
                  <th className="text-left p-3">Confidence</th>
                  <th className="text-left p-3">Predictions</th>
                  <th className="text-left p-3">Last Trained</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {aiModels.map((model) => (
                  <tr key={model.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(model.status)}
                        <div>
                          <span className="font-medium">{model.name}</span>
                          <p className="text-xs text-slate-600">
                            {model.domain}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{model.type}</Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          model.status === "active"
                            ? "default"
                            : model.status === "training"
                              ? "secondary"
                              : model.status === "paused"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {model.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className={
                            model.accuracy >= 90
                              ? "text-green-600"
                              : model.accuracy >= 80
                                ? "text-yellow-600"
                                : "text-red-600"
                          }
                        >
                          {model.accuracy}%
                        </span>
                        <Progress value={model.accuracy} className="w-16 h-2" />
                      </div>
                    </td>
                    <td className="p-3">{model.confidence}%</td>
                    <td className="p-3">
                      {model.predictions.toLocaleString()}
                    </td>
                    <td className="p-3">
                      {model.lastTrained.toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={model.status === "training"}
                        >
                          {model.status === "active" ? (
                            <PauseCircle className="h-3 w-3" />
                          ) : model.status === "paused" ? (
                            <PlayCircle className="h-3 w-3" />
                          ) : model.status === "training" ? (
                            <Clock className="h-3 w-3" />
                          ) : (
                            <PlayCircle className="h-3 w-3" />
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
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
    </div>
  );

  const renderInsightsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>AI-Generated Insights</span>
            </CardTitle>
            <CardDescription>
              Strategic recommendations from machine learning analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <div className="flex space-x-2">
                      <Badge
                        variant={
                          insight.category === "revenue"
                            ? "default"
                            : insight.category === "customer"
                              ? "secondary"
                              : insight.category === "operations"
                                ? "outline"
                                : insight.category === "risk"
                                  ? "destructive"
                                  : "default"
                        }
                      >
                        {insight.category}
                      </Badge>
                      <Badge
                        variant={
                          insight.impact === "high"
                            ? "destructive"
                            : insight.impact === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {insight.impact}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    {insight.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-slate-500">Value Impact:</span>
                      <p className="font-medium text-green-600">
                        {formatCurrency(insight.value)}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Confidence:</span>
                      <p className="font-medium">{insight.confidence}%</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Timeline:</span>
                      <p className="font-medium">{insight.timeframe}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" disabled={!insight.actionable}>
                      <PlayCircle className="h-3 w-3 mr-1" />
                      Implement
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      Generate Report
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Discuss
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
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Predictive Analytics</span>
            </CardTitle>
            <CardDescription>
              Forward-looking predictions and trend analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictiveAnalytics.map((prediction, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{prediction.category}</h4>
                    <Badge variant="outline">
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="text-slate-500 text-sm">Current:</span>
                      <p className="font-medium">
                        {prediction.category.includes("Revenue") ||
                        prediction.category.includes("Cost")
                          ? formatCurrency(prediction.current)
                          : prediction.category.includes("Rate") ||
                              prediction.category.includes("Efficiency")
                            ? `${prediction.current}%`
                            : `$${prediction.current}`}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-sm">Predicted:</span>
                      <p
                        className={`font-medium ${prediction.trend === "up" ? "text-green-600" : prediction.trend === "down" ? "text-red-600" : "text-gray-600"}`}
                      >
                        {prediction.category.includes("Revenue") ||
                        prediction.category.includes("Cost")
                          ? formatCurrency(prediction.predicted)
                          : prediction.category.includes("Rate") ||
                              prediction.category.includes("Efficiency")
                            ? `${prediction.predicted}%`
                            : `$${prediction.predicted}`}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="text-slate-500 text-sm">Key Factors:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {prediction.factors.map((factor, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAutomationTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <span>Automation Workflows</span>
          </CardTitle>
          <CardDescription>
            Intelligent automation for business processes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {automationWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(workflow.status)}
                    <div>
                      <h4 className="font-semibold">{workflow.name}</h4>
                      <p className="text-sm text-slate-600">
                        {workflow.description}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      workflow.status === "active"
                        ? "default"
                        : workflow.status === "paused"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {workflow.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-2">
                      Triggers:
                    </h5>
                    <div className="space-y-1">
                      {workflow.triggers.map((trigger, index) => (
                        <div
                          key={index}
                          className="text-sm text-slate-600 flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{trigger}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-slate-700 mb-2">
                      Actions:
                    </h5>
                    <div className="space-y-1">
                      {workflow.actions.map((action, index) => (
                        <div
                          key={index}
                          className="text-sm text-slate-600 flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {workflow.status !== "draft" && (
                  <div className="grid grid-cols-4 gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {workflow.executions}
                      </div>
                      <div className="text-xs text-slate-600">Executions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {workflow.successRate}%
                      </div>
                      <div className="text-xs text-slate-600">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {workflow.timeSaved}h
                      </div>
                      <div className="text-xs text-slate-600">Time Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">
                        {formatCurrency(workflow.costSaved)}
                      </div>
                      <div className="text-xs text-slate-600">Cost Saved</div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  {workflow.status === "draft" ? (
                    <Button size="sm">
                      <PlayCircle className="h-3 w-3 mr-1" />
                      Deploy Workflow
                    </Button>
                  ) : workflow.status === "active" ? (
                    <Button size="sm" variant="outline">
                      <PauseCircle className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button size="sm">
                      <PlayCircle className="h-3 w-3 mr-1" />
                      Resume
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    Monitor
                  </Button>
                  <Button size="sm" variant="outline">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Analytics
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <EnhancedNavigation />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-2">
                  <Brain className="h-8 w-8 text-purple-600" />
                  <span>AI Intelligence Hub</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Advanced AI models, predictive analytics, and intelligent
                  automation
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedTimeframe}
                  onValueChange={setSelectedTimeframe}
                >
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
                <Select
                  value={selectedDomain}
                  onValueChange={setSelectedDomain}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={loadAIData}
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
              <TabsTrigger value="overview">AI Overview</TabsTrigger>
              <TabsTrigger value="models">Model Management</TabsTrigger>
              <TabsTrigger value="insights">Insights & Predictions</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">{renderOverviewTab()}</TabsContent>
            <TabsContent value="models">{renderModelsTab()}</TabsContent>
            <TabsContent value="insights">{renderInsightsTab()}</TabsContent>
            <TabsContent value="automation">
              {renderAutomationTab()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AIIntelligenceHub;
