'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useNearKart } from '@/lib/context';
import { Send, Image, MessageSquare, Plus, RefreshCw, Smile } from 'lucide-react';
import ChatBubble from '@/components/shared/ChatBubble';

export default function CustomerChatPage() {
  const { messages, sendMessage, shops, currentUser } = useNearKart();

  // Find shops that we have chat logs with. We have mock messages with shop_2 (Organic Green Grocers) and shop_3 (Royal Bakery)
  // Let's filter shops to active threads.
  const activeThreadShops = shops.filter(s => s.id === 'shop_2' || s.id === 'shop_3');
  const [activeShopId, setActiveShopId] = useState<string>('shop_2');

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get active shop metadata
  const activeShop = shops.find(s => s.id === activeShopId);

  // Filter messages for this conversation thread
  const threadMessages = messages.filter(msg => 
    (msg.senderId === currentUser.id && msg.senderRole === 'customer') || 
    (msg.senderId === activeShopId && msg.senderRole === 'shopkeeper')
  );

  // Auto-scroll to bottom of chat
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threadMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    sendMessage(activeShopId, inputVal);
    setInputVal('');
    
    // Simulate shopkeeper typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  const handleQuickChip = (text: string) => {
    sendMessage(activeShopId, text);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  };

  const quickQueryChips = [
    "Are apples fresh today?",
    "When will my order arrive?",
    "Do you have organic milk?",
    "Can you replace the item?"
  ];

  return (
    <div className="rounded-3xl border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900/60 overflow-hidden h-[calc(100vh-180px)] min-h-[500px] flex">
      
      {/* Sidebar - list of store chats */}
      <div className="w-72 border-r border-slate-150 dark:border-slate-800 flex flex-col hidden sm:flex shrink-0">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-extrabold text-slate-950 dark:text-white">Active Chats</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Direct link with local stores</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {activeThreadShops.map((shop) => {
            const isActive = shop.id === activeShopId;
            const lastMsg = messages.filter(m => m.senderId === shop.id || m.senderId === currentUser.id).slice(-1)[0];

            return (
              <button
                key={shop.id}
                onClick={() => setActiveShopId(shop.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-colors ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-450' 
                    : 'hover:bg-slate-50 text-slate-700 dark:text-slate-350 dark:hover:bg-slate-850'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={shop.logoImage} 
                  alt={shop.name} 
                  className="h-10 w-10 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold truncate">{shop.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {lastMsg ? lastMsg.content : 'No messages yet'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/20">
        
        {/* Chat window Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-150 dark:border-slate-800 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {activeShop && (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={activeShop.logoImage} 
                alt={activeShop.name} 
                className="h-10 w-10 rounded-xl object-cover"
              />
            )}
            <div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">
                {activeShop ? activeShop.name : 'Store Owner'}
              </h3>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                {activeShop?.isOpen ? 'Online' : 'Offline'}
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
                isMe={msg.senderId === currentUser.id && msg.senderRole === 'customer'} 
              />
            ))
          ) : (
            <div className="text-center m-auto space-y-3 max-w-xs">
              <MessageSquare className="h-12 w-12 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-500">No Chat History</h4>
              <p className="text-xs text-slate-400">Say hi to get the conversation started with the store owner.</p>
            </div>
          )}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-1 bg-white border border-slate-100 text-slate-400 rounded-2xl px-4 py-2.5 shadow-sm text-xs w-fit rounded-tl-none dark:bg-slate-900 dark:border-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          )}

          <div ref={scrollRef} />
        </div>

        {/* Quick chip queries */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth shrink-0">
          {quickQueryChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickChip(chip)}
              className="rounded-full border border-slate-205 dark:border-slate-800 px-3.5 py-1 text-[11px] font-semibold text-slate-650 dark:text-slate-350 hover:border-emerald-500 hover:text-emerald-500 whitespace-nowrap transition-colors bg-slate-50/50 dark:bg-slate-950/20 shrink-0"
            >
              {chip}
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
            placeholder="Type your message to the store..."
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
