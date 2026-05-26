'use client';

import React from 'react';
import { useRaashanKart } from '@/lib/context';
import { ShoppingCart, IndianRupee, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';
import OrderCard from '@/components/shopkeeper/OrderCard';
import Link from 'next/link';

export default function ShopkeeperDashboard() {
  const { orders, products, shops, toggleShopStatus } = useRaashanKart();

  const shopId = 'shop_3'; // Operating as Royal Bakery
  const shop = shops.find(s => s.id === shopId);
  const isOpen = shop ? shop.isOpen : true;

  // Filter orders for this shop
  const shopOrders = orders.filter(o => o.shopId === shopId);
  const pendingOrders = shopOrders.filter(o => o.status === 'pending');
  const activeOrders = shopOrders.filter(o => ['accepted', 'preparing', 'ready_for_pickup', 'out_for_delivery'].includes(o.status));
  const completedOrders = shopOrders.filter(o => o.status === 'delivered');

  // Analytics math
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalOrdersCount = shopOrders.length;

  const topProducts = products.filter(p => p.shopId === shopId).slice(0, 3);

  return (
    <div className="space-y-6">
      
      {/* Dashboard Welcome Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">Store Analytics</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Real-time update of your shop metrics</p>
        </div>

        {/* Quick status switch on mobile */}
        <div className="md:hidden flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 p-2.5 rounded-2xl">
          <span className="text-xs font-bold">Store Status</span>
          <button
            onClick={() => toggleShopStatus(shopId)}
            className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase ${
              isOpen 
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40' 
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40'
            }`}
          >
            {isOpen ? 'Open' : 'Closed'}
          </button>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Revenue Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Completed Revenue</p>
            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white">₹{totalRevenue}</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+12.5% this week</span>
            </div>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/40">
            <IndianRupee className="h-6 w-6 text-emerald-600 dark:text-emerald-450" />
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Requests</p>
            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white">{totalOrdersCount} Orders</h3>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+4.2% since yesterday</span>
            </div>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/40">
            <ShoppingCart className="h-6 w-6 text-emerald-600 dark:text-emerald-450" />
          </div>
        </div>

        {/* Pending Orders Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Pending Actions</p>
            <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white">{pendingOrders.length} Pending</h3>
            <div className="text-[10px] text-slate-400 font-semibold">Requires accept/reject input</div>
          </div>
          <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/40">
            <Clock className="h-6 w-6 text-amber-600 dark:text-amber-450" />
          </div>
        </div>

      </div>

      {/* Analytics Chart Block */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white">Sales Performance (Weekly)</h3>
        
        {/* Styled SVG Chart */}
        <div className="h-44 w-full bg-slate-50 rounded-2xl dark:bg-slate-950/50 flex items-end p-4 relative overflow-hidden">
          <svg className="absolute inset-0 h-full w-full stroke-slate-200/40 dark:stroke-slate-850" fill="none">
            <line x1="0" y1="25%" x2="100%" y2="25%" strokeWidth="0.5" />
            <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="0.5" />
            <line x1="0" y1="75%" x2="100%" y2="75%" strokeWidth="0.5" />
          </svg>

          {/* Simple visual bar columns representing sales */}
          <div className="flex justify-around items-end w-full h-[85%] z-10 font-bold text-[10px] text-slate-450">
            <div className="flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-8 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-lg h-[40%] hover:bg-emerald-500 transition-colors" />
              <span>Mon</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-8 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-lg h-[65%] hover:bg-emerald-500 transition-colors" />
              <span>Tue</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-8 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-lg h-[50%] hover:bg-emerald-500 transition-colors" />
              <span>Wed</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-8 bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-lg h-[80%] hover:bg-emerald-500 transition-colors" />
              <span>Thu</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-8 bg-emerald-500 rounded-t-lg h-[95%] shadow-md shadow-emerald-500/10" />
              <span className="text-emerald-500">Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom two columns: Incoming Orders Feed & Top-selling Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Incoming Orders Feed */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">Recent Orders</h3>
            <Link href="/shopkeeper/orders" className="text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400">View All</Link>
          </div>

          <div className="space-y-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.slice(0, 2).map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : activeOrders.length > 0 ? (
              activeOrders.slice(0, 1).map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-150 border-dashed p-10 text-center dark:border-slate-805">
                <p className="text-xs text-slate-400 italic">No active orders right now.</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">My Popular Items</h3>
            <Link href="/shopkeeper/inventory" className="text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400">Inventory</Link>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4.5">
            {topProducts.map((prod) => (
              <div key={prod.id} className="flex justify-between items-center gap-3 text-xs sm:text-sm border-b border-slate-50 dark:border-slate-850 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="h-10 w-10 object-contain rounded"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{prod.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{prod.unit} • ₹{prod.price}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-emerald-500">₹{prod.price * 5}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">5 Sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
