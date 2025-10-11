import { Request, Response, NextFunction } from "express";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Basic request validation
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.body) {
      return res.status(400).json({
        error: "Request body is required",
      });
    }
  }

  // Add request ID if not present
  if (!req.id) {
    req.id = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  next();
};
