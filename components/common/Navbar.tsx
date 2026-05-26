'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingBag, Bell, Sun, Moon, MapPin, User, LogOut, RefreshCw } from 'lucide-react';
import { useRaashanKart } from '@/lib/context';

export default function Navbar() {
  const { role, setRole, theme, toggleTheme, notifications, currentUser, cartCount } = useRaashanKart();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleRoleChange = () => {
    const newRole = role === 'customer' ? 'shopkeeper' : 'customer';
    setRole(newRole);
    router.push(newRole === 'customer' ? '/customer/dashboard' : '/shopkeeper/dashboard');
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80 transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <Link href={role === 'customer' ? '/customer/dashboard' : '/shopkeeper/dashboard'} className="flex items-center gap-2 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/RaashanKart/logo.png" 
              alt="RaashanKart Logo" 
              className="h-10 w-10 object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Near<span className="text-[#10b981]">Kart</span>
            </span>
          </Link>

          {/* Customer Location Selector */}
          {role === 'customer' && (
            <div className="hidden items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-900 px-3.5 py-1.5 ml-4 text-xs font-medium text-slate-600 dark:text-slate-300 md:flex cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <MapPin className="h-3.5 w-3.5 text-emerald-500" />
              <span>Delivering to <strong>Home (Flat 402...)</strong></span>
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          
          {/* Quick Demo Role Switcher */}
          <button 
            onClick={handleRoleChange}
            className="flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-950 transition-colors"
            title="Toggle between Customer and Shopkeeper views"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Switch to {role === 'customer' ? 'Shopkeeper' : 'Customer'}</span>
            <span className="sm:hidden">{role === 'customer' ? 'Seller' : 'Buyer'}</span>
          </button>



          {/* Notifications Trigger */}
          {role === 'customer' && (
            <Link 
              href="/customer/notifications"
              className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                  {unreadNotifications}
                </span>
              )}
            </Link>
          )}

          {/* Cart Icon in Navbar (Customer Only, Desktop only since mobile uses bottom bar) */}
          {role === 'customer' && (
            <Link
              href="/customer/cart"
              className="relative hidden items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 md:flex transition-colors"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 rounded-full p-1 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {currentUser.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="h-7 w-7 rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-slate-500" />
              )}
            </button>

            {dropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-2xl border border-slate-100 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-20">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">{currentUser.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    <span className="mt-1 inline-block rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      {role}
                    </span>
                  </div>
                  <Link
                    href={role === 'customer' ? '/customer/profile' : '/shopkeeper/profile'}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors mt-1"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors mt-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
