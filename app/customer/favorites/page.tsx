'use client';

import React, { useState } from 'react';
import { useRaashanKart } from '@/lib/context';
import ShopCard from '@/components/customer/ShopCard';
import ProductCard from '@/components/customer/ProductCard';
import { Heart, Store, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CustomerFavoritesPage() {
  const { favoriteShops, favoriteProducts, shops, products } = useRaashanKart();
  const [activeTab, setActiveTab] = useState<'shops' | 'products'>('shops');

  const favShopsList = shops.filter(s => favoriteShops.includes(s.id));
  const favProdsList = products.filter(p => favoriteProducts.includes(p.id));

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
          <span>My Favorites</span>
        </h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Quickly access saved stores and products</p>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('shops')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            activeTab === 'shops'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-450'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Store className="h-4.5 w-4.5" />
          <span>Saved Shops ({favShopsList.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
            activeTab === 'products'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-450'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="h-4.5 w-4.5" />
          <span>Saved Products ({favProdsList.length})</span>
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === 'shops' ? (
        favShopsList.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favShopsList.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center max-w-sm mx-auto space-y-4">
            <span className="text-3xl">🏪</span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">No saved shops</h4>
            <p className="text-xs text-slate-450 leading-normal">
              Favorite a grocery store by clicking the heart button on its card.
            </p>
            <Link href="/customer/dashboard" className="inline-block rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-sm">
              Discover Stores
            </Link>
          </div>
        )
      ) : (
        favProdsList.length > 0 ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {favProdsList.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center max-w-sm mx-auto space-y-4">
            <span className="text-3xl">🛍️</span>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">No saved products</h4>
            <p className="text-xs text-slate-450 leading-normal">
              Favorite products so you can buy them again easily.
            </p>
            <Link href="/customer/search" className="inline-block rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-sm">
              Browse Catalog
            </Link>
          </div>
        )
      )}

    </div>
  );
}
