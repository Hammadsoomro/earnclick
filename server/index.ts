import express from "express";
import cors from "cors";
import { connectDatabase } from "./database";
import { handleDemo } from "./routes/demo";
import { handleRegister, handleLogin, authenticateToken } from "./routes/auth";
import { getAvailableAds, viewAd, getAdStats, createAd } from "./routes/ads";

export function createServer() {
  const app = express();

  // Connect to MongoDB
  connectDatabase();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);

  // Protected routes (require authentication)
  app.get("/api/ads", authenticateToken, getAvailableAds);
  app.post("/api/ads/view", authenticateToken, viewAd);
  app.get("/api/ads/stats", authenticateToken, getAdStats);

  // Admin routes
  app.post("/api/admin/ads", createAd);

  return app;
}
