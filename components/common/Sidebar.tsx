'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  PlusCircle, 
  MessageSquare, 
  Store,
  Power
} from 'lucide-react';
import { useNearKart } from '@/lib/context';

export default function Sidebar() {
  const pathname = usePathname();
  const { role, shops, toggleShopStatus } = useNearKart();

  // If role is customer, we use bottom navigation instead of sidebar
  if (role === 'customer') return null;

  // Shopkeeper represents Royal Bakery (shop_3) in our context
  const shopId = 'shop_3';
  const shop = shops.find(s => s.id === shopId);
  const isOpen = shop ? shop.isOpen : true;

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/shopkeeper/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Manage Orders',
      href: '/shopkeeper/orders',
      icon: ShoppingCart
    },
    {
      name: 'Inventory',
      href: '/shopkeeper/inventory',
      icon: Package
    },
    {
      name: 'Add Product',
      href: '/shopkeeper/add-product',
      icon: PlusCircle
    },
    {
      name: 'Messages',
      href: '/shopkeeper/chat',
      icon: MessageSquare
    },
    {
      name: 'Store Settings',
      href: '/shopkeeper/profile',
      icon: Store
    }
  ];

  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-950 md:flex flex-col justify-between shrink-0 transition-colors duration-200">
      <div>
        
        {/* Shop Info Summary */}
        <div className="mb-8 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
          <div className="flex items-center gap-3">
            {shop && (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={shop.logoImage} 
                alt={shop.name} 
                className="h-10 w-10 rounded-xl object-cover"
              />
            )}
            <div>
              <h2 className="text-sm font-bold text-slate-950 dark:text-white truncate max-w-[150px]">
                {shop ? shop.name : 'Royal Bakery'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Shopkeeper Admin</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800 pt-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Store Status</span>
            <button
              onClick={() => toggleShopStatus(shopId)}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition-colors ${
                isOpen 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-450' 
                  : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-450'
              }`}
            >
              <Power className="h-3 w-3" />
              <span>{isOpen ? 'Open' : 'Closed'}</span>
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-350 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-[10px] text-slate-400 dark:text-slate-500">
        <p>&copy; 2026 NearKart Partner</p>
        <p className="mt-0.5">V1.0.0 (Demo Mode)</p>
      </div>
    </aside>
  );
}
