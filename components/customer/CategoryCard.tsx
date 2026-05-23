'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  name: string;
  icon: string; // Emoji or short SVG path
  color: string; // Tailwind background color class
}

export default function CategoryCard({ name, icon, color }: CategoryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/customer/search?category=${encodeURIComponent(name)}`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center gap-2 group shrink-0"
    >
      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color} shadow-sm group-hover:scale-105 transition-transform duration-200 border border-slate-100 dark:border-slate-800`}>
        <span className="text-3xl select-none" role="img" aria-label={name}>
          {icon}
        </span>
      </div>
      <span className="text-[11px] font-semibold text-white truncate w-16 text-center">
        {name}
      </span>
    </button>
  );
}
