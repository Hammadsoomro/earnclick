import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  joinDate: Date;
  level: "Bronze" | "Silver" | "Gold" | "Platinum";
  totalEarnings: number;
  availableBalance: number;
  pendingEarnings: number;
  referralCode: string;
  referredBy?: string;
  isActive: boolean;
  isVerified: boolean;
  isAdmin: boolean;
  lastLogin?: Date;
  adsViewedToday: number;
  lastAdViewReset: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    level: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum"],
      default: "Bronze",
    },
    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableBalance: {
      type: Number,
      default: 1, // Welcome bonus reduced
      min: 0,
    },
    pendingEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },
    referralCode: {
      type: String,
      unique: true,
      required: true,
    },
    referredBy: {
      type: String,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    adsViewedToday: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastAdViewReset: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Generate referral code before saving
UserSchema.pre("save", async function (next) {
  if (this.isNew && !this.referralCode) {
    this.referralCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
  }
  next();
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update user level based on total referrals
UserSchema.methods.updateLevel = function () {
  // This would be called after calculating referrals
  // Level calculation logic here
};

export const User = mongoose.model<IUser>("User", UserSchema);
