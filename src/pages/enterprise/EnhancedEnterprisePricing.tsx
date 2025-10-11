import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { Switch } from "@/components/ui/switch";
import {
  useEnterpriseTier,
  setDemoTier,
  EnterpriseTier,
  TIER_FEATURES,
} from "@/hooks/useEnterpriseTier";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import {
  Check,
  Crown,
  Star,
  Shield,
  Users,
  Database,
  BarChart3,
  Brain,
  Zap,
  Globe,
  Lock,
  Unlock,
  ArrowRight,
  TrendingUp,
  Award,
  Target,
  Building,
  Phone,
  Mail,
  Calendar,
  Calculator,
  Sparkles,
  Infinity,
  AlertCircle,
} from "lucide-react";

interface TierPlan {
  id: EnterpriseTier;
  name: string;
  icon: React.ReactNode;
  description: string;
  priceRange: { min: number; max: number };
  popular?: boolean;
  recommended?: boolean;
  features: string[];
  modules: string[];
  highlights: string[];
  limitations?: string[];
}

const EnhancedEnterprisePricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedTier, setSelectedTier] = useState<EnterpriseTier>("gold");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentTier } = useEnterpriseTier();

  useEffect(() => {
    if (searchParams.get("upgrade") === "true") {
      // Show upgrade modal or highlight current limitations
    }
  }, [searchParams]);

  const tierPlans: TierPlan[] = [
    {
      id: "silver",
      name: "Silver Tier",
      icon: <Shield className="h-8 w-8" />,
      description: "For growing organizations ready to scale operations",
      priceRange: { min: 25000, max: 100000 },
      features: [
        "Up to 50 enterprise users",
        "Basic compliance tools & reporting",
        "Priority support (24/7)",
        "10 system integrations",
        "5 data sources",
        "25 custom reports",
        "3 operational dashboards",
        "100GB secure storage",
        "Standard API access",
        "Basic workflow automation",
      ],
      modules: [
        "Executive Overview Dashboard",
        "Revenue Operations Center",
        "Supply Chain Command",
        "Basic Compliance Tools",
      ],
      highlights: [
        "Perfect for mid-size operations",
        "Essential enterprise features",
        "Rapid deployment (2-4 weeks)",
      ],
    },
    {
      id: "gold",
      name: "Gold Tier",
      icon: <Star className="h-8 w-8" />,
      description: "For established enterprises seeking advanced capabilities",
      priceRange: { min: 100000, max: 250000 },
      popular: true,
      features: [
        "Up to 200 enterprise users",
        "Advanced analytics & BI suite",
        "Security operations center",
        "25 system integrations",
        "15 data sources",
        "100 custom reports",
        "8 specialized dashboards",
        "500GB secure storage",
        "Full API access",
        "Advanced workflow automation",
        "Custom integrations",
        "White-label branding",
        "Dedicated implementation team",
      ],
      modules: [
        "All Silver Tier modules",
        "Operational Excellence Center",
        "Financial Control Center",
        "Business Intelligence Hub",
        "Security Operations Center",
        "Compliance & Governance",
      ],
      highlights: [
        "Most popular choice",
        "Advanced security & compliance",
        "Custom branding & integrations",
        "Dedicated success manager",
      ],
    },
    {
      id: "platinum",
      name: "Platinum Tier",
      icon: <Crown className="h-8 w-8" />,
      description: "For large enterprises requiring unlimited scale",
      priceRange: { min: 250000, max: -1 },
      recommended: true,
      features: [
        "Unlimited enterprise users",
        "AI-powered predictive analytics",
        "Dedicated account manager",
        "Unlimited integrations",
        "Unlimited data sources",
        "Unlimited custom reports",
        "Unlimited dashboards",
        "Unlimited secure storage",
        "Unlimited API access",
        "AI-driven automation",
        "Custom development services",
        "White-glove onboarding",
        "Executive advisory services",
        "99.99% SLA guarantee",
      ],
      modules: [
        "All Gold Tier modules",
        "AI Intelligence Hub",
        "Integration Management Center",
        "Custom Enterprise Modules",
        "Predictive Analytics Engine",
      ],
      highlights: [
        "Ultimate enterprise solution",
        "AI-powered insights",
        "Unlimited everything",
        "Executive-level support",
        "Custom development included",
      ],
    },
  ];

  const formatPrice = (min: number, max: number) => {
    if (max === -1) {
      return `$${(min / 1000).toFixed(0)}K+ /year`;
    }
    return `$${(min / 1000).toFixed(0)}K - $${(max / 1000).toFixed(0)}K /year`;
  };

  const getDiscount = () => (isAnnual ? 20 : 0);

  const calculateAnnualPrice = (min: number, max: number) => {
    if (!isAnnual) return { min, max };
    const discount = getDiscount() / 100;
    return {
      min: Math.round(min * (1 - discount)),
      max: max === -1 ? -1 : Math.round(max * (1 - discount)),
    };
  };

  const handleSelectPlan = (tier: EnterpriseTier) => {
    setDemoTier(tier);
    navigate("/enterprise");
  };

  const renderFeatureComparison = () => (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-center mb-8">
        Feature Comparison
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold">Features</th>
              {tierPlans.map((plan) => (
                <th key={plan.id} className="text-center p-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-blue-600">{plan.icon}</div>
                    <span className="font-semibold">{plan.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { feature: "Users", values: ["50", "200", "Unlimited"] },
              { feature: "Integrations", values: ["10", "25", "Unlimited"] },
              { feature: "Data Sources", values: ["5", "15", "Unlimited"] },
              { feature: "Custom Reports", values: ["25", "100", "Unlimited"] },
              { feature: "Dashboards", values: ["3", "8", "Unlimited"] },
              { feature: "Storage", values: ["100GB", "500GB", "Unlimited"] },
              { feature: "API Access", values: ["Basic", "Full", "Unlimited"] },
              { feature: "Advanced Analytics", values: ["❌", "✅", "✅"] },
              { feature: "AI Insights", values: ["❌", "❌", "✅"] },
              { feature: "Security Center", values: ["❌", "✅", "✅"] },
              { feature: "Custom Branding", values: ["❌", "✅", "✅"] },
              { feature: "Dedicated Manager", values: ["❌", "❌", "✅"] },
              { feature: "SLA", values: ["99.9%", "99.95%", "99.99%"] },
            ].map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{row.feature}</td>
                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex} className="p-4 text-center">
                    {value.includes("✅") ? (
                      <Check className="h-5 w-5 text-green-600 mx-auto" />
                    ) : value.includes("❌") ? (
                      <span className="text-gray-400">—</span>
                    ) : (
                      <span className="font-medium">{value}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EnhancedNavigation />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Enterprise <span className="text-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Tier-based pricing designed for organizations of every size.
              Unlock powerful enterprise features as you grow.
            </p>

            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span
                className={`text-sm ${!isAnnual ? "text-slate-900 font-semibold" : "text-slate-500"}`}
              >
                Monthly
              </span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span
                className={`text-sm ${isAnnual ? "text-slate-900 font-semibold" : "text-slate-500"}`}
              >
                Annual
              </span>
              {isAnnual && (
                <Badge className="bg-green-600 text-white">
                  Save {getDiscount()}%
                </Badge>
              )}
            </div>

            {currentTier !== "none" && (
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-sm text-slate-600">Current Plan:</span>
                <Badge className="bg-blue-600 text-white capitalize">
                  {currentTier}
                </Badge>
              </div>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {tierPlans.map((plan) => {
              const annualPrice = calculateAnnualPrice(
                plan.priceRange.min,
                plan.priceRange.max,
              );
              const isCurrentPlan = currentTier === plan.id;

              return (
                <Card
                  key={plan.id}
                  className={`relative hover:shadow-xl transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
                  } ${plan.recommended ? "ring-2 ring-purple-500" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-600 text-white px-4 py-1">
                        Recommended
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="text-blue-600 mb-4">{plan.icon}</div>
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {plan.description}
                    </CardDescription>

                    <div className="mt-6">
                      <div className="text-3xl font-bold text-slate-900">
                        {formatPrice(annualPrice.min, annualPrice.max)}
                      </div>
                      {!isAnnual && plan.priceRange.max !== -1 && (
                        <div className="text-sm text-slate-500 line-through">
                          {formatPrice(
                            plan.priceRange.min,
                            plan.priceRange.max,
                          )}
                        </div>
                      )}
                      <div className="text-sm text-slate-500 mt-1">
                        Custom pricing based on your needs
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Key Features */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Key Features
                      </h4>
                      <div className="space-y-2">
                        {plan.features.slice(0, 6).map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-slate-600">
                              {feature}
                            </span>
                          </div>
                        ))}
                        {plan.features.length > 6 && (
                          <div className="text-sm text-blue-600 font-medium">
                            +{plan.features.length - 6} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Dashboard Modules */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Dashboard Modules
                      </h4>
                      <div className="space-y-1">
                        {plan.modules.map((module, index) => (
                          <div key={index} className="text-sm text-slate-600">
                            • {module}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Why Choose {plan.name}?
                      </h4>
                      <ul className="space-y-1">
                        {plan.highlights.map((highlight, index) => (
                          <li key={index} className="text-sm text-slate-600">
                            ✨ {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => handleSelectPlan(plan.id)}
                        disabled={isCurrentPlan}
                      >
                        {isCurrentPlan ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Current Plan
                          </>
                        ) : (
                          <>
                            {plan.id === "platinum" ? (
                              <Crown className="h-4 w-4 mr-2" />
                            ) : plan.id === "gold" ? (
                              <Star className="h-4 w-4 mr-2" />
                            ) : (
                              <Shield className="h-4 w-4 mr-2" />
                            )}
                            Try {plan.name} (Demo)
                          </>
                        )}
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Call Sales
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Book Demo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature Comparison Table */}
          {renderFeatureComparison()}

          {/* FAQ/ROI Calculator Section */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>ROI Calculator</span>
                </CardTitle>
                <CardDescription>
                  Calculate your potential return on investment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Our enterprise customers typically see:
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Operational Efficiency Gain</span>
                    <span className="font-semibold text-green-600">25-40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cost Reduction</span>
                    <span className="font-semibold text-green-600">15-30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue Growth</span>
                    <span className="font-semibold text-green-600">20-35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">ROI Timeline</span>
                    <span className="font-semibold text-blue-600">
                      6-12 months
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Your ROI
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Need Help Choosing?</span>
                </CardTitle>
                <CardDescription>
                  Let our experts guide you to the right solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    Not sure which tier is right for your organization? Our
                    enterprise specialists can help you:
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Assess your current needs and growth plans</li>
                    <li>• Design a custom implementation roadmap</li>
                    <li>• Calculate precise ROI for your use case</li>
                    <li>• Plan a phased rollout approach</li>
                  </ul>
                  <div className="grid grid-cols-1 gap-2">
                    <Button>
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Request Custom Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnhancedEnterprisePricing;
