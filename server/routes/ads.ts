import { RequestHandler } from "express";
import { Ad } from "../models/Ad";
import { AdView } from "../models/AdView";
import { User } from "../models/User";
import { Referral } from "../models/Referral";

// Get available ads for user
export const getAvailableAds: RequestHandler = async (req, res) => {
  try {
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
