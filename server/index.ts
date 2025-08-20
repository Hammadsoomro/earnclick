import express from "express";
import cors from "cors";
import { connectDatabase } from "./database";
import { handleDemo } from "./routes/demo";
import { handleRegister, handleLogin, authenticateToken } from "./routes/auth";
import { getAvailableAds, viewAd, getAdStats, createAd } from "./routes/ads";
import { requireAdmin } from "./middleware/adminAuth";
import {
  getAdminStats,
  getAllUsers,
  getPendingWithdrawals,
  updateWithdrawalStatus,
  getAllAds,
  updateAd,
  deleteAd
} from "./routes/admin";

export function createServer() {
  const app = express();

  // Connect to MongoDB (non-blocking)
  connectDatabase().catch(console.error);

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Debug middleware to log requests
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    if (req.body && Object.keys(req.body).length > 0) {
      console.log('Request body keys:', Object.keys(req.body));
    }
    next();
  });

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

  // Admin routes (require admin authentication)
  app.get("/api/admin/stats", authenticateToken, requireAdmin, getAdminStats);
  app.get("/api/admin/users", authenticateToken, requireAdmin, getAllUsers);
  app.get("/api/admin/withdrawals/pending", authenticateToken, requireAdmin, getPendingWithdrawals);
  app.put("/api/admin/withdrawals/:withdrawalId", authenticateToken, requireAdmin, updateWithdrawalStatus);
  app.get("/api/admin/ads", authenticateToken, requireAdmin, getAllAds);
  app.post("/api/admin/ads", authenticateToken, requireAdmin, createAd);
  app.put("/api/admin/ads/:adId", authenticateToken, requireAdmin, updateAd);
  app.delete("/api/admin/ads/:adId", authenticateToken, requireAdmin, deleteAd);

  return app;
}
