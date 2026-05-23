'use client';

import React from 'react';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';

export default function ShopkeeperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
