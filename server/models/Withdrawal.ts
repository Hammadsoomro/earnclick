import mongoose, { Document, Schema } from "mongoose";

export interface IWithdrawal extends Document {
  userId: string;
  amount: number;
  method: "paypal" | "bank" | "crypto";
  details: Record<string, string>;
  status: "pending" | "approved" | "rejected" | "completed";
  requestedAt: Date;
  processedAt?: Date;
  notes?: string;
  reference: string;
  fee: number;
  netAmount: number;
}

const WithdrawalSchema = new Schema<IWithdrawal>(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
      min: 5, // Minimum withdrawal
    },
    method: {
      type: String,
      required: true,
      enum: ["paypal", "bank", "crypto"],
    },
    details: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    processedAt: {
      type: Date,
    },
    notes: {
      type: String,
    },
    reference: {
      type: String,
      unique: true,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    netAmount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Generate unique reference before saving
WithdrawalSchema.pre("save", function (next) {
  if (this.isNew && !this.reference) {
    this.reference =
      "WD" +
      Date.now().toString() +
      Math.random().toString(36).substring(2, 5).toUpperCase();
  }
  next();
});

// Indexes for efficient queries
WithdrawalSchema.index({ userId: 1, requestedAt: -1 });
WithdrawalSchema.index({ status: 1, requestedAt: -1 });
WithdrawalSchema.index({ reference: 1 }, { unique: true });

export const Withdrawal = mongoose.model<IWithdrawal>(
  "Withdrawal",
  WithdrawalSchema,
);
