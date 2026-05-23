'use client';

import React from 'react';
import { Message } from '@/types';

interface ChatBubbleProps {
  message: Message;
  isMe: boolean;
}

export default function ChatBubble({ message, isMe }: ChatBubbleProps) {
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1 max-w-[85%] sm:max-w-[70%] ${isMe ? 'self-end' : 'self-start'}`}>
      
      {/* Sender Name */}
      {!isMe && (
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 ml-1.5 uppercase">
          {message.senderName}
        </span>
      )}

      {/* Bubble Content */}
      <div className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
        isMe 
          ? 'bg-emerald-500 text-white rounded-tr-none' 
          : 'bg-white text-slate-900 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 rounded-tl-none'
      }`}>
        
        {/* Product Inquiry Embed Card */}
        {message.productInquiry && (
          <div className="mb-2 rounded-xl bg-slate-50 p-2 text-slate-900 dark:bg-slate-950 flex items-center gap-2 border border-slate-100 dark:border-slate-850">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={message.productInquiry.image} 
              alt={message.productInquiry.name} 
              className="h-10 w-10 object-contain rounded"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-bold truncate">{message.productInquiry.name}</p>
              <p className="text-[10px] font-extrabold text-emerald-500">₹{message.productInquiry.price}</p>
            </div>
          </div>
        )}

        {/* Order Inquiry Embed Card */}
        {message.orderInquiry && (
          <div className="mb-2 rounded-xl bg-slate-50 p-2 text-slate-900 dark:bg-slate-950 flex flex-col gap-1 border border-slate-100 dark:border-slate-850">
            <div className="flex justify-between items-center gap-2">
              <span className="text-[10px] font-bold">Order: {message.orderInquiry.id}</span>
              <span className="rounded bg-emerald-50 px-1 py-0.5 text-[8px] font-extrabold text-emerald-600 dark:bg-emerald-950/40">
                {message.orderInquiry.status.toUpperCase()}
              </span>
            </div>
            <p className="text-[10px] font-extrabold text-slate-650">Total Paid: ₹{message.orderInquiry.totalPrice}</p>
          </div>
        )}

        {/* Text content */}
        <p className="whitespace-pre-line text-xs sm:text-sm font-medium">{message.content}</p>
      </div>

      {/* Timestamp */}
      <span className="text-[9px] font-medium text-slate-450 dark:text-slate-500 px-1">
        {formattedTime}
      </span>

    </div>
  );
}
