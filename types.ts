
export enum UserRole {
  PRODUCER = 'PRODUCER',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN'
}

export type SubscriptionPlan = 'free' | 'pro' | 'elite';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: SubscriptionPlan;
  isPremium: boolean;
  isBlocked?: boolean;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  productionId: string;
  buyerId: string;
  producerId: string;
  messages: ChatMessage[];
  lastUpdate: string;
  status: 'open' | 'negotiating' | 'closed';
}

export interface CoffeeQuote {
  id: string;
  type: 'Arábica' | 'Robusta';
  currentPrice: number;
  lastPrice: number;
  history7d: number[];
  history30d: number[];
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  type: 'Em Coco' | 'Beneficiado' | 'Escolha' | 'Robusta';
  bags: number;
  description: string;
}

export interface PriceAlert {
  id: string;
  coffeeType: 'Arábica' | 'Robusta';
  targetPrice: number;
  isTriggered: boolean;
  createdAt: string;
}

export interface Production {
  id: string;
  producerId: string;
  coffeeType: 'Arábica' | 'Robusta';
  harvest: string;
  volume: number;
  quality: string;
  desiredPrice: number;
  location: string;
  isPublic: boolean;
  status: 'available' | 'sold' | 'reserved'; // Novo campo
  isFeatured?: boolean;
  createdAt: string;
}

export interface Interest {
  id: string;
  productionId: string;
  buyerId: string;
  buyerName: string;
  createdAt: string;
}

export interface Tip {
  id: string;
  category: 'Market' | 'Management' | 'Storage' | 'Strategy';
  title: string;
  content: string;
  date: string;
}
