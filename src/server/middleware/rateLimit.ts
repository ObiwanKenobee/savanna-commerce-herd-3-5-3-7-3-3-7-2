import { Request, Response, NextFunction } from "express";

// Simple in-memory rate limiter
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.ip || "unknown";
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const max = 1000; // requests per window
  const now = Date.now();

  // Clean up expired entries
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });

  if (!store[clientId]) {
    store[clientId] = {
      count: 1,
      resetTime: now + windowMs,
    };
  } else {
    store[clientId].count++;
  }

  if (store[clientId].count > max) {
    return res.status(429).json({
      error: "Too many requests from this IP, please try again later.",
      retryAfter: Math.ceil((store[clientId].resetTime - now) / 1000),
    });
  }

  next();
};
