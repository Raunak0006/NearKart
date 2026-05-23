'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useNearKart } from '@/lib/context';
import { ShoppingBag, Calendar, CheckCircle2, ChevronRight, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function CustomerOrdersPage() {
  const router = useRouter();
  const { orders, addToCart } = useNearKart();

  const handleReorder = (e: React.MouseEvent, orderItems: any[]) => {
    e.preventDefault();
    e.stopPropagation();
    orderItems.forEach(item => addToCart(item.product, item.quantity));
    router.push('/customer/cart');
  };

  const activeOrders = orders.filter(o => ['pending', 'accepted', 'preparing', 'ready_for_pickup', 'out_for_delivery'].includes(o.status));
  const completedOrders = orders.filter(o => ['delivered', 'rejected'].includes(o.status));

  const renderOrderList = (orderList: typeof orders, title: string) => (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{title}</h3>
      {orderList.length > 0 ? (
        <div className="space-y-3.5">
          {orderList.map((order) => {
            const formattedDate = new Date(order.timestamp).toLocaleDateString([], {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div 
                key={order.id}
                onClick={() => router.push(`/customer/tracking/${order.id}`)}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {order.shopName}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' :
                      order.status === 'rejected' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-450' :
                      'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                    }`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-sm font-medium">
                    {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formattedDate}</span>
                    </span>
                    <span>•</span>
                    <span>{order.items.reduce((c, i) => c + i.quantity, 0)} Items</span>
                    <span>•</span>
                    <span>₹{order.totalPrice}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col justify-between sm:justify-center items-end gap-2.5 shrink-0 border-t sm:border-t-0 border-slate-50 pt-2.5 sm:pt-0">
                  {/* Reorder Button */}
                  <button
                    onClick={(e) => handleReorder(e, order.items)}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[10px] font-bold text-slate-650 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 transition-colors shadow-sm"
                  >
                    <RefreshCcw className="h-3 w-3 text-emerald-500" />
                    <span>Reorder</span>
                  </button>

                  <span className="hidden sm:flex items-center gap-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span>Track Order</span>
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium italic pl-1">No orders in this section.</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">My Orders</h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Track active transactions and history</p>
      </div>

      <div className="space-y-8">
        {/* Active Orders */}
        {renderOrderList(activeOrders, 'Active Orders')}

        {/* Previous Orders */}
        {renderOrderList(completedOrders, 'Previous Purchases')}
      </div>

    </div>
  );
}
