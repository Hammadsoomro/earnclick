// API interfaces for PTC Platform

export interface User {
  id: string;
  email: string;
  name: string;
  joinDate: string;
  level: "Bronze" | "Silver" | "Gold" | "Platinum";
  totalEarnings: number;
  availableBalance: number;
  pendingEarnings: number;
  referralCode: string;
  referredBy?: string;
  isActive: boolean;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  category: string;
  payout: number;
  duration: number; // in seconds
  isActive: boolean;
  viewCount: number;
  createdAt: string;
}

export interface AdView {
  id: string;
  userId: string;
  adId: string;
  payout: number;
  viewedAt: string;
  isValid: boolean;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  totalEarnings: number;
  commissionRate: number;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  method: "paypal" | "bank" | "crypto";
  details: Record<string, string>;
  status: "pending" | "approved" | "rejected" | "completed";
  requestedAt: string;
  processedAt?: string;
  notes?: string;
}

export interface EarningHistory {
  id: string;
  userId: string;
  type: "ad_view" | "referral_bonus" | "daily_bonus" | "level_bonus";
  amount: number;
  description: string;
  createdAt: string;
}

// API Request/Response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  referralCode?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DashboardResponse {
  user: User;
  todayEarnings: number;
  recentActivities: EarningHistory[];
  availableAds: Ad[];
  stats: {
    totalUsers: number;
    totalAdsViewed: number;
    totalPaidOut: number;
  };
}

export interface AdViewRequest {
  adId: string;
}

export interface AdViewResponse {
  success: boolean;
  payout: number;
  newBalance: number;
}

export interface ReferralStatsResponse {
  totalReferrals: number;
  totalCommissions: number;
  recentReferrals: Referral[];
  referralCode: string;
}

export interface WithdrawRequest {
  amount: number;
  method: "paypal" | "bank" | "crypto";
  details: Record<string, string>;
}

// Demo response (existing)
export interface DemoResponse {
  message: string;
  timestamp: string;
}
