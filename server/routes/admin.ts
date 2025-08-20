import { RequestHandler } from "express";
import mongoose from "mongoose";
import { User } from "../models/User";
import { Ad } from "../models/Ad";
import { AdView } from "../models/AdView";
import { Withdrawal } from "../models/Withdrawal";
import { Referral } from "../models/Referral";

// Check if database is connected
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get admin dashboard stats
export const getAdminStats: RequestHandler = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        error: "Database not available",
      });
    }

    const totalUsers = await User.countDocuments();
    const totalAds = await Ad.countDocuments();
    const totalAdViews = await AdView.countDocuments();
    const totalWithdrawals = await Withdrawal.countDocuments();
    const pendingWithdrawals = await Withdrawal.countDocuments({
      status: "pending",
    });

    // Calculate total earnings and payouts
    const totalEarnings = await AdView.aggregate([
      { $group: { _id: null, total: { $sum: "$payout" } } },
    ]);

    const totalPayouts = await Withdrawal.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalUsers,
      totalAds,
      totalAdViews,
      totalWithdrawals,
      pendingWithdrawals,
      totalEarnings: totalEarnings[0]?.total || 0,
      totalPayouts: totalPayouts[0]?.total || 0,
    });
  } catch (error) {
    console.error("Get admin stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all users
export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        error: "Database not available",
      });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get pending withdrawals
export const getPendingWithdrawals: RequestHandler = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        error: "Database not available",
      });
    }

    const withdrawals = await Withdrawal.find({ status: "pending" })
      .populate("userId", "name email")
      .sort({ requestedAt: -1 });

    res.json(withdrawals);
  } catch (error) {
    console.error("Get pending withdrawals error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Approve or reject withdrawal
export const updateWithdrawalStatus: RequestHandler = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        error: "Database not available",
      });
    }

    const { withdrawalId } = req.params;
    const { status, notes } = req.body;

    const withdrawal = await Withdrawal.findById(withdrawalId);
    if (!withdrawal) {
      return res.status(404).json({ error: "Withdrawal not found" });
    }

    withdrawal.status = status;
    withdrawal.notes = notes;
    withdrawal.processedAt = new Date();
    await withdrawal.save();

    // If approved, deduct from user balance
    if (status === "approved") {
      const user = await User.findById(withdrawal.userId);
      if (user) {
        user.availableBalance -= withdrawal.amount;
        await user.save();
      }
    }

    res.json({ message: "Withdrawal status updated successfully" });
  } catch (error) {
    console.error("Update withdrawal status error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new ad
export const createAd: RequestHandler = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        error: "Database not available",
      });
    }

    const ad = new Ad(req.body);
    await ad.save();
    res.json(ad);
  } catch (error) {
    console.error("Create ad error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update ad
export const updateAd: RequestHandler = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        error: "Database not available",
      });
    }

    const { adId } = req.params;
    const ad = await Ad.findByIdAndUpdate(adId, req.body, { new: true });

    if (!ad) {
      return res.status(404).json({ error: "Ad not found" });
    }

    res.json(ad);
  } catch (error) {
    console.error("Update ad error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete ad
export const deleteAd: RequestHandler = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        error: "Database not available",
      });
    }

    const { adId } = req.params;
    await Ad.findByIdAndDelete(adId);
    res.json({ message: "Ad deleted successfully" });
  } catch (error) {
    console.error("Delete ad error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all ads for admin
export const getAllAds: RequestHandler = async (req, res) => {
  try {
    if (!isDatabaseConnected()) {
      return res.status(503).json({
        error: "Database not available",
      });
    }

    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    console.error("Get all ads error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
