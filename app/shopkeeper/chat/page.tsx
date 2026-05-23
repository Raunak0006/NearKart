'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useNearKart } from '@/lib/context';
import { Send, Image, MessageSquare, Plus, Reply } from 'lucide-react';
import ChatBubble from '@/components/shared/ChatBubble';

export default function ShopkeeperChatPage() {
  const { messages, sendMessage, currentUser } = useNearKart();

  // Active customer threads. In our context, customer is customer_1 (Jane Doe)
  const [activeCustomerId, setActiveCustomerId] = useState<string>('customer_1');

  const [inputVal, setInputVal] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter messages for this conversation thread
  const threadMessages = messages.filter(msg => 
    (msg.senderId === activeCustomerId && msg.senderRole === 'customer') || 
    (msg.senderId === 'shop_3' && msg.senderRole === 'shopkeeper')
  );

  // Auto-scroll to bottom of chat
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threadMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    sendMessage(activeCustomerId, inputVal);
    setInputVal('');
  };

  const handleQuickReply = (text: string) => {
    sendMessage(activeCustomerId, text);
  };

  const quickReplies = [
    "Yes, this is in stock!",
    "Your order is packed and dispatched.",
    "Sorry, we are currently out of this item.",
    "It will take 5 more minutes."
  ];

  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900/60 overflow-hidden h-[calc(100vh-180px)] min-h-[500px] flex">
      
      {/* Sidebar - customer list */}
      <div className="w-72 border-r border-slate-150 dark:border-slate-800 flex flex-col hidden sm:flex shrink-0">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">Customer Queries</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Active customer threads</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <button
            onClick={() => setActiveCustomerId('customer_1')}
            className="w-full flex items-center gap-3 p-3 rounded-2xl text-left bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-450 transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-lg">
              👩
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold truncate">Jane Doe</h4>
              <p className="text-[10px] text-slate-450 dark:text-slate-400 truncate mt-0.5">
                {threadMessages.slice(-1)[0]?.content || 'Active conversation'}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/20">
        
        {/* Chat window Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-150 dark:border-slate-800 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-lg">
              👩
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                Jane Doe (Customer)
              </h3>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                Active Thread
              </p>
            </div>
          </div>
        </div>

        {/* Message bubbles body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col space-y-4">
          {threadMessages.length > 0 ? (
            threadMessages.map(msg => (
              <ChatBubble 
                key={msg.id} 
                message={msg} 
                isMe={msg.senderRole === 'shopkeeper'} 
              />
            ))
          ) : (
            <div className="text-center m-auto space-y-3 max-w-xs">
              <MessageSquare className="h-12 w-12 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-500">No Chat History</h4>
              <p className="text-xs text-slate-400">Conversations with this customer will appear here.</p>
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* Quick replies bar */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth shrink-0">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickReply(reply)}
              className="rounded-full border border-slate-200 dark:border-slate-800 px-3.5 py-1 text-[11px] font-semibold text-slate-655 dark:text-slate-350 hover:border-emerald-500 hover:text-emerald-500 whitespace-nowrap transition-colors bg-slate-50/50 dark:bg-slate-950/20 shrink-0 flex items-center gap-1"
            >
              <Reply className="h-3 w-3 text-emerald-500" />
              <span>{reply}</span>
            </button>
          ))}
        </div>

        {/* TextInput Box */}
        <form onSubmit={handleSend} className="bg-white dark:bg-slate-900 border-t border-slate-150 dark:border-slate-800 px-4 py-3.5 flex gap-2 items-center">
          <button
            type="button"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors shrink-0"
            title="Upload photo (Demo)"
          >
            <Image className="h-5 w-5" />
          </button>
          
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your message to customer..."
            className="flex-1 rounded-xl border border-slate-200 bg-transparent px-4 py-2 text-xs sm:text-sm text-slate-850 dark:border-slate-800 dark:text-white focus:outline-none focus:border-emerald-500"
          />

          <button
            type="submit"
            className="rounded-xl bg-emerald-500 p-2.5 text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-600 transition-colors shrink-0"
            title="Send"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>

      </div>

    </div>
  );
}
