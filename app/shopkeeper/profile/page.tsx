'use client';

import React, { useState } from 'react';
import { useRaashanKart } from '@/lib/context';
import { Store, Save, Clock, MapPin, Phone, ShieldCheck, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ShopkeeperProfilePage() {
  const router = useRouter();
  const { shops, toggleShopStatus } = useRaashanKart();

  const shopId = 'shop_3'; // Royal Bakery
  const shop = shops.find(s => s.id === shopId);
  const isOpen = shop ? shop.isOpen : true;

  const [shopName, setShopName] = useState(shop ? shop.name : 'Royal Bakery');
  const [minOrder, setMinOrder] = useState<number>(shop ? shop.minOrder : 50);
  const [deliveryFee, setDeliveryFee] = useState<number>(shop ? shop.deliveryFee : 10);
  const [contact, setContact] = useState(shop ? shop.contact : '+1 234 567 8903');
  const [hours, setHours] = useState(shop ? shop.operatingHours : '06:30 AM - 09:30 PM');
  const [address, setAddress] = useState(shop ? shop.address : '7 Sweet Corner, Market Lane');

  const [loading, setLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Store details successfully updated!");
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
          <Store className="h-5 w-5 text-emerald-500" />
          <span>Store Settings</span>
        </h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Configure operating profiles and logistics rules</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_260px] items-start">
        
        {/* Left Column: Form */}
        <div className="space-y-6">
          
          {/* Main Info form */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5">Business Information</h3>

            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Shop Name</label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Contact Hotline</label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Operating Hours</label>
                  <input
                    type="text"
                    required
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Physical Store Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Minimum Order Amount (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={minOrder || ''}
                    onChange={(e) => setMinOrder(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Local Delivery Fee (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={deliveryFee || ''}
                    onChange={(e) => setDeliveryFee(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 transition-colors disabled:opacity-50"
              >
                <Save className="h-4.5 w-4.5" />
                <span>{loading ? 'Saving...' : 'Save Settings'}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Toggle & Info */}
        <div className="space-y-4">
          
          {/* Store open status switcher card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Logistics Settings</h3>
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">Store Status</span>
              <button
                onClick={() => toggleShopStatus(shopId)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase ${
                  isOpen 
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40' 
                    : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40'
                }`}
              >
                {isOpen ? 'Open (Online)' : 'Closed (Offline)'}
              </button>
            </div>
            <p className="text-[10px] text-slate-450 leading-relaxed font-medium">When toggled off, customers will see your shop banner as closed and won&apos;t be able to checkout items.</p>
          </div>

          {/* Quick info card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-505 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Partner Verified</span>
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">Your business documents are reviewed and approved. Business license verification code: NK-Royal-392</p>
          </div>

        </div>

      </div>

    </div>
  );
}
