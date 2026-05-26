'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/common/SearchBar';
import ProductCard from '@/components/customer/ProductCard';
import { useRaashanKart } from '@/lib/context';
import { SlidersHorizontal, MapPin, Star, Sparkles, HelpCircle } from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const { products, shops } = useRaashanKart();
  
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxDistance, setMaxDistance] = useState<number>(3); // Max distance in km
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Sync state if query params change
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setSelectedCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  const categories = ['All', 'Fruits & Veggies', 'Milk & Dairy', 'Bakery & Bread', 'Atta, Rice & Dal', 'Chips & Snacks', 'Beverages'];

  // Filter logic
  const filteredProducts = products.filter(product => {
    // 1. Filter by keyword query
    const matchesQuery = !query || 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase());

    // 2. Filter by category
    const matchesCategory = selectedCategory === 'All' || 
      product.category.toLowerCase().includes(selectedCategory.split(' ')[0].toLowerCase()); // Match e.g. "Fruits" in "Fruits & Veggies"

    // Fetch parent store details
    const shop = shops.find(s => s.id === product.shopId);
    if (!shop) return false;

    // 3. Filter by store distance
    const distNum = parseFloat(shop.distance.replace(/[^\d.]/g, ''));
    const matchesDistance = distNum <= maxDistance;

    // 4. Filter by store rating
    const matchesRating = shop.rating >= minRating;

    return matchesQuery && matchesCategory && matchesDistance && matchesRating;
  });

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">Product Catalog</h2>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Explore fresh items from local sellers</p>
      </div>

      {/* Search Input and Filter Trigger */}
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <SearchBar initialValue={query} onSearchChange={setQuery} />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex h-11 items-center justify-center gap-1.5 rounded-2xl border px-4 text-xs font-bold transition-all ${
            showFilters || maxDistance !== 3 || minRating !== 0
              ? 'bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400'
              : 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="h-4.5 w-4.5" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* Expandable Filter Box */}
      {showFilters && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-lg transition-all text-white">
          <div className="grid gap-6 sm:grid-cols-2">
            
            {/* Distance Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="flex items-center gap-1 text-white">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Max Store Distance</span>
                </span>
                <span className="text-white">{maxDistance} km</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-white/70 font-semibold">
                <span>0.5 km</span>
                <span>5.0 km</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="flex items-center gap-1 text-white">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span>Min. Store Rating</span>
                </span>
                <span className="text-amber-500">{minRating === 0 ? 'Any' : `${minRating}★ & up`}</span>
              </div>
              <div className="flex gap-2">
                {[0, 4.0, 4.5, 4.8].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(stars)}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold border transition-colors ${
                      minRating === stars
                        ? 'border-amber-500 bg-amber-500 text-white'
                        : 'border-white/20 text-white/95 hover:bg-white/10'
                    }`}
                  >
                    {stars === 0 ? 'All' : `${stars}★`}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Category Pills Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4.5 py-2 text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
              selectedCategory === cat
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                : 'bg-white border-slate-200 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Listing Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900/60 mx-auto text-3xl">
            🔍
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">No products found</h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 leading-normal">
              We couldn&apos;t find any products matching your query. Try clearing your filters or testing other terms like &quot;milk&quot; or &quot;tomatoes&quot;.
            </p>
          </div>
          <button
            onClick={() => {
              setQuery('');
              setSelectedCategory('All');
              setMaxDistance(3);
              setMinRating(0);
            }}
            className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}

export default function ProductSearchPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-850" />
          <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-850" />
        </div>
        <div className="h-11 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-850" />
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {Array(4).fill(0).map((_, idx) => (
            <div key={idx} className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-850" />
          ))}
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
