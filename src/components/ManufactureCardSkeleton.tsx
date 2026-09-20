import React from 'react';

export default function ManufactureCardSkeleton() {
  return (
    <div
      className="glass-panel rounded-xl sm:rounded-2xl overflow-hidden flex flex-col border border-white/50 shadow-sm w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* 1. Top Image Skeleton Placeholder */}
      <div className="aspect-[4/3] w-full animate-shimmer relative bg-black/5" />

      {/* 2. Card Content Area Skeleton */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow bg-white/20 justify-between space-y-3">
        <div>
          {/* Title Line Skeleton */}
          <div className="h-4 sm:h-5 w-3/4 rounded-md animate-shimmer bg-black/10 mb-2 sm:mb-2.5" />

          {/* Subtitle / Description Skeleton (2 lines) */}
          <div className="space-y-1.5 mb-2">
            <div className="h-3 sm:h-3.5 w-full rounded-md animate-shimmer bg-black/5" />
            <div className="h-3 sm:h-3.5 w-4/5 rounded-md animate-shimmer bg-black/5" />
          </div>
        </div>

        {/* 3. Explore / Action Row Skeleton */}
        <div className="pt-2 sm:pt-3 border-t border-outline-variant/30 flex items-center justify-between">
          <div className="h-3 w-16 sm:w-20 rounded-md animate-shimmer bg-black/10" />
          <div className="h-3.5 w-3.5 rounded-full animate-shimmer bg-black/10" />
        </div>
      </div>
    </div>
  );
}
