export interface AuthUser {
  id: string;
  pseudo: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: 'user' | 'moderator' | 'finance' | 'support' | 'admin';
  isVerified: boolean;
}

export interface PostMedia {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl: string | null;
}

export interface FeedPost {
  id: string;
  userId: string;
  text: string | null;
  hashtags: string[] | null;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isBoosted: boolean;
  createdAt: string;
  media: PostMedia[];
}

export interface Wallet {
  id: string;
  balance: string;
  pendingBalance: string;
  currency: string;
}

export interface WalletTransaction {
  id: string;
  type: string;
  status: string;
  amount: string;
  balanceAfter: string;
  createdAt: string;
}

export interface GiftCatalogItem {
  id: string;
  code: string;
  name: string;
  icon: string;
  priceFeed: string;
  priceVibes: string;
  priceLive: string;
}

export interface AdminDashboard {
  totalUsers: number;
  totalPosts: number;
  totalVibes: number;
  pendingWithdrawals: number;
  openReports: number;
  totalCommissionRevenue: number;
}
