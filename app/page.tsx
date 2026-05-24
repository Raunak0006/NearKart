'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck, Zap, MessageSquare, MapPin } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#dfb17b] transition-colors duration-200 text-[#1a1513]">
      
      {/* Navbar Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b border-[#aa9585] bg-[#2d2520] text-white shadow-sm">
        <Link href="#" className="flex items-center gap-2 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/NearKart/logo.png" 
            alt="NearKart Logo" 
            className="h-10 w-10 object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            Near<span className="text-[#10b981]">Kart</span>
          </span>
        </Link>
        
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-bold text-slate-200 hover:text-[#10b981] py-2 transition-colors">
            Log In
          </Link>
          <Link href="/signup" className="rounded-xl bg-[#10b981] px-4 py-2 text-sm font-bold text-white hover:bg-emerald-600 shadow-md transition-all">
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Body */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center bg-[#dfb17b]">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px] items-center">
              
              {/* Left Column Text */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#2d2520] px-3 py-1.5 text-xs font-bold text-white">
                    <MapPin className="h-3.5 w-3.5 text-[#10b981]" />
                    <span>Hyperlocal Store Delivery & Pickup</span>
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none text-[#1a1513] leading-tight">
                    Find Nearby Grocery Stores <span className="text-[#10b981]">Instantly</span>
                  </h1>
                  <p className="max-w-[600px] text-[#2d2520] md:text-xl font-semibold leading-relaxed">
                    Discover local vendors, search real-time inventories, chat directly with shopkeepers, and get your fresh groceries delivered in minutes.
                  </p>
                </div>

                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#10b981] px-8 text-sm font-bold text-white shadow-lg hover:bg-emerald-600 transition-all cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-[#3a2f29] bg-[#2d2520] px-8 text-sm font-bold text-white hover:bg-[#3a2f29] transition-colors cursor-pointer"
                  >
                    <span>Browse Stores</span>
                  </Link>
                </div>
              </div>

              {/* Right Column Graphic Card */}
              <div className="mx-auto w-full max-w-[450px] lg:max-w-none flex justify-center">
                <div className="relative w-full aspect-square rounded-3xl border border-[#3a2f29] bg-[#2d2520] p-6 shadow-2xl overflow-hidden flex flex-col justify-between text-white">
                  <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/10 rounded-full blur-3xl" />
                  
                  {/* Visual UI preview elements representing NearKart dashboard */}
                  <div className="flex justify-between items-center border-b border-[#3a2f29] pb-4 z-10">
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-full bg-[#10b981] text-white flex items-center justify-center font-bold">
                        NK
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-white">NearKart QuickShop</p>
                        <p className="text-[10px] text-slate-300">Green Grocers • 0.8km away</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#10b981] px-2 py-0.5 text-[9px] font-bold text-white">
                      OPEN
                    </span>
                  </div>

                  {/* Groceries graphic layout inside mockup */}
                  <div className="my-8 flex justify-around items-center gap-4 z-10">
                    <div className="text-center space-y-1.5 p-3 rounded-2xl bg-[#1a1513] border border-[#3a2f29] flex-1">
                      <span className="text-3xl">🍎</span>
                      <p className="text-[11px] font-bold">Apples</p>
                      <p className="text-[10px] font-extrabold text-[#10b981]">₹180/kg</p>
                    </div>
                    <div className="text-center space-y-1.5 p-3 rounded-2xl bg-[#1a1513] border border-[#3a2f29] flex-1">
                      <span className="text-3xl">🥛</span>
                      <p className="text-[11px] font-bold">Fresh Milk</p>
                      <p className="text-[10px] font-extrabold text-[#10b981]">₹28/pkt</p>
                    </div>
                    <div className="text-center space-y-1.5 p-3 rounded-2xl bg-[#1a1513] border border-[#3a2f29] flex-1">
                      <span className="text-3xl">🍞</span>
                      <p className="text-[11px] font-bold">Brown Bread</p>
                      <p className="text-[10px] font-extrabold text-[#10b981]">₹45/pc</p>
                    </div>
                  </div>

                  {/* Visual bottom mockup navigation */}
                  <div className="rounded-2xl bg-[#10b981] text-white p-3.5 flex items-center justify-between text-xs font-bold shadow-md z-10">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4.5 w-4.5" />
                      <span>Checkout (3 items)</span>
                    </div>
                    <span className="text-[13px]">₹253 →</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="w-full py-12 md:py-24 bg-[#dfb17b] border-t border-b border-[#aa9585] flex justify-center">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              
              <div className="rounded-2xl border border-[#3a2f29] bg-[#2d2520] p-6 shadow-md flex flex-col gap-3 text-white">
                <div className="rounded-xl bg-[#1a1513] p-3 w-fit">
                  <Zap className="h-6 w-6 text-[#10b981]" />
                </div>
                <h3 className="text-base font-bold text-white">Instant Hyperlocal Delivery</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Get groceries delivered from shops less than 2 km away in under 15-20 minutes. Keep it local, fresh, and immediate.
                </p>
              </div>

              <div className="rounded-2xl border border-[#3a2f29] bg-[#2d2520] p-6 shadow-md flex flex-col gap-3 text-white">
                <div className="rounded-xl bg-[#1a1513] p-3 w-fit">
                  <MessageSquare className="h-6 w-6 text-[#10b981]" />
                </div>
                <h3 className="text-base font-bold text-white">Direct Chat & Negotiations</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Chat directly with store owners to verify availability, request special orders, or negotiate custom bundle prices.
                </p>
              </div>

              <div className="rounded-2xl border border-[#3a2f29] bg-[#2d2520] p-6 shadow-md flex flex-col gap-3 text-white">
                <div className="rounded-xl bg-[#1a1513] p-3 w-fit">
                  <ShieldCheck className="h-6 w-6 text-[#10b981]" />
                </div>
                <h3 className="text-base font-bold text-white">Flexible Delivery & Pickup</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Choose between high-speed home deliveries or quick store pickups to bypass queues and save on delivery charges.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#aa9585] px-4 md:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#2d2520] font-semibold">
        <p>&copy; 2026 NearKart Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Terms of Service</Link>
        </div>
      </footer>

    </div>
  );
}
