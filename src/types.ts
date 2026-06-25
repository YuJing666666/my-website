export interface AIModel {
  name: string;
  releaseDate: string;
  useCase: '聊天' | '代码' | '绘画' | '声音' | '视频' | '多模态' | string;
}

export interface StockPoint {
  date: string;
  value: number;
}

export interface StockInfo {
  ticker: string;
  companyName: string;
  price: number;
  change: number; // Percentage change e.g. +2.4
  history: StockPoint[];
}

export interface NewsItem {
  title: string;
  source: string;
  time: string;
}

export interface WebItem {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  isFree: 'free' | 'paid' | 'freemium'; // 收费/免费/免费+内购
  logoColor?: string; // Optional custom gradient/color background for the logo
  logoText?: string;  // 2-character initials for logo, e.g., "Gp" for Gemini
  iconName?: string;  // Lucide icon name if applicable
  logoUrl?: string;   // Optional image URL
  isCustom?: boolean; // To distinguish user-added items
  popularity?: 'huge' | 'wide' | 'tall' | 'normal' | 'small' | 'micro'; // Sizing: huge (2x2), wide (2x1), tall (1x2), normal (1x1), small (1x1 compact), micro (1x1 ultra-condensed)
  tokenPrice?: string; // Model input/output cost pricing, e.g. ($0.00014/K $0.00028/K tokens)
  models?: AIModel[];
  stock?: StockInfo;
  news?: NewsItem[];
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
}
