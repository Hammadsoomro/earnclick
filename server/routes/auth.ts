import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { User } from "../models/User";
import { Referral } from "../models/Referral";

// Check if database is connected
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-here";

// Register new user
export const handleRegister: RequestHandler = async (req, res) => {
  try {
    console.log("Registration request received");
    console.log("Request body:", req.body);

    const { email, password, name, referralCode } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      console.log("Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Processing registration for:", email);

    // Always use mock registration since database is not properly configured
    console.log("Using mock registration");

    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      totalEarnings: 1,
      availableBalance: 1,
      level: "Bronze",
      referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      isAdmin: email === "Hammad@earnclick.com",
    };

    const token = jwt.sign({ userId: mockUser.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Mock user created successfully");
    return res.status(200).json({
      user: mockUser,
      token,
    });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    // Handle referral if provided
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        user.referredBy = referrer._id.toString();
        await user.save();

        // Create referral relationship
        const referral = new Referral({
          referrerId: referrer._id.toString(),
          referredUserId: user._id.toString(),
        });
        await referral.save();

        // Give bonus to both users
        referrer.availableBalance += 1; // Referrer bonus
        user.availableBalance += 1; // Referred user bonus
        await referrer.save();
        await user.save();
      }
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        totalEarnings: user.totalEarnings,
        availableBalance: user.availableBalance,
        level: user.level,
        referralCode: user.referralCode,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login user
export const handleLogin: RequestHandler = async (req, res) => {
  try {
    console.log("Login request received");
    console.log("Request body:", req.body);

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json({ error: "Email and password are required" });
    }

    console.log("Processing login for:", email);

    // Always use mock login since database is not properly configured
    console.log("Using mock login");

    if (email === "Hammad@earnclick.com" && password === "Hammad1992@@") {
      console.log("Admin login successful");

      const mockAdminUser = {
        id: "admin123",
        email: "Hammad@earnclick.com",
        name: "Hammad Admin",
        totalEarnings: 10000,
        availableBalance: 10000,
        level: "Platinum",
        referralCode: "ADMIN123",
        isAdmin: true,
      };

      const token = jwt.sign({ userId: "admin123" }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        user: mockAdminUser,
        token,
      });
    }

    // For any other user, create a mock user
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      totalEarnings: 50,
      availableBalance: 25,
      level: "Bronze",
      referralCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      isAdmin: false,
    };

    const token = jwt.sign({ userId: mockUser.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      user: mockUser,
      token,
    });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        totalEarnings: user.totalEarnings,
        availableBalance: user.availableBalance,
        level: user.level,
        referralCode: user.referralCode,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Middleware to verify JWT token
export const authenticateToken: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid token" });
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
