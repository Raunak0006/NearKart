import { Shop, Product, Order, Message, Notification } from '../types';

export const MOCK_SHOPS: Shop[] = [
  {
    id: 'shop_1',
    name: 'Fresh & Easy Supermarket',
    category: 'Groceries & Essentials',
    rating: 4.8,
    ratingCount: 320,
    distance: '0.8 km',
    duration: '10-15 mins',
    isOpen: true,
    deliveryAvailable: true,
    deliveryFee: 15,
    minOrder: 99,
    bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60',
    logoImage: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=150&auto=format&fit=crop&q=60',
    address: '102 Green Avenue, Block 4, Near Central Park',
    contact: '+1 234 567 8901',
    operatingHours: '07:00 AM - 10:00 PM'
  },
  {
    id: 'shop_2',
    name: 'Organic Green Grocers',
    category: 'Fruits & Vegetables',
    rating: 4.9,
    ratingCount: 156,
    distance: '1.5 km',
    duration: '15-20 mins',
    isOpen: true,
    deliveryAvailable: true,
    deliveryFee: 25,
    minOrder: 149,
    bannerImage: '/shops/shop_2_banner.png',
    logoImage: '/shops/shop_2_logo.png',
    address: '45 Orchard Road, Sector 12, Shopping Plaza',
    contact: '+1 234 567 8902',
    operatingHours: '08:00 AM - 09:00 PM'
  },
  {
    id: 'shop_3',
    name: 'Royal Bakery & Dairy Shop',
    category: 'Bakery & Dairy Products',
    rating: 4.6,
    ratingCount: 412,
    distance: '0.4 km',
    duration: '8-12 mins',
    isOpen: true,
    deliveryAvailable: true,
    deliveryFee: 10,
    minOrder: 50,
    bannerImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=60',
    logoImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&auto=format&fit=crop&q=60',
    address: '7 Sweet Corner, Market Lane, Opposite Gym',
    contact: '+1 234 567 8903',
    operatingHours: '06:30 AM - 09:30 PM'
  },
  {
    id: 'shop_4',
    name: 'Gourmet Meat & Poultry',
    category: 'Meat & Seafood',
    rating: 4.7,
    ratingCount: 88,
    distance: '2.3 km',
    duration: '20-25 mins',
    isOpen: false,
    deliveryAvailable: true,
    deliveryFee: 35,
    minOrder: 299,
    bannerImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=60',
    logoImage: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=150&auto=format&fit=crop&q=60',
    address: '14 Butchery Lane, Sector 5, Commercial Hub',
    contact: '+1 234 567 8904',
    operatingHours: '09:00 AM - 08:00 PM'
  },
  {
    id: 'shop_5',
    name: 'QuickStop Snack Mart',
    category: 'Snacks & Beverages',
    rating: 4.2,
    ratingCount: 94,
    distance: '1.1 km',
    duration: '10-15 mins',
    isOpen: true,
    deliveryAvailable: false,
    deliveryFee: 0,
    minOrder: 10,
    bannerImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=60',
    logoImage: 'https://images.unsplash.com/photo-1601599561233-831c367fcbb3?w=150&auto=format&fit=crop&q=60',
    address: 'Expressway Petrol Pump, Main Avenue',
    contact: '+1 234 567 8905',
    operatingHours: '12:00 AM - 11:59 PM (24/7)'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // Shop 1 (Fresh & Easy Supermarket) Products
  {
    id: 'p_101',
    shopId: 'shop_1',
    name: 'Aashirvaad Shudh Chakki Atta',
    category: 'Atta, Rice & Dal',
    price: 245,
    originalPrice: 280,
    stock: 50,
    unit: '5 kg',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=60',
    description: '100% pure chakki whole wheat flour. Contains natural dietary fibers and nutrients.'
  },
  {
    id: 'p_102',
    shopId: 'shop_1',
    name: 'Fortune Soya Health Oil',
    category: 'Oils & Ghee',
    price: 135,
    originalPrice: 155,
    stock: 30,
    unit: '1 Litre',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=60',
    description: 'Refined soyabean oil, fortified with Vitamin A & D. Light and healthy cooking oil.'
  },
  {
    id: 'p_103',
    shopId: 'shop_1',
    name: 'Tata Salt Lite',
    category: 'Salt, Sugar & Spices',
    price: 28,
    stock: 120,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&auto=format&fit=crop&q=60',
    description: 'Low sodium iodized salt, ideal for managing blood pressure and general health.'
  },
  {
    id: 'p_104',
    shopId: 'shop_1',
    name: 'Organic Toor Dal',
    category: 'Atta, Rice & Dal',
    price: 160,
    originalPrice: 185,
    stock: 45,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&auto=format&fit=crop&q=60',
    description: 'Unpolished organic split pigeon peas, rich in protein, dietary fiber, and minerals.'
  },
  {
    id: 'p_105',
    shopId: 'shop_1',
    name: 'Surf Excel Easy Wash',
    category: 'Household Essentials',
    price: 180,
    originalPrice: 200,
    stock: 25,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&auto=format&fit=crop&q=60',
    description: 'Superior detergent powder that removes tough stains easily in buckets.'
  },
  {
    id: 'p_106',
    shopId: 'shop_1',
    name: 'Amul Pure Ghee',
    category: 'Oils & Ghee',
    price: 650,
    stock: 15,
    unit: '1 Litre',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=60',
    description: 'Pure clarified butter fat made from milk, adding rich aroma and taste to meals.'
  },

  // Shop 2 (Organic Green Grocers) Products
  {
    id: 'p_201',
    shopId: 'shop_2',
    name: 'Fresh Organic Tomatoes',
    category: 'Fruits & Vegetables',
    price: 40,
    originalPrice: 60,
    stock: 80,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=60',
    description: 'Juicy, vine-ripened organic red tomatoes. High in Vitamin C and Lycopene.'
  },
  {
    id: 'p_202',
    shopId: 'shop_2',
    name: 'Shimla Apples (Crispy)',
    category: 'Fruits & Vegetables',
    price: 180,
    originalPrice: 220,
    stock: 40,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=60',
    description: 'Sweet, crisp, and fresh apples locally sourced from Shimla orchards.'
  },
  {
    id: 'p_203',
    shopId: 'shop_2',
    name: 'Fresh Green Spinach (Palak)',
    category: 'Fruits & Vegetables',
    price: 25,
    stock: 35,
    unit: '250 g',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=60',
    description: 'Freshly harvested organic baby spinach leaves, washed and ready to cook.'
  },
  {
    id: 'p_204',
    shopId: 'shop_2',
    name: 'Premium Cavendish Bananas',
    category: 'Fruits & Vegetables',
    price: 60,
    originalPrice: 75,
    stock: 100,
    unit: '1 Dozen',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&auto=format&fit=crop&q=60',
    description: 'Perfectly ripe, sweet, yellow bananas. High in potassium and instant energy.'
  },
  {
    id: 'p_205',
    shopId: 'shop_2',
    name: 'Fresh Idaho Potatoes',
    category: 'Fruits & Vegetables',
    price: 35,
    stock: 150,
    unit: '2 kg',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&auto=format&fit=crop&q=60',
    description: 'Earth-fresh, multi-purpose potatoes ideal for baking, boiling, or frying.'
  },

  // Shop 3 (Royal Bakery & Dairy Shop) Products
  {
    id: 'p_301',
    shopId: 'shop_3',
    name: 'Amul Taaza Toned Milk',
    category: 'Milk & Dairy',
    price: 28,
    stock: 200,
    unit: '500 ml',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=60',
    description: 'Pasteurized toned milk, rich in calcium and protein. Ideal for daily consumption.'
  },
  {
    id: 'p_302',
    shopId: 'shop_3',
    name: 'Mother Dairy Salted Butter',
    category: 'Milk & Dairy',
    price: 56,
    originalPrice: 58,
    stock: 75,
    unit: '100 g',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&auto=format&fit=crop&q=60',
    description: 'Creamy and salted butter, perfect spread for toast, paranthas, and cooking.'
  },
  {
    id: 'p_303',
    shopId: 'shop_3',
    name: 'Multigrain Brown Bread',
    category: 'Bakery & Bread',
    price: 45,
    originalPrice: 50,
    stock: 40,
    unit: '400 g',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=60',
    description: 'Healthy, high-fiber brown bread topped with mixed seeds.'
  },
  {
    id: 'p_304',
    shopId: 'shop_3',
    name: 'Chocolate Croissant (Pack of 2)',
    category: 'Bakery & Bread',
    price: 90,
    stock: 15,
    unit: '1 Pack',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=60',
    description: 'Flaky, buttery croissants filled with rich dark chocolate, baked fresh daily.'
  },
  {
    id: 'p_305',
    shopId: 'shop_3',
    name: 'Fresh Paneer (Cottage Cheese)',
    category: 'Milk & Dairy',
    price: 85,
    originalPrice: 95,
    stock: 50,
    unit: '200 g',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&auto=format&fit=crop&q=60',
    description: 'Soft, fresh, and hygienic cottage cheese blocks, high in protein.'
  },

  // Shop 4 (Gourmet Meat & Poultry) Products
  {
    id: 'p_401',
    shopId: 'shop_4',
    name: 'Fresh Chicken Curry Cut',
    category: 'Meat & Poultry',
    price: 180,
    originalPrice: 220,
    stock: 20,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&auto=format&fit=crop&q=60',
    description: 'Fresh, skinless bone-in chicken pieces, cleaned and perfectly cut for curries.'
  },
  {
    id: 'p_402',
    shopId: 'shop_4',
    name: 'Premium Mutton Chop',
    category: 'Meat & Poultry',
    price: 750,
    stock: 10,
    unit: '1 kg',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=60',
    description: 'Tender and juicy mutton ribs/chops, locally sourced and hygienic.'
  },

  // Shop 5 (QuickStop Snack Mart) Products
  {
    id: 'p_501',
    shopId: 'shop_5',
    name: 'Lay\'s Classic Potato Chips',
    category: 'Chips & Snacks',
    price: 20,
    stock: 150,
    unit: '50 g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&auto=format&fit=crop&q=60',
    description: 'Crispy and salted potato chips, the perfect snack for quick munching.'
  },
  {
    id: 'p_502',
    shopId: 'shop_5',
    name: 'Coca-Cola Can',
    category: 'Cold Drinks & Juices',
    price: 40,
    stock: 200,
    unit: '300 ml',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=60',
    description: 'Chilled sparkling soft drink with refreshing taste.'
  },
  {
    id: 'p_503',
    shopId: 'shop_5',
    name: 'Cadbury Dairy Milk Silk',
    category: 'Chocolates & Sweets',
    price: 80,
    originalPrice: 85,
    stock: 80,
    unit: '60 g',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&auto=format&fit=crop&q=60',
    description: 'Rich, smooth, and creamy chocolate bar that melts in your mouth.'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n_1',
    title: 'Order Placed Successfully',
    description: 'Your order #NK-9021 from Royal Bakery & Dairy Shop has been placed.',
    type: 'order',
    read: false,
    timestamp: new Date(Date.now() - 5 * 60000).toISOString() // 5 mins ago
  },
  {
    id: 'n_2',
    title: 'Shop Reply Received',
    description: 'Organic Green Grocers replied: "Yes, fresh Shimla apples are in stock!"',
    type: 'message',
    read: false,
    timestamp: new Date(Date.now() - 30 * 60000).toISOString() // 30 mins ago
  },
  {
    id: 'n_3',
    title: 'Order Delivered',
    description: 'Order #NK-8951 from Fresh & Easy Supermarket was delivered by your rider.',
    type: 'order',
    read: true,
    timestamp: new Date(Date.now() - 180 * 60000).toISOString() // 3 hours ago
  },
  {
    id: 'n_4',
    title: 'Weekend Special Offer! 💸',
    description: 'Get flat 20% off on all organic fruits & vegetables at Organic Green Grocers.',
    type: 'promo',
    read: true,
    timestamp: new Date(Date.now() - 360 * 60000).toISOString() // 6 hours ago
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'NK-9021',
    shopId: 'shop_3',
    shopName: 'Royal Bakery & Dairy Shop',
    items: [
      {
        product: MOCK_PRODUCTS.find(p => p.id === 'p_303')!,
        quantity: 2
      },
      {
        product: MOCK_PRODUCTS.find(p => p.id === 'p_301')!,
        quantity: 4
      }
    ],
    status: 'accepted',
    type: 'delivery',
    totalPrice: 212, // 2*45 + 4*28 + 10 delivery fee
    deliveryFee: 10,
    address: 'Flat 402, Sunshine Heights, Sector 15, Vashi',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    riderName: 'Rahul Kumar',
    riderPhone: '+1 987 654 3210',
    estimatedTime: '15 mins'
  },
  {
    id: 'NK-8951',
    shopId: 'shop_1',
    shopName: 'Fresh & Easy Supermarket',
    items: [
      {
        product: MOCK_PRODUCTS.find(p => p.id === 'p_101')!,
        quantity: 1
      },
      {
        product: MOCK_PRODUCTS.find(p => p.id === 'p_103')!,
        quantity: 3
      }
    ],
    status: 'delivered',
    type: 'delivery',
    totalPrice: 344, // 245 + 3*28 + 15 delivery fee
    deliveryFee: 15,
    address: 'Flat 402, Sunshine Heights, Sector 15, Vashi',
    timestamp: new Date(Date.now() - 180 * 60000).toISOString()
  }
];

export const MOCK_CHAT_MESSAGES: Message[] = [
  {
    id: 'm_1',
    senderId: 'customer_1',
    senderName: 'Raunak Srivastava',
    senderRole: 'customer',
    content: 'Hi, are the Shimla apples fresh today?',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString()
  },
  {
    id: 'm_2',
    senderId: 'shop_2',
    senderName: 'Organic Green Grocers',
    senderRole: 'shopkeeper',
    content: 'Yes! They arrived this morning. Extremely crisp and sweet.',
    timestamp: new Date(Date.now() - 40 * 60000).toISOString()
  },
  {
    id: 'm_3',
    senderId: 'customer_1',
    senderName: 'Raunak Srivastava',
    senderRole: 'customer',
    content: 'Great! I will place an order for 2 kg.',
    timestamp: new Date(Date.now() - 38 * 60000).toISOString()
  },
  {
    id: 'm_4',
    senderId: 'shop_2',
    senderName: 'Organic Green Grocers',
    senderRole: 'shopkeeper',
    content: 'Thank you! We will prepare it right away once you place the request.',
    timestamp: new Date(Date.now() - 35 * 60000).toISOString()
  }
];
