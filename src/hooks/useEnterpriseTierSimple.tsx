import React, { useState, createContext, useContext, ReactNode } from "react";

export type EnterpriseTier = "none" | "silver" | "gold" | "platinum";

interface EnterpriseTierContextType {
  tier: EnterpriseTier;
  upgradeTier: (newTier: EnterpriseTier) => void;
  hasAccess: (feature: string) => boolean;
}

const EnterpriseTierContext = createContext<
  EnterpriseTierContextType | undefined
>(undefined);

export const useEnterpriseTier = () => {
  const context = useContext(EnterpriseTierContext);
  if (context === undefined) {
    // Return safe defaults instead of throwing error
    return {
      tier: "silver" as EnterpriseTier,
      upgradeTier: (newTier: EnterpriseTier) =>
        console.log(`Upgrading to ${newTier}`),
      hasAccess: (feature: string) => true,
    };
  }
  return context;
};

interface EnterpriseTierProviderProps {
  children: ReactNode;
}

export const EnterpriseTierProvider: React.FC<EnterpriseTierProviderProps> = ({
  children,
}) => {
  const [tier, setTier] = useState<EnterpriseTier>("silver");

  const upgradeTier = (newTier: EnterpriseTier) => {
    setTier(newTier);
    console.log(`Upgraded to ${newTier} tier`);
  };

  const hasAccess = (feature: string) => {
    // Simple access control - all features available for now
    return true;
  };

  const value: EnterpriseTierContextType = {
    tier,
    upgradeTier,
    hasAccess,
  };

  return (
    <EnterpriseTierContext.Provider value={value}>
      {children}
    </EnterpriseTierContext.Provider>
  );
};

export default EnterpriseTierProvider;
