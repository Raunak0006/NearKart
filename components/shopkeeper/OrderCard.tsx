'use client';

import React from 'react';
import { Calendar, MapPin, Check, X, Truck, PackageCheck, User } from 'lucide-react';
import { Order } from '@/types';
import { useNearKart } from '@/lib/context';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const { updateOrderStatus } = useNearKart();

  const handleStatusChange = (status: Order['status']) => {
    updateOrderStatus(order.id, status);
  };

  const formattedDate = new Date(order.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 transition-colors duration-200">
      
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-slate-950 dark:text-white">
              {order.id}
            </span>
            <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              order.type === 'delivery'
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
            }`}>
              {order.type}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            <span>Today, {formattedDate}</span>
          </div>
        </div>

        {/* Current status display */}
        <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
          order.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' :
          order.status === 'accepted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' :
          order.status === 'preparing' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' :
          order.status === 'ready_for_pickup' ? 'bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400' :
          order.status === 'out_for_delivery' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400' :
          order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' :
          'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-450'
        }`}>
          {order.status.replace(/_/g, ' ')}
        </span>
      </div>

      {/* Order Items List */}
      <div className="py-3 border-b border-slate-100 dark:border-slate-800 space-y-2">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-500 dark:text-emerald-400">{item.quantity}x</span>
              <span className="font-medium text-slate-700 dark:text-slate-350">{item.product.name}</span>
              <span className="text-[10px] text-slate-400">({item.product.unit})</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">₹{item.product.price * item.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between items-center pt-2 font-bold text-sm text-slate-950 dark:text-white">
          <span>Total Earnings:</span>
          <span>₹{order.totalPrice}</span>
        </div>
      </div>

      {/* Customer / Delivery Info */}
      <div className="py-3 text-xs space-y-1.5">
        <div className="flex items-center gap-1.5 text-slate-650 dark:text-slate-300">
          <User className="h-3.5 w-3.5 text-slate-400" />
          <span>Customer: <strong>Jane Doe</strong></span>
        </div>
        {order.type === 'delivery' && (
          <div className="flex items-start gap-1.5 text-slate-650 dark:text-slate-300 leading-normal">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="break-words">{order.address}</span>
          </div>
        )}
      </div>

      {/* Action Buttons based on status */}
      <div className="pt-2 flex gap-2">
        {order.status === 'pending' && (
          <>
            <button
              onClick={() => handleStatusChange('rejected')}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50/50 py-2.5 text-xs font-bold text-rose-600 dark:border-rose-950/40 dark:bg-rose-950/20 dark:text-rose-400 hover:bg-rose-550 hover:text-white transition-all duration-150"
            >
              <X className="h-4 w-4" />
              <span>Reject</span>
            </button>
            <button
              onClick={() => handleStatusChange('accepted')}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-600 hover:shadow-none transition-all duration-150"
            >
              <Check className="h-4 w-4" />
              <span>Accept Order</span>
            </button>
          </>
        )}

        {order.status === 'accepted' && (
          <button
            onClick={() => handleStatusChange('preparing')}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors"
          >
            <PackageCheck className="h-4 w-4" />
            <span>Start Packing</span>
          </button>
        )}

        {order.status === 'preparing' && (
          <button
            onClick={() => handleStatusChange(order.type === 'delivery' ? 'out_for_delivery' : 'ready_for_pickup')}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors"
          >
            <Truck className="h-4 w-4" />
            <span>{order.type === 'delivery' ? 'Dispatch Delivery' : 'Mark Ready for Pickup'}</span>
          </button>
        )}

        {order.status === 'ready_for_pickup' && (
          <button
            onClick={() => handleStatusChange('delivered')}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors"
          >
            <Check className="h-4 w-4" />
            <span>Complete Pickup</span>
          </button>
        )}

        {order.status === 'out_for_delivery' && (
          <button
            onClick={() => handleStatusChange('delivered')}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors"
          >
            <Check className="h-4 w-4" />
            <span>Mark as Delivered</span>
          </button>
        )}

        {(order.status === 'delivered' || order.status === 'rejected') && (
          <div className="w-full text-center py-2 text-xs font-bold text-slate-400 dark:text-slate-500">
            {order.status === 'delivered' ? '✅ Completed Order' : '❌ Cancelled Order'}
          </div>
        )}
      </div>
    </div>
  );
}
