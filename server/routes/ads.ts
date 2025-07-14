import { RequestHandler } from "express";
import mongoose from "mongoose";
import { Ad } from "../models/Ad";
import { AdView } from "../models/AdView";
import { User } from "../models/User";
import { Referral } from "../models/Referral";

// Check if database is connected
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get available ads for user
export const getAvailableAds: RequestHandler = async (req, res) => {
  try {
    // If database not connected, return mock ads for demo
    if (!isDatabaseConnected()) {
      const mockAds = [
        {
          _id: "1",
          title: "Premium Offers & Rewards",
          description: "High-converting premium offers with instant rewards",
          url: "https://www.profitableratecpm.com/d2j586tys?key=89f7c2c680b39d6d0bb2f4e12f5f8a24",
          category: "Shopping",
          payout: 0.85,
          duration: 10,
          type: "Direct Link",
          advertiser: "Adsterra",
          difficulty: "Easy",
          featured: true,
          isActive: true,
          viewCount: 0,
        },
        {
          _id: "2",
          title: "Exclusive Gaming Offers",
          description: "Top gaming platforms and exclusive bonuses",
          url: "https://www.profitableratecpm.com/hftzqqd1t?key=db2c37affb6056fc6e81c50984a5c9f0",
          category: "Entertainment",
          payout: 0.95,
          duration: 10,
          type: "Direct Link",
          advertiser: "Adsterra",
          difficulty: "Easy",
          featured: true,
          isActive: true,
          viewCount: 0,
        },
        {
          _id: "3",
          title: "Financial Services & Apps",
          description: "Best financial apps and investment platforms",
          url: "https://www.profitableratecpm.com/s8d9m4rh9?key=ab6e0251610d024fabee48e7426b0f4f",
          category: "Finance",
          payout: 1.15,
          duration: 15,
          type: "Direct Link",
          advertiser: "Adsterra",
          difficulty: "Medium",
          featured: true,
          isActive: true,
          viewCount: 0,
        },
        {
          _id: "4",
          title: "Technology & Software",
          description: "Latest tech products and software solutions",
          url: "https://www.profitableratecpm.com/wgytz0b63m?key=9f277b8a79cf1893dec2ec9e4e268769",
          category: "Technology",
          payout: 1.25,
          duration: 15,
          type: "Direct Link",
          advertiser: "Adsterra",
          difficulty: "Medium",
          featured: true,
          isActive: true,
          viewCount: 0,
        },
      ];
      return res.json(mockAds);
    }

    const userId = req.user?._id;
    const { category, type } = req.query;

    // Build query
    const query: any = { isActive: true };
    if (category && category !== "All") {
      query.category = category;
    }
    if (type) {
      query.type = type;
    }

    // Get ads that user hasn't viewed today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const viewedAdIds = await AdView.find({
      userId,
      viewedAt: { $gte: startOfDay },
    }).distinct("adId");

    query._id = { $nin: viewedAdIds };

    const ads = await Ad.find(query)
      .sort({ featured: -1, payout: -1 })
      .limit(20);

    res.json(ads);
  } catch (error) {
    console.error("Get ads error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// View an ad and earn money
export const viewAd: RequestHandler = async (req, res) => {
  try {
    const userId = req.user._id;
    const { adId } = req.body;

    // Check if ad exists and is active
    const ad = await Ad.findById(adId);
    if (!ad || !ad.isActive) {
      return res.status(400).json({ error: "Ad not found or inactive" });
    }

    // Check if user already viewed this ad today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const existingView = await AdView.findOne({
      userId,
      adId,
      viewedAt: { $gte: startOfDay },
    });

    if (existingView) {
      return res.status(400).json({ error: "Ad already viewed today" });
    }

    // Create ad view record
    const adView = new AdView({
      userId,
      adId,
      payout: ad.payout,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
      completed: true,
    });

    await adView.save();

    // Update user earnings
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.totalEarnings += ad.payout;
    user.availableBalance += ad.payout;
    user.adsViewedToday += 1;
    await user.save();

    // Update ad view count
    ad.viewCount += 1;
    await ad.save();

    // Handle referral commission
    if (user.referredBy) {
      const referral = await Referral.findOne({
        referrerId: user.referredBy,
        referredUserId: userId,
        isActive: true,
      });

      if (referral) {
        const commission = ad.payout * referral.commissionRate;

        // Update referrer's earnings
        const referrer = await User.findById(user.referredBy);
        if (referrer) {
          referrer.totalEarnings += commission;
          referrer.availableBalance += commission;
          await referrer.save();
        }

        // Update referral stats
        referral.totalEarnings += ad.payout;
        referral.totalCommissionEarned += commission;
        await referral.save();
      }
    }

    res.json({
      success: true,
      payout: ad.payout,
      newBalance: user.availableBalance,
      message: `You earned $${ad.payout}!`,
    });
  } catch (error) {
    console.error("View ad error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user's ad viewing stats
export const getAdStats: RequestHandler = async (req, res) => {
  try {
    const userId = req.user._id;

    // Today's stats
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const todayViews = await AdView.find({
      userId,
      viewedAt: { $gte: startOfDay },
    });

    const todayEarnings = todayViews.reduce(
      (sum, view) => sum + view.payout,
      0,
    );

    // Total stats
    const totalViews = await AdView.countDocuments({ userId });
    const user = await User.findById(userId);

    res.json({
      todayViews: todayViews.length,
      todayEarnings,
      totalViews,
      totalEarnings: user?.totalEarnings || 0,
      availableBalance: user?.availableBalance || 0,
      adsViewedToday: user?.adsViewedToday || 0,
    });
  } catch (error) {
    console.error("Get ad stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin: Create new ad
export const createAd: RequestHandler = async (req, res) => {
  try {
    const adData = req.body;
    const ad = new Ad(adData);
    await ad.save();
    res.json(ad);
  } catch (error) {
    console.error("Create ad error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
