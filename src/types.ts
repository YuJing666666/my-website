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

// 知识科普卡片的内容结构
export interface KnowledgeSection {
  heading: string;
  body: string;
  tips?: string[];
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
  popularity?: 'huge' | 'wide' | 'tall' | 'normal' | 'small' | 'micro'; // Sizing
  tokenPrice?: string; // Model input/output cost pricing, or subtitle
  models?: AIModel[];
  stock?: StockInfo;
  news?: NewsItem[];
  // 服装导航站扩展字段
  cardType?: 'link' | 'knowledge'; // link=跳转质询, knowledge=知识科普
  knowledgeContent?: KnowledgeSection[]; // 知识科普内容
  brandInfo?: string; // 品牌简介（质询类）
  recommendation?: string; // 推荐理由
  priceRange?: string; // 价格区间
  level?: '入门' | '进阶' | '高级'; // 知识难度等级
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
}

// ===================== 导航分类 =====================
export type CategoryType = 'fashion' | 'trend' | 'pattern' | 'sewing' | 'accessory' | 'composition' | 'software';
