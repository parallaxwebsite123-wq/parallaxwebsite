import React from 'react';

interface CarouselProgressBarProps {
  itemCount: number;
  currentIndex: number;
  progress: number; // 0 to 100
  onSelect?: (index: number) => void;
  theme?: 'dark' | 'light'; // dark for hero image overlay, light for page background
  className?: string;
}

export default function CarouselProgressBar({
  itemCount,
  currentIndex,
  progress,
  onSelect,
  theme = 'dark',
  className = '',
}: CarouselProgressBarProps) {
  const displayCount = Math.max(itemCount, 1);

  const trackBg = theme === 'dark' 
    ? 'bg-white/30 hover:bg-white/50' 
    : 'bg-primary/20 hover:bg-primary/30';

  const fillBg = theme === 'dark' 
    ? 'bg-white' 
    : 'bg-primary';

  return (
    <div
      className={`flex items-center justify-center gap-1.5 sm:gap-2 w-full max-w-[200px] sm:max-w-xs mx-auto py-1 px-1 ${className}`}
      role="region"
      aria-label="Carousel Progress Controls"
    >
      {Array.from({ length: displayCount }).map((_, idx) => {
        const isActive = idx === currentIndex;
        const isPast = idx < currentIndex;
        const fillWidth = isPast ? 100 : isActive ? progress : 0;

        return (
          <button
            key={`progress-seg-${idx}`}
            type="button"
            onClick={() => onSelect && onSelect(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={isActive ? 'true' : 'false'}
            className={`group relative h-1 sm:h-1.5 rounded-full overflow-hidden transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/50 cursor-pointer ${
              isActive ? 'flex-[2.5]' : 'flex-1'
            } ${trackBg}`}
          >
            {/* Active Progress Filler */}
            <div
              className={`absolute top-0 left-0 bottom-0 rounded-full ${fillBg}`}
              style={{
                width: `${fillWidth}%`,
                transition: isActive ? 'none' : 'width 250ms linear',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
