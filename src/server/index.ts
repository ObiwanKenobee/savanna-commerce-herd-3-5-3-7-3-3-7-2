/**
 * Modular Monolith Server Entry Point
 * Unified server replacing microservices architecture
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
// WebSocket functionality disabled for now
// import { WebSocketServer } from 'ws';
import path from "path";
import { fileURLToPath } from "url";

// Import our modular monolith
import {
  initializeSystem,
  shutdown,
  modularMonolith,
} from "./services/ModularMonolithService";
import apiRoutes from "./routes/api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'", "ws:", "wss:"],
      },
    },
  }),
);

// CORS Configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://savanna-marketplace.com",
            "https://www.savanna-marketplace.com",
          ]
        : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// Performance Middleware
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "production" ? 1000 : 10000, // requests per window
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body Parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request ID Middleware
app.use((req, res, next) => {
  req.id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  res.set("X-Request-ID", req.id);
  next();
});

// Request Logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms - ${req.id}`,
    );
  });
  next();
});

// Health Check Endpoint
app.get("/health", async (req, res) => {
  try {
    const health = await modularMonolith.healthCheck();
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "2.0.0",
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime(),
      modules: health,
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// API Routes
app.use("/api", apiRoutes);

// Serve Static Files in Production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../../dist");
  app.use(express.static(distPath));

  // Serve React app for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // Development mode - proxy to Vite dev server
  app.get("*", (req, res) => {
    res.json({
      message: "Savanna Marketplace API Server",
      environment: "development",
      docs: "/api/docs",
      health: "/health",
    });
  });
}

// Error Handling Middleware
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(`Error in ${req.method} ${req.path}:`, error);

    res.status(500).json({
      error:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : error.message,
      requestId: req.id,
      timestamp: new Date().toISOString(),
    });
  },
);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    path: req.path,
    method: req.method,
    requestId: req.id,
    timestamp: new Date().toISOString(),
  });
});

// Create HTTP Server
const server = createServer(app);

// WebSocket Server temporarily disabled
// const wss = new WebSocketServer({
//   server,
//   path: '/ws'
// });

// WebSocket broadcasting temporarily disabled
// const broadcastEvent = (event: string, data: any) => {
//   console.log('Event:', event, data);
// };

// Graceful Shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  // Stop accepting new connections
  server.close(async () => {
    console.log("HTTP server closed");

    try {
      // Shutdown modular monolith
      await shutdown();

      console.log("Graceful shutdown completed");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down",
    );
    process.exit(1);
  }, 30000);
};

// Handle shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown("unhandledRejection");
});

// Start Server
async function startServer() {
  try {
    // Initialize the modular monolith system
    console.log("🔧 Initializing Modular Monolith system...");
    await initializeSystem();

    // Start the HTTP server
    server.listen(PORT, () => {
      console.log(`
🦁 Savanna Marketplace Modular Monolith Server

🌐 Server running on port ${PORT}
🏥 Health check: http://localhost:${PORT}/health
📡 API endpoint: http://localhost:${PORT}/api
🔌 WebSocket: ws://localhost:${PORT}/ws
🌍 Environment: ${process.env.NODE_ENV || "development"}
📦 Version: ${process.env.npm_package_version || "2.0.0"}

🚀 Ready to serve requests!
      `);

      // Log registered modules
      console.log("📋 Registered modules:", modularMonolith.healthCheck());
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Start the server
startServer();

// Export for testing
export { app, server };
