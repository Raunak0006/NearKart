'use client';

import React from 'react';
import { ClipboardList, ThumbsUp, PackageOpen, Truck, CheckCircle2 } from 'lucide-react';
import { OrderStatus } from '@/types';

interface DeliveryProgressProps {
  status: OrderStatus;
  type: 'delivery' | 'pickup';
}

export default function DeliveryProgress({ status, type }: DeliveryProgressProps) {
  
  // Define steps with completion check logic
  const steps = [
    {
      label: 'Order Placed',
      description: 'Your request was successfully submitted to the store.',
      icon: ClipboardList,
      isCompleted: true // Always true once order is created
    },
    {
      label: 'Confirmed',
      description: 'The shopkeeper has accepted your order.',
      icon: ThumbsUp,
      isCompleted: ['accepted', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered'].includes(status)
    },
    {
      label: 'Preparing',
      description: 'Your grocery items are being packed and checked.',
      icon: PackageOpen,
      isCompleted: ['preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered'].includes(status)
    },
    {
      label: type === 'delivery' ? 'Out for Delivery' : 'Ready for Pickup',
      description: type === 'delivery' ? 'Rider is on the way to your location.' : 'You can head to the store to collect items.',
      icon: type === 'delivery' ? Truck : ThumbsUp,
      isCompleted: type === 'delivery' 
        ? ['out_for_delivery', 'delivered'].includes(status)
        : ['ready_for_pickup', 'delivered'].includes(status)
    },
    {
      label: 'Delivered',
      description: 'Enjoy your fresh groceries! Thank you for choosing RaashanKart.',
      icon: CheckCircle2,
      isCompleted: status === 'delivered'
    }
  ];

  const getStepIndex = () => {
    if (status === 'delivered') return 4;
    if (type === 'delivery') {
      if (status === 'out_for_delivery') return 3;
    } else {
      if (status === 'ready_for_pickup') return 3;
    }
    if (status === 'preparing') return 2;
    if (status === 'accepted') return 1;
    return 0; // pending
  };

  const currentStepIndex = getStepIndex();

  return (
    <div className="relative">
      {/* Visual Timeline Path */}
      <div className="absolute left-[26px] top-6 bottom-6 w-[2px] bg-slate-100 dark:bg-slate-800" />
      
      {/* Dynamic Progress Glow Fill */}
      <div 
        className="absolute left-[26px] top-6 w-[2px] bg-emerald-500 transition-all duration-500 ease-in-out" 
        style={{ 
          height: `${(currentStepIndex / 4) * 88}%` 
        }}
      />

      <div className="space-y-6">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone = step.isCompleted;
          const isCurrent = idx === currentStepIndex;
          
          return (
            <div key={idx} className="flex gap-4 items-start relative group">
              {/* Stepper Node Icon bubble */}
              <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                isDone 
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                  : isCurrent
                    ? 'bg-white border-emerald-500 text-emerald-500 shadow-md shadow-emerald-500/5 ring-4 ring-emerald-500/10 dark:bg-slate-900'
                    : 'bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800'
              }`}>
                <StepIcon className="h-5.5 w-5.5" />
              </div>

              {/* Step Text description */}
              <div className="flex-1 pt-1.5 min-w-0">
                <h4 className={`text-xs sm:text-sm truncate ${
                  isDone 
                    ? 'font-bold text-slate-900 dark:text-white' 
                    : isCurrent
                      ? 'font-bold text-emerald-500'
                      : 'font-semibold text-slate-400'
                }`}>
                  {step.label}
                </h4>
                <p className={`text-xs mt-1 leading-normal ${
                  isDone || isCurrent
                    ? 'text-slate-550 dark:text-slate-400'
                    : 'text-slate-400 dark:text-slate-600'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
