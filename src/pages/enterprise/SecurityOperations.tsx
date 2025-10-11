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
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Settings,
  RefreshCw,
  Download,
  Search,
  Filter,
  Lock,
  Unlock,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Globe,
  Server,
  Wifi,
  Database,
  Cloud,
  Smartphone,
  Laptop,
  Network,
  Bug,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Percent,
  DollarSign,
  Star,
  Award,
  AlertCircle,
  Info,
  XCircle,
  PlayCircle,
  PauseCircle,
  StopCircle,
} from "lucide-react";

interface SecurityIncident {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "open" | "investigating" | "contained" | "resolved" | "closed";
  category:
    | "malware"
    | "phishing"
    | "data-breach"
    | "unauthorized-access"
    | "ddos"
    | "insider-threat";
  detectedAt: Date;
  assignedTo: string;
  affectedSystems: string[];
  description: string;
  impact: string;
}

interface ThreatIntelligence {
  id: string;
  threatType: string;
  severity: "critical" | "high" | "medium" | "low";
  source: string;
  description: string;
  indicators: string[];
  mitigations: string[];
  confidence: number;
  firstSeen: Date;
  status: "active" | "mitigated" | "false-positive";
}

interface SecurityMetrics {
  securityScore: number;
  incidentsThisMonth: number;
  averageResponseTime: number;
  vulnerabilitiesOpen: number;
  patchCompliance: number;
  userTrainingCompletion: number;
  mfaAdoption: number;
  backupSuccess: number;
}

interface VulnerabilityAssessment {
  id: string;
  asset: string;
  vulnerability: string;
  severity: "critical" | "high" | "medium" | "low";
  cvssScore: number;
  status: "open" | "in-progress" | "patched" | "mitigated" | "accepted";
  discoveredDate: Date;
  dueDate: Date;
  assignedTo: string;
  effort: "low" | "medium" | "high";
}

interface ComplianceCheck {
  framework: string;
  control: string;
  status: "compliant" | "partial" | "non-compliant";
  lastAssessed: Date;
  nextAssessment: Date;
  evidence: string;
  owner: string;
}

