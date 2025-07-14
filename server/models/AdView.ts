import mongoose, { Document, Schema } from "mongoose";

export interface IAdView extends Document {
  userId: string;
  adId: string;
  payout: number;
  viewedAt: Date;
  isValid: boolean;
  ipAddress?: string;
  userAgent?: string;
  duration?: number;
  completed: boolean;
}

const AdViewSchema = new Schema<IAdView>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    adId: {
      type: String,
      required: true,
      ref: "Ad",
    },
    payout: {
      type: Number,
      required: true,
      min: 0,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    duration: {
      type: Number,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index to prevent duplicate ad views per user per day
AdViewSchema.index(
  { userId: 1, adId: 1, viewedAt: 1 },
  {
    unique: true,
    partialFilterExpression: {
      viewedAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  },
);

// Index for efficient queries
AdViewSchema.index({ userId: 1, viewedAt: -1 });
AdViewSchema.index({ adId: 1, viewedAt: -1 });

export const AdView = mongoose.model<IAdView>("AdView", AdViewSchema);
