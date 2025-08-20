import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Referral } from "../models/Referral";

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // Already connected

  try {
    await mongoose.connect("mongodb+srv://Hammad:Soomro@cluster0.bqlcjok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-here";
if (!process.env.JWT_SECRET) {
  console.warn("⚠️  JWT_SECRET is not set in environment variables. Use a strong secret in production.");
}

// Register new user
export const handleRegister: RequestHandler = async (req, res) => {
  await connectDB();

  try {
    const { email, password, name, referralCode } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields: email, password, name" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();
    console.log(`✅ User registered: ${user.email} (ID: ${user._id})`);

    // Handle referral if provided
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        // Set referral relationship
        user.referredBy = referrer._id;
        await user.save();

        const referral = new Referral({
          referrerId: referrer._id,
          referredUserId: user._id,
        });

        // Bonus for both
        referrer.availableBalance += 1;
        user.availableBalance += 1;

        await Promise.all([
          referrer.save(),
          user.save(),
          referral.save(),
        ]);

        console.log(`👥 Referral applied: ${user.email} referred by ${referrer.email}`);
      }
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Respond with user data (exclude password)
    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        totalEarnings: user.totalEarnings,
        availableBalance: user.availableBalance,
        level: user.level,
        referralCode: user.referralCode,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error: any) {
    console.error("❌ Registration error:", error.message || error);
    return res.status(500).json({ error: "Internal server error during registration" });
  }
};

// Login user
export const handleLogin: RequestHandler = async (req, res) => {
  await connectDB();

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(`👤 User logged in: ${user.email}`);

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        totalEarnings: user.totalEarnings,
        availableBalance: user.availableBalance,
        level: user.level,
        referralCode: user.referralCode,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (error: any) {
    console.error("❌ Login error:", error.message || error);
    return res.status(500).json({ error: "Internal server error during login" });
  }
};

// Middleware to verify JWT token
export const authenticateToken: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Invalid token: User not found" });
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