const SecurityOperations: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    securityScore: 87.3,
    incidentsThisMonth: 12,
    averageResponseTime: 14.5,
    vulnerabilitiesOpen: 23,
    patchCompliance: 94.2,
    userTrainingCompletion: 89.7,
    mfaAdoption: 96.8,
    backupSuccess: 99.1,
  });

  const [securityIncidents, setSecurityIncidents] = useState<
    SecurityIncident[]
  >([
    {
      id: "inc-001",
      title: "Suspicious Network Activity Detected",
      severity: "high",
      status: "investigating",
      category: "unauthorized-access",
      detectedAt: new Date("2024-01-20T10:30:00"),
      assignedTo: "Security Team Alpha",
      affectedSystems: ["Web Server 1", "Database Cluster"],
      description: "Unusual network traffic patterns from external IP ranges",
      impact: "Potential data access attempt",
    },
    {
      id: "inc-002",
      title: "Phishing Email Campaign",
      severity: "medium",
      status: "contained",
      category: "phishing",
      detectedAt: new Date("2024-01-19T14:15:00"),
      assignedTo: "SOC Analyst B",
      affectedSystems: ["Email System"],
      description: "Targeted phishing emails to finance department",
      impact: "3 users clicked malicious links",
    },
    {
      id: "inc-003",
      title: "Failed Login Attempts",
      severity: "low",
      status: "resolved",
      category: "unauthorized-access",
      detectedAt: new Date("2024-01-18T22:45:00"),
      assignedTo: "Automated Response",
      affectedSystems: ["Authentication System"],
      description: "Multiple failed login attempts from single IP",
      impact: "Account temporarily locked",
    },
    {
      id: "inc-004",
      title: "Malware Detection",
      severity: "critical",
      status: "open",
      category: "malware",
      detectedAt: new Date("2024-01-20T16:20:00"),
      assignedTo: "Incident Response Team",
      affectedSystems: ["Workstation Lab-15", "File Server"],
      description: "Advanced persistent threat detected on endpoint",
      impact: "System isolated, potential data exfiltration",
    },
  ]);

  const [threatIntelligence, setThreatIntelligence] = useState<
    ThreatIntelligence[]
  >([
    {
      id: "threat-001",
      threatType: "APT Group",
      severity: "critical",
      source: "Threat Intel Feed A",
      description:
        "New variant of Lazarus Group targeting financial institutions",
      indicators: [
        "194.146.35.12",
        "malicious.domain.com",
        "SHA256: abc123...",
      ],
      mitigations: [
        "Block IP ranges",
        "Update signatures",
        "Enhanced monitoring",
      ],
      confidence: 95,
      firstSeen: new Date("2024-01-18T08:00:00"),
      status: "active",
    },
    {
      id: "threat-002",
      threatType: "Ransomware",
      severity: "high",
      source: "Internal Research",
      description: "New ransomware family targeting enterprise networks",
      indicators: ["encrypt.exe", "ransom.txt", "registry modification"],
      mitigations: [
        "Backup verification",
        "Endpoint protection update",
        "User training",
      ],
      confidence: 87,
      firstSeen: new Date("2024-01-17T12:30:00"),
      status: "mitigated",
    },
    {
      id: "threat-003",
      threatType: "Credential Stuffing",
      severity: "medium",
      source: "OSINT",
      description:
        "Leaked credential database affecting multiple organizations",
      indicators: ["Breach data", "Password patterns", "Username formats"],
      mitigations: ["Force password reset", "MFA enforcement", "Monitoring"],
      confidence: 78,
      firstSeen: new Date("2024-01-16T15:45:00"),
      status: "active",
    },
  ]);

  const [vulnerabilities, setVulnerabilities] = useState<
    VulnerabilityAssessment[]
  >([
    {
      id: "vuln-001",
      asset: "Web Application Portal",
      vulnerability: "SQL Injection",
      severity: "critical",
      cvssScore: 9.1,
      status: "in-progress",
      discoveredDate: new Date("2024-01-15"),
      dueDate: new Date("2024-01-22"),
      assignedTo: "Development Team",
      effort: "medium",
    },
    {
      id: "vuln-002",
      asset: "Windows Server 2019",
      vulnerability: "CVE-2024-0001",
      severity: "high",
      cvssScore: 7.8,
      status: "patched",
      discoveredDate: new Date("2024-01-10"),
      dueDate: new Date("2024-01-17"),
      assignedTo: "IT Operations",
      effort: "low",
    },
    {
      id: "vuln-003",
      asset: "Network Router",
      vulnerability: "Default Credentials",
      severity: "medium",
      cvssScore: 6.5,
      status: "open",
      discoveredDate: new Date("2024-01-12"),
      dueDate: new Date("2024-01-26"),
      assignedTo: "Network Team",
      effort: "low",
    },
    {
      id: "vuln-004",
      asset: "Apache Web Server",
      vulnerability: "CVE-2024-0002",
      severity: "high",
      cvssScore: 8.2,
      status: "mitigated",
      discoveredDate: new Date("2024-01-08"),
      dueDate: new Date("2024-01-15"),
      assignedTo: "Security Team",
      effort: "high",
    },
  ]);

  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([
    {
      framework: "ISO 27001",
      control: "A.9.1.2 - Access to networks and network services",
      status: "compliant",
      lastAssessed: new Date("2024-01-15"),
      nextAssessment: new Date("2024-04-15"),
      evidence: "Network access control policies implemented",
      owner: "Network Security Team",
    },
    {
      framework: "SOC 2",
      control: "CC6.1 - Logical and physical access controls",
      status: "partial",
      lastAssessed: new Date("2024-01-10"),
      nextAssessment: new Date("2024-02-10"),
      evidence: "MFA implementation in progress",
      owner: "IAM Team",
    },
    {
      framework: "NIST CSF",
      control: "PR.AC-1 - Identities and credentials are managed",
      status: "compliant",
      lastAssessed: new Date("2024-01-18"),
      nextAssessment: new Date("2024-03-18"),
      evidence: "Identity management system operational",
      owner: "Identity Team",
    },
  ]);

  useEffect(() => {
    loadSecurityData();
  }, [selectedTimeframe, selectedSeverity]);

  const loadSecurityData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real implementation, fetch security data based on filters
    } catch (error) {
      console.error("Failed to load security data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "default";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
      case "resolved":
      case "closed":
      case "patched":
      case "mitigated":
        return "text-green-600";
      case "investigating":
      case "contained":
      case "in-progress":
      case "partial":
        return "text-yellow-600";
      case "open":
      case "non-compliant":
        return "text-red-600";
      case "active":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
      case "resolved":
      case "closed":
      case "patched":
      case "mitigated":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "investigating":
      case "contained":
      case "in-progress":
      case "partial":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "open":
      case "non-compliant":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "active":
        return <Activity className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const renderDashboardTab = () => (
    <div className="space-y-6">
      {/* Security Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-600">
                {securityMetrics.securityScore}%
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+2.1%</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Overall security posture
            </p>
            <Progress value={securityMetrics.securityScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-orange-600">
                {
                  securityIncidents.filter(
                    (i) => i.status === "open" || i.status === "investigating",
                  ).length
                }
              </div>
              <div className="flex items-center text-orange-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="text-sm">Active</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {securityMetrics.incidentsThisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                {securityMetrics.averageResponseTime}m
              </div>
              <div className="flex items-center text-blue-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Avg</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Target: 15 minutes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Vulnerabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-600">
                {securityMetrics.vulnerabilitiesOpen}
              </div>
              <div className="flex items-center text-purple-600">
                <Bug className="h-4 w-4 mr-1" />
                <span className="text-sm">Open</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-1">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Health Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Security Health Indicators</span>
          </CardTitle>
          <CardDescription>
            Key security metrics and compliance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Patch Compliance</span>
                <span className="text-sm font-bold text-green-600">
                  {securityMetrics.patchCompliance}%
                </span>
              </div>
              <Progress
                value={securityMetrics.patchCompliance}
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">MFA Adoption</span>
                <span className="text-sm font-bold text-green-600">
                  {securityMetrics.mfaAdoption}%
                </span>
              </div>
              <Progress value={securityMetrics.mfaAdoption} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Security Training</span>
                <span className="text-sm font-bold text-yellow-600">
                  {securityMetrics.userTrainingCompletion}%
                </span>
              </div>
              <Progress
                value={securityMetrics.userTrainingCompletion}
                className="h-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Backup Success Rate</span>
                <span className="text-sm font-bold text-green-600">
                  {securityMetrics.backupSuccess}%
                </span>
              </div>
              <Progress value={securityMetrics.backupSuccess} className="h-2" />

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm font-medium text-green-800">
                  Compliance Status
                </div>
                <div className="text-xs text-green-700 mt-1">
                  All critical security controls are operational
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Recent Security Incidents</span>
          </CardTitle>
          <CardDescription>
            Latest security incidents requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityIncidents.slice(0, 3).map((incident) => (
              <div
                key={incident.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(incident.status)}
                    <h4 className="font-semibold">{incident.title}</h4>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant={getSeverityBadge(incident.severity)}>
                      {incident.severity}
                    </Badge>
                    <Badge variant="outline">{incident.category}</Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  {incident.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-slate-500">Detected:</span>
                    <p className="font-medium">
                      {incident.detectedAt.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Assigned To:</span>
                    <p className="font-medium">{incident.assignedTo}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Affected Systems:</span>
                    <p className="font-medium">
                      {incident.affectedSystems.join(", ")}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Impact:</span>
                    <p className="font-medium">{incident.impact}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    Investigate
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Update
                  </Button>
                  <Button size="sm" variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    Escalate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Threat Intelligence Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span>Threat Intelligence</span>
            </CardTitle>
            <CardDescription>
              Latest threat intelligence and indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {threatIntelligence.slice(0, 2).map((threat) => (
                <div key={threat.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">
                      {threat.threatType}
                    </h4>
                    <div className="flex space-x-1">
                      <Badge
                        variant={getSeverityBadge(threat.severity)}
                        className="text-xs"
                      >
                        {threat.severity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {threat.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    {threat.description}
                  </p>
                  <div className="text-xs">
                    <span className="text-slate-500">Source:</span>
                    <span className="font-medium ml-1">{threat.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bug className="h-5 w-5 text-orange-600" />
              <span>Critical Vulnerabilities</span>
            </CardTitle>
            <CardDescription>
              High-priority vulnerabilities to address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vulnerabilities
                .filter(
                  (v) => v.severity === "critical" || v.severity === "high",
                )
                .slice(0, 3)
                .map((vuln) => (
                  <div key={vuln.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{vuln.asset}</h4>
                      <div className="flex space-x-1">
                        <Badge
                          variant={getSeverityBadge(vuln.severity)}
                          className="text-xs"
                        >
                          {vuln.severity}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          CVSS {vuln.cvssScore}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      {vuln.vulnerability}
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>
                        <span className="text-slate-500">Due:</span>
                        <span className="font-medium ml-1">
                          {vuln.dueDate.toLocaleDateString()}
                        </span>
                      </span>
                      <span>
                        <span className="text-slate-500">Assigned:</span>
                        <span className="font-medium ml-1">
                          {vuln.assignedTo}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderIncidentsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span>Security Incident Management</span>
          </CardTitle>
          <CardDescription>
            Monitor and manage security incidents across the organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Incident</th>
                  <th className="text-left p-3">Severity</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Detected</th>
                  <th className="text-left p-3">Assigned To</th>
                  <th className="text-left p-3">Affected Systems</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {securityIncidents.map((incident) => (
                  <tr key={incident.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(incident.status)}
                        <div>
                          <span className="font-medium">{incident.title}</span>
                          <p className="text-xs text-slate-600">
                            {incident.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant={getSeverityBadge(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          incident.status === "resolved"
                            ? "default"
                            : incident.status === "investigating"
                              ? "secondary"
                              : incident.status === "contained"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {incident.status}
                      </Badge>
                    </td>
                    <td className="p-3">{incident.category}</td>
                    <td className="p-3">
                      {incident.detectedAt.toLocaleString()}
                    </td>
                    <td className="p-3">{incident.assignedTo}</td>
                    <td className="p-3">
                      <div className="text-xs">
                        {incident.affectedSystems.map((system, index) => (
                          <div key={index}>{system}</div>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3" />
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

  const renderVulnerabilitiesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bug className="h-5 w-5 text-orange-600" />
            <span>Vulnerability Management</span>
          </CardTitle>
          <CardDescription>
            Track and remediate security vulnerabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Asset</th>
                  <th className="text-left p-3">Vulnerability</th>
                  <th className="text-left p-3">Severity</th>
                  <th className="text-left p-3">CVSS</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Discovered</th>
                  <th className="text-left p-3">Due Date</th>
                  <th className="text-left p-3">Assigned To</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vulnerabilities.map((vuln) => (
                  <tr key={vuln.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      <span className="font-medium">{vuln.asset}</span>
                    </td>
                    <td className="p-3">{vuln.vulnerability}</td>
                    <td className="p-3">
                      <Badge variant={getSeverityBadge(vuln.severity)}>
                        {vuln.severity}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-medium ${getSeverityColor(vuln.severity)}`}
                      >
                        {vuln.cvssScore}
                      </span>
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          vuln.status === "patched"
                            ? "default"
                            : vuln.status === "in-progress"
                              ? "secondary"
                              : vuln.status === "mitigated"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {vuln.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {vuln.discoveredDate.toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={
                          vuln.dueDate < new Date()
                            ? "text-red-600"
                            : "text-slate-600"
                        }
                      >
                        {vuln.dueDate.toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-3">{vuln.assignedTo}</td>
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

  const renderComplianceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Security Compliance</span>
            </CardTitle>
            <CardDescription>
              Security framework compliance status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceChecks.map((check, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(check.status)}
                      <div>
                        <h4 className="font-semibold text-sm">
                          {check.framework}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {check.control}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        check.status === "compliant"
                          ? "default"
                          : check.status === "partial"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {check.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-3">
                    <div>
                      <span className="text-slate-500">Last Assessed:</span>
                      <p className="font-medium">
                        {check.lastAssessed.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Next Assessment:</span>
                      <p className="font-medium">
                        {check.nextAssessment.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Owner:</span>
                      <p className="font-medium">{check.owner}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Evidence:</span>
                      <p className="font-medium">{check.evidence}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      Evidence
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
              <Target className="h-5 w-5 text-purple-600" />
              <span>Security Controls</span>
            </CardTitle>
            <CardDescription>
              Security control effectiveness monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Network Segmentation",
                  status: "Operational",
                  effectiveness: 95,
                },
                {
                  name: "Endpoint Protection",
                  status: "Operational",
                  effectiveness: 92,
                },
                {
                  name: "Email Security",
                  status: "Operational",
                  effectiveness: 88,
                },
                {
                  name: "Access Controls",
                  status: "Operational",
                  effectiveness: 97,
                },
                {
                  name: "Data Encryption",
                  status: "Operational",
                  effectiveness: 99,
                },
                {
                  name: "Backup & Recovery",
                  status: "Operational",
                  effectiveness: 94,
                },
              ].map((control, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <span className="font-medium text-sm">
                        {control.name}
                      </span>
                      <p className="text-xs text-slate-600">{control.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">
                      {control.effectiveness}%
                    </div>
                    <Progress
                      value={control.effectiveness}
                      className="w-16 h-1 mt-1"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <EnhancedNavigation />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-red-600" />
                  <span>Security Operations Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Real-time security monitoring, incident response, and threat
                  management
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select
                  value={selectedTimeframe}
                  onValueChange={setSelectedTimeframe}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedSeverity}
                  onValueChange={setSelectedSeverity}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={loadSecurityData}
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
              <TabsTrigger value="dashboard">Security Dashboard</TabsTrigger>
              <TabsTrigger value="incidents">Incident Management</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">{renderDashboardTab()}</TabsContent>
            <TabsContent value="incidents">{renderIncidentsTab()}</TabsContent>
            <TabsContent value="vulnerabilities">
              {renderVulnerabilitiesTab()}
            </TabsContent>
            <TabsContent value="compliance">
              {renderComplianceTab()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SecurityOperations;
