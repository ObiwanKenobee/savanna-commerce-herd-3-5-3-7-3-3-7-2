/**
 * Neo-Savannah Cyberpunk Theme
 * Futuristic wildlife marketplace with cyber-savannah aesthetics
 */

export const neoSavannahTheme = {
  colors: {
    // Earthy Neutrals
    earth: {
      burnt: "#CC5500", // Sunburnt orange
      terracotta: "#E2725B", // Deep terracotta
      khaki: "#C3B091", // Savannah khaki
      dust: "#D2B48C", // Dusty sand
      bark: "#8B4513", // Tree bark
    },

    // Neon Accents
    neon: {
      amber: "#FFBF00", // Electric amber
      green: "#39FF14", // Holographic green
      blue: "#00FFFF", // Glowing cyan
      purple: "#BF00FF", // Digital purple
      pink: "#FF1493", // Hot pink
      orange: "#FF4500", // Cyber orange
    },

    // Metallic Undertones
    metal: {
      brass: "#B5651D", // Brass
      copper: "#B87333", // Copper
      steel: "#71797E", // Steel gray
      chrome: "#C0C0C0", // Chrome
      black: "#1C1C1C", // Matte black
      gold: "#FFD700", // Digital gold
    },

    // Atmospheric Colors
    atmosphere: {
      dawn: "#FF6B35", // Savannah dawn
      dusk: "#4A0E4E", // Cyber dusk
      night: "#0D1117", // Deep night
      mist: "#2D3748", // Digital mist
      glow: "#1A365D", // Neon glow
    },

    // Status Colors
    status: {
      success: "#39FF14", // Neon green
      warning: "#FFBF00", // Electric amber
      error: "#FF073A", // Cyber red
      info: "#00FFFF", // Cyber blue
      neutral: "#8B949E", // Gray
    },
  },

  typography: {
    fonts: {
      heading: '"Orbitron", "Space Grotesk", "Inter", sans-serif',
      body: '"Space Grotesk", "Inter", sans-serif',
      mono: '"JetBrains Mono", "Courier New", monospace',
      display: '"Bauhaus 93", "Orbitron", sans-serif',
    },

    sizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
      "8xl": "6rem", // 96px
      "9xl": "8rem", // 128px
    },

    weights: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },

  spacing: {
    px: "1px",
    0: "0",
    0.5: "0.125rem", // 2px
    1: "0.25rem", // 4px
    1.5: "0.375rem", // 6px
    2: "0.5rem", // 8px
    2.5: "0.625rem", // 10px
    3: "0.75rem", // 12px
    3.5: "0.875rem", // 14px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    7: "1.75rem", // 28px
    8: "2rem", // 32px
    9: "2.25rem", // 36px
    10: "2.5rem", // 40px
    11: "2.75rem", // 44px
    12: "3rem", // 48px
    14: "3.5rem", // 56px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    28: "7rem", // 112px
    32: "8rem", // 128px
    36: "9rem", // 144px
    40: "10rem", // 160px
    44: "11rem", // 176px
    48: "12rem", // 192px
    52: "13rem", // 208px
    56: "14rem", // 224px
    60: "15rem", // 240px
    64: "16rem", // 256px
    72: "18rem", // 288px
    80: "20rem", // 320px
    96: "24rem", // 384px
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  shadows: {
    neon: {
      sm: "0 0 5px currentColor, 0 0 10px currentColor",
      md: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
      lg: "0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor",
      xl: "0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor",
    },

    cyber: {
      sm: "0 2px 4px rgba(0, 255, 255, 0.3)",
      md: "0 4px 8px rgba(0, 255, 255, 0.3), 0 0 20px rgba(255, 191, 0, 0.2)",
      lg: "0 8px 16px rgba(0, 255, 255, 0.4), 0 0 30px rgba(255, 191, 0, 0.3)",
      xl: "0 12px 24px rgba(0, 255, 255, 0.5), 0 0 40px rgba(255, 191, 0, 0.4)",
    },

    hologram: {
      default:
        "inset 0 0 20px rgba(57, 255, 20, 0.3), 0 0 20px rgba(57, 255, 20, 0.2)",
      hover:
        "inset 0 0 30px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.4)",
    },
  },

  animations: {
    durations: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
      slower: "750ms",
      slowest: "1000ms",
    },

    easings: {
      linear: "linear",
      ease: "ease",
      "ease-in": "ease-in",
      "ease-out": "ease-out",
      "ease-in-out": "ease-in-out",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      cyber: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },

    keyframes: {
      glow: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0.5 },
      },

      pulse: {
        "0%, 100%": {
          transform: "scale(1)",
          opacity: 1,
        },
        "50%": {
          transform: "scale(1.05)",
          opacity: 0.8,
        },
      },

      flicker: {
        "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: 1 },
        "20%, 24%, 55%": { opacity: 0.4 },
      },

      scanline: {
        "0%": { transform: "translateY(-100%)" },
        "100%": { transform: "translateY(100vh)" },
      },

      float: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-10px)" },
      },

      glitch: {
        "0%": {
          transform: "translate(0)",
          filter: "hue-rotate(0deg)",
        },
        "20%": {
          transform: "translate(-2px, 2px)",
          filter: "hue-rotate(90deg)",
        },
        "40%": {
          transform: "translate(-2px, -2px)",
          filter: "hue-rotate(180deg)",
        },
        "60%": {
          transform: "translate(2px, 2px)",
          filter: "hue-rotate(270deg)",
        },
        "80%": {
          transform: "translate(2px, -2px)",
          filter: "hue-rotate(360deg)",
        },
        "100%": {
          transform: "translate(0)",
          filter: "hue-rotate(0deg)",
        },
      },
    },
  },

  effects: {
    gradients: {
      cyber: "linear-gradient(135deg, #00FFFF 0%, #FFBF00 50%, #FF1493 100%)",
      savannah:
        "linear-gradient(135deg, #CC5500 0%, #E2725B 50%, #C3B091 100%)",
      neon: "linear-gradient(90deg, #39FF14 0%, #00FFFF 50%, #BF00FF 100%)",
      sunset: "linear-gradient(135deg, #FF6B35 0%, #4A0E4E 100%)",
      aurora:
        "linear-gradient(135deg, #00FFFF 0%, #39FF14 25%, #FFBF00 50%, #FF1493 75%, #BF00FF 100%)",
    },

    patterns: {
      scanlines:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)",
      grid: "linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
      noise:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2300FFFF' fill-opacity='0.05' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
    },

    filters: {
      cyberpunk: "contrast(1.2) saturate(1.5) hue-rotate(5deg)",
      hologram: "brightness(1.2) contrast(1.1) saturate(1.3)",
      glitch: "brightness(1.1) contrast(1.2) saturate(2)",
      retro: "sepia(0.3) contrast(1.3) brightness(0.9)",
    },
  },

  components: {
    button: {
      variants: {
        cyber: {
          base: "bg-gradient-to-r from-neon-blue to-neon-purple text-white border border-neon-blue/50",
          hover: "shadow-neon-md transform scale-105",
          active: "shadow-neon-lg",
        },
        neon: {
          base: "bg-transparent border-2 border-neon-green text-neon-green",
          hover: "bg-neon-green/10 shadow-neon-sm",
          active: "bg-neon-green/20",
        },
        hologram: {
          base: "bg-gradient-to-br from-neon-green/20 to-neon-blue/20 border border-neon-green/50",
          hover: "shadow-hologram-hover",
          active: "shadow-hologram-default",
        },
      },
    },

    card: {
      variants: {
        cyber: {
          base: "bg-gradient-to-br from-atmosphere-night to-atmosphere-mist border border-neon-blue/30 backdrop-blur-sm",
          glow: "shadow-cyber-md",
        },
        hologram: {
          base: "bg-gradient-to-br from-neon-green/5 to-neon-blue/5 border border-neon-green/20",
          glow: "shadow-hologram-default",
        },
        savannah: {
          base: "bg-gradient-to-br from-earth-terracotta/20 to-earth-khaki/20 border border-earth-burnt/30",
        },
      },
    },
  },
};

export type NeoSavannahTheme = typeof neoSavannahTheme;

// CSS-in-JS helper functions
export const neonGlow = (
  color: string,
  intensity: "sm" | "md" | "lg" | "xl" = "md",
) => ({
  boxShadow: neoSavannahTheme.shadows.neon[intensity],
  color,
});

export const cyberGradient = (direction: string = "135deg") => ({
  background: `linear-gradient(${direction}, ${neoSavannahTheme.colors.neon.blue}, ${neoSavannahTheme.colors.neon.purple})`,
});

export const hologramEffect = () => ({
  background:
    "linear-gradient(135deg, rgba(57, 255, 20, 0.1), rgba(0, 255, 255, 0.1))",
  border: `1px solid ${neoSavannahTheme.colors.neon.green}40`,
  boxShadow: neoSavannahTheme.shadows.hologram.default,
});

export const glitchAnimation = () => ({
  animation: "glitch 0.3s ease-in-out infinite alternate-reverse",
});

export const scanlineEffect = () => ({
  position: "relative" as const,
  "&::before": {
    content: '""',
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: neoSavannahTheme.effects.patterns.scanlines,
    pointerEvents: "none" as const,
    opacity: 0.5,
  },
});

export default neoSavannahTheme;
