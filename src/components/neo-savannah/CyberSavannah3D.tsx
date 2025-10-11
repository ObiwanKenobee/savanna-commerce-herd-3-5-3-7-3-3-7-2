/**
 * Neo-Savannah 3D Environment
 * Immersive cyber-savannah marketplace with Three.js
 */

import React, { useRef, useEffect, useState } from "react";
import { neoSavannahTheme } from "../../theme/neo-savannah";
import { motion } from "framer-motion";

// Helper function to convert position string to CSS positioning
const getPositionFromString = (position: string) => {
  const positions = {
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    "top-left": { top: "20%", left: "20%" },
    "top-right": { top: "20%", right: "20%" },
    "bottom-left": { bottom: "20%", left: "20%" },
    "bottom-right": { bottom: "20%", right: "20%" },
  };
  return positions[position as keyof typeof positions] || positions.center;
};

// Animated Neon Terrain (CSS version)
const NeonTerrain: React.FC = () => {
  return (
    <div
      className="absolute inset-0 opacity-30"
      style={{
        background: `radial-gradient(circle at center, ${neoSavannahTheme.colors.earth.terracotta}40, transparent 70%)`,
        backgroundImage: neoSavannahTheme.effects.patterns.grid,
        backgroundSize: "50px 50px",
      }}
    />
  );
};

// Floating Holograms (CSS version)
const FloatingHologram: React.FC<{ position: string; text: string }> = ({
  position,
  text,
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        ...getPositionFromString(position),
        zIndex: 20,
      }}
      animate={{
        y: [0, -10, 0],
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}20, ${neoSavannahTheme.colors.neon.blue}20)`,
          border: `1px solid ${neoSavannahTheme.colors.neon.green}`,
          borderRadius: "8px",
          padding: "12px 16px",
          color: neoSavannahTheme.colors.neon.green,
          fontSize: "14px",
          fontFamily: neoSavannahTheme.typography.fonts.mono,
          boxShadow: neoSavannahTheme.shadows.neon.sm,
          backdropFilter: "blur(10px)",
          textAlign: "center",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
};

// Cyber Wildlife Silhouettes (CSS version)
const CyberWildlife: React.FC<{
  type: "lion" | "elephant" | "rhino";
  position: string;
}> = ({ type, position }) => {
  const [hovered, setHovered] = useState(false);

  const getWildlifeEmoji = () => {
    switch (type) {
      case "lion":
        return "🦁";
      case "elephant":
        return "🐘";
      case "rhino":
        return "🦏";
      default:
        return "🦁";
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        ...getPositionFromString(position),
        zIndex: 15,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: [0, -20, 0],
        rotateY: [0, 360],
      }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
      }}
      whileHover={{ scale: 1.2 }}
    >
      <div
        className="text-6xl filter drop-shadow-lg"
        style={{
          color: hovered
            ? neoSavannahTheme.colors.neon.amber
            : neoSavannahTheme.colors.neon.green,
          textShadow: `0 0 20px ${hovered ? neoSavannahTheme.colors.neon.amber : neoSavannahTheme.colors.neon.green}60`,
          filter: "drop-shadow(0 0 10px currentColor)",
        }}
      >
        {getWildlifeEmoji()}
      </div>
    </motion.div>
  );
};

// Digital Marketplace Stalls (CSS version)
const DigitalStall: React.FC<{
  position: string;
  product: string;
  price: string;
  onClick?: () => void;
}> = ({ position, product, price, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        ...getPositionFromString(position),
        zIndex: 10,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      animate={{
        rotateY: [0, 360],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
      whileHover={{ scale: 1.1 }}
    >
      {/* Stall Base */}
      <div
        className="w-20 h-20 rounded-lg flex items-center justify-center text-2xl mb-2"
        style={{
          background: `linear-gradient(135deg, ${hovered ? neoSavannahTheme.colors.neon.amber : neoSavannahTheme.colors.neon.blue}40, transparent)`,
          border: `2px solid ${hovered ? neoSavannahTheme.colors.neon.amber : neoSavannahTheme.colors.neon.blue}`,
          boxShadow: `0 0 20px ${hovered ? neoSavannahTheme.colors.neon.amber : neoSavannahTheme.colors.neon.blue}60`,
        }}
      >
        📦
      </div>

      {/* Price Display */}
      <motion.div
        animate={hovered ? { scale: 1.1 } : { scale: 1 }}
        className="text-center"
        style={{
          background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}90, ${neoSavannahTheme.colors.atmosphere.mist}70)`,
          border: `1px solid ${neoSavannahTheme.colors.neon.amber}`,
          borderRadius: "8px",
          padding: "8px 12px",
          color: neoSavannahTheme.colors.neon.amber,
          fontSize: "12px",
          fontFamily: neoSavannahTheme.typography.fonts.mono,
          boxShadow: neoSavannahTheme.shadows.neon.sm,
          minWidth: "100px",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ fontWeight: "bold" }}>{product}</div>
        <div style={{ color: neoSavannahTheme.colors.neon.green }}>{price}</div>
      </motion.div>
    </motion.div>
  );
};

