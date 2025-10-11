/**
 * Blockchain Integration - Neo-Savannah
 * Crypto payments, NFT shop deeds, and smart contracts
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Coins,
  Shield,
  Zap,
  Award,
  TrendingUp,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Gift,
  Star,
  Crown,
} from "lucide-react";
import { neoSavannahTheme } from "../../theme/neo-savannah";

interface WalletState {
  connected: boolean;
  address: string;
  balance: {
    eth: number;
    mboga: number;
    usd: number;
  };
  nfts: NFTShopDeed[];
}

interface NFTShopDeed {
  id: string;
  name: string;
  location: string;
  level: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  earnings: number;
  image: string;
  traits: Record<string, string>;
}

interface Transaction {
  id: string;
  type: "payment" | "escrow" | "nft_mint" | "token_transfer";
  status: "pending" | "confirmed" | "failed";
  amount: number;
  currency: "ETH" | "MBOGA" | "USD";
  to: string;
  from: string;
  timestamp: Date;
  gasUsed?: number;
}

interface SmartContract {
  address: string;
  type: "escrow" | "marketplace" | "nft" | "token";
  status: "active" | "pending" | "completed";
  participants: string[];
  conditions: string[];
}

const BlockchainIntegration: React.FC = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: "",
    balance: { eth: 0, mboga: 0, usd: 0 },
    nfts: [],
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeContracts, setActiveContracts] = useState<SmartContract[]>([]);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "wallet" | "nfts" | "contracts" | "tokens"
  >("wallet");

  useEffect(() => {
    // Initialize with demo data
    setWalletState({
      connected: true,
      address: "0x742d35Cc4C54d37A04C8aF78e3D6c3Ba",
      balance: { eth: 2.45, mboga: 15420, usd: 3250 },
      nfts: [
        {
          id: "nft_001",
          name: "Cyber Honey Hive",
          location: "Digital Savannah Sector 7",
          level: 3,
          rarity: "epic",
          earnings: 125.5,
          image: "🍯",
          traits: {
            Type: "Honey Production",
            Efficiency: "95%",
            "Glow Level": "High",
            Blockchain: "Polygon",
          },
        },
        {
          id: "nft_002",
          name: "Neon Spice Market",
          location: "Central Trading Hub",
          level: 5,
          rarity: "legendary",
          earnings: 340.25,
          image: "🌶️",
          traits: {
            Type: "Spice Trading",
            Efficiency: "98%",
            "Glow Level": "Maximum",
            Blockchain: "Ethereum",
          },
        },
      ],
    });

    setTransactions([
      {
        id: "tx_001",
        type: "payment",
        status: "confirmed",
        amount: 0.05,
        currency: "ETH",
        to: "0x456...789",
        from: "0x742...3Ba",
        timestamp: new Date(Date.now() - 300000),
        gasUsed: 21000,
      },
      {
        id: "tx_002",
        type: "escrow",
        status: "pending",
        amount: 250,
        currency: "MBOGA",
        to: "escrow_contract",
        from: "0x742...3Ba",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const connectWallet = async () => {
    try {
      // Simulate wallet connection
      setWalletState((prev) => ({
        ...prev,
        connected: true,
        address: "0x742d35Cc4C54d37A04C8aF78e3D6c3Ba",
      }));
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      connected: false,
      address: "",
      balance: { eth: 0, mboga: 0, usd: 0 },
      nfts: [],
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletState.address);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return neoSavannahTheme.colors.status.success;
      case "pending":
        return neoSavannahTheme.colors.status.warning;
      case "failed":
        return neoSavannahTheme.colors.status.error;
      default:
        return neoSavannahTheme.colors.status.neutral;
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const WalletButton = () => (
    <motion.button
      onClick={() =>
        walletState.connected ? setShowWalletModal(true) : connectWallet()
      }
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all"
      style={{
        background: walletState.connected
          ? `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}30, ${neoSavannahTheme.colors.neon.blue}30)`
          : `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.amber}30, ${neoSavannahTheme.colors.neon.orange}30)`,
        border: `1px solid ${walletState.connected ? neoSavannahTheme.colors.neon.green : neoSavannahTheme.colors.neon.amber}40`,
        color: walletState.connected
          ? neoSavannahTheme.colors.neon.green
          : neoSavannahTheme.colors.neon.amber,
        fontFamily: neoSavannahTheme.typography.fonts.mono,
        boxShadow: `0 0 10px ${walletState.connected ? neoSavannahTheme.colors.neon.green : neoSavannahTheme.colors.neon.amber}20`,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Wallet className="w-4 h-4" />
      {walletState.connected ? (
        <span>{formatAddress(walletState.address)}</span>
      ) : (
        <span>Connect Wallet</span>
      )}
    </motion.button>
  );

  const BalanceDisplay = () => (
    <div className="grid grid-cols-3 gap-4">
      <motion.div
        className="p-4 rounded-lg text-center"
        style={{
          background: `linear-gradient(135deg, ${neoSavannahTheme.colors.earth.terracotta}20, ${neoSavannahTheme.colors.earth.burnt}20)`,
          border: `1px solid ${neoSavannahTheme.colors.earth.burnt}40`,
        }}
        whileHover={{ scale: 1.02 }}
      >
        <div
          className="text-2xl font-bold"
          style={{ color: neoSavannahTheme.colors.earth.burnt }}
        >
          {walletState.balance.eth.toFixed(3)}
        </div>
        <div
          className="text-sm opacity-70"
          style={{ color: neoSavannahTheme.colors.earth.burnt }}
        >
          ETH
        </div>
      </motion.div>

      <motion.div
        className="p-4 rounded-lg text-center"
        style={{
          background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}20, ${neoSavannahTheme.colors.neon.blue}20)`,
          border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
        }}
        whileHover={{ scale: 1.02 }}
      >
        <div
          className="text-2xl font-bold"
          style={{ color: neoSavannahTheme.colors.neon.green }}
        >
          {walletState.balance.mboga.toLocaleString()}
        </div>
        <div
          className="text-sm opacity-70"
          style={{ color: neoSavannahTheme.colors.neon.green }}
        >
          MBOGA
        </div>
      </motion.div>

      <motion.div
        className="p-4 rounded-lg text-center"
        style={{
          background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.amber}20, ${neoSavannahTheme.colors.neon.orange}20)`,
          border: `1px solid ${neoSavannahTheme.colors.neon.amber}40`,
        }}
        whileHover={{ scale: 1.02 }}
      >
        <div
          className="text-2xl font-bold"
          style={{ color: neoSavannahTheme.colors.neon.amber }}
        >
          ${walletState.balance.usd.toLocaleString()}
        </div>
        <div
          className="text-sm opacity-70"
          style={{ color: neoSavannahTheme.colors.neon.amber }}
        >
          USD
        </div>
      </motion.div>
    </div>
  );

  const NFTGallery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {walletState.nfts.map((nft) => (
        <motion.div
          key={nft.id}
          className="p-4 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${getRarityColor(nft.rarity)}20, ${neoSavannahTheme.colors.atmosphere.night}40)`,
            border: `1px solid ${getRarityColor(nft.rarity)}40`,
            boxShadow: `0 0 15px ${getRarityColor(nft.rarity)}20`,
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: `0 0 25px ${getRarityColor(nft.rarity)}40`,
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="text-4xl">{nft.image}</div>
            <div className="flex items-center gap-2">
              <Crown
                className="w-4 h-4"
                style={{ color: getRarityColor(nft.rarity) }}
              />
              <span
                className="text-xs uppercase font-bold px-2 py-1 rounded"
                style={{
                  background: `${getRarityColor(nft.rarity)}30`,
                  color: getRarityColor(nft.rarity),
                }}
              >
                {nft.rarity}
              </span>
            </div>
          </div>

          <h3
            className="font-bold text-lg mb-1"
            style={{
              color: neoSavannahTheme.colors.neon.green,
              fontFamily: neoSavannahTheme.typography.fonts.heading,
            }}
          >
            {nft.name}
          </h3>

          <p
            className="text-sm opacity-70 mb-3"
            style={{ color: neoSavannahTheme.colors.neon.blue }}
          >
            {nft.location}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star
                className="w-4 h-4"
                style={{ color: neoSavannahTheme.colors.neon.amber }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: neoSavannahTheme.colors.neon.amber }}
              >
                Level {nft.level}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp
                className="w-4 h-4"
                style={{ color: neoSavannahTheme.colors.status.success }}
              />
              <span
                className="text-sm font-bold"
                style={{ color: neoSavannahTheme.colors.status.success }}
              >
                ${nft.earnings}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {Object.entries(nft.traits).map(([key, value]) => (
              <div key={key} className="flex justify-between text-xs">
                <span style={{ color: neoSavannahTheme.colors.metal.steel }}>
                  {key}:
                </span>
                <span style={{ color: neoSavannahTheme.colors.neon.green }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const TransactionHistory = () => (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <motion.div
          key={tx.id}
          className="p-4 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}50, ${neoSavannahTheme.colors.atmosphere.mist}50)`,
            border: `1px solid ${getStatusColor(tx.status)}40`,
          }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: `${getStatusColor(tx.status)}30`,
                  color: getStatusColor(tx.status),
                }}
              >
                {tx.type === "payment" && <Coins className="w-5 h-5" />}
                {tx.type === "escrow" && <Shield className="w-5 h-5" />}
                {tx.type === "nft_mint" && <Award className="w-5 h-5" />}
                {tx.type === "token_transfer" && <Zap className="w-5 h-5" />}
              </div>

              <div>
                <div
                  className="font-medium text-sm"
                  style={{ color: neoSavannahTheme.colors.neon.green }}
                >
                  {tx.type.replace("_", " ").toUpperCase()}
                </div>
                <div
                  className="text-xs opacity-70"
                  style={{ color: neoSavannahTheme.colors.neon.blue }}
                >
                  To: {formatAddress(tx.to)}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div
                className="font-bold"
                style={{ color: neoSavannahTheme.colors.neon.amber }}
              >
                {tx.amount} {tx.currency}
              </div>
              <div className="flex items-center gap-1">
                {tx.status === "confirmed" && (
                  <CheckCircle className="w-3 h-3" />
                )}
                {tx.status === "pending" && (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                )}
                {tx.status === "failed" && (
                  <AlertTriangle className="w-3 h-3" />
                )}
                <span
                  className="text-xs"
                  style={{ color: getStatusColor(tx.status) }}
                >
                  {tx.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      {/* Wallet Button - Always visible */}
      <div className="fixed top-4 right-4 z-50">
        <WalletButton />
      </div>

      {/* Wallet Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowWalletModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-4xl h-[80vh] rounded-xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}95, ${neoSavannahTheme.colors.atmosphere.mist}95)`,
                border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
                backdropFilter: "blur(20px)",
                boxShadow: neoSavannahTheme.shadows.cyber.xl,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="p-6 border-b flex items-center justify-between"
                style={{
                  borderColor: `${neoSavannahTheme.colors.neon.green}20`,
                }}
              >
                <div className="flex items-center gap-3">
                  <Wallet
                    className="w-6 h-6"
                    style={{ color: neoSavannahTheme.colors.neon.green }}
                  />
                  <h2
                    className="text-xl font-bold"
                    style={{
                      color: neoSavannahTheme.colors.neon.green,
                      fontFamily: neoSavannahTheme.typography.fonts.heading,
                    }}
                  >
                    Cyber Wallet
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={copyAddress}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors"
                    style={{
                      background: `${neoSavannahTheme.colors.neon.blue}20`,
                      color: neoSavannahTheme.colors.neon.blue,
                    }}
                  >
                    <Copy className="w-3 h-3" />
                    {formatAddress(walletState.address)}
                  </button>

                  <button
                    onClick={disconnectWallet}
                    className="p-2 rounded-lg transition-colors"
                    style={{
                      background: `${neoSavannahTheme.colors.status.error}20`,
                      color: neoSavannahTheme.colors.status.error,
                    }}
                  >
                    <Unlock className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div
                className="flex border-b"
                style={{
                  borderColor: `${neoSavannahTheme.colors.neon.green}20`,
                }}
              >
                {[
                  { id: "wallet", label: "Balance", icon: Wallet },
                  { id: "nfts", label: "Shop Deeds", icon: Award },
                  { id: "contracts", label: "Contracts", icon: Shield },
                  { id: "tokens", label: "Transactions", icon: Coins },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className="flex items-center gap-2 px-6 py-3 transition-colors relative"
                    style={{
                      color:
                        selectedTab === tab.id
                          ? neoSavannahTheme.colors.neon.green
                          : neoSavannahTheme.colors.metal.steel,
                    }}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>

                    {selectedTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{
                          background: neoSavannahTheme.colors.neon.green,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div
                className="p-6 overflow-y-auto"
                style={{ height: "calc(100% - 140px)" }}
              >
                <AnimatePresence mode="wait">
                  {selectedTab === "wallet" && (
                    <motion.div
                      key="wallet"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <BalanceDisplay />

                      <div className="grid grid-cols-2 gap-4">
                        <motion.button
                          className="p-4 rounded-lg text-center"
                          style={{
                            background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}30, ${neoSavannahTheme.colors.neon.blue}30)`,
                            border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
                            color: neoSavannahTheme.colors.neon.green,
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                          <div className="font-medium">Buy MBOGA</div>
                        </motion.button>

                        <motion.button
                          className="p-4 rounded-lg text-center"
                          style={{
                            background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.amber}30, ${neoSavannahTheme.colors.neon.orange}30)`,
                            border: `1px solid ${neoSavannahTheme.colors.neon.amber}40`,
                            color: neoSavannahTheme.colors.neon.amber,
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Gift className="w-6 h-6 mx-auto mb-2" />
                          <div className="font-medium">Send Tokens</div>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {selectedTab === "nfts" && (
                    <motion.div
                      key="nfts"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <NFTGallery />
                    </motion.div>
                  )}

                  {selectedTab === "contracts" && (
                    <motion.div
                      key="contracts"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <motion.div
                        className="p-6 rounded-lg text-center"
                        style={{
                          background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.purple}20, ${neoSavannahTheme.colors.neon.blue}20)`,
                          border: `1px solid ${neoSavannahTheme.colors.neon.purple}40`,
                        }}
                      >
                        <Shield
                          className="w-12 h-12 mx-auto mb-4"
                          style={{ color: neoSavannahTheme.colors.neon.purple }}
                        />
                        <h3
                          className="text-lg font-bold mb-2"
                          style={{ color: neoSavannahTheme.colors.neon.purple }}
                        >
                          Smart Contract Escrow
                        </h3>
                        <p
                          className="text-sm opacity-70"
                          style={{ color: neoSavannahTheme.colors.neon.blue }}
                        >
                          Your funds are protected by blockchain smart contracts
                          with automatic dispute resolution.
                        </p>
                      </motion.div>
                    </motion.div>
                  )}

                  {selectedTab === "tokens" && (
                    <motion.div
                      key="tokens"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <TransactionHistory />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlockchainIntegration;
