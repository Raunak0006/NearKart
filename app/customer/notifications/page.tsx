'use client';

import React from 'react';
import { useNearKart } from '@/lib/context';
import NotificationCard from '@/components/shared/NotificationCard';
import { BellRing, Check } from 'lucide-react';

export default function CustomerNotificationsPage() {
  const { notifications, markNotificationAsRead } = useNearKart();

  const handleMarkAllRead = () => {
    notifications.forEach(n => {
      if (!n.read) markNotificationAsRead(n.id);
    });
  };

  const hasUnread = notifications.some(n => !n.read);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
            <BellRing className="h-5 w-5 text-emerald-500" />
            <span>Notifications</span>
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">Stay updated on order status and store announcements</p>
        </div>
        
        {hasUnread && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
          >
            <Check className="h-4 w-4" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map(notif => (
            <NotificationCard key={notif.id} notification={notif} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/60 max-w-sm mx-auto space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-950 mx-auto text-3xl">
            🔔
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">All caught up!</h3>
            <p className="text-xs text-slate-450 dark:text-slate-400 leading-normal">
              You don&apos;t have any notifications at the moment. We will alert you when orders get updated.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
