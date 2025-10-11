/**
 * Neo-Savannah Main App
 * Complete cyberpunk marketplace experience
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Zap,
  Globe,
  Shield,
  Sparkles,
  Eye,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Settings,
  Search,
  ShoppingBag,
  TrendingUp,
  Users,
  Truck,
  Brain,
} from "lucide-react";
import { neoSavannahTheme } from "../../theme/neo-savannah";
import CyberSavannah3D from "./CyberSavannah3D";
import AIMarketGuide from "./AIMarketGuide";
import BlockchainIntegration from "./BlockchainIntegration";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  href: string;
  tier: "free" | "premium" | "enterprise";
}

interface GameStats {
  level: number;
  xp: number;
  badges: string[];
  achievements: string[];
  tradingRank: number;
  totalTrades: number;
}

const NeoSavannahApp: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDayMode, setIsDayMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentView, setCurrentView] = useState<
    "3d" | "marketplace" | "profile"
  >("3d");
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 7,
    xp: 2450,
    badges: ["🦁", "⚡", "🌿", "💎"],
    achievements: [
      "First Trade",
      "Speed Trader",
      "Eco Warrior",
      "Crypto Master",
    ],
    tradingRank: 42,
    totalTrades: 156,
  });

  const navigation: NavigationItem[] = [
    {
      id: "marketplace",
      label: "Digital Bazaar",
      icon: ShoppingBag,
      description: "Browse cyber-enhanced products",
      href: "/marketplace",
      tier: "free",
    },
    {
      id: "traders",
      label: "Trader Network",
      icon: Users,
      description: "Connect with cyber-traders",
      href: "/traders",
      tier: "free",
    },
    {
      id: "logistics",
      label: "Quantum Logistics",
      icon: Truck,
      description: "Track shipments across dimensions",
      href: "/logistics",
      tier: "premium",
    },
    {
      id: "analytics",
      label: "Neural Analytics",
      icon: Brain,
      description: "AI-powered market insights",
      href: "/analytics",
      tier: "enterprise",
    },
    {
      id: "ar-scanner",
      label: "AR Product Scanner",
      icon: Eye,
      description: "Scan reality for digital overlays",
      href: "/ar-scanner",
      tier: "premium",
    },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "premium":
        return neoSavannahTheme.colors.neon.amber;
      case "enterprise":
        return neoSavannahTheme.colors.neon.purple;
      default:
        return neoSavannahTheme.colors.neon.green;
    }
  };

  const ScanlineOverlay = () => (
    <div
      className="fixed inset-0 pointer-events-none z-10 opacity-20"
      style={{
        background: neoSavannahTheme.effects.patterns.scanlines,
        animation: "scanlineMove 2s linear infinite",
      }}
    />
  );

  const GlitchLogo = () => (
    <motion.div
      className="flex items-center gap-3"
      animate={{
        filter: ["hue-rotate(0deg)", "hue-rotate(360deg)", "hue-rotate(0deg)"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.div
        className="text-3xl"
        animate={{
          textShadow: [
            "2px 0 #00FFFF, -2px 0 #FF1493",
            "0 2px #39FF14, 0 -2px #FFBF00",
            "2px 0 #00FFFF, -2px 0 #FF1493",
          ],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          fontFamily: neoSavannahTheme.typography.fonts.display,
          color: neoSavannahTheme.colors.neon.green,
        }}
      >
        🦁
      </motion.div>

      <div>
        <motion.h1
          className="text-2xl font-bold"
          style={{
            background: `linear-gradient(45deg, ${neoSavannahTheme.colors.neon.green}, ${neoSavannahTheme.colors.neon.blue}, ${neoSavannahTheme.colors.neon.purple})`,
            backgroundSize: "200% 200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: neoSavannahTheme.typography.fonts.display,
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          NEO-SAVANNAH
        </motion.h1>
        <motion.p
          className="text-sm opacity-80"
          style={{
            color: neoSavannahTheme.colors.neon.amber,
            fontFamily: neoSavannahTheme.typography.fonts.mono,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Cyber-Wildlife Marketplace
        </motion.p>
      </div>
    </motion.div>
  );

  const GameStatsHUD = () => (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed top-4 left-4 z-40"
    >
      <div
        className="p-4 rounded-lg backdrop-blur-sm"
        style={{
          background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}90, ${neoSavannahTheme.colors.atmosphere.mist}70)`,
          border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
          boxShadow: neoSavannahTheme.shadows.cyber.md,
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}, ${neoSavannahTheme.colors.neon.blue})`,
              color: "white",
            }}
          >
            {gameStats.level}
          </div>
          <div>
            <div
              className="text-sm font-bold"
              style={{ color: neoSavannahTheme.colors.neon.green }}
            >
              Level {gameStats.level} Trader
            </div>
            <div
              className="text-xs"
              style={{ color: neoSavannahTheme.colors.neon.blue }}
            >
              Rank #{gameStats.tradingRank}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div
              className="text-xs mb-1"
              style={{ color: neoSavannahTheme.colors.metal.steel }}
            >
              XP: {gameStats.xp}/3000
            </div>
            <div
              className="w-32 h-2 rounded-full overflow-hidden"
              style={{ background: `${neoSavannahTheme.colors.neon.green}20` }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: neoSavannahTheme.colors.neon.green }}
                animate={{ width: `${(gameStats.xp / 3000) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div className="flex gap-1">
            {gameStats.badges.map((badge, index) => (
              <motion.span
                key={index}
                className="text-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const CyberNavigation = () => (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-30 backdrop-blur-sm"
      style={{
        background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}95, ${neoSavannahTheme.colors.atmosphere.mist}85)`,
        borderBottom: `1px solid ${neoSavannahTheme.colors.neon.green}30`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <GlitchLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <motion.button
                key={item.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium"
                style={{
                  color: getTierColor(item.tier),
                  border: `1px solid ${getTierColor(item.tier)}20`,
                }}
                whileHover={{
                  background: `${getTierColor(item.tier)}20`,
                  scale: 1.05,
                  boxShadow: `0 0 15px ${getTierColor(item.tier)}30`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.tier !== "free" && <Sparkles className="w-3 h-3" />}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setIsDayMode(!isDayMode)}
              className="p-2 rounded-lg transition-colors"
              style={{
                background: `${neoSavannahTheme.colors.neon.amber}20`,
                color: neoSavannahTheme.colors.neon.amber,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDayMode ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg transition-colors"
              style={{
                background: `${neoSavannahTheme.colors.neon.blue}20`,
                color: soundEnabled
                  ? neoSavannahTheme.colors.neon.blue
                  : neoSavannahTheme.colors.metal.steel,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{
                background: `${neoSavannahTheme.colors.neon.green}20`,
                color: neoSavannahTheme.colors.neon.green,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );

  const MobileMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-y-0 right-0 z-50 w-80 overflow-y-auto"
          style={{
            background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}98, ${neoSavannahTheme.colors.atmosphere.mist}95)`,
            backdropFilter: "blur(20px)",
            borderLeft: `1px solid ${neoSavannahTheme.colors.neon.green}30`,
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-xl font-bold"
                style={{
                  color: neoSavannahTheme.colors.neon.green,
                  fontFamily: neoSavannahTheme.typography.fonts.heading,
                }}
              >
                Navigation Grid
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg"
                style={{
                  background: `${neoSavannahTheme.colors.status.error}20`,
                  color: neoSavannahTheme.colors.status.error,
                }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full p-4 rounded-lg text-left"
                  style={{
                    background: `linear-gradient(135deg, ${getTierColor(item.tier)}20, ${getTierColor(item.tier)}10)`,
                    border: `1px solid ${getTierColor(item.tier)}40`,
                  }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: getTierColor(item.tier) }}
                    />
                    <span
                      className="font-medium"
                      style={{ color: getTierColor(item.tier) }}
                    >
                      {item.label}
                    </span>
                    {item.tier !== "free" && (
                      <Sparkles
                        className="w-4 h-4"
                        style={{ color: getTierColor(item.tier) }}
                      />
                    )}
                  </div>
                  <p
                    className="text-sm opacity-70"
                    style={{ color: neoSavannahTheme.colors.neon.blue }}
                  >
                    {item.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const FloatingActionButton = () => (
    <motion.button
      className="fixed bottom-32 left-6 w-14 h-14 rounded-full flex items-center justify-center z-40"
      style={{
        background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.purple}, ${neoSavannahTheme.colors.neon.pink})`,
        boxShadow: `0 0 20px ${neoSavannahTheme.colors.neon.purple}50`,
      }}
      animate={{
        y: [0, -10, 0],
        boxShadow: [
          `0 0 20px ${neoSavannahTheme.colors.neon.purple}50`,
          `0 0 30px ${neoSavannahTheme.colors.neon.purple}70`,
          `0 0 20px ${neoSavannahTheme.colors.neon.purple}50`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Eye className="w-6 h-6 text-white" />
    </motion.button>
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}, ${neoSavannahTheme.colors.atmosphere.dusk})`,
        fontFamily: neoSavannahTheme.typography.fonts.body,
      }}
    >
      {/* Scanline Effect */}
      <ScanlineOverlay />

      {/* Navigation */}
      <CyberNavigation />

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Game Stats HUD */}
      <GameStatsHUD />

      {/* Main 3D Environment */}
      <div className="pt-20">
        <CyberSavannah3D
          isNight={!isDayMode}
          interactive={true}
          showStalls={true}
          onStallClick={(product) => {
            console.log("Product selected:", product);
          }}
        />
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* AI Market Guide */}
      <AIMarketGuide />

      {/* Blockchain Integration */}
      <BlockchainIntegration />

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div
          className="px-6 py-3 rounded-full backdrop-blur-sm flex items-center gap-4"
          style={{
            background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}90, ${neoSavannahTheme.colors.atmosphere.mist}70)`,
            border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
            boxShadow: neoSavannahTheme.shadows.cyber.sm,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: neoSavannahTheme.colors.status.success }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: neoSavannahTheme.colors.neon.green }}
            >
              Blockchain Connected
            </span>
          </div>

          <div
            className="w-px h-4"
            style={{ background: neoSavannahTheme.colors.neon.green }}
          />

          <div className="flex items-center gap-2">
            <Globe
              className="w-4 h-4"
              style={{ color: neoSavannahTheme.colors.neon.blue }}
            />
            <span
              className="text-sm"
              style={{ color: neoSavannahTheme.colors.neon.blue }}
            >
              {gameStats.totalTrades} Traders Online
            </span>
          </div>

          <div
            className="w-px h-4"
            style={{ background: neoSavannahTheme.colors.neon.green }}
          />

          <div className="flex items-center gap-2">
            <TrendingUp
              className="w-4 h-4"
              style={{ color: neoSavannahTheme.colors.neon.amber }}
            />
            <span
              className="text-sm"
              style={{ color: neoSavannahTheme.colors.neon.amber }}
            >
              Market: +15.3%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes scanlineMove {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default NeoSavannahApp;
