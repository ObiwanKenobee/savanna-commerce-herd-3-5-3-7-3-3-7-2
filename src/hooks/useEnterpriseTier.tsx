import { useState, useEffect, createContext, useContext } from "react";
import { useAuth } from "@/hooks/useAuth";

export type EnterpriseTier = "none" | "silver" | "gold" | "platinum";

export interface TierFeatures {
  maxUsers: number;
  maxIntegrations: number;
  maxDataSources: number;
  maxReports: number;
  maxDashboards: number;
  advancedAnalytics: boolean;
  aiInsights: boolean;
  complianceTools: boolean;
  securityCenter: boolean;
  businessIntelligence: boolean;
  customIntegrations: boolean;
  prioritySupport: boolean;
  dedicatedManager: boolean;
  customBranding: boolean;
  apiAccess: "basic" | "full" | "unlimited";
  storageGB: number;
}

export const TIER_FEATURES: Record<EnterpriseTier, TierFeatures> = {
  none: {
    maxUsers: 0,
    maxIntegrations: 0,
    maxDataSources: 0,
    maxReports: 0,
    maxDashboards: 0,
    advancedAnalytics: false,
    aiInsights: false,
    complianceTools: false,
    securityCenter: false,
    businessIntelligence: false,
    customIntegrations: false,
    prioritySupport: false,
    dedicatedManager: false,
    customBranding: false,
    apiAccess: "basic",
    storageGB: 0,
  },
  silver: {
    maxUsers: 50,
    maxIntegrations: 10,
    maxDataSources: 5,
    maxReports: 25,
    maxDashboards: 3,
    advancedAnalytics: false,
    aiInsights: false,
    complianceTools: true,
    securityCenter: false,
    businessIntelligence: false,
    customIntegrations: false,
    prioritySupport: true,
    dedicatedManager: false,
    customBranding: false,
    apiAccess: "basic",
    storageGB: 100,
  },
  gold: {
    maxUsers: 200,
    maxIntegrations: 25,
    maxDataSources: 15,
    maxReports: 100,
    maxDashboards: 8,
    advancedAnalytics: true,
    aiInsights: false,
    complianceTools: true,
    securityCenter: true,
    businessIntelligence: true,
    customIntegrations: true,
    prioritySupport: true,
    dedicatedManager: false,
    customBranding: true,
    apiAccess: "full",
    storageGB: 500,
  },
  platinum: {
    maxUsers: -1, // Unlimited
    maxIntegrations: -1,
    maxDataSources: -1,
    maxReports: -1,
    maxDashboards: -1,
    advancedAnalytics: true,
    aiInsights: true,
    complianceTools: true,
    securityCenter: true,
    businessIntelligence: true,
    customIntegrations: true,
    prioritySupport: true,
    dedicatedManager: true,
    customBranding: true,
    apiAccess: "unlimited",
    storageGB: -1, // Unlimited
  },
};

export const TIER_PRICING = {
  silver: { min: 25000, max: 100000 },
  gold: { min: 100000, max: 250000 },
  platinum: { min: 250000, max: -1 },
};

interface EnterpriseTierContextType {
  currentTier: EnterpriseTier;
  features: TierFeatures;
  hasFeature: (feature: keyof TierFeatures) => boolean;
  hasAccess: (feature: string) => boolean;
  canAccess: (requiredTier: EnterpriseTier) => boolean;
  upgradeRequired: (feature: keyof TierFeatures) => boolean;
  getUpgradeUrl: () => string;
  isLoading: boolean;
}

const EnterpriseTierContext = createContext<
  EnterpriseTierContextType | undefined
>(undefined);

export const EnterpriseTierProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user, profile } = useAuth();
  const [currentTier, setCurrentTier] = useState<EnterpriseTier>("none");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserTier = async () => {
      setIsLoading(true);
      try {
        if (!user || !profile) {
          setCurrentTier("none");
          return;
        }

        // Get tier from user profile or organization
        const tierFromProfile = profile.organization?.tier as EnterpriseTier;

        // For demo purposes, you can set a default tier
        const demoTier = localStorage.getItem(
          "demo_enterprise_tier",
        ) as EnterpriseTier;

        setCurrentTier(tierFromProfile || demoTier || "none");
      } catch (error) {
        console.error("Error loading user tier:", error);
        setCurrentTier("none");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserTier();
  }, [user, profile]);

  const features = TIER_FEATURES[currentTier];

  const hasFeature = (feature: keyof TierFeatures): boolean => {
    return features[feature] as boolean;
  };

  const hasAccess = (feature: string): boolean => {
    // Map feature names to tier requirements
    const featureRequirements: Record<string, EnterpriseTier> = {
      suppliers: "silver",
      logistics: "gold",
      analytics: "gold",
      ai: "platinum",
      ecosystem: "platinum",
      compliance: "silver",
      security: "gold",
      "business-intelligence": "gold",
      "operational-excellence": "gold",
      "financial-control": "gold",
    };

    const requiredTier = featureRequirements[feature] || "none";
    return canAccess(requiredTier);
  };

  const canAccess = (requiredTier: EnterpriseTier): boolean => {
    const tierOrder: EnterpriseTier[] = ["none", "silver", "gold", "platinum"];
    const currentIndex = tierOrder.indexOf(currentTier);
    const requiredIndex = tierOrder.indexOf(requiredTier);
    return currentIndex >= requiredIndex;
  };

  const upgradeRequired = (feature: keyof TierFeatures): boolean => {
    return !hasFeature(feature);
  };

  const getUpgradeUrl = (): string => {
    return "/enterprise-pricing?upgrade=true";
  };

  return (
    <EnterpriseTierContext.Provider
      value={{
        currentTier,
        features,
        hasFeature,
        hasAccess,
        canAccess,
        upgradeRequired,
        getUpgradeUrl,
        isLoading,
      }}
    >
      {children}
    </EnterpriseTierContext.Provider>
  );
};

export const useEnterpriseTier = () => {
  const context = useContext(EnterpriseTierContext);
  if (context === undefined) {
    throw new Error(
      "useEnterpriseTier must be used within an EnterpriseTierProvider",
    );
  }
  return context;
};

// Demo function to set tier for testing
export const setDemoTier = (tier: EnterpriseTier) => {
  localStorage.setItem("demo_enterprise_tier", tier);
  window.location.reload();
};
