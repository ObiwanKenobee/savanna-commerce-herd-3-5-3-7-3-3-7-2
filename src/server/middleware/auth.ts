import { Request, Response, NextFunction } from "express";

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
      id?: string;
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    // Simple token validation (in production, use proper JWT verification)
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());

    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return res.sendStatus(403);
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
