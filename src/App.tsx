import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { EnterpriseTierProvider } from "@/hooks/useEnterpriseTierSimple";
import { useSwahiliVoice } from "@/hooks/useSwahiliVoice";
import VoiceCommandOverlay from "@/components/voice/VoiceCommandOverlay";
import ErrorBoundary from "@/components/ErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";
import { neoSavannahTheme } from "@/theme/neo-savannah";
import { Zap, Moon, Sun } from "lucide-react";

// Core Pages
const Index = lazy(() => import("@/pages/Index"));
const IndexFixed = lazy(() => import("@/pages/IndexFixed"));
const MinimalIndex = lazy(() => import("@/pages/MinimalIndex"));
const BasicTest = lazy(() => import("@/pages/BasicTest"));
const Products = lazy(() => import("@/pages/Products"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Cart = lazy(() => import("@/pages/Cart"));
const Auth = lazy(() => import("@/pages/Auth"));

// Neo-Savannah Components
const NeoSavannahApp = lazy(
  () => import("@/components/neo-savannah/NeoSavannahApp"),
);
const ARProductScanner = lazy(
  () => import("@/components/neo-savannah/ARProductScanner"),
);

// Pricing & Onboarding
const PricingOnboarding = lazy(() => import("@/pages/PricingOnboarding"));
const EnhancedEnterprisePricing = lazy(
  () => import("@/pages/enterprise/EnhancedEnterprisePricing"),
);
const EnterprisePricing = lazy(() => import("@/pages/EnterprisePricing"));
const EnterpriseOnboarding = lazy(() => import("@/pages/EnterpriseOnboarding"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const EcosystemExpansion = lazy(() => import("@/pages/EcosystemExpansion"));

// Enterprise Dashboards
const TierBasedDashboard = lazy(
  () => import("@/pages/enterprise/TierBasedDashboard"),
);
const TierBasedDashboardFixed = lazy(
  () => import("@/pages/enterprise/TierBasedDashboardFixed"),
);
const EnterpriseDashboard = lazy(() => import("@/pages/EnterpriseDashboard"));
const EnterpriseDashboardRouter = lazy(
  () => import("@/pages/enterprise/EnterpriseDashboardRouter"),
);

// Silver Tier - Basic Enterprise
const ExecutiveOverview = lazy(
  () => import("@/pages/enterprise/ExecutiveOverview"),
);
const ExecutiveOverviewFixed = lazy(
  () => import("@/pages/enterprise/ExecutiveOverviewFixed"),
);
const RevenueOperations = lazy(
  () => import("@/pages/enterprise/RevenueOperations"),
);
const SupplyChainCommand = lazy(
  () => import("@/pages/enterprise/SupplyChainCommand"),
);

// Gold Tier - Advanced Enterprise
const OperationalExcellence = lazy(
  () => import("@/pages/enterprise/OperationalExcellence"),
);
const FinancialControl = lazy(
  () => import("@/pages/enterprise/FinancialControl"),
);
const BusinessIntelligence = lazy(
  () => import("@/pages/enterprise/BusinessIntelligence"),
);
const SecurityOperations = lazy(
  () => import("@/pages/enterprise/SecurityOperations"),
);
const ComplianceGovernance = lazy(
  () => import("@/pages/enterprise/ComplianceGovernance"),
);
const SupplierManagementPortal = lazy(
  () => import("@/pages/enterprise/SupplierManagementPortal"),
);
const LogisticsOperationsCenter = lazy(
  () => import("@/pages/enterprise/LogisticsOperationsCenter"),
);
const EcosystemSynchronizationHub = lazy(
  () => import("@/pages/enterprise/EcosystemSynchronizationHub"),
);

// Platinum Tier - Premium Enterprise
const AIIntelligenceHub = lazy(
  () => import("@/pages/enterprise/AIIntelligenceHub"),
);
const IntegrationManagement = lazy(
  () => import("@/pages/enterprise/IntegrationManagement"),
);

// Enterprise Demo & Pricing
const EnterpriseTierDemo = lazy(
  () => import("@/pages/enterprise/EnterpriseTierDemo"),
);

// Standard Features
const DigitalSavannaMarketplace = lazy(
  () => import("@/pages/DigitalSavannaMarketplace"),
);
const AfricanEcommerce = lazy(() => import("@/pages/AfricanEcommerce"));
const Settings = lazy(() => import("@/pages/Settings"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const BillingManagement = lazy(() => import("@/pages/BillingManagement"));
const InnovationHub = lazy(() => import("@/pages/InnovationHub"));
const PlatformStatus = lazy(() => import("@/pages/PlatformStatus"));
const ApiDocs = lazy(() => import("@/pages/ApiDocs"));

// Enhanced Features
const PackStories = lazy(() => import("@/pages/enterprise/PackStories"));
const SwiftRetailers = lazy(() => import("@/pages/enterprise/SwiftRetailers"));
const WateringHoles = lazy(() => import("@/pages/enterprise/WateringHoles"));
const HerdDirectory = lazy(() => import("@/pages/enterprise/HerdDirectory"));

// Dashboard pages
const EnhancedSupplierHub = lazy(
  () => import("@/pages/dashboard/supplier/EnhancedSupplierHub"),
);
const CheetahLogistics = lazy(
  () => import("@/pages/dashboard/logistics/CheetahLogistics"),
);

// Admin pages
const AfricanHeritageAdmin = lazy(
  () => import("@/pages/admin/AfricanHeritageAdmin"),
);
const CompleteAdminDashboard = lazy(
  () => import("@/pages/admin/CompleteAdminDashboard"),
);
const SavannaCommandCenter = lazy(
  () => import("@/pages/admin/SavannaCommandCenter"),
);
const AdminSEOPage = lazy(() => import("@/pages/admin/AdminSEOPage"));

// Voice Command Integration (temporarily disabled)
const VoiceEnabledApp: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Temporarily disable voice to eliminate potential errors
  return <>{children}</>;
};

// Neo-Savannah Mode Toggle
const NeoSavannahToggle: React.FC<{
  isNeoMode: boolean;
  onToggle: () => void;
}> = ({ isNeoMode, onToggle }) => (
  <motion.button
    onClick={onToggle}
    className="fixed top-4 left-4 z-50 p-3 rounded-full"
    style={{
      background: isNeoMode
        ? `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}, ${neoSavannahTheme.colors.neon.blue})`
        : "rgba(255, 255, 255, 0.1)",
      border: isNeoMode
        ? `2px solid ${neoSavannahTheme.colors.neon.green}`
        : "2px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(10px)",
      boxShadow: isNeoMode
        ? `0 0 20px ${neoSavannahTheme.colors.neon.green}50`
        : "none",
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    animate={{
      rotate: isNeoMode ? [0, 360] : 0,
      boxShadow: isNeoMode
        ? [
            `0 0 20px ${neoSavannahTheme.colors.neon.green}50`,
            `0 0 30px ${neoSavannahTheme.colors.neon.green}80`,
            `0 0 20px ${neoSavannahTheme.colors.neon.green}50`,
          ]
        : "none",
    }}
    transition={{
      rotate: { duration: 2, repeat: isNeoMode ? Infinity : 0, ease: "linear" },
      boxShadow: { duration: 2, repeat: isNeoMode ? Infinity : 0 },
    }}
  >
    {isNeoMode ? (
      <div className="flex items-center gap-2 text-white">
        <Zap className="w-5 h-5" />
        <span className="text-sm font-bold">NEO</span>
      </div>
    ) : (
      <div className="flex items-center gap-2 text-white">
        <span className="text-xl">🦁</span>
        <span className="text-sm">Classic</span>
      </div>
    )}
  </motion.button>
);

function App() {
  const [isNeoSavannahMode, setIsNeoSavannahMode] = useState(false);
  const [showARScanner, setShowARScanner] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "N") {
        setIsNeoSavannahMode(!isNeoSavannahMode);
      }
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        setShowARScanner(!showARScanner);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isNeoSavannahMode, showARScanner]);

  if (showARScanner) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          </div>
        }
      >
        <ARProductScanner />
      </Suspense>
    );
  }

  if (isNeoSavannahMode) {
    return (
      <div style={{ fontFamily: neoSavannahTheme.typography.fonts.body }}>
        <NeoSavannahToggle
          isNeoMode={true}
          onToggle={() => setIsNeoSavannahMode(false)}
        />
        <Suspense
          fallback={
            <div
              className="min-h-screen flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}, ${neoSavannahTheme.colors.atmosphere.dusk})`,
              }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  width: "80px",
                  height: "80px",
                  border: `4px solid ${neoSavannahTheme.colors.neon.green}`,
                  borderTop: `4px solid transparent`,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${neoSavannahTheme.colors.neon.green}20, transparent)`,
                }}
              />
            </div>
          }
        >
          <NeoSavannahApp />
        </Suspense>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Router>
          <AuthProvider>
            <EnterpriseTierProvider>
              <CartProvider>
                <VoiceEnabledApp>
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <NeoSavannahToggle
                      isNeoMode={false}
                      onToggle={() => setIsNeoSavannahMode(true)}
                    />

                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center min-h-screen">
                          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
                        </div>
                      }
                    >
                      <Routes>
                        {/* Core Pages */}
                        <Route path="/" element={<BasicTest />} />
                        <Route path="/minimal" element={<MinimalIndex />} />
                        <Route path="/fixed" element={<IndexFixed />} />
                        <Route path="/original" element={<Index />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/auth" element={<Auth />} />

                        {/* Pricing & Onboarding */}
                        <Route
                          path="/pricing"
                          element={<PricingOnboarding />}
                        />
                        <Route
                          path="/enterprise-pricing"
                          element={<EnhancedEnterprisePricing />}
                        />
                        <Route
                          path="/enterprise-pricing-legacy"
                          element={<EnterprisePricing />}
                        />
                        <Route
                          path="/enterprise-onboarding"
                          element={<EnterpriseOnboarding />}
                        />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route
                          path="/ecosystem"
                          element={<EcosystemExpansion />}
                        />

                        {/* Enterprise Dashboards - Tier-based */}
                        <Route
                          path="/enterprise"
                          element={<TierBasedDashboardFixed />}
                        />
                        <Route
                          path="/enterprise-original"
                          element={<TierBasedDashboard />}
                        />
                        <Route
                          path="/enterprise-dashboard"
                          element={<EnterpriseDashboard />}
                        />
                        <Route
                          path="/enterprise/router"
                          element={<EnterpriseDashboardRouter />}
                        />

                        {/* Silver Tier - Basic Enterprise */}
                        <Route
                          path="/enterprise/executive-overview"
                          element={<ExecutiveOverviewFixed />}
                        />
                        <Route
                          path="/enterprise/executive-overview-original"
                          element={<ExecutiveOverview />}
                        />
                        <Route
                          path="/enterprise/revenue-operations"
                          element={<RevenueOperations />}
                        />
                        <Route
                          path="/enterprise/supply-chain-command"
                          element={<SupplyChainCommand />}
                        />

                        {/* Gold Tier - Advanced Enterprise */}
                        <Route
                          path="/enterprise/operational-excellence"
                          element={<OperationalExcellence />}
                        />
                        <Route
                          path="/enterprise/financial-control"
                          element={<FinancialControl />}
                        />
                        <Route
                          path="/enterprise/business-intelligence"
                          element={<BusinessIntelligence />}
                        />
                        <Route
                          path="/enterprise/security-operations"
                          element={<SecurityOperations />}
                        />
                        <Route
                          path="/enterprise/compliance-governance"
                          element={<ComplianceGovernance />}
                        />
                        <Route
                          path="/enterprise/supplier-management"
                          element={<SupplierManagementPortal />}
                        />
                        <Route
                          path="/enterprise/logistics-operations"
                          element={<LogisticsOperationsCenter />}
                        />
                        <Route
                          path="/enterprise/ecosystem-sync"
                          element={<EcosystemSynchronizationHub />}
                        />

                        {/* Platinum Tier - Premium Enterprise */}
                        <Route
                          path="/enterprise/ai-intelligence"
                          element={<AIIntelligenceHub />}
                        />
                        <Route
                          path="/enterprise/integration-management"
                          element={<IntegrationManagement />}
                        />

                        {/* Enterprise Demo & Pricing */}
                        <Route
                          path="/enterprise/demo"
                          element={<EnterpriseTierDemo />}
                        />

                        {/* Enhanced Features */}
                        <Route
                          path="/marketplace"
                          element={<DigitalSavannaMarketplace />}
                        />
                        <Route
                          path="/african-ecommerce"
                          element={<AfricanEcommerce />}
                        />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route
                          path="/billing"
                          element={<BillingManagement />}
                        />
                        <Route path="/innovation" element={<InnovationHub />} />
                        <Route path="/status" element={<PlatformStatus />} />
                        <Route path="/api-docs" element={<ApiDocs />} />

                        {/* Enterprise Features */}
                        <Route path="/pack-stories" element={<PackStories />} />
                        <Route
                          path="/swift-retailers"
                          element={<SwiftRetailers />}
                        />
                        <Route
                          path="/watering-holes"
                          element={<WateringHoles />}
                        />
                        <Route
                          path="/herd-directory"
                          element={<HerdDirectory />}
                        />

                        {/* Dashboard Routes */}
                        <Route
                          path="/dashboard/supplier-unified"
                          element={<EnhancedSupplierHub />}
                        />
                        <Route
                          path="/dashboard/logistics"
                          element={<CheetahLogistics />}
                        />

                        {/* Admin Routes */}
                        <Route
                          path="/admin/heritage"
                          element={<AfricanHeritageAdmin />}
                        />
                        <Route
                          path="/admin/complete"
                          element={<CompleteAdminDashboard />}
                        />
                        <Route
                          path="/admin/command-center"
                          element={<SavannaCommandCenter />}
                        />
                        <Route path="/admin/seo" element={<AdminSEOPage />} />
                      </Routes>
                    </Suspense>
                  </div>
                </VoiceEnabledApp>
              </CartProvider>
            </EnterpriseTierProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
