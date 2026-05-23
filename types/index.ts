export type UserRole = 'customer' | 'shopkeeper';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  shopId?: string; // If role is shopkeeper
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  rating: number;
  ratingCount: number;
  distance: string; // e.g. "1.2 km"
  duration: string; // e.g. "15-20 mins"
  isOpen: boolean;
  deliveryAvailable: boolean;
  deliveryFee: number;
  minOrder: number;
  bannerImage: string;
  logoImage: string;
  address: string;
  contact: string;
  operatingHours: string;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number; // For discount display
  stock: number;
  unit: string; // e.g. "1 kg", "500 g", "1 pack"
  image: string;
  description: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 
  | 'pending' 
  | 'accepted' 
  | 'preparing' 
  | 'ready_for_pickup' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'rejected';

export interface Order {
  id: string;
  shopId: string;
  shopName: string;
  items: CartItem[];
  status: OrderStatus;
  type: 'delivery' | 'pickup';
  totalPrice: number;
  deliveryFee: number;
  address: string;
  timestamp: string; // ISO string
  riderName?: string;
  riderPhone?: string;
  estimatedTime?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string; // ISO string
  imageUrl?: string;
  productInquiry?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  orderInquiry?: {
    id: string;
    status: OrderStatus;
    totalPrice: number;
  };
}

export interface ChatThread {
  id: string; // Typically shopId for customer chat, customerId for shopkeeper chat
  participantName: string;
  participantAvatar?: string;
  lastMessage?: string;
  unreadCount: number;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'order' | 'message' | 'promo' | 'system';
  read: boolean;
  timestamp: string; // ISO string
}
