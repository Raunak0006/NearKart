'use client';

import React, { useState } from 'react';
import { useNearKart } from '@/lib/context';
import OrderCard from '@/components/shopkeeper/OrderCard';
import { ClipboardList, Package, Truck, CheckSquare } from 'lucide-react';

export default function ShopkeeperOrdersPage() {
  const { orders } = useNearKart();
  const [activeQueue, setActiveQueue] = useState<'pending' | 'preparing' | 'dispatched' | 'completed'>('pending');

  const shopId = 'shop_3'; // Royal Bakery

  // Filter orders for this shop
  const shopOrders = orders.filter(o => o.shopId === shopId);

  const getQueuedOrders = () => {
    switch (activeQueue) {
      case 'pending':
        return shopOrders.filter(o => o.status === 'pending');
      case 'preparing':
        return shopOrders.filter(o => ['accepted', 'preparing'].includes(o.status));
      case 'dispatched':
        return shopOrders.filter(o => ['ready_for_pickup', 'out_for_delivery'].includes(o.status));
      case 'completed':
        return shopOrders.filter(o => ['delivered', 'rejected'].includes(o.status));
    }
  };

  const queuedOrders = getQueuedOrders();

  const queues = [
    { id: 'pending', name: 'Incoming', icon: ClipboardList, count: shopOrders.filter(o => o.status === 'pending').length },
    { id: 'preparing', name: 'Packing', icon: Package, count: shopOrders.filter(o => ['accepted', 'preparing'].includes(o.status)).length },
    { id: 'dispatched', name: 'Dispatched', icon: Truck, count: shopOrders.filter(o => ['ready_for_pickup', 'out_for_delivery'].includes(o.status)).length },
    { id: 'completed', name: 'Completed', icon: CheckSquare, count: shopOrders.filter(o => ['delivered', 'rejected'].includes(o.status)).length }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">Order Board</h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Manage customer orders and dispatch pipelines</p>
      </div>

      {/* Tab selectors */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar border-b border-slate-100 dark:border-slate-800">
        {queues.map((q) => {
          const Icon = q.icon;
          const isActive = activeQueue === q.id;

          return (
            <button
              key={q.id}
              onClick={() => setActiveQueue(q.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 border border-transparent ${
                isActive
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-850'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{q.name}</span>
              {q.count > 0 && (
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive 
                    ? 'bg-white text-emerald-600' 
                    : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                }`}>
                  {q.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* List content grid */}
      {queuedOrders.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {queuedOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center max-w-sm mx-auto space-y-3.5">
          <span className="text-3xl">📥</span>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Queue Empty</h4>
          <p className="text-xs text-slate-450 leading-normal">
            No orders are currently in the &quot;{queues.find(q => q.id === activeQueue)?.name}&quot; queue.
          </p>
        </div>
      )}

    </div>
  );
}
