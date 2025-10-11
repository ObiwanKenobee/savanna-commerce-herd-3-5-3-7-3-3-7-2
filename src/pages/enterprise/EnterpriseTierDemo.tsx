import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import {
  Crown,
  Star,
  Shield,
  BarChart3,
  Users,
  Database,
  Brain,
  Lock,
  Unlock,
  Target,
  Zap,
  Building,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Eye,
  Settings,
  RefreshCw,
  ArrowRight,
  Globe,
  Lightbulb,
  Award,
  Phone,
  Mail,
} from "lucide-react";

const EnterpriseTierDemo: React.FC = () => {
  const { currentTier, canAccess } = useEnterpriseTier();
  const navigate = useNavigate();
  const [selectedDemo, setSelectedDemo] = useState<string>("overview");

  const tierFeatures = [
    {
      tier: "silver",
      name: "Silver Tier",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-slate-600",
      features: [
        "Executive Overview",
        "Revenue Operations",
        "Supply Chain Command",
        "Basic Compliance",
      ],
      description: "Essential enterprise tools for growing organizations",
    },
    {
      tier: "gold",
      name: "Gold Tier",
      icon: <Star className="h-6 w-6" />,
      color: "bg-yellow-600",
      features: [
        "All Silver +",
        "Operational Excellence",
        "Financial Control",
        "Business Intelligence",
        "Security Center",
      ],
      description:
        "Advanced analytics and security for established enterprises",
    },
    {
      tier: "platinum",
      name: "Platinum Tier",
      icon: <Crown className="h-6 w-6" />,
      color: "bg-purple-600",
      features: [
        "All Gold +",
        "AI Intelligence Hub",
        "Integration Management",
        "Unlimited Everything",
      ],
      description: "Ultimate enterprise solution with AI-powered insights",
    },
  ];

  const demoModules = [
    {
      id: "executive-overview",
      name: "Executive Overview",
      tier: "silver" as EnterpriseTier,
      icon: <Crown className="h-5 w-5" />,
      description: "Strategic KPIs and high-level insights",
      path: "/enterprise/executive-overview",
    },
    {
      id: "operational-excellence",
      name: "Operational Excellence",
      tier: "gold" as EnterpriseTier,
      icon: <Target className="h-5 w-5" />,
      description: "Process optimization and efficiency analytics",
      path: "/enterprise/operational-excellence",
    },
    {
      id: "ai-intelligence",
      name: "AI Intelligence Hub",
      tier: "platinum" as EnterpriseTier,
      icon: <Brain className="h-5 w-5" />,
      description: "AI-powered insights and predictive analytics",
      path: "/enterprise/ai-intelligence",
    },
    {
      id: "business-intelligence",
      name: "Business Intelligence",
      tier: "gold" as EnterpriseTier,
      icon: <BarChart3 className="h-5 w-5" />,
      description: "Advanced reporting and data visualization",
      path: "/enterprise/business-intelligence",
    },
    {
      id: "security-operations",
      name: "Security Operations",
      tier: "gold" as EnterpriseTier,
      icon: <Shield className="h-5 w-5" />,
      description: "Cybersecurity monitoring and incident response",
      path: "/enterprise/security-operations",
    },
    {
      id: "integration-management",
      name: "Integration Management",
      tier: "platinum" as EnterpriseTier,
      icon: <Zap className="h-5 w-5" />,
      description: "API management and system integrations",
      path: "/enterprise/integration-management",
    },
  ];

  const renderTierCard = (tierInfo: (typeof tierFeatures)[0]) => {
    const isCurrentTier = currentTier === tierInfo.tier;
    const hasAccess = canAccess(tierInfo.tier as EnterpriseTier);

    return (
      <Card
        key={tierInfo.tier}
        className={`relative ${isCurrentTier ? "ring-2 ring-blue-500" : ""}`}
      >
        <CardHeader className="text-center">
          <div
            className={`mx-auto w-12 h-12 ${tierInfo.color} rounded-full flex items-center justify-center text-white mb-2`}
          >
            {tierInfo.icon}
          </div>
          <CardTitle className="text-lg">{tierInfo.name}</CardTitle>
          <CardDescription>{tierInfo.description}</CardDescription>
          {isCurrentTier && (
            <Badge className="mx-auto w-fit">Current Plan</Badge>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            {tierInfo.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <Button
            className="w-full"
            variant={isCurrentTier ? "outline" : "default"}
            onClick={() => setDemoTier(tierInfo.tier as EnterpriseTier)}
          >
            {isCurrentTier ? "Current Plan" : `Try ${tierInfo.name}`}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderModuleDemo = (module: (typeof demoModules)[0]) => {
    const hasAccess = canAccess(module.tier);

    if (!hasAccess) {
      return (
        <TierRestriction
          key={module.id}
          requiredTier={module.tier}
          feature={module.name}
          description={module.description}
          className="mb-6"
        />
      );
    }

    return (
      <Card key={module.id} className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                {module.icon}
              </div>
              <div>
                <CardTitle className="text-lg">{module.name}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </div>
            </div>
            <Badge className="bg-green-600 text-white">
              <Unlock className="h-3 w-3 mr-1" />
              Accessible
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-3">
            <Button onClick={() => navigate(module.path)}>
              <Eye className="h-4 w-4 mr-2" />
              Open Dashboard
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EnhancedNavigation />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Enterprise Tier <span className="text-blue-600">Demo</span>
            </h1>
            <p className="text-xl text-slate-600 mb-6 max-w-3xl mx-auto">
              Experience how tier-based access works. Switch between tiers to
              see different levels of enterprise functionality.
            </p>

            {/* Current Tier Display */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-lg font-medium">Current Demo Tier:</span>
              <Badge className="text-lg px-4 py-2 capitalize bg-blue-600 text-white">
                {currentTier === "none" ? "No Plan" : currentTier}
              </Badge>
            </div>
          </div>

          {/* Tier Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              Choose Your Enterprise Tier
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tierFeatures.map(renderTierCard)}
            </div>
          </div>

          {/* Demo Content */}
          <Tabs
            value={selectedDemo}
            onValueChange={setSelectedDemo}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Tier Overview</TabsTrigger>
              <TabsTrigger value="modules">Module Access</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Upgrade</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Your Current Access</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {demoModules.map((module) => {
                        const hasAccess = canAccess(module.tier);
                        return (
                          <div
                            key={module.id}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`p-1 rounded ${hasAccess ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                              >
                                {module.icon}
                              </div>
                              <span
                                className={`font-medium ${hasAccess ? "text-slate-900" : "text-slate-500"}`}
                              >
                                {module.name}
                              </span>
                            </div>
                            {hasAccess ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Lock className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span>Upgrade Benefits</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentTier !== "platinum" && (
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-slate-900 mb-2">
                            {currentTier === "none"
                              ? "Start with Silver Tier"
                              : currentTier === "silver"
                                ? "Upgrade to Gold Tier"
                                : "Upgrade to Platinum Tier"}
                          </h4>
                          <ul className="space-y-1 text-sm text-slate-600">
                            {currentTier === "none" && (
                              <>
                                <li>
                                  • Access to essential enterprise dashboards
                                </li>
                                <li>• Basic compliance and reporting tools</li>
                                <li>• Priority support and implementation</li>
                              </>
                            )}
                            {currentTier === "silver" && (
                              <>
                                <li>
                                  • Advanced analytics and business intelligence
                                </li>
                                <li>• Security operations center</li>
                                <li>• Custom integrations and branding</li>
                              </>
                            )}
                            {currentTier === "gold" && (
                              <>
                                <li>• AI-powered insights and predictions</li>
                                <li>• Unlimited integrations and storage</li>
                                <li>• Dedicated account manager</li>
                              </>
                            )}
                          </ul>
                          <Button
                            className="mt-3"
                            onClick={() => navigate("/enterprise-pricing")}
                          >
                            View Pricing
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      )}

                      {currentTier === "platinum" && (
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-gold-50 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-900 mb-2">
                            🎉 You have full access!
                          </h4>
                          <p className="text-sm text-purple-700">
                            Enjoy unlimited access to all enterprise features,
                            AI-powered insights, and dedicated support.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="modules" className="mt-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-800">
                  Enterprise Module Access
                </h3>
                {demoModules.map(renderModuleDemo)}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="mt-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Ready to Upgrade?
                </h3>
                <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                  Unlock more powerful enterprise features with higher tiers.
                  Our pricing is designed to scale with your organization's
                  growth.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Button
                    size="lg"
                    onClick={() => navigate("/enterprise-pricing")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    View Pricing Plans
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/contact")}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Sales
                  </Button>
                </div>

                <div className="mt-8 p-6 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Need a Custom Solution?
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Our enterprise team can create tailored solutions for your
                    specific requirements.
                  </p>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Custom Quote
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EnterpriseTierDemo;
