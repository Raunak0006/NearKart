'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNearKart } from '@/lib/context';
import { ShoppingCart, Plus, Minus, Trash2, MapPin, Truck, Store, ArrowRight, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateCartQuantity, removeFromCart, cartTotal, placeOrder } = useNearKart();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('Flat 402, LDA Colony , Lucknow');
  const [isPlacing, setIsPlacing] = useState(false);

  const deliveryFee = deliveryType === 'delivery' ? 15 : 0;
  const grandTotal = cartTotal + deliveryFee;

  const handleCheckout = () => {
    setIsPlacing(true);
    // Simulate order placement
    setTimeout(() => {
      const order = placeOrder(deliveryType, address);
      setIsPlacing(false);
      if (order) {
        router.push(`/customer/tracking/${order.id}`);
      }
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center space-y-5">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900/60 mx-auto text-4xl shadow-sm">
          🛒
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Your Cart is Empty</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
            Looks like you haven&apos;t added any groceries to your cart yet. Head back to the dashboard to discover fresh stores around you!
          </p>
        </div>
        <Link 
          href="/customer/dashboard"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-500 px-6 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-600 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const shopName = cart[0].product.name ? 'Fresh & Easy Supermarket' : 'Local Store'; // Mock shopName lookup

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">Shopping Cart</h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Review items and choose delivery method</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px] items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
            
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <ShoppingCart className="h-4.5 w-4.5 text-emerald-500" />
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-350">Items from Royal Bakery & Dairy</span>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 justify-between items-center text-sm border-b border-slate-50 dark:border-slate-850/50 pb-3 last:border-0 last:pb-0">
                  <div className="flex gap-3 items-center min-w-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-12 w-12 object-contain rounded-lg bg-slate-50 dark:bg-slate-950/40 p-1"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-950 dark:text-white truncate">{item.product.name}</h4>
                      <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">{item.product.unit} • ₹{item.product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-xl bg-slate-100 p-0.5 dark:bg-slate-950 ring-1 ring-slate-200/50 dark:ring-slate-850">
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="rounded-lg p-1.5 hover:bg-slate-200 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-400 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-slate-900 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="rounded-lg p-1.5 hover:bg-slate-200 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-400 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Trash Delete */}
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Delivery Details Selection */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">Delivery Preference</h3>
            
            {/* Delivery type selectors */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeliveryType('delivery')}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3.5 transition-all text-xs font-bold ${
                  deliveryType === 'delivery'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                    : 'border-slate-200 text-slate-650 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900'
                }`}
              >
                <Truck className="h-5 w-5" />
                <span>Home Delivery</span>
              </button>
              <button
                onClick={() => setDeliveryType('pickup')}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3.5 transition-all text-xs font-bold ${
                  deliveryType === 'pickup'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
                    : 'border-slate-200 text-slate-650 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900'
                }`}
              >
                <Store className="h-5 w-5" />
                <span>Self Pickup</span>
              </button>
            </div>

            {/* Address Form (only for delivery) */}
            {deliveryType === 'delivery' && (
              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-emerald-500" />
                  <span>Deliver To Address</span>
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-transparent p-3 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 min-h-[60px]"
                />
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Checkout Billing summary */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 space-y-4">
          <h3 className="text-sm font-bold text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5">Billing Summary</h3>

          {/* Pricing breakdown */}
          <div className="text-xs space-y-2.5 font-semibold text-slate-600 dark:text-slate-450">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span className="text-slate-950 dark:text-white">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Handling Fee:</span>
              <span className="text-slate-950 dark:text-white">₹2</span>
            </div>
            {deliveryType === 'delivery' && (
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="text-slate-950 dark:text-white">₹{deliveryFee}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2.5 font-bold text-sm text-slate-950 dark:text-white">
              <span>Grand Total:</span>
              <span>₹{grandTotal + 2}</span>
            </div>
          </div>

          {/* Mock payment details */}
          <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5 text-emerald-500" />
              <span>Mock Payment Method</span>
            </h4>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-350">
              💵 Cash on Delivery / UPI Pay
              <p className="text-[9px] font-medium text-slate-450 dark:text-slate-500 mt-1">Payment is processed safely upon arrival.</p>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isPlacing}
            className="w-full flex h-11 items-center justify-center gap-2.5 rounded-xl bg-emerald-500 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isPlacing ? 'Placing Order...' : 'Confirm Order'}</span>
            {!isPlacing && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>

      </div>

    </div>
  );
}
