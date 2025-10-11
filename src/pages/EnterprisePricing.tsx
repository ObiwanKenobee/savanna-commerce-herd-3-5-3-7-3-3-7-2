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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import {
  CheckCircle,
  Crown,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Building,
  Factory,
  Banknote,
  ArrowRight,
  Star,
  Infinity,
  Target,
  BarChart3,
  Network,
  Database,
  Cloud,
  Lock,
  Award,
  Sparkles,
  ChevronRight,
  Calculator,
  DollarSign,
  Percent,
  Clock,
  Phone,
  Mail,
} from "lucide-react";

interface EnterpriseTier {
  id: string;
  name: string;
  tier: "platinum" | "gold" | "silver";
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  consumptionModel: string[];
  ecosystemAddons: string[];
  targetAudience: string;
  roi: string;
  icon: string;
  popular?: boolean;
  exclusive?: boolean;
}

interface ConsumptionPricing {
  category: string;
  basePrice: string;
  volumeDiscount: string;
  description: string;
  icon: string;
}

interface EcosystemAddon {
  id: string;
  name: string;
  price: string;
  description: string;
  roi: string;
  features: string[];
  icon: string;
  lockInValue: string;
}

const EnterprisePricing: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [annualSavings, setAnnualSavings] = useState(20);
  const navigate = useNavigate();

  const enterpriseTiers: EnterpriseTier[] = [
    {
      id: "silver",
      name: "Silver Tier",
      tier: "silver",
      price: "$25K - $100K",
      period: "annually",
      description: "For scaling organizations with 1,000+ employees",
      features: [
        "Basic AI tools & analytics",
        "Standard 24/7 support",
        "100 API calls/month",
        "Regional data centers",
        "Multi-user access (up to 50)",
        "Standard SLA (99.5% uptime)",
        "Quarterly business reviews",
        "Email & chat support",
      ],
      consumptionModel: [
        "0.8% transaction fees",
        "Basic API: $2/call over limit",
        "Standard data processing",
      ],
      ecosystemAddons: [
        "Basic Sustainability Compliance: $10K/month",
        "Standard Digital Twin: $50K/year",
        "Regional Network Access: $25K/year",
      ],
      targetAudience: "Mid-tier enterprises, regional corporations",
      roi: "15-25% operational cost reduction",
      icon: "🥈",
    },
    {
      id: "gold",
      name: "Gold Tier",
      tier: "gold",
      price: "$100K - $250K",
      period: "annually",
      description: "Mid-tier enterprises with advanced operational needs",
      features: [
        "Advanced AI optimization suite",
        "Priority 24/7 support with dedicated AM",
        "500+ monthly API calls",
        "Global data center access",
        "Multi-user access (up to 200)",
        "Enhanced SLA (99.9% uptime)",
        "Monthly strategic consultations",
        "Phone, email & video support",
        "Custom integrations (up to 10)",
        "Advanced analytics dashboard",
      ],
      consumptionModel: [
        "0.6% transaction fees",
        "Premium API: $1.5/call over limit",
        "Priority data processing",
        "Volume discounts at $50M+ annually",
      ],
      ecosystemAddons: [
        "Advanced Sustainability Suite: $20K/month",
        "Enterprise Digital Twin: $100K/year",
        "Exclusive Network Access: $50K/year",
        "Blockchain Assurance: 0.2% transaction fee",
      ],
      targetAudience: "Large enterprises, Fortune 1000 companies",
      roi: "25-40% operational cost reduction",
      icon: "🥇",
      popular: true,
    },
    {
      id: "platinum",
      name: "Platinum Tier",
      tier: "platinum",
      price: "$250K+",
      originalPrice: "$500K+",
      period: "annually",
      description:
        "Fortune 500-level corporations with mission-critical operations",
      features: [
        "Dedicated AI concierge & custom models",
        "White-glove 24/7 support with C-level access",
        "Unlimited API calls & custom endpoints",
        "Private cloud deployment options",
        "Unlimited user access",
        "Premium SLA (99.999% uptime)",
        "Weekly C-level strategic sessions",
        "Dedicated success team (5+ members)",
        "Unlimited custom integrations",
        "Real-time predictive analytics",
        "Custom regulatory compliance",
        "Executive advisory board access",
      ],
      consumptionModel: [
        "0.3% transaction fees (negotiable)",
        "Custom API pricing",
        "Real-time priority processing",
        "Volume discounts at $100M+ annually",
        "Revenue-sharing opportunities",
      ],
      ecosystemAddons: [
        "Complete ESG Suite: $50K/month",
        "Mission-Critical Digital Twin: $200K/year",
        "Invite-Only Deal Rooms: $100K/year",
        "Smart Contract Automation: 0.1% transaction fee",
        "Executive Network Access: $150K/year",
      ],
      targetAudience: "Fortune 500, mega-corporations, global enterprises",
      roi: "40-60% operational cost reduction",
      icon: "👑",
      exclusive: true,
    },
  ];

  const consumptionPricing: ConsumptionPricing[] = [
    {
      category: "Transaction Processing",
      basePrice: "0.3-1.5%",
      volumeDiscount: "Up to 50% off at $100M+ volume",
      description: "Per B2B transaction processed through the platform",
      icon: "💳",
    },
    {
      category: "AI & Data Services",
      basePrice: "$5K-$50K/month",
      volumeDiscount: "Volume-based scaling",
      description: "Predictive analytics, AI optimization, demand forecasting",
      icon: "🤖",
    },
    {
      category: "API Ecosystem",
      basePrice: "$0.10-$5.00/call",
      volumeDiscount: "Enterprise packages from $50K/month",
      description: "Real-time inventory, customs compliance, supply chain sync",
      icon: "🔗",
    },
    {
      category: "Data Monetization",
      basePrice: "15-30%",
      volumeDiscount: "Revenue sharing model",
      description: "Share of revenue from anonymized market insights sales",
      icon: "📊",
    },
  ];

  const ecosystemAddons: EcosystemAddon[] = [
    {
      id: "digital-twin",
      name: "Digital Twin Integration",
      price: "$100K-$200K/year",
      description: "Real-time supply chain simulations and optimization",
      roi: "25-40% supply chain efficiency improvement",
      features: [
        "Real-time supply chain modeling",
        "Predictive scenario analysis",
        "Risk mitigation algorithms",
        "Performance optimization",
        "Integration with existing ERP",
      ],
      icon: "🔄",
      lockInValue: "Custom integrations create 18-month switching costs",
    },
    {
      id: "sustainability",
      name: "Sustainability Compliance Suite",
      price: "$20K-$50K/month",
      description: "Carbon footprint tracking and ESG reporting automation",
      roi: "Regulatory compliance + 15% cost reduction",
      features: [
        "Real-time carbon tracking",
        "ESG automated reporting",
        "Regulatory compliance monitoring",
        "Sustainability scoring",
        "Green supply chain optimization",
      ],
      icon: "🌱",
      lockInValue: "Embedded workflows prevent platform switching",
    },
    {
      id: "exclusive-networks",
      name: "Executive Deal Rooms",
      price: "$50K-$150K/year",
      description: "Access to invite-only mega-corp matchmaking networks",
      roi: "Access to $B+ deal opportunities",
      features: [
        "C-level executive networks",
        "Exclusive deal opportunities",
        "Strategic partnership facilitation",
        "High-value supplier access",
        "Executive advisory sessions",
      ],
      icon: "🤝",
      lockInValue: "Network effects create irreplaceable value",
    },
    {
      id: "blockchain",
      name: "Blockchain Assurance Platform",
      price: "0.1-0.3% transaction fee",
      description: "Smart contract-authenticated transactions and compliance",
      roi: "99.9% fraud reduction + legal cost savings",
      features: [
        "Smart contract automation",
        "Immutable transaction records",
        "Automated compliance checking",
        "Dispute resolution protocols",
        "Cross-border payment optimization",
      ],
      icon: "⛓️",
      lockInValue: "Proprietary smart contracts lock in ecosystem",
    },
  ];

  const incentives = [
    {
      title: "Growth Rebates",
      description: "5-10% fee discounts for driving new platform users",
      icon: "📈",
    },
    {
      title: "Multi-Year Commitments",
      description: "15-20% discount for 3-year contracts paid upfront",
      icon: "📅",
    },
    {
      title: "Revenue Sharing",
      description: "Earn 15-30% revenue share from market insights sales",
      icon: "💰",
    },
    {
      title: "Network Effects Bonus",
      description: "Unlock premium features as ecosystem grows",
      icon: "🌐",
    },
  ];

  const renderHeroSection = () => (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <Badge className="mb-6 bg-yellow-600 text-black font-semibold px-6 py-2 text-lg">
            Enterprise Revenue Systems
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-yellow-400">Infinite Revenue</span> Loop
            <br />
            for Mega-Corporations
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-4xl mx-auto">
            Scalable consumption models, ecosystem lock-in tactics, and premium
            add-ons that create an infinite revenue loop targeting Fortune 500
            enterprises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Infinity className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Infinite Loop</h3>
              <p className="text-slate-200 text-sm">
                Self-reinforcing revenue ecosystem
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Target className="h-12 w-12 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">
                High Entry Barriers
              </h3>
              <p className="text-slate-200 text-sm">
                Premium pricing for elite clients
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Network className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Network Effects</h3>
              <p className="text-slate-200 text-sm">
                Platform becomes indispensable
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Lock className="h-12 w-12 text-red-400 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Ecosystem Lock-in</h3>
              <p className="text-slate-200 text-sm">Data/workflow dependency</p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg mr-4"
            onClick={() => setShowROICalculator(true)}
          >
            Calculate ROI <Calculator className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
            onClick={() => navigate("/enterprise-onboarding")}
          >
            Start Enterprise Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTierComparison = () => (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Enterprise Subscription Tiers
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Foundation revenue with tiered enterprise subscriptions. High entry
            barriers justify premium pricing while filtering for high-value
            clients.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {enterpriseTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                tier.popular
                  ? "border-yellow-400 shadow-xl scale-105 bg-gradient-to-br from-yellow-50 to-orange-50"
                  : tier.exclusive
                    ? "border-purple-400 bg-gradient-to-br from-purple-50 to-slate-50"
                    : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-center py-2 font-semibold">
                  Most Popular - Fortune 1000 Choice
                </div>
              )}
              {tier.exclusive && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-slate-600 text-white text-center py-2 font-semibold">
                  Exclusive - Fortune 500 Only
                </div>
              )}

              <CardHeader
                className={
                  tier.popular ? "pt-12" : tier.exclusive ? "pt-12" : "pt-6"
                }
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{tier.icon}</div>
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    {tier.description}
                  </CardDescription>
                </div>

                <div className="text-center mt-6">
                  <div className="flex items-baseline justify-center space-x-2">
                    {tier.originalPrice && (
                      <span className="text-lg text-slate-400 line-through">
                        {tier.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-slate-800">
                      {tier.price}
                    </span>
                  </div>
                  <div className="text-slate-600">{tier.period}</div>
                  <div className="text-sm text-green-600 font-semibold mt-1">
                    {tier.roi}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    Core Features
                  </h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-600">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">
                    Consumption Model
                  </h4>
                  <ul className="space-y-1">
                    {tier.consumptionModel.map((model, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-600 flex items-center space-x-2"
                      >
                        <DollarSign className="h-3 w-3 text-green-500" />
                        <span>{model}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className={`w-full ${
                    tier.popular
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                      : tier.exclusive
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-slate-800 hover:bg-slate-900 text-white"
                  }`}
                  onClick={() => {
                    setSelectedTier(tier.id);
                    navigate("/enterprise-onboarding", {
                      state: { tier: tier.id },
                    });
                  }}
                >
                  {tier.exclusive
                    ? "Request Invitation"
                    : "Start Enterprise Trial"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center">
                  <p className="text-xs text-slate-500">
                    Target: {tier.targetAudience}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConsumptionModel = () => (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Scalable Consumption Pricing
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Monetize every interaction. Clients pay more as they grow, directly
            tying your revenue to their success. The infinite loop engine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {consumptionPricing.map((pricing, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="text-3xl mb-4">{pricing.icon}</div>
                <CardTitle className="text-lg">{pricing.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {pricing.basePrice}
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  {pricing.description}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {pricing.volumeDiscount}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Volume Scaling Example</h3>
          <p className="text-lg mb-6">
            A Fortune 500 company processing $500M annually saves $2.5M with our
            volume discounts
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold">$500M</div>
              <div className="text-sm opacity-90">
                Annual Transaction Volume
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold">0.3%</div>
              <div className="text-sm opacity-90">Platinum Tier Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold">$1.5M</div>
              <div className="text-sm opacity-90">Annual Platform Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEcosystemAddons = () => (
    <div className="py-20 bg-gradient-to-br from-slate-100 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Ecosystem Lock-In Add-Ons
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Premium add-ons that create dependency. Exiting the platform becomes
            prohibitively costly due to custom integrations and proprietary
            workflows.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {ecosystemAddons.map((addon) => (
            <Card
              key={addon.id}
              className="hover:shadow-xl transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{addon.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{addon.name}</CardTitle>
                      <CardDescription>{addon.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">{addon.roi}</Badge>
                </div>
                <div className="text-2xl font-bold text-purple-600 mt-4">
                  {addon.price}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {addon.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-semibold text-red-700">
                      Lock-in Value:
                    </span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">
                    {addon.lockInValue}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIncentives = () => (
    <div className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Behavioral Incentives
          </h2>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto">
            Fuel the infinite revenue loop with growth rebates, multi-year
            commitments, and data monetization opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {incentives.map((incentive, index) => (
            <Card
              key={index}
              className="bg-white/90 backdrop-blur-sm border-white/20"
            >
              <CardHeader className="text-center">
                <div className="text-3xl mb-4">{incentive.icon}</div>
                <CardTitle className="text-lg">{incentive.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 text-center">
                  {incentive.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Join the Elite?</h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Connect with our enterprise team to customize your infinite revenue
          loop. Available 24/7 for Fortune 500 inquiries.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            onClick={() => navigate("/enterprise-onboarding")}
          >
            <Crown className="mr-2 h-5 w-5" />
            Start Enterprise Onboarding
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black"
          >
            <Phone className="mr-2 h-5 w-5" />
            Schedule C-Level Call
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <EnhancedNavigation />

      <main className="pt-16">
        {renderHeroSection()}
        {renderTierComparison()}
        {renderConsumptionModel()}
        {renderEcosystemAddons()}
        {renderIncentives()}
        {renderContactSection()}
      </main>

      {/* ROI Calculator Modal would go here */}
      {showROICalculator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Enterprise ROI Calculator</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">
                    Annual Transaction Volume
                  </label>
                  <div className="text-2xl font-bold text-green-600">$500M</div>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Expected Savings (%)
                  </label>
                  <Progress value={annualSavings} className="mt-2" />
                  <div className="text-right text-sm text-slate-600">
                    {annualSavings}%
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-lg font-semibold">
                    Projected Annual Savings
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    ${((500 * annualSavings) / 100).toFixed(1)}M
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowROICalculator(false)}
                >
                  Close
                </Button>
                <Button onClick={() => navigate("/enterprise-onboarding")}>
                  Start Onboarding
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnterprisePricing;
