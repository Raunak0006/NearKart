'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingBag, MessageSquare, User } from 'lucide-react';
import { useRaashanKart } from '@/lib/context';

export default function BottomNavigation() {
  const pathname = usePathname();
  const { cartCount, messages, role } = useRaashanKart();

  // If role is shopkeeper, we use a sidebar instead of bottom navigation
  if (role === 'shopkeeper') return null;

  const tabs = [
    {
      name: 'Home',
      href: '/customer/dashboard',
      icon: Home
    },
    {
      name: 'Search',
      href: '/customer/search',
      icon: Search
    },
    {
      name: 'Cart',
      href: '/customer/cart',
      icon: ShoppingBag,
      badge: cartCount
    },
    {
      name: 'Chat',
      href: '/customer/chat',
      icon: MessageSquare
    },
    {
      name: 'Profile',
      href: '/customer/profile',
      icon: User
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md px-2 py-1 dark:border-slate-800 dark:bg-slate-950/95 md:hidden transition-colors duration-200">
      <div className="flex justify-around items-center h-14">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || pathname?.startsWith(tab.href + '/');
          
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-medium transition-colors ${
                isActive 
                  ? 'text-emerald-500 font-semibold' 
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 mb-0.5 transition-transform duration-150 ${isActive ? 'scale-110' : ''}`} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white ring-1 ring-white dark:ring-slate-950 animate-bounce">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
