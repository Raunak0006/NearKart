'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Mic, X, ArrowRight, History } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  onSearchChange?: (val: string) => void;
  autoFocus?: boolean;
}

export default function SearchBar({ 
  placeholder = "Search for fresh fruits, vegetables, bread, dairy...", 
  initialValue = "",
  onSearchChange,
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const popularSuggestions = [
    "Fresh Tomatoes",
    "Amul Toned Milk",
    "Cavendish Bananas",
    "Paneer",
    "Whole Wheat Bread",
    "Lay's Chips"
  ];

  const recentSearches = [
    "apples",
    "milk packet",
    "organic butter"
  ];

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(query);
    }
  }, [query, onSearchChange]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (searchVal: string) => {
    if (!searchVal.trim()) return;
    setIsFocused(false);
    router.push(`/customer/search?q=${encodeURIComponent(searchVal)}`);
  };

  const startVoiceSearchMock = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setQuery("Amul Milk");
      handleSearchSubmit("Amul Milk");
    }, 2000);
  };

  return (
    <div ref={containerRef} className="relative w-full z-30">
      
      {/* Input Box */}
      <div className={`flex w-full items-center rounded-2xl border bg-white pl-4 pr-2.5 py-1.5 transition-all duration-200 ${
        isFocused 
          ? 'border-emerald-500 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/20' 
          : 'border-slate-200 dark:border-slate-800'
      } dark:bg-slate-900`}>
        <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(query)}
          placeholder={isListening ? "Listening..." : placeholder}
          autoFocus={autoFocus}
          disabled={isListening}
          className="flex-1 bg-transparent px-3 py-1.5 text-sm text-slate-850 dark:text-white placeholder-slate-400 focus:outline-none disabled:text-slate-400"
        />
        
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors mr-1"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button 
          onClick={startVoiceSearchMock}
          className={`rounded-full p-2 transition-colors ${
            isListening 
              ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-450 animate-pulse' 
              : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
          }`}
          title="Voice Search (Demo)"
        >
          <Mic className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Suggestions Dropdown overlay */}
      {isFocused && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
          
          {/* Recent Searches */}
          <div className="mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Recent Searches</h3>
            <div className="space-y-1.5">
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(item);
                    handleSearchSubmit(item);
                  }}
                  className="flex w-full items-center justify-between text-xs text-slate-650 hover:text-emerald-500 dark:text-slate-350 py-1 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <History className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item}</span>
                  </div>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>

          {/* Popular Suggestions */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Popular suggestions</h3>
            <div className="flex flex-wrap gap-2">
              {popularSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(item);
                    handleSearchSubmit(item);
                  }}
                  className="rounded-full border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 text-xs text-slate-700 hover:border-emerald-500 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors bg-slate-50/50 dark:bg-slate-900/50"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
