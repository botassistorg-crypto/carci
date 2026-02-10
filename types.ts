export enum ViewState {
  HOME = 'HOME',
  NEW_CARS = 'NEW_CARS',
  USED_CARS = 'USED_CARS',
  RENTALS = 'RENTALS',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}

export enum Platform {
  TIKTOK = 'TikTok',
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook'
}

export type CarCategory = 'New' | 'Used' | 'Rental';

export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  price: number; // Price per day (rent) or total price (sell)
  engine: string;
  speed: string; 
  image: string;
  category: CarCategory;
  description?: string;
  status: 'Available' | 'Sold' | 'Rented' | 'Maintenance';
}

export interface SocialPost {
  id: string;
  platform: Platform;
  caption: string;
  hashtags: string[];
  imageUrl?: string; 
  imagePrompt: string;
  estimatedRevenue: number; 
  status: 'pending' | 'posted' | 'scheduled';
  scheduledTime: string;
}

export interface MarketingCampaign {
  id: string;
  carId: string;
  carName: string;
  targetAudience: string;
  posts: SocialPost[];
  projectedRevenue: number;
  isActive: boolean;
  createdAt: string;
}

export interface AnalyticsData {
  day: string;
  revenue: number;
  rentals: number;
}