// Ambient Particles (CSS version)
const AmbientParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background:
              i % 2 === 0
                ? neoSavannahTheme.colors.neon.green
                : neoSavannahTheme.colors.neon.blue,
            boxShadow: `0 0 10px currentColor`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Day/Night Background
const DayNightBackground: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div
      className="absolute inset-0 transition-all duration-1000"
      style={{
        background: isNight
          ? `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}, ${neoSavannahTheme.colors.atmosphere.dusk})`
          : `linear-gradient(135deg, ${neoSavannahTheme.colors.earth.burnt}, ${neoSavannahTheme.colors.earth.terracotta})`,
      }}
    />
  );
};

// Main 3D Scene Component
interface CyberSavannah3DProps {
  isNight?: boolean;
  interactive?: boolean;
  showStalls?: boolean;
  onStallClick?: (product: string) => void;
}

const CyberSavannah3D: React.FC<CyberSavannah3DProps> = ({
  isNight = false,
  interactive = true,
  showStalls = true,
  onStallClick,
}) => {
  const products = [
    { name: "Cyber Honey", price: "0.05 ETH", position: "top-left" },
    { name: "Digital Spices", price: "0.03 ETH", position: "top-right" },
    { name: "Neo Grains", price: "0.08 ETH", position: "bottom-left" },
    { name: "Quantum Tea", price: "0.06 ETH", position: "bottom-right" },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <DayNightBackground isNight={isNight} />

      {/* Terrain */}
      <NeonTerrain />

      {/* Wildlife */}
      <CyberWildlife type="lion" position="top-left" />
      <CyberWildlife type="elephant" position="top-right" />
      <CyberWildlife type="rhino" position="center" />

      {/* Marketplace Stalls */}
      {showStalls &&
        products.map((product, index) => (
          <DigitalStall
            key={index}
            position={product.position}
            product={product.name}
            price={product.price}
            onClick={() => onStallClick?.(product.name)}
          />
        ))}

      {/* Floating Holograms */}
      <FloatingHologram position="center" text="Welcome to Neo-Savannah" />
      <FloatingHologram position="top-left" text="Trade • Explore • Evolve" />
      <FloatingHologram position="top-right" text="Powered by Blockchain" />

      {/* Ambient Effects */}
      <AmbientParticles />

      {/* Overlay UI */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}90, ${neoSavannahTheme.colors.atmosphere.mist}90)`,
          border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
          borderRadius: "12px",
          padding: "16px",
          backdropFilter: "blur(10px)",
          color: neoSavannahTheme.colors.neon.green,
          fontFamily: neoSavannahTheme.typography.fonts.mono,
          fontSize: "14px",
          zIndex: 30,
        }}
      >
        <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
          Neo-Savannah Control
        </div>
        <div style={{ fontSize: "12px", opacity: 0.8 }}>
          • Click wildlife to interact
          <br />
          • Click stalls to trade
          <br />• Enjoy the cyber-experience
        </div>
      </motion.div>
    </div>
  );
};

export default CyberSavannah3D;
