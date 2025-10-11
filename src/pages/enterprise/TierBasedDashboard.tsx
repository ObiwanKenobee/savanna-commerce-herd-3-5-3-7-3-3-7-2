import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useEnterpriseTier,
  setDemoTier,
  EnterpriseTier,
} from "@/hooks/useEnterpriseTier";
import TierRestriction from "@/components/enterprise/TierRestriction";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import {
  Crown,
  Star,
  Shield,
  BarChart3,
  Users,
  Database,
  Brain,
  Lock,
  Settings,
  TrendingUp,
  Target,
  Zap,
  Globe,
  Building,
  Eye,
  RefreshCw,
  Download,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
} from "lucide-react";

interface DashboardModule {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  requiredTier: EnterpriseTier;
  path: string;
  category: "analytics" | "operations" | "finance" | "compliance" | "ai";
  status: "active" | "coming-soon" | "beta";
}

const DASHBOARD_MODULES: DashboardModule[] = [
  {
    id: "executive-overview",
    name: "Executive Overview",
    description: "High-level KPIs and strategic insights",
    icon: <Crown className="h-6 w-6" />,
    requiredTier: "silver",
    path: "/enterprise/executive-overview",
    category: "analytics",
    status: "active",
  },
  {
    id: "revenue-operations",
    name: "Revenue Operations",
    description: "Revenue lifecycle management and optimization",
    icon: <TrendingUp className="h-6 w-6" />,
    requiredTier: "silver",
    path: "/enterprise/revenue-operations",
    category: "finance",
    status: "active",
  },
  {
    id: "supply-chain",
    name: "Supply Chain Command",
    description: "End-to-end supply chain visibility",
    icon: <Globe className="h-6 w-6" />,
    requiredTier: "silver",
    path: "/enterprise/supply-chain-command",
    category: "operations",
    status: "active",
  },
  {
    id: "operational-excellence",
    name: "Operational Excellence",
    description: "Process optimization and efficiency analytics",
    icon: <Target className="h-6 w-6" />,
    requiredTier: "gold",
    path: "/enterprise/operational-excellence",
    category: "operations",
    status: "active",
  },
  {
    id: "financial-control",
    name: "Financial Control",
    description: "Advanced financial analytics and risk management",
    icon: <BarChart3 className="h-6 w-6" />,
    requiredTier: "gold",
    path: "/enterprise/financial-control",
    category: "finance",
    status: "active",
  },
  {
    id: "business-intelligence",
    name: "Business Intelligence",
    description: "Advanced reporting and data visualization",
    icon: <Database className="h-6 w-6" />,
    requiredTier: "gold",
    path: "/enterprise/business-intelligence",
    category: "analytics",
    status: "active",
  },
  {
    id: "security-operations",
    name: "Security Operations",
    description: "Cybersecurity monitoring and incident response",
    icon: <Shield className="h-6 w-6" />,
    requiredTier: "gold",
    path: "/enterprise/security-operations",
    category: "compliance",
    status: "active",
  },
  {
    id: "compliance-governance",
    name: "Compliance & Governance",
    description: "Regulatory compliance and corporate governance",
    icon: <Shield className="h-6 w-6" />,
    requiredTier: "gold",
    path: "/enterprise/compliance-governance",
    category: "compliance",
    status: "active",
  },
  {
    id: "ai-intelligence",
    name: "AI Intelligence Hub",
    description: "AI-powered insights and predictive analytics",
    icon: <Brain className="h-6 w-6" />,
    requiredTier: "platinum",
    path: "/enterprise/ai-intelligence",
    category: "ai",
    status: "active",
  },
  {
    id: "integration-management",
    name: "Integration Management",
    description: "API management and system integrations",
    icon: <Zap className="h-6 w-6" />,
    requiredTier: "platinum",
    path: "/enterprise/integration-management",
    category: "operations",
    status: "active",
  },
];

