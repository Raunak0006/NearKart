'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNearKart } from '@/lib/context';
import { User, MapPin, CreditCard, ChevronRight, LogOut, Check, Edit2 } from 'lucide-react';
import Link from 'next/link';

export default function CustomerProfilePage() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useNearKart();

  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [isEditing, setIsEditing] = useState(false);

  const [addresses, setAddresses] = useState([
    { id: '1', label: 'Home', detail: 'Flat 402, Sunshine Heights, Sector 15, Vashi, Navi Mumbai' },
    { id: '2', label: 'Office', detail: 'Reliable Tech Park, Tower A, Sector 19, Airoli, Navi Mumbai' }
  ]);

  const [newAddrLabel, setNewAddrLabel] = useState('');
  const [newAddrDetail, setNewAddrDetail] = useState('');
  const [showAddAddr, setShowAddAddr] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      ...currentUser,
      name,
      phone
    });
    setIsEditing(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLabel || !newAddrDetail) return;
    setAddresses([
      ...addresses,
      { id: Date.now().toString(), label: newAddrLabel, detail: newAddrDetail }
    ]);
    setNewAddrLabel('');
    setNewAddrDetail('');
    setShowAddAddr(false);
  };

  const handleRemoveAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
          <User className="h-5 w-5 text-emerald-500" />
          <span>My Profile</span>
        </h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Manage personal settings and delivery options</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_260px] items-start">
        
        {/* Left Column: Account forms & address */}
        <div className="space-y-6">
          
          {/* Account Details Form */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Account Details</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 flex items-center gap-1"
              >
                {isEditing ? <Check className="h-4 w-4" /> : <Edit2 className="h-3.5 w-3.5" />}
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Phone Number</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address (Read-only)</label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full rounded-xl border border-slate-250 bg-slate-50/50 px-3.5 py-2 text-xs sm:text-sm text-slate-450 dark:border-slate-800/80 dark:bg-slate-950/20 dark:text-slate-500 cursor-not-allowed"
                />
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-600 transition-colors"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>

          {/* Saved Addresses list */}
          <div className="rounded-2xl border border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Delivery Addresses</h3>
              <button
                onClick={() => setShowAddAddr(!showAddAddr)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
              >
                + Add New
              </button>
            </div>

            {/* Add Address Form */}
            {showAddAddr && (
              <form onSubmit={handleAddAddress} className="rounded-xl border border-slate-150 p-4 dark:border-slate-850 space-y-3">
                <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
                  <input
                    type="text"
                    required
                    value={newAddrLabel}
                    onChange={(e) => setNewAddrLabel(e.target.value)}
                    placeholder="Label (e.g. Work)"
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1.5 text-xs text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={newAddrDetail}
                    onChange={(e) => setNewAddrDetail(e.target.value)}
                    placeholder="Full street address, flat no, landmark..."
                    className="w-full rounded-xl border border-slate-200 bg-transparent px-3 py-1.5 text-xs text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 px-3.5 py-1.5 text-[10px] font-bold text-white shadow-sm hover:bg-emerald-600 transition-colors"
                  >
                    Add Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddAddr(false)}
                    className="rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-850 dark:bg-slate-950 dark:text-slate-350 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {addresses.map(addr => (
                <div 
                  key={addr.id} 
                  className="flex gap-3 justify-between items-start text-xs border border-slate-100 p-3.5 rounded-xl dark:border-slate-800 dark:bg-slate-950/20"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <MapPin className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-950 dark:text-white">{addr.label}</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-1 leading-normal font-medium">{addr.detail}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveAddress(addr.id)}
                    className="text-[10px] font-bold text-rose-500 hover:underline shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Profile quick links & signout */}
        <div className="space-y-4">
          
          {/* Quick links block */}
          <div className="rounded-2xl border border-slate-100 bg-white p-2 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-1">
            <Link
              href="/customer/orders"
              className="flex items-center justify-between p-3.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-850 transition-colors"
            >
              <span>Order History</span>
              <ChevronRight className="h-4 w-4 text-slate-450" />
            </Link>
            <Link
              href="/customer/favorites"
              className="flex items-center justify-between p-3.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-850 transition-colors"
            >
              <span>Saved Stores & Items</span>
              <ChevronRight className="h-4 w-4 text-slate-450" />
            </Link>
            <Link
              href="/customer/notifications"
              className="flex items-center justify-between p-3.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-850 transition-colors"
            >
              <span>Alert Preferences</span>
              <ChevronRight className="h-4 w-4 text-slate-450" />
            </Link>
          </div>

          {/* Logout card button */}
          <Link
            href="/"
            className="w-full flex h-11 items-center justify-center gap-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-xs sm:text-sm font-bold text-rose-600 dark:bg-rose-950/20 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </Link>

        </div>

      </div>

    </div>
  );
}
