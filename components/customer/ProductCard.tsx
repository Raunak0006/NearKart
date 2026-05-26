'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { useRaashanKart } from '@/lib/context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateCartQuantity } = useRaashanKart();
  const [imageError, setImageError] = useState(false);

  // Find if product is already in cart
  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    updateCartQuantity(product.id, quantity + 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    updateCartQuantity(product.id, quantity - 1);
  };

  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-sm hover:shadow-md transition-all duration-200 min-h-[275px] h-auto overflow-hidden text-white pb-4">
      
      {/* Discount Tag */}
      {discountPercent > 0 && (
        <span className="absolute top-2.5 left-2.5 z-10 rounded-lg bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider shadow-sm">
          {discountPercent}% OFF
        </span>
      )}

      {/* Product Image & Unit */}
      <div className="relative flex-1 flex flex-col justify-center items-center pt-2">
        <div className="h-28 w-28 overflow-hidden rounded-xl bg-white/10 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {!imageError ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="text-3xl select-none">
              🛒
            </div>
          )}
        </div>
        <span className="mt-3.5 self-start text-[10px] font-bold text-white uppercase tracking-wider">
          {product.unit}
        </span>
      </div>

      {/* Product Info */}
      <div className="mt-1.5 flex flex-col justify-end">
        <h4 className="text-xs font-bold text-white line-clamp-2 min-h-[32px] leading-tight">
          {product.name}
        </h4>
        
        {/* Pricing and Cart Actions */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-white">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-white/60 line-through font-medium">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Cart Quantity Selector */}
          {quantity > 0 ? (
            <div className="flex items-center rounded-xl bg-white p-0.5 text-emerald-800 shadow-sm ring-1 ring-white/10">
              <button 
                onClick={handleDecrease}
                className="rounded-lg p-1.5 hover:bg-slate-100 transition-colors"
                title="Decrease"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-6 text-center text-xs font-bold">{quantity}</span>
              <button 
                onClick={handleIncrease}
                className="rounded-lg p-1.5 hover:bg-slate-100 transition-colors"
                title="Increase"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-white hover:text-emerald-800 transition-all duration-200 ${
                product.stock === 0 ? 'opacity-50 cursor-not-allowed border-white/10 text-white/50 bg-white/5' : ''
              }`}
            >
              <span>{product.stock === 0 ? 'OUT' : 'ADD'}</span>
              {product.stock > 0 && <Plus className="h-3.5 w-3.5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
