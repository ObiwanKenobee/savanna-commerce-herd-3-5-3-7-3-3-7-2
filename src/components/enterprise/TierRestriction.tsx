import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEnterpriseTier, EnterpriseTier } from "@/hooks/useEnterpriseTier";
import {
  Crown,
  Lock,
  ArrowRight,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Users,
  BarChart3,
  Database,
  Brain,
  Building,
} from "lucide-react";

interface TierRestrictionProps {
  title?: string;
  requiredTier?: EnterpriseTier;
  currentTier?: EnterpriseTier;
  feature?: string;
  description: string;
  children?: React.ReactNode;
  showPreview?: boolean;
  className?: string;
  features?: string[];
  benefits?: string[];
}

const getTierIcon = (tier: EnterpriseTier) => {
  switch (tier) {
    case "silver":
      return <Shield className="h-5 w-5" />;
    case "gold":
      return <Star className="h-5 w-5" />;
    case "platinum":
      return <Crown className="h-5 w-5" />;
    default:
      return <Lock className="h-5 w-5" />;
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

const getTierBenefits = (tier: EnterpriseTier) => {
  switch (tier) {
    case "silver":
      return [
        "Up to 50 users",
        "Basic compliance tools",
        "Priority support",
        "10 integrations",
        "100GB storage",
      ];
    case "gold":
      return [
        "Up to 200 users",
        "Advanced analytics",
        "Security center",
        "Business intelligence",
        "Custom integrations",
        "500GB storage",
      ];
    case "platinum":
      return [
        "Unlimited users",
        "AI-powered insights",
        "Dedicated account manager",
        "Custom branding",
        "Unlimited everything",
        "White-glove onboarding",
      ];
    default:
      return [];
  }
};

const TierRestriction: React.FC<TierRestrictionProps> = ({
  title,
  requiredTier = "silver",
  currentTier: propCurrentTier,
  feature,
  description,
  children,
  showPreview = false,
  className = "",
  features = [],
  benefits: propBenefits = [],
}) => {
  const {
    canAccess,
    currentTier: hookCurrentTier,
    getUpgradeUrl,
  } = useEnterpriseTier();
  const navigate = useNavigate();
  const currentTier = propCurrentTier || hookCurrentTier;

  if (canAccess(requiredTier)) {
    return <>{children}</>;
  }

  const benefits =
    propBenefits.length > 0 ? propBenefits : getTierBenefits(requiredTier);
  const tierIcon = getTierIcon(requiredTier);
  const tierColor = getTierColor(requiredTier);
  const displayTitle =
    title ||
    `${requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)} Tier Required`;
  const displayFeature = feature || title || "this feature";

  return (
    <div className={`relative ${className}`}>
      {/* Blurred Preview */}
      {showPreview && children && (
        <div className="relative">
          <div className="filter blur-sm pointer-events-none opacity-50">
            {children}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white/80 pointer-events-none" />
        </div>
      )}

      {/* Restriction Overlay */}
      <Card className="border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-white">
        <CardHeader className="text-center pb-4">
          <div
            className={`mx-auto w-16 h-16 ${tierColor} rounded-full flex items-center justify-center text-white mb-4`}
          >
            {tierIcon}
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            {displayTitle}
          </CardTitle>
          <CardDescription className="text-gray-600">
            Upgrade to access {displayFeature}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertTitle>Feature Restricted</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Alert>

          {/* Current vs Required Tier */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Current Plan
              </div>
              <Badge variant="outline" className="capitalize">
                {currentTier === "none" ? "No Plan" : currentTier}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Required Plan
              </div>
              <Badge className={`${tierColor} text-white capitalize`}>
                {requiredTier}
              </Badge>
            </div>
          </div>

          {/* Features List */}
          {features.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Available Features:
              </h4>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits List */}
          {benefits.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}{" "}
                Tier Benefits:
              </h4>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 ${tierColor} rounded-full`} />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
            {requiredTier === "gold" || requiredTier === "platinum" ? (
              <>
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-xs font-medium">Advanced Analytics</div>
                </div>
                <div className="text-center">
                  <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-xs font-medium">
                    Business Intelligence
                  </div>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-xs font-medium">Security Center</div>
                </div>
              </>
            ) : null}

            {requiredTier === "platinum" ? (
              <>
                <div className="text-center">
                  <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-xs font-medium">AI Insights</div>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-xs font-medium">Dedicated Manager</div>
                </div>
                <div className="text-center">
                  <Building className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                  <div className="text-xs font-medium">Custom Branding</div>
                </div>
              </>
            ) : null}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate(getUpgradeUrl())}
              className={`flex-1 ${tierColor} hover:opacity-90`}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Upgrade to{" "}
              {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/contact")}
              className="flex-1"
            >
              Contact Sales
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Pricing Hint */}
          <div className="text-center text-sm text-gray-500">
            {requiredTier === "silver" && "Starting at $25,000/year"}
            {requiredTier === "gold" && "Starting at $100,000/year"}
            {requiredTier === "platinum" && "Starting at $250,000/year"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TierRestriction;
