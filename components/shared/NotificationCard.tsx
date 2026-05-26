'use client';

import React from 'react';
import { ShoppingBag, MessageSquare, Tag, AlertCircle, Clock } from 'lucide-react';
import { Notification } from '@/types';
import { useRaashanKart } from '@/lib/context';

interface NotificationCardProps {
  notification: Notification;
}

export default function NotificationCard({ notification }: NotificationCardProps) {
  const { markNotificationAsRead } = useRaashanKart();

  const handleReadClick = () => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'order':
        return <ShoppingBag className="h-5 w-5 text-emerald-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'promo':
        return <Tag className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
    }
  };

  const formattedTime = new Date(notification.timestamp).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div 
      onClick={handleReadClick}
      className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
        notification.read
          ? 'bg-white border-slate-100 text-slate-800 dark:bg-slate-900/40 dark:border-slate-800/80 dark:text-slate-300'
          : 'bg-emerald-50/40 border-emerald-100 text-slate-900 shadow-sm dark:bg-emerald-950/10 dark:border-emerald-950/20 dark:text-slate-100'
      }`}
    >
      {/* Icon Indicator */}
      <div className={`rounded-xl p-2.5 shrink-0 ${
        notification.read 
          ? 'bg-slate-50 dark:bg-slate-950/50' 
          : 'bg-emerald-100/50 dark:bg-emerald-950/40'
      }`}>
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className={`text-xs sm:text-sm truncate leading-tight ${notification.read ? 'font-semibold' : 'font-bold'}`}>
            {notification.title}
          </h4>
          {!notification.read && (
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1" />
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 leading-normal">
          {notification.description}
        </p>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
          <Clock className="h-3 w-3" />
          <span>{formattedTime}</span>
        </div>
      </div>

    </div>
  );
}
