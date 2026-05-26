'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRaashanKart } from '@/lib/context';
import { ArrowLeft, Save, Plus, Package } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const { addProduct } = useRaashanKart();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Milk & Dairy');
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(10);
  const [unit, setUnit] = useState('500 ml');
  const [description, setDescription] = useState('');
  const [imageIndex, setImageIndex] = useState(0);

  // Prefilled mock Unsplash CDN images corresponding to typical grocery items
  const mockImages = [
    { label: 'Milk & Dairy', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop&q=60' },
    { label: 'Bread & Butter', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=60' },
    { label: 'Fresh Apple', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=60' },
    { label: 'Tomatoes', url: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=60' },
    { label: 'Snacks & Soda', url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=60' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price <= 0 || stock < 0 || !unit) return;

    // Call context to append product
    addProduct({
      shopId: 'shop_3', // Royal Bakery
      name,
      category,
      price,
      originalPrice: originalPrice > 0 ? originalPrice : undefined,
      stock,
      unit,
      image: mockImages[imageIndex].url,
      description
    });

    router.push('/shopkeeper/inventory');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Header back button */}
      <button 
        onClick={() => router.push('/shopkeeper/inventory')}
        className="flex items-center gap-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-50 transition-all cursor-pointer shadow-sm w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Inventory</span>
      </button>

      {/* Form Container Card */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/10 rounded-full blur-2xl" />

        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 relative z-10">
          <Package className="h-5.5 w-5.5 text-emerald-500" />
          <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">Add New Product</h2>
        </div>

        <form onSubmit={handleSave} className="space-y-4.5 relative z-10">
          
          {/* Name input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Organic Salted Butter"
              className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            
            {/* Category selection */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none"
              >
                <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                <option value="Milk & Dairy">Milk & Dairy</option>
                <option value="Bakery & Bread">Bakery & Bread</option>
                <option value="Atta, Rice & Dal">Atta, Rice & Dal</option>
                <option value="Chips & Snacks">Chips & Snacks</option>
                <option value="Cold Drinks & Juices">Cold Drinks & Juices</option>
              </select>
            </div>

            {/* Unit size input */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Unit Size</label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g. 500 g, 1 Dozen, 1 Litre"
                className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            
            {/* Price */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Sale Price (₹)</label>
              <input
                type="number"
                required
                min="1"
                value={price || ''}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                placeholder="₹ Price"
                className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            {/* Original Price */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Original Price (₹ - Optional)</label>
              <input
                type="number"
                min="0"
                value={originalPrice || ''}
                onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
                placeholder="Original Price"
                className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none"
              />
            </div>

            {/* Stock quantity */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Initial Stock</label>
              <input
                type="number"
                required
                min="0"
                value={stock || ''}
                onChange={(e) => setStock(parseInt(e.target.value))}
                placeholder="Stock Count"
                className="w-full rounded-xl border border-slate-200 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none"
              />
            </div>

          </div>

          {/* Prefilled Mock Image Selector */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Choose Product Photo Placeholder</label>
            <div className="flex gap-3 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
              {mockImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageIndex(idx)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border shrink-0 bg-slate-50/50 dark:bg-slate-950/20 transition-all ${
                    imageIndex === idx
                      ? 'border-emerald-500 ring-2 ring-emerald-500/10'
                      : 'border-slate-200 hover:border-slate-350 dark:border-slate-800'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.label} className="h-10 w-10 object-contain rounded" />
                  <span className="text-[9px] font-bold text-slate-500">{img.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a brief summary of storage details, fresh levels or nutrition..."
              className="w-full rounded-xl border border-slate-200 bg-transparent p-3.5 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none min-h-[80px]"
            />
          </div>

          {/* Action Row */}
          <button
            type="submit"
            className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 transition-colors"
          >
            <Save className="h-4.5 w-4.5" />
            <span>Save Product to Inventory</span>
          </button>
        </form>

      </div>

    </div>
  );
}
