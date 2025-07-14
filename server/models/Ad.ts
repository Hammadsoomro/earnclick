import mongoose, { Document, Schema } from "mongoose";

export interface IAd extends Document {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  category: string;
  payout: number;
  duration: number;
  type: "Banner" | "Video" | "Native" | "Direct Link";
  isActive: boolean;
  viewCount: number;
  maxViews?: number;
  advertiser: string;
  difficulty: "Easy" | "Medium" | "Hard";
  featured: boolean;
  expiryDate?: Date;
}

const AdSchema = new Schema<IAd>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Shopping",
        "Technology",
        "Travel",
        "Food",
        "Finance",
        "Entertainment",
        "Health",
        "Education",
        "Gaming",
        "Other",
      ],
    },
    payout: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      required: true,
      enum: ["Banner", "Video", "Native", "Direct Link"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxViews: {
      type: Number,
    },
    advertiser: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Index for efficient queries
AdSchema.index({ category: 1, isActive: 1 });
AdSchema.index({ featured: 1, isActive: 1 });
AdSchema.index({ type: 1, isActive: 1 });

export const Ad = mongoose.model<IAd>("Ad", AdSchema);
