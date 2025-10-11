import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface VoiceCommandOverlayProps {
  voice: any; // Voice hook return type
}

const VoiceCommandOverlay: React.FC<VoiceCommandOverlayProps> = ({ voice }) => {
  const [isListening, setIsListening] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, this would trigger voice recognition
  };

  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="flex items-center gap-2">
        <motion.button
          onClick={toggleListening}
          className={`p-3 rounded-full transition-colors ${
            isListening ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isListening ? { scale: [1, 1.1, 1] } : {}}
          transition={isListening ? { duration: 0.5, repeat: Infinity } : {}}
        >
          {isListening ? (
            <MicOff className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </motion.button>

        <motion.button
          onClick={toggleEnabled}
          className="p-2 rounded-full bg-gray-500 text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <VolumeX className="w-4 h-4" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 min-w-48"
          >
            <div className="text-sm text-gray-600 mb-2">Listening...</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="text-xs text-gray-500">Say a command</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VoiceCommandOverlay;
