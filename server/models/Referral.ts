import mongoose, { Document, Schema } from "mongoose";

export interface IReferral extends Document {
  referrerId: string;
  referredUserId: string;
  totalEarnings: number;
  commissionRate: number;
  totalCommissionEarned: number;
  isActive: boolean;
}

const ReferralSchema = new Schema<IReferral>(
  {
    referrerId: {
      type: String,
      required: true,
      ref: "User",
    },
    referredUserId: {
      type: String,
      required: true,
      ref: "User",
    },
    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },
    commissionRate: {
      type: Number,
      default: 0.2, // 20% commission
      min: 0,
      max: 1,
    },
    totalCommissionEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Unique referral relationship
ReferralSchema.index({ referrerId: 1, referredUserId: 1 }, { unique: true });

// Indexes for efficient queries
ReferralSchema.index({ referrerId: 1, isActive: 1 });
ReferralSchema.index({ referredUserId: 1 });

export const Referral = mongoose.model<IReferral>("Referral", ReferralSchema);
