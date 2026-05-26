'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, Clock, MapPin, Phone, MessageSquare, ArrowLeft, Search } from 'lucide-react';
import { useRaashanKart } from '@/lib/context';
import ProductCard from '@/components/customer/ProductCard';

export default function ShopDetailsClient() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const { shops, products, sendMessage } = useRaashanKart();

  const [shopQuery, setShopQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [bannerError, setBannerError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  // Find target shop
  const shop = shops.find(s => s.id === id);
  if (!shop) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-bold">Shop not found</h3>
        <button onClick={() => router.push('/customer/dashboard')} className="mt-4 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white">
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Filter products by shop and category
  const shopProducts = products.filter(p => p.shopId === id);
  
  // Get unique subcategories within this shop
  const subCategories = ['All', ...Array.from(new Set(shopProducts.map(p => p.category)))];

  const filteredShopProducts = shopProducts.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(shopQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(shopQuery.toLowerCase());
    
    const matchesCategory = selectedSubCategory === 'All' || p.category === selectedSubCategory;
    
    return matchesQuery && matchesCategory;
  });

  const handleStartChat = () => {
    // Navigate to chat and pre-populate message
    sendMessage(shop.id, `Hello! I am viewing your store ${shop.name} and have some queries.`);
    router.push('/customer/chat');
  };

  return (
    <div className="space-y-6 relative pb-10">
      
      {/* Back Button */}
      <button 
        onClick={() => router.push('/customer/dashboard')}
        className="flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-50 transition-all cursor-pointer shadow-sm w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Shops</span>
      </button>

      {/* Shop Info Banner Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 shadow-xl overflow-hidden text-white">
        
        {/* Banner image */}
        <div className="relative h-44 w-full bg-slate-900 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {!bannerError ? (
            <img 
              src={shop.bannerImage} 
              alt={shop.name} 
              className="h-full w-full object-cover"
              onError={() => setBannerError(true)}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-emerald-600 to-slate-900 flex items-center justify-center text-white/50 text-[10px] font-bold uppercase tracking-wider">
              <span>RaashanKart Grocery Store</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          <span className={`absolute top-4 left-4 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
            shop.isOpen ? 'bg-emerald-500/90' : 'bg-rose-500/90'
          }`}>
            {shop.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        {/* Profile Info Details */}
        <div className="p-6 flex flex-col md:flex-row gap-6 relative">
          
          {/* Logo overlapping banner slightly */}
          <div className="absolute -top-12 left-6 md:-top-16 border-4 border-slate-950 rounded-3xl overflow-hidden shadow-md bg-white flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {!logoError ? (
              <img 
                src={shop.logoImage} 
                alt={shop.name} 
                className="h-20 w-20 md:h-24 md:w-24 object-cover"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="h-20 w-20 md:h-24 md:w-24 bg-emerald-500 text-white flex items-center justify-center font-bold uppercase text-2xl">
                {shop.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="mt-8 md:mt-0 md:pl-28 flex-1 space-y-4">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                {shop.name}
              </h2>
              <p className="text-xs md:text-sm text-white mt-1">
                {shop.category}
              </p>
            </div>

            {/* Icons row detail */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-white">
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="h-4 w-4 fill-amber-500" />
                <span className="text-white">{shop.rating.toFixed(1)}</span>
                <span className="text-[10px] text-white/70 font-normal">({shop.ratingCount} reviews)</span>
              </div>
              <span className="text-slate-800">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-white" />
                <span>{shop.duration} ({shop.operatingHours})</span>
              </div>
              <span className="text-slate-800">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-white" />
                <span>{shop.distance}</span>
              </div>
            </div>

            <p className="text-xs text-white leading-relaxed max-w-2xl">
              📍 <strong>Address:</strong> {shop.address} <br />
              📞 <strong>Contact:</strong> {shop.contact}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-2 h-fit shrink-0 self-end">
            <button
              onClick={handleStartChat}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 transition-colors shadow-sm"
            >
              <MessageSquare className="h-4 w-4 text-emerald-500" />
              <span>Chat with Shop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Internal Store Search bar */}
      <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-1.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm max-w-md">
        <Search className="h-4.5 w-4.5 text-slate-400 mr-2" />
        <input
          type="text"
          value={shopQuery}
          onChange={(e) => setShopQuery(e.target.value)}
          placeholder={`Search products inside ${shop.name}...`}
          className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm focus:outline-none"
        />
      </div>

      {/* Grid of categories & items */}
      <div className="grid gap-6 md:grid-cols-[180px_1fr] items-start">
        
        {/* Category selector column */}
        <div className="flex overflow-x-auto md:flex-col gap-1.5 pb-2 md:pb-0 no-scrollbar">
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubCategory(sub)}
              className={`rounded-xl px-4 py-2.5 text-xs text-left font-bold transition-colors whitespace-nowrap md:w-full shrink-0 ${
                selectedSubCategory === sub
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-850'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Product listing grid */}
        {filteredShopProducts.length > 0 ? (
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            {filteredShopProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/60 max-w-sm mx-auto space-y-3">
            <span className="text-4xl">🛒</span>
            <h4 className="text-sm font-bold text-slate-950 dark:text-white">No items match your criteria</h4>
            <p className="text-xs text-slate-450 dark:text-slate-500">
              No products found in this category inside this store. Try searching other categories.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
