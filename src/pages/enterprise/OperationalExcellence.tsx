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
  Target,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Users,
  Cog,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Percent,
  Building,
  Factory,
  Settings,
  Eye,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RotateCcw,
  FileText,
  Lightbulb,
  Wrench,
  Shield,
  Globe,
  Database,
  Network,
} from "lucide-react";

interface ProcessMetrics {
  processId: string;
  name: string;
  efficiency: number;
  throughput: number;
  errorRate: number;
  cycleTime: number;
  cost: number;
  trend: "up" | "down" | "stable";
  status: "optimal" | "degraded" | "critical";
  automation: number;
}

interface OperationalKPI {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: number;
  category: "efficiency" | "quality" | "cost" | "time";
  priority: "high" | "medium" | "low";
}

interface ProcessOptimization {
  id: string;
  title: string;
  description: string;
  impact: string;
  effort: "low" | "medium" | "high";
  roi: number;
  timeline: string;
  department: string;
  status: "suggested" | "in-progress" | "completed";
}

interface AutomationOpportunity {
  id: string;
  process: string;
  description: string;
  potentialSavings: number;
  implementationCost: number;
  roi: number;
  complexity: "low" | "medium" | "high";
  timeToImplement: string;
}

const OperationalExcellence: React.FC = () => {
  const { canAccess } = useEnterpriseTier();
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  // Check tier access
  if (!canAccess("gold")) {
    return (
      <TierRestriction
        requiredTier="gold"
        feature="Operational Excellence Center"
        description="Access advanced process optimization, automation opportunities, and operational analytics with Gold tier or higher."
        showPreview={true}
      >
        <div className="h-96 bg-gradient-to-br from-slate-100 to-purple-100 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">
            Process Optimization Dashboard
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <div className="text-sm text-gray-600">Efficiency Score</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">
                Optimization Opportunities
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">$2.4M</div>
              <div className="text-sm text-gray-600">Potential Savings</div>
            </div>
          </div>
        </div>
      </TierRestriction>
    );
  }

  const [processMetrics, setProcessMetrics] = useState<ProcessMetrics[]>([
    {
      processId: "order-fulfillment",
      name: "Order Fulfillment",
      efficiency: 94.2,
      throughput: 1847,
      errorRate: 0.3,
      cycleTime: 2.4,
      cost: 12.5,
      trend: "up",
      status: "optimal",
      automation: 78,
    },
    {
      processId: "inventory-management",
      name: "Inventory Management",
      efficiency: 87.6,
      throughput: 3422,
      errorRate: 1.2,
      cycleTime: 4.1,
      cost: 8.3,
      trend: "down",
      status: "degraded",
      automation: 65,
    },
    {
      processId: "customer-onboarding",
      name: "Customer Onboarding",
      efficiency: 91.8,
      throughput: 156,
      errorRate: 2.1,
      cycleTime: 12.3,
      cost: 45.2,
      trend: "up",
      status: "optimal",
      automation: 45,
    },
    {
      processId: "supplier-management",
      name: "Supplier Management",
      efficiency: 76.4,
      throughput: 89,
      errorRate: 4.5,
      cycleTime: 18.7,
      cost: 67.8,
      trend: "down",
      status: "critical",
      automation: 32,
    },
    {
      processId: "quality-control",
      name: "Quality Control",
      efficiency: 98.1,
      throughput: 2341,
      errorRate: 0.1,
      cycleTime: 1.8,
      cost: 5.6,
      trend: "stable",
      status: "optimal",
      automation: 89,
    },
  ]);

  const [operationalKPIs, setOperationalKPIs] = useState<OperationalKPI[]>([
    {
      name: "Overall Equipment Effectiveness",
      value: 87.3,
      target: 90.0,
      unit: "%",
      trend: +2.1,
      category: "efficiency",
      priority: "high",
    },
    {
      name: "First Pass Yield",
      value: 94.7,
      target: 95.0,
      unit: "%",
      trend: +0.8,
      category: "quality",
      priority: "medium",
    },
    {
      name: "Cost Per Unit",
      value: 23.45,
      target: 22.0,
      unit: "$",
      trend: -1.2,
      category: "cost",
      priority: "high",
    },
    {
      name: "Cycle Time Reduction",
      value: 15.2,
      target: 20.0,
      unit: "%",
      trend: +3.4,
      category: "time",
      priority: "medium",
    },
    {
      name: "Process Automation Rate",
      value: 68.5,
      target: 75.0,
      unit: "%",
      trend: +5.2,
      category: "efficiency",
      priority: "high",
    },
    {
      name: "Error Rate",
      value: 1.2,
      target: 0.8,
      unit: "%",
      trend: -0.3,
      category: "quality",
      priority: "medium",
    },
  ]);

  const [processOptimizations, setProcessOptimizations] = useState<
    ProcessOptimization[]
  >([
    {
      id: "supplier-automation",
      title: "Automate Supplier Onboarding",
      description:
        "Implement AI-powered supplier verification and automated contract generation",
      impact: "65% reduction in onboarding time, 40% cost savings",
      effort: "high",
      roi: 340,
      timeline: "6-8 months",
      department: "Procurement",
      status: "suggested",
    },
    {
      id: "inventory-optimization",
      title: "Dynamic Inventory Optimization",
      description: "ML-driven demand forecasting with automated reorder points",
      impact: "23% inventory cost reduction, 15% stockout reduction",
      effort: "medium",
      roi: 275,
      timeline: "3-4 months",
      department: "Supply Chain",
      status: "in-progress",
    },
    {
      id: "quality-prediction",
      title: "Predictive Quality Analytics",
      description: "Real-time quality prediction using IoT sensors and AI",
      impact: "45% defect reduction, 12% cost savings",
      effort: "high",
      roi: 420,
      timeline: "8-10 months",
      department: "Manufacturing",
      status: "suggested",
    },
    {
      id: "workflow-streamlining",
      title: "Cross-Department Workflow Integration",
      description:
        "Unified workflow management across sales, operations, and finance",
      impact: "30% faster decision making, 25% efficiency gain",
      effort: "medium",
      roi: 190,
      timeline: "4-6 months",
      department: "Operations",
      status: "completed",
    },
  ]);

  const [automationOpportunities, setAutomationOpportunities] = useState<
    AutomationOpportunity[]
  >([
    {
      id: "invoice-processing",
      process: "Invoice Processing",
      description:
        "Automated invoice capture, validation, and approval workflow",
      potentialSavings: 180000,
      implementationCost: 45000,
      roi: 300,
      complexity: "medium",
      timeToImplement: "2-3 months",
    },
    {
      id: "customer-support",
      process: "Customer Support Triage",
      description: "AI-powered ticket classification and routing system",
      potentialSavings: 240000,
      implementationCost: 60000,
      roi: 300,
      complexity: "high",
      timeToImplement: "4-5 months",
    },
    {
      id: "compliance-reporting",
      process: "Compliance Reporting",
      description: "Automated regulatory report generation and submission",
      potentialSavings: 120000,
      implementationCost: 25000,
      roi: 380,
      complexity: "low",
      timeToImplement: "1-2 months",
    },
    {
      id: "data-migration",
      process: "Data Migration & Sync",
      description: "Real-time data synchronization across enterprise systems",
      potentialSavings: 300000,
      implementationCost: 80000,
      roi: 275,
      complexity: "high",
      timeToImplement: "6-8 months",
    },
  ]);

  useEffect(() => {
    loadOperationalData();
  }, [selectedTimeframe, selectedDepartment]);

  const loadOperationalData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real implementation, fetch data based on timeframe and department
    } catch (error) {
      console.error("Failed to load operational data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-600";
      case "degraded":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <ArrowUp className="h-4 w-4 text-gray-600" />;
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operationalKPIs.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {kpi.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">
                  {kpi.value}
                  {kpi.unit}
                </div>
                <div
                  className={`flex items-center space-x-1 ${kpi.trend >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {kpi.trend >= 0 ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )}
                  <span className="text-sm">{Math.abs(kpi.trend)}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  Target: {kpi.target}
                  {kpi.unit}
                </span>
                <Badge
                  variant={
                    kpi.priority === "high"
                      ? "destructive"
                      : kpi.priority === "medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {kpi.priority}
                </Badge>
              </div>
              <Progress
                value={(kpi.value / kpi.target) * 100}
                className="mt-2 h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Process Health Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span>Process Health Overview</span>
          </CardTitle>
          <CardDescription>
            Real-time monitoring of critical business processes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {processMetrics.slice(0, 3).map((process) => (
                <div
                  key={process.processId}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(process.status)}
                    <div>
                      <h4 className="font-semibold">{process.name}</h4>
                      <p className="text-sm text-slate-600">
                        Efficiency: {process.efficiency}% • Automation:{" "}
                        {process.automation}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(process.trend)}
                    <span
                      className={`text-sm font-medium ${getStatusColor(process.status)}`}
                    >
                      {process.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {processMetrics.slice(3).map((process) => (
                <div
                  key={process.processId}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(process.status)}
                    <div>
                      <h4 className="font-semibold">{process.name}</h4>
                      <p className="text-sm text-slate-600">
                        Efficiency: {process.efficiency}% • Automation:{" "}
                        {process.automation}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(process.trend)}
                    <span
                      className={`text-sm font-medium ${getStatusColor(process.status)}`}
                    >
                      {process.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
                <AlertTitle>Supplier Management Process Critical</AlertTitle>
                <AlertDescription>
                  Error rate at 4.5% (target: 1.0%). Manual processes causing
                  delays and quality issues.
                </AlertDescription>
              </Alert>
              <Alert className="border-yellow-200 bg-yellow-50">
                <Clock className="h-4 w-4" />
                <AlertTitle>Inventory Management Degraded</AlertTitle>
                <AlertDescription>
                  Efficiency dropped to 87.6%. Consider implementing ML-driven
                  forecasting.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <span>Quick Wins</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800">
                  Compliance Automation
                </h4>
                <p className="text-sm text-green-700">
                  380% ROI in 1-2 months. Low complexity implementation.
                </p>
                <Button
                  size="sm"
                  className="mt-2 bg-green-600 hover:bg-green-700"
                >
                  Start Project
                </Button>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800">
                  Invoice Processing
                </h4>
                <p className="text-sm text-blue-700">
                  300% ROI in 2-3 months. Medium complexity automation.
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProcessesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Process Performance Matrix</CardTitle>
          <CardDescription>
            Detailed analysis of all business processes with efficiency and
            automation metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Process</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Efficiency</th>
                  <th className="text-left p-3">Throughput</th>
                  <th className="text-left p-3">Error Rate</th>
                  <th className="text-left p-3">Cycle Time</th>
                  <th className="text-left p-3">Cost/Unit</th>
                  <th className="text-left p-3">Automation</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {processMetrics.map((process) => (
                  <tr
                    key={process.processId}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(process.status)}
                        <span className="font-medium">{process.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          process.status === "optimal"
                            ? "default"
                            : process.status === "degraded"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {process.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className={
                            process.efficiency >= 90
                              ? "text-green-600"
                              : process.efficiency >= 80
                                ? "text-yellow-600"
                                : "text-red-600"
                          }
                        >
                          {process.efficiency}%
                        </span>
                        {getTrendIcon(process.trend)}
                      </div>
                    </td>
                    <td className="p-3">
                      {process.throughput.toLocaleString()}/day
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          process.errorRate <= 1
                            ? "text-green-600"
                            : process.errorRate <= 3
                              ? "text-yellow-600"
                              : "text-red-600"
                        }
                      >
                        {process.errorRate}%
                      </span>
                    </td>
                    <td className="p-3">{process.cycleTime}h</td>
                    <td className="p-3">${process.cost}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={process.automation}
                          className="w-16 h-2"
                        />
                        <span className="text-xs">{process.automation}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
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
    </div>
  );

  const renderOptimizationTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span>Process Optimizations</span>
            </CardTitle>
            <CardDescription>
              Strategic improvements to boost operational efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processOptimizations.map((optimization) => (
                <div
                  key={optimization.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{optimization.title}</h4>
                    <Badge
                      variant={
                        optimization.status === "completed"
                          ? "default"
                          : optimization.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {optimization.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    {optimization.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Impact:</span>
                      <p className="font-medium">{optimization.impact}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">ROI:</span>
                      <p className="font-medium text-green-600">
                        {optimization.roi}%
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Timeline:</span>
                      <p className="font-medium">{optimization.timeline}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Department:</span>
                      <p className="font-medium">{optimization.department}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button
                      size="sm"
                      disabled={optimization.status === "completed"}
                    >
                      {optimization.status === "suggested" ? (
                        <PlayCircle className="h-3 w-3 mr-1" />
                      ) : optimization.status === "in-progress" ? (
                        <PauseCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {optimization.status === "suggested"
                        ? "Start"
                        : optimization.status === "in-progress"
                          ? "Pause"
                          : "Completed"}
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
              <Zap className="h-5 w-5 text-yellow-600" />
              <span>Automation Opportunities</span>
            </CardTitle>
            <CardDescription>
              AI and automation recommendations for maximum efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automationOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold mb-1">{opportunity.process}</h4>
                  <p className="text-sm text-slate-600 mb-3">
                    {opportunity.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-slate-500">Annual Savings:</span>
                      <p className="font-medium text-green-600">
                        ${(opportunity.potentialSavings / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Implementation:</span>
                      <p className="font-medium">
                        ${(opportunity.implementationCost / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">ROI:</span>
                      <p className="font-medium text-purple-600">
                        {opportunity.roi}%
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Timeline:</span>
                      <p className="font-medium">
                        {opportunity.timeToImplement}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        opportunity.complexity === "low"
                          ? "default"
                          : opportunity.complexity === "medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {opportunity.complexity} complexity
                    </Badge>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Start Automation
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calculator className="h-3 w-3 mr-1" />
                        ROI Calculator
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
      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Efficiency Trends</CardTitle>
            <CardDescription>Process efficiency over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">
                  Efficiency trend chart would display here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis</CardTitle>
            <CardDescription>
              Process costs and optimization impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">
                  Cost analysis chart would display here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Benchmarks</CardTitle>
          <CardDescription>
            Compare your performance against industry standards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {operationalKPIs.map((kpi, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{kpi.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-slate-600">
                      Your Score: {kpi.value}
                      {kpi.unit}
                    </span>
                    <span className="text-sm text-slate-600">
                      Industry Avg: {(kpi.target * 0.9).toFixed(1)}
                      {kpi.unit}
                    </span>
                    <span className="text-sm text-slate-600">
                      Best in Class: {(kpi.target * 1.1).toFixed(1)}
                      {kpi.unit}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={kpi.value >= kpi.target ? "default" : "secondary"}
                  >
                    {kpi.value >= kpi.target ? "Above Target" : "Below Target"}
                  </Badge>
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
                  <Target className="h-8 w-8 text-purple-600" />
                  <span>Operational Excellence Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Advanced process optimization and performance analytics
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
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="supply-chain">Supply Chain</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={loadOperationalData}
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
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="processes">Process Matrix</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">{renderOverviewTab()}</TabsContent>
            <TabsContent value="processes">{renderProcessesTab()}</TabsContent>
            <TabsContent value="optimization">
              {renderOptimizationTab()}
            </TabsContent>
            <TabsContent value="analytics">{renderAnalyticsTab()}</TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default OperationalExcellence;
