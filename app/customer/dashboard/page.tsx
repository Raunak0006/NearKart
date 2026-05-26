'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/common/SearchBar';
import CategoryCard from '@/components/customer/CategoryCard';
import ShopCard from '@/components/customer/ShopCard';
import ProductCard from '@/components/customer/ProductCard';
import { ShopCardSkeleton, ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useRaashanKart } from '@/lib/context';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CustomerDashboard() {
  const { shops, products } = useRaashanKart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load to show skeletons
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { name: 'Fruits & Veggies', icon: '🍎', color: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' },
    { name: 'Milk & Dairy', icon: '🥛', color: 'bg-blue-50 dark:bg-blue-950/20 text-blue-600' },
    { name: 'Bakery & Bread', icon: '🍞', color: 'bg-amber-50 dark:bg-amber-950/20 text-amber-600' },
    { name: 'Atta, Rice & Dal', icon: '🌾', color: 'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600' },
    { name: 'Chips & Snacks', icon: '🍪', color: 'bg-rose-50 dark:bg-rose-950/20 text-rose-600' },
    { name: 'Beverages', icon: '🥤', color: 'bg-purple-50 dark:bg-purple-950/20 text-purple-600' }
  ];

  // Open shops only or all shops sorted by distance
  const nearbyShops = shops.slice(0, 3);
  const featuredProducts = products.filter(p => p.isFeatured || p.price > 100).slice(0, 4);

  return (
    <div className="space-y-8">
      
      {/* Hero Welcome banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 md:p-8 text-white shadow-xl shadow-emerald-500/10 overflow-hidden">
        <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full translate-x-10 -translate-y-10 blur-2xl" />
        <div className="relative z-10 max-w-lg space-y-3">
          <h2 className="text-xl md:text-3xl font-extrabold leading-tight">
            Fresh Groceries, <br />Delivered in Minutes! ⚡
          </h2>
          <p className="text-xs md:text-sm text-white font-medium">
            Order from the nearest local stores and support your local neighborhood vendors.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-bold bg-white/15 px-3 py-1 rounded-full w-fit">
            <Sparkles className="h-3.5 w-3.5 text-white fill-white" />
            <span>Flat 20% off on your first order! Use code FIRST20</span>
          </div>
        </div>
      </div>

      {/* Main Search Bar (Sticky-ish underneath hero) */}
      <div className="w-full">
        <SearchBar />
      </div>

      {/* Categories Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-950 dark:text-white">Shop by Category</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {categories.map((cat, idx) => (
            <CategoryCard 
              key={idx} 
              name={cat.name} 
              icon={cat.icon} 
              color={cat.color} 
            />
          ))}
        </div>
      </div>

      {/* Nearby Shops */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-950 dark:text-white">Nearby Grocery Stores</h3>
            <p className="text-[11px] text-white/90 font-medium mt-0.5">Directly connected to stores around you</p>
          </div>
          <Link href="/customer/search" className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
            <span>See All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array(3).fill(0).map((_, idx) => <ShopCardSkeleton key={idx} />)
          ) : (
            nearbyShops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))
          )}
        </div>
      </div>

      {/* Featured Products */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-950 dark:text-white">Trending Purchases</h3>
            <p className="text-[11px] text-white/90 font-medium mt-0.5">Top-selling items in your neighborhood</p>
          </div>
          <Link href="/customer/search" className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
            <span>View Catalog</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            Array(4).fill(0).map((_, idx) => <ProductCardSkeleton key={idx} />)
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

    </div>
  );
}
