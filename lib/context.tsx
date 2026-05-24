'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Shop, Product, CartItem, Order, Message, Notification, UserRole, OrderStatus } from '../types';
import { MOCK_SHOPS, MOCK_PRODUCTS, MOCK_NOTIFICATIONS, MOCK_ORDERS, MOCK_CHAT_MESSAGES } from './mockData';

interface NearKartContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  
  // Shops & Products
  shops: Shop[];
  toggleShopStatus: (shopId: string) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  cartShopId: string | null;
  
  // Orders
  orders: Order[];
  placeOrder: (type: 'delivery' | 'pickup', address: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Messages & Chats
  messages: Message[];
  sendMessage: (recipientId: string, content: string, inquiry?: { type: 'product' | 'order', id: string, name: string, price?: number, image?: string, status?: OrderStatus }) => void;
  
  // Notifications
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (title: string, description: string, type: Notification['type']) => void;
  
  // Favorites
  favoriteShops: string[];
  toggleFavoriteShop: (shopId: string) => void;
  favoriteProducts: string[];
  toggleFavoriteProduct: (productId: string) => void;
  
  // Dark Mode Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const NearKartContext = createContext<NearKartContextType | undefined>(undefined);

export const NearKartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'customer_1',
    name: 'Raunak Srivastava',
    email: 'Raunaksrivastava@example.com',
    phone: '+1 987 654 3210',
    role: 'customer',
    avatarUrl: '/NearKart/pug_avatar.png'
  });

  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [favoriteShops, setFavoriteShops] = useState<string[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load initial data and localStorage on mount
  useEffect(() => {
    // Force light theme and ensure dark class is removed
    setTheme('light');
    document.documentElement.classList.remove('dark');
    
    const localRole = localStorage.getItem('nearkart-role') as UserRole;

    if (localRole) {
      setRole(localRole);
      updateUserForRole(localRole);
    }

    // Load mock data
    const localShops = localStorage.getItem('nearkart-shops');
    const localProducts = localStorage.getItem('nearkart-products');
    const localOrders = localStorage.getItem('nearkart-orders');
    const localMessages = localStorage.getItem('nearkart-messages');
    const localNotifications = localStorage.getItem('nearkart-notifications');
    const localFavShops = localStorage.getItem('nearkart-fav-shops');
    const localFavProducts = localStorage.getItem('nearkart-fav-products');
    const localCart = localStorage.getItem('nearkart-cart');

    setShops(localShops ? JSON.parse(localShops) : MOCK_SHOPS);
    setProducts(localProducts ? JSON.parse(localProducts) : MOCK_PRODUCTS);
    setOrders(localOrders ? JSON.parse(localOrders) : MOCK_ORDERS);
    setMessages(localMessages ? JSON.parse(localMessages) : MOCK_CHAT_MESSAGES);
    setNotifications(localNotifications ? JSON.parse(localNotifications) : MOCK_NOTIFICATIONS);
    setFavoriteShops(localFavShops ? JSON.parse(localFavShops) : ['shop_1', 'shop_3']);
    setFavoriteProducts(localFavProducts ? JSON.parse(localFavProducts) : ['p_201', 'p_301']);
    setCart(localCart ? JSON.parse(localCart) : []);
  }, []);

  // Sync state to localStorage when changed
  useEffect(() => {
    if (shops.length > 0) localStorage.setItem('nearkart-shops', JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    if (products.length > 0) localStorage.setItem('nearkart-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nearkart-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (orders.length > 0) localStorage.setItem('nearkart-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (messages.length > 0) localStorage.setItem('nearkart-messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (notifications.length > 0) localStorage.setItem('nearkart-notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('nearkart-fav-shops', JSON.stringify(favoriteShops));
  }, [favoriteShops]);

  useEffect(() => {
    localStorage.setItem('nearkart-fav-products', JSON.stringify(favoriteProducts));
  }, [favoriteProducts]);

  const toggleTheme = () => {
    // Locked to light mode
  };

  const updateUserForRole = (newRole: UserRole) => {
    if (newRole === 'customer') {
      setCurrentUser({
        id: 'customer_1',
        name: 'Raunak Srivastava',
        email: 'Raunaksrivastava@example.com',
        phone: '+1 987 654 3210',
        role: 'customer',
        avatarUrl: '/NearKart/pug_avatar.png'
      });
    } else {
      setCurrentUser({
        id: 'shop_3', // Operating as Royal Bakery
        name: 'Raunak Srivastava',
        email: 'RaunakSrivastava@royalbakery.com',
        phone: '+1 234 567 8903',
        role: 'shopkeeper',
        shopId: 'shop_3',
        avatarUrl: '/NearKart/pug_avatar.png'
      });
    }
  };

  const changeRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('nearkart-role', newRole);
    updateUserForRole(newRole);
  };

  // Shop operations
  const toggleShopStatus = (shopId: string) => {
    setShops(prev => prev.map(shop => 
      shop.id === shopId ? { ...shop, isOpen: !shop.isOpen } : shop
    ));
    
    // Add a notification for demo purposes
    const shop = shops.find(s => s.id === shopId);
    if (shop) {
      addNotification(
        `${shop.name} is now ${!shop.isOpen ? 'OPEN' : 'CLOSED'}`,
        `The store status has been updated in the platform.`,
        'system'
      );
    }
  };

  // Product operations
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `p_${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Cart operations
  const cartShopId = cart.length > 0 ? cart[0].product.shopId : null;

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      // Hyperlocal rule: Can only order from one shop at a time
      if (prev.length > 0 && prev[0].product.shopId !== product.shopId) {
        // Clear previous cart and add new one
        return [{ product, quantity }];
      }
      
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Orders operations
  const placeOrder = (type: 'delivery' | 'pickup', address: string) => {
    if (cart.length === 0) return null;
    
    const firstItem = cart[0];
    const shop = shops.find(s => s.id === firstItem.product.shopId);
    
    if (!shop) return null;

    const deliveryFee = type === 'delivery' ? shop.deliveryFee : 0;
    const totalPrice = cartTotal + deliveryFee;

    const newOrder: Order = {
      id: `NK-${Math.floor(1000 + Math.random() * 9000)}`,
      shopId: shop.id,
      shopName: shop.name,
      items: [...cart],
      status: 'pending',
      type,
      totalPrice,
      deliveryFee,
      address,
      timestamp: new Date().toISOString(),
      riderName: type === 'delivery' ? 'Ramesh Kumar' : undefined,
      riderPhone: type === 'delivery' ? '+1 999 888 7777' : undefined,
      estimatedTime: type === 'delivery' ? '25-35 mins' : '10 mins'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    
    // Add notifications
    addNotification(
      'Order Placed successfully',
      `Your order ${newOrder.id} at ${newOrder.shopName} has been submitted.`,
      'order'
    );

    // Simulate shopkeeper receiving order
    setTimeout(() => {
      // Auto notification for shopkeeper role if active or simulated
      addNotification(
        'New Incoming Order! 🛍️',
        `Order ${newOrder.id} received at ${newOrder.shopName} for $${newOrder.totalPrice}.`,
        'order'
      );
    }, 3000);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));

    // Send notifications to customer
    const order = orders.find(o => o.id === orderId);
    if (order) {
      let title = '';
      let desc = '';
      switch (status) {
        case 'accepted':
          title = 'Order Accepted';
          desc = `Your order ${orderId} has been accepted by ${order.shopName}.`;
          break;
        case 'preparing':
          title = 'Order is Preparing';
          desc = `${order.shopName} is packing your items.`;
          break;
        case 'ready_for_pickup':
          title = 'Ready for Pickup';
          desc = `Your order ${orderId} is packed and ready for pickup.`;
          break;
        case 'out_for_delivery':
          title = 'Out for Delivery';
          desc = `Rider has picked up your order ${orderId} and is on the way.`;
          break;
        case 'delivered':
          title = 'Order Delivered';
          desc = `Order ${orderId} from ${order.shopName} has been successfully delivered.`;
          break;
        case 'rejected':
          title = 'Order Cancelled';
          desc = `Sorry, your order ${orderId} was rejected/cancelled by the store.`;
          break;
      }
      
      addNotification(title, desc, 'order');
    }
  };

  // Chats & Messaging operations
  const sendMessage = (recipientId: string, content: string, inquiry?: any) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: role,
      content,
      timestamp: new Date().toISOString(),
      productInquiry: inquiry?.type === 'product' ? {
        id: inquiry.id,
        name: inquiry.name,
        price: inquiry.price || 0,
        image: inquiry.image || ''
      } : undefined,
      orderInquiry: inquiry?.type === 'order' ? {
        id: inquiry.id,
        status: inquiry.status || 'pending',
        totalPrice: inquiry.price || 0
      } : undefined
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate auto shopkeeper reply if user is customer, to keep interface lively
    if (role === 'customer') {
      setTimeout(() => {
        const replyMessage: Message = {
          id: `msg_${Date.now() + 1}`,
          senderId: recipientId,
          senderName: shops.find(s => s.id === recipientId)?.name || 'Store Owner',
          senderRole: 'shopkeeper',
          content: `Hi Jane, thank you for writing. We received your query about "${content}". Let me check that and get back to you in a minute.`,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, replyMessage]);
        
        addNotification(
          'New Message from Shop',
          `You have a reply from ${replyMessage.senderName}.`,
          'message'
        );
      }, 4000);
    }
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNotification = (title: string, description: string, type: Notification['type']) => {
    const newNotif: Notification = {
      id: `n_${Date.now()}`,
      title,
      description,
      type,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Favorites
  const toggleFavoriteShop = (shopId: string) => {
    setFavoriteShops(prev => 
      prev.includes(shopId) ? prev.filter(id => id !== shopId) : [...prev, shopId]
    );
  };

  const toggleFavoriteProduct = (productId: string) => {
    setFavoriteProducts(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  return (
    <NearKartContext.Provider value={{
      role,
      setRole: changeRole,
      currentUser,
      setCurrentUser,
      shops,
      toggleShopStatus,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartCount,
      cartShopId,
      orders,
      placeOrder,
      updateOrderStatus,
      messages,
      sendMessage,
      notifications,
      markNotificationAsRead,
      addNotification,
      favoriteShops,
      toggleFavoriteShop,
      favoriteProducts,
      toggleFavoriteProduct,
      theme,
      toggleTheme
    }}>
      {children}
    </NearKartContext.Provider>
  );
};

export const useNearKart = () => {
  const context = useContext(NearKartContext);
  if (context === undefined) {
    throw new Error('useNearKart must be used within a NearKartProvider');
  }
  return context;
};