const TierBasedDashboard: React.FC = () => {
  const { currentTier, canAccess, getUpgradeUrl } = useEnterpriseTier();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Modules", icon: <Building className="h-4 w-4" /> },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      id: "operations",
      name: "Operations",
      icon: <Target className="h-4 w-4" />,
    },
    {
      id: "finance",
      name: "Finance",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: "compliance",
      name: "Compliance",
      icon: <Shield className="h-4 w-4" />,
    },
    { id: "ai", name: "AI & ML", icon: <Brain className="h-4 w-4" /> },
  ];

  const filteredModules =
    selectedCategory === "all"
      ? DASHBOARD_MODULES
      : DASHBOARD_MODULES.filter(
          (module) => module.category === selectedCategory,
        );

  const accessibleModules = filteredModules.filter((module) =>
    canAccess(module.requiredTier),
  );
  const restrictedModules = filteredModules.filter(
    (module) => !canAccess(module.requiredTier),
  );

  const getTierIcon = (tier: EnterpriseTier) => {
    switch (tier) {
      case "silver":
        return <Shield className="h-4 w-4" />;
      case "gold":
        return <Star className="h-4 w-4" />;
      case "platinum":
        return <Crown className="h-4 w-4" />;
      default:
        return <Lock className="h-4 w-4" />;
    }
  };

  const getTierColor = (tier: EnterpriseTier) => {
    switch (tier) {
      case "silver":
        return "bg-slate-600";
      case "gold":
        return "bg-yellow-600";
      case "platinum":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const renderModuleCard = (module: DashboardModule, isAccessible: boolean) => (
    <Card
      key={module.id}
      className={`hover:shadow-lg transition-all duration-200 ${isAccessible ? "cursor-pointer" : "opacity-75"}`}
      onClick={() => isAccessible && navigate(module.path)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${isAccessible ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}
            >
              {module.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{module.name}</CardTitle>
              <CardDescription className="text-sm">
                {module.description}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge
              className={`${getTierColor(module.requiredTier)} text-white text-xs`}
            >
              {getTierIcon(module.requiredTier)}
              <span className="ml-1 capitalize">{module.requiredTier}</span>
            </Badge>
            {module.status === "beta" && (
              <Badge variant="outline" className="text-xs">
                Beta
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isAccessible ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Access granted</span>
            </div>
            <Button size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Open Dashboard
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-red-600">
              <Lock className="h-4 w-4" />
              <span>Upgrade required</span>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(getUpgradeUrl());
                }}
                className="flex-1"
              >
                Upgrade to {module.requiredTier}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  // Show preview
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
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
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-2">
                  <Building className="h-8 w-8 text-blue-600" />
                  <span>Enterprise Dashboard</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  Tier-based access to enterprise analytics and management tools
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Current Tier Display */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">Current Plan:</span>
                  <Badge className={`${getTierColor(currentTier)} text-white`}>
                    {getTierIcon(currentTier)}
                    <span className="ml-1 capitalize">
                      {currentTier === "none" ? "No Plan" : currentTier}
                    </span>
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  onClick={() => navigate(getUpgradeUrl())}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>

                {/* Demo Tier Selector (for testing) */}
                {process.env.NODE_ENV === "development" && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500">Demo:</span>
                    {(["silver", "gold", "platinum"] as EnterpriseTier[]).map(
                      (tier) => (
                        <Button
                          key={tier}
                          size="sm"
                          variant={currentTier === tier ? "default" : "outline"}
                          onClick={() => setDemoTier(tier)}
                          className="text-xs"
                        >
                          {tier}
                        </Button>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center space-x-2"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Accessible Modules
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {accessibleModules.length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Restricted Modules
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {restrictedModules.length}
                    </p>
                  </div>
                  <Lock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Available
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {filteredModules.length}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Accessible Modules */}
          {accessibleModules.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Available Modules</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessibleModules.map((module) =>
                  renderModuleCard(module, true),
                )}
              </div>
            </div>
          )}

          {/* Restricted Modules with Upgrade Prompts */}
          {restrictedModules.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <Lock className="h-5 w-5 text-orange-600" />
                <span>Upgrade Required</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restrictedModules.map((module) =>
                  renderModuleCard(module, false),
                )}
              </div>
            </div>
          )}

          {/* Upgrade CTA */}
          {restrictedModules.length > 0 && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Unlock More Powerful Features
                </h3>
                <p className="text-slate-600 mb-6">
                  Upgrade your plan to access advanced analytics, AI insights,
                  and comprehensive business intelligence tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate(getUpgradeUrl())}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    View Upgrade Options
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/contact")}
                  >
                    Contact Sales
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default TierBasedDashboard;
