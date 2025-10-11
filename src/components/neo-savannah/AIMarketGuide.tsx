/**
 * AI Market Guide - Virtual Shaman/Guide
 * Futuristic AI avatar styled like a cyber-Maasai elder
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Zap,
  Eye,
  Brain,
  Sparkles,
  MessageCircle,
  Search,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { neoSavannahTheme } from "../../theme/neo-savannah";

interface Message {
  id: string;
  type: "user" | "guide";
  content: string;
  timestamp: Date;
  products?: string[];
  action?: "search" | "recommend" | "navigate" | "info";
}

interface AIGuideState {
  isListening: boolean;
  isThinking: boolean;
  isSpeaking: boolean;
  mood: "neutral" | "helpful" | "excited" | "focused";
  energy: number; // 0-100
}

const AIMarketGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [guideState, setGuideState] = useState<AIGuideState>({
    isListening: false,
    isThinking: false,
    isSpeaking: false,
    mood: "neutral",
    energy: 80,
  });
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample responses from the AI Guide
  const guideResponses = {
    greeting: [
      "Welcome to Neo-Savannah, digital wanderer. I am Kesi, your cyber-shaman guide through this electric marketplace.",
      "Greetings, trader. The digital winds whisper of great deals today. How may I assist your journey?",
      "The neon spirits guide you well today. What treasures do you seek in our cyber-savannah?",
    ],
    search: [
      "Scanning the digital plains for organic honey... Found 12 suppliers with lightning-fast delivery.",
      "The cyber-elephants have found premium spices from the Tsavo collective. Shall I show you?",
      "My neural networks detect excellent deals on what you seek. Let me illuminate the path.",
    ],
    recommendation: [
      "Based on your tribal trading patterns, I recommend the Quantum Tea from the Highlands collective.",
      "The market spirits suggest you explore cyber-honey - prices are 15% below the seven-day average.",
      "Your purchase history indicates an affinity for premium goods. Consider the Digital Spice Masters' new collection.",
    ],
    navigation: [
      "Follow the golden data streams to the supplier district. I'll guide your steps.",
      "The logistics hub glows bright today - perfect timing for delivery scheduling.",
      "Navigate to coordinates 127.0.0.1 for the best deals on organic products.",
    ],
  };

  useEffect(() => {
    // Initialize with greeting
    addMessage("guide", getRandomResponse("greeting"));

    // Simulate energy changes
    const energyInterval = setInterval(() => {
      setGuideState((prev) => ({
        ...prev,
        energy: Math.max(
          20,
          Math.min(100, prev.energy + (Math.random() - 0.5) * 10),
        ),
      }));
    }, 3000);

    return () => clearInterval(energyInterval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getRandomResponse = (type: keyof typeof guideResponses): string => {
    const responses = guideResponses[type];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const addMessage = (
    type: "user" | "guide",
    content: string,
    action?: Message["action"],
    products?: string[],
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      action,
      products,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const processUserInput = async (input: string) => {
    addMessage("user", input);

    setGuideState((prev) => ({ ...prev, isThinking: true }));

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerInput = input.toLowerCase();
    let response = "";
    let action: Message["action"] = "info";
    let products: string[] = [];

    if (lowerInput.includes("honey") || lowerInput.includes("sweet")) {
      response = getRandomResponse("search");
      action = "search";
      products = [
        "Cyber Honey Premium",
        "Digital Wildflower Honey",
        "Quantum Bee Essence",
      ];
    } else if (lowerInput.includes("spice") || lowerInput.includes("flavor")) {
      response = getRandomResponse("search");
      action = "search";
      products = ["Neo Cardamom", "Digital Turmeric", "Cyber Cinnamon"];
    } else if (
      lowerInput.includes("recommend") ||
      lowerInput.includes("suggest")
    ) {
      response = getRandomResponse("recommendation");
      action = "recommend";
    } else if (
      lowerInput.includes("navigate") ||
      lowerInput.includes("find") ||
      lowerInput.includes("where")
    ) {
      response = getRandomResponse("navigation");
      action = "navigate";
    } else {
      response =
        "I sense your query reaches beyond the digital veil. Could you be more specific about what you seek in our cyber-marketplace?";
    }

    setGuideState((prev) => ({
      ...prev,
      isThinking: false,
      isSpeaking: true,
      mood: "helpful",
    }));

    addMessage("guide", response, action, products);

    // Simulate speech
    setTimeout(() => {
      setGuideState((prev) => ({
        ...prev,
        isSpeaking: false,
        mood: "neutral",
      }));
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      processUserInput(inputValue);
      setInputValue("");
    }
  };

  const startVoiceRecognition = () => {
    setGuideState((prev) => ({ ...prev, isListening: true }));

    // Simulate voice recognition
    setTimeout(() => {
      setGuideState((prev) => ({ ...prev, isListening: false }));
      processUserInput("Show me organic honey from Tsavo");
    }, 3000);
  };

  const getAvatarExpression = () => {
    const { mood, isThinking, isSpeaking, isListening } = guideState;

    if (isThinking) return "🧠";
    if (isSpeaking) return "🗣️";
    if (isListening) return "👂";

    switch (mood) {
      case "helpful":
        return "😊";
      case "excited":
        return "✨";
      case "focused":
        return "🎯";
      default:
        return "🧘";
    }
  };

  const getEnergyColor = () => {
    const { energy } = guideState;
    if (energy > 70) return neoSavannahTheme.colors.neon.green;
    if (energy > 40) return neoSavannahTheme.colors.neon.amber;
    return neoSavannahTheme.colors.neon.orange;
  };

  return (
    <>
      {/* AI Guide Avatar - Always visible */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}, ${neoSavannahTheme.colors.neon.blue})`,
            border: `2px solid ${getEnergyColor()}`,
            boxShadow: `0 0 20px ${getEnergyColor()}50`,
          }}
          animate={{
            scale: guideState.isSpeaking ? [1, 1.1, 1] : 1,
            boxShadow: guideState.isThinking
              ? [
                  `0 0 20px ${getEnergyColor()}50`,
                  `0 0 40px ${getEnergyColor()}80`,
                  `0 0 20px ${getEnergyColor()}50`,
                ]
              : `0 0 20px ${getEnergyColor()}50`,
          }}
          transition={{
            scale: {
              duration: 0.5,
              repeat: guideState.isSpeaking ? Infinity : 0,
            },
            boxShadow: {
              duration: 1,
              repeat: guideState.isThinking ? Infinity : 0,
            },
          }}
        >
          <div className="text-2xl">{getAvatarExpression()}</div>

          {/* Energy Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 64 64"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke={`${getEnergyColor()}30`}
              strokeWidth="2"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="30"
              fill="none"
              stroke={getEnergyColor()}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${(guideState.energy / 100) * 188.5} 188.5`}
              animate={{
                strokeDasharray: `${(guideState.energy / 100) * 188.5} 188.5`,
              }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Status Indicators */}
          {guideState.isListening && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: neoSavannahTheme.colors.status.error,
                boxShadow: `0 0 10px ${neoSavannahTheme.colors.status.error}`,
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Mic className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-24 right-6 w-96 h-96 z-40"
            style={{
              background: `linear-gradient(135deg, ${neoSavannahTheme.colors.atmosphere.night}95, ${neoSavannahTheme.colors.atmosphere.mist}95)`,
              border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
              borderRadius: "16px",
              backdropFilter: "blur(20px)",
              boxShadow: neoSavannahTheme.shadows.cyber.lg,
            }}
          >
            {/* Header */}
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: `${neoSavannahTheme.colors.neon.green}20` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}, ${neoSavannahTheme.colors.neon.blue})`,
                  }}
                >
                  🧙‍♂️
                </div>
                <div>
                  <h3
                    className="font-bold text-sm"
                    style={{
                      color: neoSavannahTheme.colors.neon.green,
                      fontFamily: neoSavannahTheme.typography.fonts.heading,
                    }}
                  >
                    Kesi - Cyber Shaman
                  </h3>
                  <p
                    className="text-xs opacity-70"
                    style={{ color: neoSavannahTheme.colors.neon.blue }}
                  >
                    {guideState.isThinking
                      ? "Consulting the digital spirits..."
                      : guideState.isSpeaking
                        ? "Sharing ancient wisdom..."
                        : guideState.isListening
                          ? "Listening to your voice..."
                          : "Ready to guide your journey"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background: voiceEnabled
                      ? `${neoSavannahTheme.colors.neon.green}20`
                      : "transparent",
                    color: voiceEnabled
                      ? neoSavannahTheme.colors.neon.green
                      : neoSavannahTheme.colors.metal.steel,
                  }}
                >
                  {voiceEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-64">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        message.type === "user"
                          ? "rounded-br-none"
                          : "rounded-bl-none"
                      }`}
                      style={{
                        background:
                          message.type === "user"
                            ? `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.blue}30, ${neoSavannahTheme.colors.neon.purple}30)`
                            : `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}20, ${neoSavannahTheme.colors.earth.terracotta}20)`,
                        border: `1px solid ${
                          message.type === "user"
                            ? neoSavannahTheme.colors.neon.blue
                            : neoSavannahTheme.colors.neon.green
                        }40`,
                        color:
                          message.type === "user"
                            ? neoSavannahTheme.colors.neon.blue
                            : neoSavannahTheme.colors.neon.green,
                        fontSize: "14px",
                        fontFamily: neoSavannahTheme.typography.fonts.body,
                      }}
                    >
                      <p>{message.content}</p>

                      {/* Product recommendations */}
                      {message.products && message.products.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.products.map((product, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-2 p-2 rounded cursor-pointer transition-colors"
                              style={{
                                background: `${neoSavannahTheme.colors.neon.amber}20`,
                                border: `1px solid ${neoSavannahTheme.colors.neon.amber}40`,
                              }}
                              whileHover={{
                                background: `${neoSavannahTheme.colors.neon.amber}30`,
                              }}
                            >
                              <ShoppingBag
                                className="w-3 h-3"
                                style={{
                                  color: neoSavannahTheme.colors.neon.amber,
                                }}
                              />
                              <span
                                className="text-xs"
                                style={{
                                  color: neoSavannahTheme.colors.neon.amber,
                                }}
                              >
                                {product}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      <div
                        className="text-xs mt-1 opacity-50"
                        style={{ color: "inherit" }}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Thinking indicator */}
                {guideState.isThinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div
                      className="p-3 rounded-lg rounded-bl-none"
                      style={{
                        background: `linear-gradient(135deg, ${neoSavannahTheme.colors.neon.green}20, ${neoSavannahTheme.colors.earth.terracotta}20)`,
                        border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
                      }}
                    >
                      <motion.div
                        className="flex items-center gap-1"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Brain
                          className="w-4 h-4"
                          style={{ color: neoSavannahTheme.colors.neon.green }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: neoSavannahTheme.colors.neon.green }}
                        >
                          Consulting neural networks...
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div
              className="p-4 border-t"
              style={{ borderColor: `${neoSavannahTheme.colors.neon.green}20` }}
            >
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask your cyber-shaman guide..."
                  className="flex-1 p-2 rounded-lg border bg-transparent text-sm"
                  style={{
                    background: `${neoSavannahTheme.colors.atmosphere.night}50`,
                    border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
                    color: neoSavannahTheme.colors.neon.green,
                    fontFamily: neoSavannahTheme.typography.fonts.body,
                  }}
                />

                <button
                  type="button"
                  onClick={startVoiceRecognition}
                  disabled={guideState.isListening}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background: guideState.isListening
                      ? `${neoSavannahTheme.colors.status.error}30`
                      : `${neoSavannahTheme.colors.neon.blue}30`,
                    border: `1px solid ${
                      guideState.isListening
                        ? neoSavannahTheme.colors.status.error
                        : neoSavannahTheme.colors.neon.blue
                    }40`,
                    color: guideState.isListening
                      ? neoSavannahTheme.colors.status.error
                      : neoSavannahTheme.colors.neon.blue,
                  }}
                >
                  {guideState.isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    background: inputValue.trim()
                      ? `${neoSavannahTheme.colors.neon.green}30`
                      : `${neoSavannahTheme.colors.metal.steel}30`,
                    border: `1px solid ${
                      inputValue.trim()
                        ? neoSavannahTheme.colors.neon.green
                        : neoSavannahTheme.colors.metal.steel
                    }40`,
                    color: inputValue.trim()
                      ? neoSavannahTheme.colors.neon.green
                      : neoSavannahTheme.colors.metal.steel,
                  }}
                >
                  <Zap className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIMarketGuide;
