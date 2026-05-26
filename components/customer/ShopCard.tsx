'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { Shop } from '@/types';
import { useRaashanKart } from '@/lib/context';

interface ShopCardProps {
  shop: Shop;
}

export default function ShopCard({ shop }: ShopCardProps) {
  const { favoriteShops, toggleFavoriteShop } = useRaashanKart();
  const isFavorite = favoriteShops.includes(shop.id);
  const [bannerError, setBannerError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleFavToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavoriteShop(shop.id);
  };

  return (
    <Link 
      href={`/customer/shop/${shop.id}`}
      className="group block rounded-2xl border border-slate-800 bg-slate-950 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden text-white"
    >
      {/* Banner & Open status */}
      <div className="relative h-32 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {!bannerError ? (
          <img 
            src={shop.bannerImage} 
            alt={shop.name} 
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setBannerError(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-emerald-600 to-slate-900 flex items-center justify-center text-white/50 text-[10px] font-bold uppercase tracking-wider">
            <span>RaashanKart Grocery Store</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {/* Open/Closed Badge */}
        <span className={`absolute top-3 left-3 rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${
          shop.isOpen 
            ? 'bg-emerald-500/90 backdrop-blur-sm' 
            : 'bg-rose-500/90 backdrop-blur-sm'
        }`}>
          {shop.isOpen ? 'Open' : 'Closed'}
        </span>

        {/* Favorite Button */}
        <button
          onClick={handleFavToggle}
          className="absolute top-3 right-3 rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all shadow-sm"
          title="Save Shop"
        >
          <Heart className={`h-4.5 w-4.5 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Distance tag on banner */}
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[10px] font-semibold text-white">
          <MapPin className="h-3 w-3 text-emerald-400" />
          <span>{shop.distance}</span>
        </span>
      </div>

      {/* Info details */}
      <div className="p-4 flex gap-3">
        {/* Shop Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {!logoError ? (
          <img 
            src={shop.logoImage} 
            alt={shop.name} 
            className="h-11 w-11 rounded-xl object-cover border border-slate-800 shadow-sm shrink-0 bg-white"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="h-11 w-11 rounded-xl border border-slate-800 bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm shrink-0 uppercase text-sm">
            {shop.name.charAt(0)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white truncate transition-colors">
            {shop.name}
          </h3>
          <p className="text-xs text-white truncate mt-0.5">
            {shop.category}
          </p>
          
          <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold text-white">
            {/* Rating */}
            <div className="flex items-center gap-0.5 text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              <span className="text-white">{shop.rating.toFixed(1)}</span>
              <span className="text-[10px] text-white/70 font-normal">({shop.ratingCount})</span>
            </div>
            
            <span className="text-slate-800 font-normal">•</span>

            {/* Time delivery */}
            <div className="flex items-center gap-1 text-white">
              <Clock className="h-3.5 w-3.5 text-white/80" />
              <span>{shop.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom details: delivery availability & min order */}
      <div className="px-4 pb-3.5 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[11px] font-semibold text-white">
        <span>Min. Order: ₹{shop.minOrder}</span>
        <span className={shop.deliveryAvailable ? 'text-white' : 'text-rose-450'}>
          {shop.deliveryAvailable ? 'Delivery Available' : 'Pickup Only'}
        </span>
      </div>
    </Link>
  );
}
