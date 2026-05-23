import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-slate-200 dark:bg-slate-800/80 ${className}`}
      {...props}
    />
  );
}

export function ShopCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm flex flex-col gap-3">
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2 mt-1">
          <Skeleton className="h-4.5 w-3/4 rounded" />
          <Skeleton className="h-3.5 w-1/2 rounded" />
        </div>
      </div>
      <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2">
        <Skeleton className="h-3 w-1/4 rounded" />
        <Skeleton className="h-3 w-1/4 rounded" />
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm flex flex-col justify-between h-[230px]">
      <div className="space-y-3">
        <Skeleton className="h-28 w-full rounded-xl mx-auto" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-3.5 w-1/3 rounded" />
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <Skeleton className="h-5 w-1/3 rounded" />
        <Skeleton className="h-8 w-[70px] rounded-xl" />
      </div>
    </div>
  );
}
