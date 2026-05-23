'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useNearKart } from '@/lib/context';
import { ArrowLeft, Clock, MapPin, Phone, MessageSquare, ShieldAlert } from 'lucide-react';
import DeliveryProgress from '@/components/shared/DeliveryProgress';

export default function DeliveryTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { orders } = useNearKart();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-bold">Order not found</h3>
        <button onClick={() => router.push('/customer/dashboard')} className="mt-4 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header Back Button */}
      <button 
        onClick={() => router.push('/customer/orders')}
        className="flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-50 transition-all cursor-pointer shadow-sm w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Orders</span>
      </button>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px] items-start">
        
        {/* Left Column: Progress Stepper & Map */}
        <div className="space-y-6">
          
          {/* Tracking header summary */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Active Delivery Track</p>
              <h2 className="text-lg font-extrabold text-slate-950 dark:text-white mt-1">Order {order.id}</h2>
              <p className="text-xs text-slate-550 dark:text-slate-400 mt-0.5">Purchased from <strong>{order.shopName}</strong></p>
            </div>
            
            <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-3 shrink-0">
              <Clock className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-[9px] font-bold uppercase text-slate-405 dark:text-slate-500">Estimated Arrival</p>
                <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{order.estimatedTime || '20-30 mins'}</p>
              </div>
            </div>
          </div>

          {/* Styled SVG Map Placeholder */}
          <div className="relative rounded-3xl h-64 w-full bg-slate-100 dark:bg-slate-900 border border-slate-200/55 dark:border-slate-800/80 overflow-hidden shadow-inner flex items-center justify-center">
            
            {/* Visual Grid Lines resembling maps */}
            <svg className="absolute inset-0 h-full w-full stroke-slate-200/50 dark:stroke-slate-800/50" fill="none">
              <defs>
                <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Stylized delivery route path */}
            <svg viewBox="0 0 400 200" className="w-full max-w-md h-auto z-10">
              {/* Store marker */}
              <circle cx="80" cy="120" r="16" className="fill-emerald-500/20 stroke-emerald-500 stroke-2" />
              <circle cx="80" cy="120" r="6" className="fill-emerald-500" />
              <text x="80" y="152" textAnchor="middle" className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400">Royal Bakery</text>

              {/* Delivery Path */}
              <path 
                d="M 80 120 Q 150 60, 220 130 T 320 80" 
                className="stroke-emerald-500 stroke-2 stroke-dashed fill-none" 
                strokeDasharray="4 4"
              />
              
              {/* Moving Rider node (only if out for delivery) */}
              {order.status === 'out_for_delivery' && (
                <g className="animate-pulse">
                  <circle cx="230" cy="115" r="10" className="fill-emerald-500 text-white" />
                  <circle cx="230" cy="115" r="4" className="fill-white" />
                </g>
              )}

              {/* Home marker */}
              <circle cx="320" cy="80" r="16" className="fill-rose-500/20 stroke-rose-500 stroke-2" />
              <circle cx="320" cy="80" r="6" className="fill-rose-500" />
              <text x="320" y="112" textAnchor="middle" className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400">My House</text>
            </svg>

            {/* Float labels */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm dark:bg-slate-950/80 rounded-lg p-2 border border-slate-100 dark:border-slate-850 text-[10px] font-bold shadow-sm z-10">
              🗺️ Hyperlocal Route Active
            </div>
          </div>

          {/* Stepper tracking updates */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">Delivery Timeline</h3>
            <DeliveryProgress status={order.status} type={order.type} />
          </div>

        </div>

        {/* Right Column: Rider & Shopkeeper Details */}
        <div className="space-y-4">
          
          {/* Rider profile card */}
          {order.type === 'delivery' && (
            <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Your Delivery Executive</h3>
              
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-lg shadow-inner">
                  🚴
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{order.riderName || 'Rider Assigned'}</h4>
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5">Rating: 4.9 ★ • NearKart Fleet</p>
                </div>
              </div>

              {order.riderPhone && (
                <div className="flex gap-2 pt-1.5 border-t border-slate-50 dark:border-slate-850">
                  <a
                    href={`tel:${order.riderPhone}`}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 transition-colors shadow-sm"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Call Rider</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Inquiry summary cards */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Need Help?</h3>
            <p className="text-xs text-slate-550 leading-relaxed dark:text-slate-400">
              Have issues with delivery address, item replacements, or need to cancel? Get in touch with store keeper immediately.
            </p>
            <button
              onClick={() => router.push('/customer/chat')}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-600 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Inquiry via Live Chat</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
