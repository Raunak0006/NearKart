'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import BottomNavigation from '@/components/common/BottomNavigation';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-10">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
}
