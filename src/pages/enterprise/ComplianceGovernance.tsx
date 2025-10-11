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
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Building,
  Globe,
  Lock,
  Unlock,
  Eye,
  Settings,
  Download,
  RefreshCw,
  Calendar,
  Star,
  Award,
  Target,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Percent,
  DollarSign,
  Phone,
  Mail,
  MessageSquare,
  Search,
  Filter,
  Archive,
  BookOpen,
  Scale,
  Gavel,
  FileCheck,
  AlertCircle,
  Info,
  XCircle,
} from "lucide-react";

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  type: "regulatory" | "industry" | "internal";
  status: "compliant" | "partial" | "non-compliant" | "pending";
  score: number;
  requirements: number;
  completed: number;
  deadline: Date;
  jurisdiction: string;
  criticality: "high" | "medium" | "low";
}

interface PolicyDocument {
  id: string;
  title: string;
  version: string;
  status: "active" | "draft" | "archived" | "review";
  lastUpdated: Date;
  nextReview: Date;
  approver: string;
  category: string;
  compliance: string[];
}

interface AuditItem {
  id: string;
  title: string;
  type: "internal" | "external" | "regulatory";
  status: "scheduled" | "in-progress" | "completed" | "failed";
  auditor: string;
  startDate: Date;
  endDate: Date;
  findings: number;
  severity: "critical" | "high" | "medium" | "low";
  framework: string;
}

interface RiskAssessment {
  id: string;
  category: string;
  description: string;
  likelihood: "high" | "medium" | "low";
  impact: "high" | "medium" | "low";
  riskLevel: "critical" | "high" | "medium" | "low";
  mitigation: string;
  owner: string;
  status: "open" | "mitigated" | "accepted" | "transferred";
  reviewDate: Date;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  mandatory: boolean;
  completionRate: number;
  deadline: Date;
  estimatedTime: number;
  category: string;
  compliance: string[];
}

