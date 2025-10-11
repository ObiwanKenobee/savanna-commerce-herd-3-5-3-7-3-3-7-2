/**
 * AR Product Scanner - Neo-Savannah
 * Web-based AR for product visualization and origin stories
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Scan,
  MapPin,
  Info,
  Star,
  Shield,
  Sparkles,
  Eye,
  X,
  RotateCcw,
  Zap,
  Award,
  TrendingUp,
  Leaf,
  Heart,
  Check,
} from "lucide-react";
import { neoSavannahTheme } from "../../theme/neo-savannah";

interface ARProduct {
  id: string;
  name: string;
  origin: string;
  producer: string;
  price: number;
  currency: "ETH" | "MBOGA" | "USD";
  quality: number;
  sustainability: number;
  authenticity: number;
  story: string;
  certifications: string[];
  hologram: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  effects: string[];
}

interface ARScanResult {
  confidence: number;
  product: ARProduct;
  timestamp: Date;
  location: { x: number; y: number };
}

const ARProductScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ARScanResult[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ARProduct | null>(
    null,
  );
  const [cameraActive, setCameraActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mockProducts: ARProduct[] = [
    {
      id: "ar_honey_001",
      name: "Quantum Honey",
      origin: "Digital Beehives, Tsavo East",
      producer: "Cyber Apiaries Collective",
      price: 0.05,
      currency: "ETH",
      quality: 98,
      sustainability: 95,
      authenticity: 100,
      story:
        "Harvested from genetically enhanced bees in quantum-stabilized hives, this honey carries the essence of both traditional beekeeping and cutting-edge biotechnology.",
      certifications: [
        "Quantum Organic",
        "Blockchain Verified",
        "Carbon Negative",
      ],
      hologram: "🍯",
      rarity: "epic",
      effects: ["Energy Boost", "Healing Properties", "Neon Glow"],
    },
    {
      id: "ar_spice_001",
      name: "Neural Cardamom",
      origin: "Cyber Plantations, Kilimanjaro",
      producer: "Maasai Tech Farmers",
      price: 250,
      currency: "MBOGA",
      quality: 96,
      sustainability: 92,
      authenticity: 99,
      story:
        "Grown in bio-neural soil that enhances the aromatic compounds through electromagnetic field cultivation, creating spices with unprecedented flavor profiles.",
      certifications: ["Neuro-Enhanced", "Fair Trade Plus", "Climate Positive"],
      hologram: "🌿",
      rarity: "rare",
      effects: ["Cognitive Enhancement", "Flavor Explosion", "Memory Boost"],
    },
    {
      id: "ar_grain_001",
      name: "Holographic Quinoa",
      origin: "Vertical Farms, Neo-Nakuru",
      producer: "Quantum Agriculture Labs",
      price: 35,
      currency: "USD",
      quality: 94,
      sustainability: 98,
      authenticity: 97,
      story:
        "Cultivated in zero-gravity simulation chambers with light spectrum optimization, this quinoa contains 300% more nutrients than traditional varieties.",
      certifications: ["Space-Grade", "Nutrient Enhanced", "Lab Verified"],
      hologram: "🌾",
      rarity: "legendary",
      effects: ["Super Nutrition", "Energy Matrix", "Cellular Repair"],
    },
  ];

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        setIsScanning(true);

        // Simulate scanning process
        let progress = 0;
        const scanInterval = setInterval(() => {
          progress += 10;
          setScanProgress(progress);

          if (progress >= 100) {
            clearInterval(scanInterval);
            performScan();
          }
        }, 200);
      }
    } catch (error) {
      console.error("Failed to access camera:", error);
      // Fallback to mock scanning
      simulateScan();
    }
  };

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
    setCameraActive(false);
    setIsScanning(false);
    setScanProgress(0);
  };

  const performScan = () => {
    // Simulate AI recognition
    const randomProduct =
      mockProducts[Math.floor(Math.random() * mockProducts.length)];
    const confidence = 85 + Math.random() * 15; // 85-100%

    const result: ARScanResult = {
      confidence,
      product: randomProduct,
      timestamp: new Date(),
      location: {
        x: Math.random() * 300 + 50,
        y: Math.random() * 200 + 50,
      },
    };

    setScanResults((prev) => [...prev, result]);
    setIsScanning(false);
    setScanProgress(0);
  };

  const simulateScan = () => {
    setIsScanning(true);
    let progress = 0;
    const scanInterval = setInterval(() => {
      progress += 15;
      setScanProgress(progress);

      if (progress >= 100) {
        clearInterval(scanInterval);
        performScan();
      }
    }, 150);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return neoSavannahTheme.colors.neon.purple;
      case "epic":
        return neoSavannahTheme.colors.neon.blue;
      case "rare":
        return neoSavannahTheme.colors.neon.green;
      default:
        return neoSavannahTheme.colors.metal.steel;
    }
  };

  const ScanningOverlay = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* Scanning Grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: neoSavannahTheme.effects.patterns.grid,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Scanning Line */}
      <motion.div
        className="absolute left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${neoSavannahTheme.colors.neon.green}, transparent)`,
          boxShadow: `0 0 10px ${neoSavannahTheme.colors.neon.green}`,
        }}
        animate={{
          y: [0, 400, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Corner Frames */}
      {[
        { top: "20px", left: "20px", borderTop: true, borderLeft: true },
        { top: "20px", right: "20px", borderTop: true, borderRight: true },
        { bottom: "20px", left: "20px", borderBottom: true, borderLeft: true },
        {
          bottom: "20px",
          right: "20px",
          borderBottom: true,
          borderRight: true,
        },
      ].map((corner, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8"
          style={{
            ...corner,
            borderColor: neoSavannahTheme.colors.neon.green,
            borderWidth: "3px",
            borderTopWidth: corner.borderTop ? "3px" : "0",
            borderBottomWidth: corner.borderBottom ? "3px" : "0",
            borderLeftWidth: corner.borderLeft ? "3px" : "0",
            borderRightWidth: corner.borderRight ? "3px" : "0",
            borderStyle: "solid",
          }}
          animate={{
            opacity: [1, 0.5, 1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}

      {/* Progress Bar */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64">
        <div
          className="w-full h-1 rounded-full overflow-hidden"
          style={{ background: `${neoSavannahTheme.colors.neon.green}30` }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: neoSavannahTheme.colors.neon.green }}
            animate={{ width: `${scanProgress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div
          className="text-center text-sm mt-2"
          style={{ color: neoSavannahTheme.colors.neon.green }}
        >
          Scanning... {scanProgress}%
        </div>
      </div>
    </div>
  );

  const ProductHologram = ({ result }: { result: ARScanResult }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute"
      style={{
        left: result.location.x,
        top: result.location.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="relative cursor-pointer"
        animate={{
          y: [0, -10, 0],
          rotateY: [0, 360],
        }}
        transition={{
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
        onClick={() => setSelectedProduct(result.product)}
      >
        {/* Hologram Base */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{
            background: `radial-gradient(circle, ${getRarityColor(result.product.rarity)}40, transparent)`,
            border: `2px solid ${getRarityColor(result.product.rarity)}`,
            boxShadow: `0 0 20px ${getRarityColor(result.product.rarity)}60`,
          }}
        >
          {result.product.hologram}
        </div>

        {/* Info Popup */}
        <motion.div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg whitespace-nowrap"
          style={{
            background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}95, ${neoSavannahTheme.colors.atmosphere.mist}85)`,
            border: `1px solid ${getRarityColor(result.product.rarity)}40`,
            color: getRarityColor(result.product.rarity),
            fontSize: "12px",
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="font-bold">{result.product.name}</div>
          <div className="opacity-70">
            {result.confidence.toFixed(1)}% match
          </div>
        </motion.div>

        {/* Scan Rings */}
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border-2 pointer-events-none"
            style={{
              borderColor: `${getRarityColor(result.product.rarity)}40`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: ring * 0.3,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );

  const ProductDetails = () => (
    <AnimatePresence>
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-md rounded-xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}98, ${neoSavannahTheme.colors.atmosphere.mist}95)`,
              border: `1px solid ${getRarityColor(selectedProduct.rarity)}40`,
              backdropFilter: "blur(20px)",
              boxShadow: `0 0 30px ${getRarityColor(selectedProduct.rarity)}30`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="p-6 border-b relative"
              style={{
                borderColor: `${getRarityColor(selectedProduct.rarity)}20`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{selectedProduct.hologram}</div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 rounded-lg"
                  style={{
                    background: `${neoSavannahTheme.colors.status.error}20`,
                    color: neoSavannahTheme.colors.status.error,
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2
                className="text-xl font-bold mb-2"
                style={{
                  color: getRarityColor(selectedProduct.rarity),
                  fontFamily: neoSavannahTheme.typography.fonts.heading,
                }}
              >
                {selectedProduct.name}
              </h2>

              <div className="flex items-center gap-2 mb-3">
                <MapPin
                  className="w-4 h-4"
                  style={{ color: neoSavannahTheme.colors.neon.blue }}
                />
                <span
                  className="text-sm"
                  style={{ color: neoSavannahTheme.colors.neon.blue }}
                >
                  {selectedProduct.origin}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className="text-sm opacity-70"
                  style={{ color: neoSavannahTheme.colors.neon.green }}
                >
                  by {selectedProduct.producer}
                </span>
                <div
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                  style={{
                    background: `${getRarityColor(selectedProduct.rarity)}30`,
                    color: getRarityColor(selectedProduct.rarity),
                  }}
                >
                  {selectedProduct.rarity}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: neoSavannahTheme.colors.status.success }}
                  >
                    {selectedProduct.quality}%
                  </div>
                  <div
                    className="text-xs opacity-70"
                    style={{ color: neoSavannahTheme.colors.neon.green }}
                  >
                    Quality
                  </div>
                </div>

                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: neoSavannahTheme.colors.earth.terracotta }}
                  >
                    {selectedProduct.sustainability}%
                  </div>
                  <div
                    className="text-xs opacity-70"
                    style={{ color: neoSavannahTheme.colors.neon.green }}
                  >
                    Sustainability
                  </div>
                </div>

                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: neoSavannahTheme.colors.neon.amber }}
                  >
                    {selectedProduct.authenticity}%
                  </div>
                  <div
                    className="text-xs opacity-70"
                    style={{ color: neoSavannahTheme.colors.neon.green }}
                  >
                    Authenticity
                  </div>
                </div>
              </div>

              {/* Price */}
              <div
                className="text-center p-4 rounded-lg"
                style={{
                  background: `${neoSavannahTheme.colors.neon.amber}20`,
                  border: `1px solid ${neoSavannahTheme.colors.neon.amber}40`,
                }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{ color: neoSavannahTheme.colors.neon.amber }}
                >
                  {selectedProduct.price} {selectedProduct.currency}
                </div>
              </div>

              {/* Story */}
              <div>
                <h3
                  className="font-bold mb-2 flex items-center gap-2"
                  style={{ color: neoSavannahTheme.colors.neon.green }}
                >
                  <Sparkles className="w-4 h-4" />
                  Origin Story
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: neoSavannahTheme.colors.neon.blue }}
                >
                  {selectedProduct.story}
                </p>
              </div>

              {/* Effects */}
              <div>
                <h3
                  className="font-bold mb-2 flex items-center gap-2"
                  style={{ color: neoSavannahTheme.colors.neon.purple }}
                >
                  <Zap className="w-4 h-4" />
                  Special Effects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.effects.map((effect, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        background: `${neoSavannahTheme.colors.neon.purple}30`,
                        color: neoSavannahTheme.colors.neon.purple,
                        border: `1px solid ${neoSavannahTheme.colors.neon.purple}40`,
                      }}
                    >
                      {effect}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3
                  className="font-bold mb-2 flex items-center gap-2"
                  style={{ color: neoSavannahTheme.colors.status.success }}
                >
                  <Shield className="w-4 h-4" />
                  Certifications
                </h3>
                <div className="space-y-1">
                  {selectedProduct.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check
                        className="w-3 h-3"
                        style={{
                          color: neoSavannahTheme.colors.status.success,
                        }}
                      />
                      <span
                        style={{
                          color: neoSavannahTheme.colors.status.success,
                        }}
                      >
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <motion.button
                  className="p-3 rounded-lg font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}30, ${neoSavannahTheme.colors.neon.blue}30)`,
                    border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
                    color: neoSavannahTheme.colors.neon.green,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </motion.button>

                <motion.button
                  className="p-3 rounded-lg font-medium"
                  style={{
                    background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.amber}30, ${neoSavannahTheme.colors.neon.orange}30)`,
                    border: `1px solid ${neoSavannahTheme.colors.neon.amber}40`,
                    color: neoSavannahTheme.colors.neon.amber,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy with Crypto
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* AR Scanner Interface */}
      <div className="fixed inset-0 z-40 bg-black">
        {/* Camera View */}
        <div className="relative w-full h-full">
          {cameraActive ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}, ${neoSavannahTheme.colors.atmosphere.dusk})`,
              }}
            >
              <motion.div
                className="text-center"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Camera
                  className="w-20 h-20 mx-auto mb-4"
                  style={{ color: neoSavannahTheme.colors.neon.green }}
                />
                <h2
                  className="text-xl font-bold mb-2"
                  style={{ color: neoSavannahTheme.colors.neon.green }}
                >
                  AR Product Scanner
                </h2>
                <p
                  className="text-sm opacity-70"
                  style={{ color: neoSavannahTheme.colors.neon.blue }}
                >
                  Point your camera at products to reveal their digital secrets
                </p>
              </motion.div>
            </div>
          )}

          {/* Scanning Overlay */}
          {isScanning && <ScanningOverlay />}

          {/* AR Holograms */}
          {scanResults.map((result) => (
            <ProductHologram key={result.product.id} result={result} />
          ))}

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            {!cameraActive ? (
              <motion.button
                onClick={startScanning}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}, ${neoSavannahTheme.colors.neon.blue})`,
                  boxShadow: `0 0 20px ${neoSavannahTheme.colors.neon.green}50`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: [
                    `0 0 20px ${neoSavannahTheme.colors.neon.green}50`,
                    `0 0 30px ${neoSavannahTheme.colors.neon.green}80`,
                    `0 0 20px ${neoSavannahTheme.colors.neon.green}50`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Scan className="w-8 h-8 text-white" />
              </motion.button>
            ) : (
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={simulateScan}
                  disabled={isScanning}
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: isScanning
                      ? `${neoSavannahTheme.colors.metal.steel}50`
                      : `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}, ${neoSavannahTheme.colors.neon.blue})`,
                    boxShadow: `0 0 20px ${neoSavannahTheme.colors.neon.green}50`,
                  }}
                  whileHover={!isScanning ? { scale: 1.1 } : {}}
                  whileTap={!isScanning ? { scale: 0.9 } : {}}
                >
                  <Scan className="w-8 h-8 text-white" />
                </motion.button>

                <motion.button
                  onClick={() => setScanResults([])}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `${neoSavannahTheme.colors.neon.amber}30`,
                    border: `1px solid ${neoSavannahTheme.colors.neon.amber}40`,
                    color: neoSavannahTheme.colors.neon.amber,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCcw className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={stopScanning}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `${neoSavannahTheme.colors.status.error}30`,
                    border: `1px solid ${neoSavannahTheme.colors.status.error}40`,
                    color: neoSavannahTheme.colors.status.error,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>

          {/* Scan Count */}
          {scanResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 px-4 py-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}90, ${neoSavannahTheme.colors.atmosphere.mist}70)`,
                border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex items-center gap-2">
                <Eye
                  className="w-4 h-4"
                  style={{ color: neoSavannahTheme.colors.neon.green }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: neoSavannahTheme.colors.neon.green }}
                >
                  {scanResults.length} Products Detected
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetails />
    </>
  );
};

export default ARProductScanner;
