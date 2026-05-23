'use client';

import React, { useState } from 'react';
import { useNearKart } from '@/lib/context';
import { Search, Plus, Trash2, Edit2, ShieldAlert, Check } from 'lucide-react';
import Link from 'next/link';

export default function ShopInventoryPage() {
  const { products, deleteProduct, updateProduct } = useNearKart();
  const [searchVal, setSearchVal] = useState('');
  const [editStockId, setEditStockId] = useState<string | null>(null);
  const [tempStock, setTempStock] = useState<number>(0);

  const shopId = 'shop_3'; // Royal Bakery

  // Filter products for this store
  const shopProducts = products.filter(p => p.shopId === shopId);

  // Search filter
  const filteredProducts = shopProducts.filter(p => 
    p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    p.category.toLowerCase().includes(searchVal.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product from your inventory?")) {
      deleteProduct(id);
    }
  };

  const handleEditStockClick = (id: string, currentStock: number) => {
    setEditStockId(id);
    setTempStock(currentStock);
  };

  const handleSaveStock = (product: typeof products[0]) => {
    updateProduct({
      ...product,
      stock: tempStock
    });
    setEditStockId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">Store Inventory</h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Manage products and stock availability</p>
        </div>

        <Link
          href="/shopkeeper/add-product"
          className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-5 text-xs font-bold text-white shadow-md hover:bg-emerald-600 transition-colors"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Search and Alert indicators */}
      <div className="space-y-4">
        
        {/* Search bar input */}
        <div className="flex items-center rounded-2xl border border-slate-202 bg-white px-4 py-1.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm max-w-md">
          <Search className="h-4.5 w-4.5 text-slate-400 mr-2" />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search inventory items..."
            className="flex-1 bg-transparent py-1.5 text-xs sm:text-sm focus:outline-none"
          />
        </div>

        {/* Low Stock Warners */}
        {shopProducts.some(p => p.stock <= 5) && (
          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 dark:border-amber-950/20 dark:bg-amber-950/10 flex gap-2.5 items-start text-xs font-semibold text-amber-700 dark:text-amber-450 max-w-xl">
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0" />
            <div>
              <span>Attention: Some products are running low in stock!</span>
              <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-1 font-medium">Update stock counts below to prevent customer ordering failure.</p>
            </div>
          </div>
        )}
      </div>

      {/* Inventory Table List */}
      <div className="rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:bg-slate-950 dark:border-slate-800">
                <th className="p-4">Item Detail</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-850 text-xs sm:text-sm">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => {
                  const isLow = prod.stock <= 5;
                  const isEditing = editStockId === prod.id;

                  return (
                    <tr key={prod.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-colors">
                      
                      {/* Item Details */}
                      <td className="p-4 flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="h-10 w-10 object-contain rounded bg-slate-50 dark:bg-slate-950/40 p-1"
                        />
                        <div>
                          <h4 className="font-bold text-slate-905 dark:text-white">{prod.name}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">{prod.unit}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 font-semibold text-slate-550 dark:text-slate-400">
                        {prod.category}
                      </td>

                      {/* Price */}
                      <td className="p-4 font-bold text-slate-950 dark:text-white">
                        ₹{prod.price}
                      </td>

                      {/* Stock Level column */}
                      <td className="p-4 font-bold">
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="0"
                              value={tempStock}
                              onChange={(e) => setTempStock(parseInt(e.target.value) || 0)}
                              className="w-16 rounded-xl border border-slate-200 bg-transparent px-2.5 py-1 text-xs text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none"
                            />
                            <button
                              onClick={() => handleSaveStock(prod)}
                              className="rounded-lg bg-emerald-500 p-1.5 text-white hover:bg-emerald-600 transition-colors"
                              title="Save Stock"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className={isLow ? 'text-amber-500' : 'text-slate-900 dark:text-slate-100'}>
                              {prod.stock} Units
                            </span>
                            {isLow && (
                              <span className="rounded bg-amber-50 px-1 py-0.5 text-[8px] uppercase tracking-wider text-amber-600 dark:bg-amber-950/40">
                                Low
                              </span>
                            )}
                            <button
                              onClick={() => handleEditStockClick(prod.id, prod.stock)}
                              className="text-slate-400 hover:text-emerald-500 p-1"
                              title="Edit Stock Count"
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 italic">
                    No items found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
