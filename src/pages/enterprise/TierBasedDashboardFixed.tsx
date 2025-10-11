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

// Safe imports with fallbacks
const safeImport = (moduleId: string, fallback: any) => {
  try {
    return require(moduleId);
  } catch (error) {
    console.warn(`Module ${moduleId} not available, using fallback`);
    return fallback;
  }
};

// Mock hooks if not available
const useEnterpriseTier = () => ({
  tier: "silver",
  hasAccess: (feature: string) => true,
  upgradeTier: (newTier: string) => console.log(`Upgrading to ${newTier}`),
});

const TierRestriction: React.FC<any> = ({ children, ...props }) => (
  <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
    <div className="flex items-center gap-2 mb-2">
      <Lock className="w-4 h-4 text-yellow-600" />
      <span className="font-medium text-yellow-800">Tier Restriction</span>
    </div>
    <p className="text-yellow-700 text-sm mb-2">
      This feature requires a higher tier. Upgrade to access advanced
      functionality.
    </p>
    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
      Upgrade Now
    </Button>
  </div>
);

interface DashboardModule {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  tier: "silver" | "gold" | "platinum";
  path: string;
  category: string;
  features: string[];
  status: "active" | "coming_soon" | "restricted";
}

const TierBasedDashboardFixed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tier, hasAccess } = useEnterpriseTier();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const dashboardModules: DashboardModule[] = [
    // Silver Tier - Basic Enterprise
    {
      id: "executive-overview",
      name: "Executive Overview",
      description: "High-level business metrics and KPI dashboard",
      icon: <Crown className="w-6 h-6" />,
      tier: "silver",
      path: "/enterprise/executive-overview",
      category: "analytics",
      features: ["Revenue Tracking", "User Metrics", "Basic Reports"],
      status: "active",
    },
    {
      id: "revenue-operations",
      name: "Revenue Operations",
      description: "Sales performance and revenue optimization tools",
      icon: <TrendingUp className="w-6 h-6" />,
      tier: "silver",
      path: "/enterprise/revenue-operations",
      category: "finance",
      features: ["Sales Tracking", "Revenue Analytics", "Performance Metrics"],
      status: "active",
    },
    {
      id: "supply-chain-command",
      name: "Supply Chain Command",
      description: "Basic supply chain monitoring and management",
      icon: <Target className="w-6 h-6" />,
      tier: "silver",
      path: "/enterprise/supply-chain-command",
      category: "operations",
      features: [
        "Inventory Tracking",
        "Supplier Monitoring",
        "Order Management",
      ],
      status: "active",
    },

    // Gold Tier - Advanced Enterprise
    {
      id: "operational-excellence",
      name: "Operational Excellence",
      description: "Advanced operations management and optimization",
      icon: <Settings className="w-6 h-6" />,
      tier: "gold",
      path: "/enterprise/operational-excellence",
      category: "operations",
      features: [
        "Process Optimization",
        "Quality Management",
        "Efficiency Metrics",
      ],
      status: hasAccess("gold") ? "active" : "restricted",
    },
    {
      id: "financial-control",
      name: "Financial Control",
      description: "Comprehensive financial management and controls",
      icon: <Shield className="w-6 h-6" />,
      tier: "gold",
      path: "/enterprise/financial-control",
      category: "finance",
      features: ["Budget Management", "Cost Control", "Financial Reporting"],
      status: hasAccess("gold") ? "active" : "restricted",
    },
    {
      id: "business-intelligence",
      name: "Business Intelligence",
      description: "Advanced analytics and business insights",
      icon: <BarChart3 className="w-6 h-6" />,
      tier: "gold",
      path: "/enterprise/business-intelligence",
      category: "analytics",
      features: ["Advanced Analytics", "Predictive Modeling", "Custom Reports"],
      status: hasAccess("gold") ? "active" : "restricted",
    },
    {
      id: "security-operations",
      name: "Security Operations",
      description: "Enterprise security monitoring and management",
      icon: <Lock className="w-6 h-6" />,
      tier: "gold",
      path: "/enterprise/security-operations",
      category: "security",
      features: ["Security Monitoring", "Access Control", "Audit Logs"],
      status: hasAccess("gold") ? "active" : "restricted",
    },
    {
      id: "supplier-management",
      name: "Supplier Management",
      description: "Advanced supplier relationship management",
      icon: <Users className="w-6 h-6" />,
      tier: "gold",
      path: "/enterprise/supplier-management",
      category: "operations",
      features: [
        "Vendor Management",
        "Performance Tracking",
        "Contract Management",
      ],
      status: hasAccess("gold") ? "active" : "restricted",
    },
    {
      id: "logistics-operations",
      name: "Logistics Operations",
      description: "Comprehensive logistics and delivery management",
      icon: <Globe className="w-6 h-6" />,
      tier: "gold",
      path: "/enterprise/logistics-operations",
      category: "operations",
      features: ["Route Optimization", "Fleet Management", "Delivery Tracking"],
      status: hasAccess("gold") ? "active" : "restricted",
    },

    // Platinum Tier - Premium Enterprise
    {
      id: "ai-intelligence",
      name: "AI Intelligence Hub",
      description: "AI-powered insights and automation platform",
      icon: <Brain className="w-6 h-6" />,
      tier: "platinum",
      path: "/enterprise/ai-intelligence",
      category: "ai",
      features: ["Machine Learning", "Predictive Analytics", "AI Automation"],
      status: hasAccess("platinum") ? "active" : "restricted",
    },
    {
      id: "integration-management",
      name: "Integration Management",
      description: "Enterprise integration and API management",
      icon: <Database className="w-6 h-6" />,
      tier: "platinum",
      path: "/enterprise/integration-management",
      category: "integration",
      features: ["API Management", "Data Integration", "System Orchestration"],
      status: hasAccess("platinum") ? "active" : "restricted",
    },
  ];

  const categories = [
    { id: "all", name: "All Modules", icon: <Building className="w-4 h-4" /> },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "finance",
      name: "Finance",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "operations",
      name: "Operations",
      icon: <Settings className="w-4 h-4" />,
    },
    { id: "security", name: "Security", icon: <Shield className="w-4 h-4" /> },
    { id: "ai", name: "AI & ML", icon: <Brain className="w-4 h-4" /> },
    {
      id: "integration",
      name: "Integration",
      icon: <Database className="w-4 h-4" />,
    },
  ];

  const tierColors = {
    silver: "bg-slate-100 text-slate-800 border-slate-300",
    gold: "bg-yellow-100 text-yellow-800 border-yellow-300",
    platinum: "bg-purple-100 text-purple-800 border-purple-300",
  };

  const tierIcons = {
    silver: <Star className="w-4 h-4" />,
    gold: <Crown className="w-4 h-4" />,
    platinum: <Zap className="w-4 h-4" />,
  };

  const filteredModules =
    selectedCategory === "all"
      ? dashboardModules
      : dashboardModules.filter(
          (module) => module.category === selectedCategory,
        );

  const handleModuleClick = (module: DashboardModule) => {
    if (module.status === "active") {
      navigate(module.path);
    } else if (module.status === "restricted") {
      // Show upgrade modal or navigation
      console.log(
        `Access restricted. Upgrade to ${module.tier} tier required.`,
      );
    } else {
      console.log("Feature coming soon");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Enterprise Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive business management and analytics platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                className={`${tierColors[tier as keyof typeof tierColors]} flex items-center gap-1`}
              >
                {tierIcons[tier as keyof typeof tierIcons]}
                {tier.toUpperCase()} TIER
              </Badge>
              <Button onClick={() => navigate("/enterprise-pricing")}>
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-7">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            {/* Module Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                <Card
                  key={module.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    module.status === "restricted"
                      ? "opacity-75 border-gray-300"
                      : "hover:border-green-300 border-green-200"
                  }`}
                  onClick={() => handleModuleClick(module)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            module.status === "active"
                              ? "bg-green-100 text-green-600"
                              : module.status === "restricted"
                                ? "bg-gray-100 text-gray-400"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {module.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {module.name}
                          </CardTitle>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge
                          className={`${tierColors[module.tier]} flex items-center gap-1`}
                        >
                          {tierIcons[module.tier]}
                          {module.tier.toUpperCase()}
                        </Badge>
                        {module.status === "restricted" && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                        {module.status === "coming_soon" && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-600"
                          >
                            Coming Soon
                          </Badge>
                        )}
                        {module.status === "active" && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {module.description}
                    </CardDescription>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Key Features:
                        </h4>
                        <ul className="space-y-1">
                          {module.features.map((feature, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-600 flex items-center"
                            >
                              <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {module.status === "restricted" && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                          <span className="text-sm text-yellow-800">
                            Requires {module.tier.toUpperCase()} tier
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <Button
                        variant={
                          module.status === "active" ? "default" : "outline"
                        }
                        size="sm"
                        disabled={module.status === "coming_soon"}
                        className="w-full"
                      >
                        {module.status === "active" && (
                          <>
                            Access Module
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                        {module.status === "restricted" && "Upgrade Required"}
                        {module.status === "coming_soon" && "Coming Soon"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredModules.length === 0 && (
              <div className="text-center py-12">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No modules found
                </h3>
                <p className="text-gray-600">
                  No modules available in this category for your current tier.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Upgrade Prompt */}
        {tier === "silver" && (
          <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Lightbulb className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Unlock Advanced Features
                    </h3>
                    <p className="text-gray-600">
                      Upgrade to Gold or Platinum tier to access advanced
                      analytics, AI insights, and enterprise integrations.
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/enterprise/demo")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Demo
                  </Button>
                  <Button
                    className="bg-yellow-600 hover:bg-yellow-700"
                    onClick={() => navigate("/enterprise-pricing")}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TierBasedDashboardFixed;