const ComplianceGovernance: React.FC = () => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("all");
  const [selectedFramework, setSelectedFramework] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  const [complianceFrameworks, setComplianceFrameworks] = useState<
    ComplianceFramework[]
  >([
    {
      id: "gdpr",
      name: "GDPR",
      description: "General Data Protection Regulation",
      type: "regulatory",
      status: "compliant",
      score: 95.8,
      requirements: 99,
      completed: 95,
      deadline: new Date("2024-05-25"),
      jurisdiction: "EU",
      criticality: "high",
    },
    {
      id: "sox",
      name: "SOX",
      description: "Sarbanes-Oxley Act",
      type: "regulatory",
      status: "compliant",
      score: 92.1,
      requirements: 156,
      completed: 144,
      deadline: new Date("2024-03-31"),
      jurisdiction: "US",
      criticality: "high",
    },
    {
      id: "iso27001",
      name: "ISO 27001",
      description: "Information Security Management",
      type: "industry",
      status: "partial",
      score: 78.4,
      requirements: 114,
      completed: 89,
      deadline: new Date("2024-06-30"),
      jurisdiction: "Global",
      criticality: "high",
    },
    {
      id: "hipaa",
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act",
      type: "regulatory",
      status: "compliant",
      score: 97.2,
      requirements: 45,
      completed: 44,
      deadline: new Date("2024-12-31"),
      jurisdiction: "US",
      criticality: "medium",
    },
    {
      id: "pci-dss",
      name: "PCI DSS",
      description: "Payment Card Industry Data Security Standard",
      type: "industry",
      status: "non-compliant",
      score: 65.3,
      requirements: 78,
      completed: 51,
      deadline: new Date("2024-02-15"),
      jurisdiction: "Global",
      criticality: "high",
    },
  ]);

  const [policyDocuments, setPolicyDocuments] = useState<PolicyDocument[]>([
    {
      id: "data-privacy",
      title: "Data Privacy Policy",
      version: "3.2",
      status: "active",
      lastUpdated: new Date("2024-01-15"),
      nextReview: new Date("2024-07-15"),
      approver: "Chief Privacy Officer",
      category: "Data Protection",
      compliance: ["GDPR", "CCPA"],
    },
    {
      id: "security-policy",
      title: "Information Security Policy",
      version: "2.8",
      status: "review",
      lastUpdated: new Date("2023-12-10"),
      nextReview: new Date("2024-02-10"),
      approver: "CISO",
      category: "Security",
      compliance: ["ISO 27001", "SOX"],
    },
    {
      id: "financial-controls",
      title: "Financial Controls Framework",
      version: "4.1",
      status: "active",
      lastUpdated: new Date("2024-01-20"),
      nextReview: new Date("2024-04-20"),
      approver: "CFO",
      category: "Financial",
      compliance: ["SOX", "GAAP"],
    },
    {
      id: "hr-policy",
      title: "Human Resources Policy",
      version: "1.5",
      status: "draft",
      lastUpdated: new Date("2024-01-10"),
      nextReview: new Date("2024-03-10"),
      approver: "CHRO",
      category: "Human Resources",
      compliance: ["EEOC", "OSHA"],
    },
  ]);

  const [auditItems, setAuditItems] = useState<AuditItem[]>([
    {
      id: "internal-q1",
      title: "Q1 Internal Security Audit",
      type: "internal",
      status: "completed",
      auditor: "Internal Audit Team",
      startDate: new Date("2024-01-05"),
      endDate: new Date("2024-01-19"),
      findings: 3,
      severity: "medium",
      framework: "ISO 27001",
    },
    {
      id: "sox-annual",
      title: "SOX Annual Compliance Audit",
      type: "external",
      status: "in-progress",
      auditor: "Ernst & Young",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-03-15"),
      findings: 0,
      severity: "low",
      framework: "SOX",
    },
    {
      id: "gdpr-assessment",
      title: "GDPR Compliance Assessment",
      type: "external",
      status: "scheduled",
      auditor: "Privacy Consultants Ltd",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-02-14"),
      findings: 0,
      severity: "low",
      framework: "GDPR",
    },
    {
      id: "pci-quarterly",
      title: "PCI DSS Quarterly Scan",
      type: "regulatory",
      status: "failed",
      auditor: "Approved Scanning Vendor",
      startDate: new Date("2024-01-20"),
      endDate: new Date("2024-01-22"),
      findings: 8,
      severity: "critical",
      framework: "PCI DSS",
    },
  ]);

  const [riskAssessments, setRiskAssessments] = useState<RiskAssessment[]>([
    {
      id: "data-breach",
      category: "Data Security",
      description: "Potential data breach through third-party integrations",
      likelihood: "medium",
      impact: "high",
      riskLevel: "high",
      mitigation: "Enhanced vendor security assessments and monitoring",
      owner: "CISO",
      status: "mitigated",
      reviewDate: new Date("2024-03-01"),
    },
    {
      id: "regulatory-change",
      category: "Regulatory",
      description: "New privacy regulations in emerging markets",
      likelihood: "high",
      impact: "medium",
      riskLevel: "medium",
      mitigation: "Continuous regulatory monitoring and legal consultation",
      owner: "Chief Privacy Officer",
      status: "open",
      reviewDate: new Date("2024-02-15"),
    },
    {
      id: "vendor-compliance",
      category: "Third Party",
      description: "Key vendor failing compliance requirements",
      likelihood: "low",
      impact: "high",
      riskLevel: "medium",
      mitigation: "Diversify vendor portfolio and enhance due diligence",
      owner: "Procurement",
      status: "accepted",
      reviewDate: new Date("2024-04-01"),
    },
  ]);

  const [trainingModules, setTrainingModules] = useState<TrainingModule[]>([
    {
      id: "data-privacy-101",
      title: "Data Privacy Fundamentals",
      description: "Essential data privacy principles and practices",
      mandatory: true,
      completionRate: 94.2,
      deadline: new Date("2024-03-31"),
      estimatedTime: 45,
      category: "Privacy",
      compliance: ["GDPR", "CCPA"],
    },
    {
      id: "security-awareness",
      title: "Security Awareness Training",
      description: "Cybersecurity best practices and threat awareness",
      mandatory: true,
      completionRate: 87.6,
      deadline: new Date("2024-02-28"),
      estimatedTime: 60,
      category: "Security",
      compliance: ["ISO 27001"],
    },
    {
      id: "financial-ethics",
      title: "Financial Ethics and Controls",
      description: "Financial reporting ethics and internal controls",
      mandatory: true,
      completionRate: 91.3,
      deadline: new Date("2024-04-15"),
      estimatedTime: 30,
      category: "Financial",
      compliance: ["SOX"],
    },
  ]);

  useEffect(() => {
    loadComplianceData();
  }, [selectedJurisdiction, selectedFramework]);

  const loadComplianceData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real implementation, fetch data based on filters
    } catch (error) {
      console.error("Failed to load compliance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
      case "active":
      case "completed":
      case "mitigated":
        return "text-green-600";
      case "partial":
      case "review":
      case "in-progress":
      case "open":
        return "text-yellow-600";
      case "non-compliant":
      case "failed":
      case "critical":
        return "text-red-600";
      case "draft":
      case "scheduled":
      case "accepted":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
      case "active":
      case "completed":
      case "mitigated":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "partial":
      case "review":
      case "in-progress":
      case "open":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "non-compliant":
      case "failed":
      case "critical":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "draft":
      case "scheduled":
      case "accepted":
        return <FileText className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-600";
      case "high":
        return "bg-red-400";
      case "medium":
        return "bg-yellow-400";
      case "low":
        return "bg-green-400";
      default:
        return "bg-gray-400";
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Compliance Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Overall Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  complianceFrameworks.reduce((sum, f) => sum + f.score, 0) /
                    complianceFrameworks.length,
                )}
                %
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+2.3%</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Above target (85%)</p>
            <Progress
              value={Math.round(
                complianceFrameworks.reduce((sum, f) => sum + f.score, 0) /
                  complianceFrameworks.length,
              )}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Frameworks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                {
                  complianceFrameworks.filter(
                    (f) => f.status === "compliant" || f.status === "partial",
                  ).length
                }
              </div>
              <div className="flex items-center text-blue-600">
                <Shield className="h-4 w-4 mr-1" />
                <span className="text-sm">Active</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {complianceFrameworks.length} total frameworks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-orange-600">
                {complianceFrameworks.reduce(
                  (sum, f) => sum + (f.requirements - f.completed),
                  0,
                )}
              </div>
              <div className="flex items-center text-orange-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm">Required</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Across all frameworks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Training Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(
                  trainingModules.reduce(
                    (sum, t) => sum + t.completionRate,
                    0,
                  ) / trainingModules.length,
                )}
                %
              </div>
              <div className="flex items-center text-purple-600">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">Complete</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Average across modules
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Framework Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Compliance Framework Status</span>
          </CardTitle>
          <CardDescription>
            Current status of all regulatory and industry compliance frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceFrameworks.map((framework) => (
              <div
                key={framework.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(framework.status)}
                    <div>
                      <h4 className="font-semibold">{framework.name}</h4>
                      <p className="text-sm text-slate-600">
                        {framework.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      variant={
                        framework.criticality === "high"
                          ? "destructive"
                          : framework.criticality === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {framework.criticality}
                    </Badge>
                    <Badge variant="outline">{framework.jurisdiction}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {framework.score}%
                    </div>
                    <div className="text-xs text-slate-600">
                      Compliance Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {framework.completed}/{framework.requirements}
                    </div>
                    <div className="text-xs text-slate-600">Requirements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {framework.deadline.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-600">Next Deadline</div>
                  </div>
                  <div className="text-center">
                    <Badge
                      variant={
                        framework.status === "compliant"
                          ? "default"
                          : framework.status === "partial"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {framework.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={(framework.completed / framework.requirements) * 100}
                  className="mb-3"
                />
                <div className="flex space-x-2">
                  <Button size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileCheck className="h-3 w-3 mr-1" />
                    Assessment
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Report
                  </Button>
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
                <AlertTitle>PCI DSS Non-Compliance</AlertTitle>
                <AlertDescription>
                  Critical vulnerabilities found in payment processing system.
                  Immediate remediation required.
                </AlertDescription>
              </Alert>
              <Alert className="border-yellow-200 bg-yellow-50">
                <Clock className="h-4 w-4" />
                <AlertTitle>ISO 27001 Partial Compliance</AlertTitle>
                <AlertDescription>
                  25 requirements pending completion. Target completion: June
                  30, 2024.
                </AlertDescription>
              </Alert>
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4" />
                <AlertTitle>Upcoming GDPR Review</AlertTitle>
                <AlertDescription>
                  Annual GDPR compliance review scheduled for February 1-14,
                  2024.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Training Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingModules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{module.title}</h4>
                    <p className="text-sm text-slate-600">
                      {module.estimatedTime} min • Deadline:{" "}
                      {module.deadline.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">
                      {module.completionRate}%
                    </div>
                    <Progress
                      value={module.completionRate}
                      className="w-20 h-2 mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPoliciesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>Policy Management</span>
          </CardTitle>
          <CardDescription>
            Corporate policies, procedures, and governance documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Policy</th>
                  <th className="text-left p-3">Version</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Last Updated</th>
                  <th className="text-left p-3">Next Review</th>
                  <th className="text-left p-3">Approver</th>
                  <th className="text-left p-3">Compliance</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {policyDocuments.map((policy) => (
                  <tr key={policy.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(policy.status)}
                        <span className="font-medium">{policy.title}</span>
                      </div>
                    </td>
                    <td className="p-3">{policy.version}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          policy.status === "active"
                            ? "default"
                            : policy.status === "review"
                              ? "secondary"
                              : policy.status === "draft"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {policy.status}
                      </Badge>
                    </td>
                    <td className="p-3">{policy.category}</td>
                    <td className="p-3">
                      {policy.lastUpdated.toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          policy.nextReview < new Date()
                            ? "text-red-600"
                            : "text-slate-600"
                        }
                      >
                        {policy.nextReview.toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-3">{policy.approver}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {policy.compliance.map((comp, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {comp}
                          </Badge>
                        ))}
                      </div>
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
    </div>
  );

  const renderAuditsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-blue-600" />
              <span>Audit Schedule</span>
            </CardTitle>
            <CardDescription>
              Internal and external audit activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditItems.map((audit) => (
                <div
                  key={audit.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(audit.status)}
                      <h4 className="font-semibold">{audit.title}</h4>
                    </div>
                    <div className="flex space-x-2">
                      <Badge
                        variant={
                          audit.type === "internal"
                            ? "default"
                            : audit.type === "external"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {audit.type}
                      </Badge>
                      <Badge
                        variant={
                          audit.severity === "critical"
                            ? "destructive"
                            : audit.severity === "high"
                              ? "default"
                              : audit.severity === "medium"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {audit.severity}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-slate-500">Auditor:</span>
                      <p className="font-medium">{audit.auditor}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Framework:</span>
                      <p className="font-medium">{audit.framework}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Start Date:</span>
                      <p className="font-medium">
                        {audit.startDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">End Date:</span>
                      <p className="font-medium">
                        {audit.endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {audit.status === "completed" || audit.status === "failed" ? (
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Findings:</span>
                        <span
                          className={`font-bold ${audit.findings > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {audit.findings}
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      Report
                    </Button>
                    {audit.status === "completed" && (
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    )}
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
              Compliance risk monitoring and mitigation
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
                    <h4 className="font-semibold">{risk.category}</h4>
                    <div className="flex space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getRiskColor(risk.riskLevel)}`}
                      ></div>
                      <Badge
                        variant={
                          risk.riskLevel === "critical"
                            ? "destructive"
                            : risk.riskLevel === "high"
                              ? "default"
                              : risk.riskLevel === "medium"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {risk.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    {risk.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-slate-500">Likelihood:</span>
                      <p className="font-medium">{risk.likelihood}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Impact:</span>
                      <p className="font-medium">{risk.impact}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Owner:</span>
                      <p className="font-medium">{risk.owner}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Review Date:</span>
                      <p className="font-medium">
                        {risk.reviewDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="text-slate-500 text-sm">Mitigation:</span>
                    <p className="text-sm font-medium">{risk.mitigation}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        risk.status === "mitigated"
                          ? "default"
                          : risk.status === "open"
                            ? "destructive"
                            : risk.status === "accepted"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {risk.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Update
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

  const renderReportsTab = () => (
    <div className="space-y-6">
      {/* Compliance Reporting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Compliance Reporting</span>
          </CardTitle>
          <CardDescription>
            Generate compliance reports and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Standard Reports</h4>
              {[
                "Compliance Dashboard",
                "Framework Status Report",
                "Audit Summary",
                "Risk Assessment Report",
                "Training Completion Report",
                "Policy Review Status",
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <span className="font-medium">{report}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Regulatory Reports</h4>
              {[
                "GDPR Compliance Report",
                "SOX Controls Assessment",
                "ISO 27001 Gap Analysis",
                "PCI DSS Status Report",
                "HIPAA Compliance Summary",
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <span className="font-medium">{report}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Executive Reports</h4>
              {[
                "Board Compliance Summary",
                "Executive Risk Dashboard",
                "Compliance Scorecard",
                "Regulatory Updates",
                "Compliance Metrics",
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <span className="font-medium">{report}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Trends</CardTitle>
            <CardDescription>Historical compliance performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">
                  Compliance trends chart would display here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Heat Map</CardTitle>
            <CardDescription>
              Risk distribution across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">
                  Risk heat map would display here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
                  <Shield className="h-8 w-8 text-blue-600" />
                  <span>Compliance & Governance Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Comprehensive regulatory compliance and corporate governance
                  management
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedJurisdiction}
                  onValueChange={setSelectedJurisdiction}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jurisdictions</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                    <SelectItem value="global">Global</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedFramework}
                  onValueChange={setSelectedFramework}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frameworks</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                    <SelectItem value="industry">Industry</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={loadComplianceData}
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
              <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
              <TabsTrigger value="policies">Policies & Procedures</TabsTrigger>
              <TabsTrigger value="audits">Audits & Risk</TabsTrigger>
              <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">{renderOverviewTab()}</TabsContent>
            <TabsContent value="policies">{renderPoliciesTab()}</TabsContent>
            <TabsContent value="audits">{renderAuditsTab()}</TabsContent>
            <TabsContent value="reports">{renderReportsTab()}</TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ComplianceGovernance;
