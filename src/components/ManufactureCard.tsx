import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CapabilityCategory } from '../data/capabilities';
import ManufactureCardSkeleton from './ManufactureCardSkeleton';

interface ManufactureCardProps {
  key?: string | number;
  cat: CapabilityCategory;
  idx: number;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800";

const MANUFACTURE_IMAGE_CONFIG: Record<string, { scale: number; position?: string }> = {
  // Attars assets (Attars 1 & 2)
  '/images/marketplace/attars-1.png': { scale: 1.38, position: 'center' },
  '/images/marketplace/attars-2.png': { scale: 1.38, position: 'center' },

  // Eau de Toilette asset (EDT 3)
  '/images/marketplace/edt-3.png': { scale: 1.40, position: 'center' },

  // Scented and Fragrance Candles asset (Candles 6)
  '/images/marketplace/scented-fragrance-candles-6.png': { scale: 1.38, position: 'center' },

  // Incense Products asset (Incense 7)
  '/images/marketplace/incense-products-7.png': { scale: 1.38, position: 'center' },

  // Dhoop / Incense Cones asset (Dhoop 8)
  '/images/marketplace/dhoop-incense-cones-8.png': { scale: 1.38, position: 'center' },
};

export default function ManufactureCard({ cat, idx }: ManufactureCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Primary image asset to preload for loading detection
  const primaryImageSrc = (cat.images && cat.images.length > 0) ? cat.images[0] : cat.image;

  const getImageStyle = (src: string): React.CSSProperties => {
    const config = MANUFACTURE_IMAGE_CONFIG[src] || { scale: 1.0, position: 'center' };
    const baseScale = config.scale;
    const finalScale = isHovered ? baseScale * 1.05 : baseScale;

    return {
      objectFit: 'cover',
      objectPosition: config.position || 'center',
      transform: `scale(${finalScale})`,
      transformOrigin: 'center center',
      transition: 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1), opacity 700ms ease',
    };
  };

  useEffect(() => {
    let active = true;
    setIsImageLoaded(false);

    if (!primaryImageSrc) {
      setIsImageLoaded(true);
      return;
    }

    const img = new Image();
    img.src = primaryImageSrc;

    if (img.complete) {
      setIsImageLoaded(true);
    } else {
      img.onload = () => {
        if (active) setIsImageLoaded(true);
      };
      img.onerror = () => {
        if (active) setIsImageLoaded(true);
      };
    }

    return () => {
      active = false;
    };
  }, [primaryImageSrc]);

  // Carousel auto-slide timer for multi-image cards (Attars)
  useEffect(() => {
    if (!cat.images || cat.images.length <= 1 || !isImageLoaded) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % cat.images!.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [cat.images, isImageLoaded]);

  const hasCarousel = Boolean(cat.images && cat.images.length > 1);

  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[310px]">
      {/* 1. Skeleton Shimmer Placeholder (Visible while primary image is loading) */}
      {!isImageLoaded && (
        <div className="absolute inset-0 z-10 w-full h-full transition-opacity duration-300">
          <ManufactureCardSkeleton />
        </div>
      )}

      {/* 2. Real Content Card (Fades in smoothly when image becomes ready) */}
      <Link
        to={`/capabilities/${cat.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`glass-panel glass-card-hover rounded-xl sm:rounded-2xl overflow-hidden group flex flex-col border border-white/50 hover:border-white shadow-sm transition-all duration-300 w-full h-full ${
          isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.99] pointer-events-none'
        }`}
      >
        {/* Image Frame */}
        <div className="aspect-[4/3] w-full overflow-hidden bg-black/10 relative rounded-t-xl sm:rounded-t-2xl">
          {hasCarousel ? (
            cat.images!.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={cat.name}
                style={getImageStyle(img)}
                className={`absolute inset-0 w-full h-full object-cover max-w-none block ${
                  i === currentIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              />
            ))
          ) : (
            <img
              src={cat.image}
              alt={cat.name}
              style={getImageStyle(cat.image)}
              className="absolute inset-0 w-full h-full object-cover max-w-none block"
              onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none"></div>

          {/* Carousel Dot Indicators (Only rendered after primary image is ready) */}
          {hasCarousel && isImageLoaded && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
              {cat.images!.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIdx(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIdx ? 'bg-white w-3.5' : 'bg-white/50 hover:bg-white/80 w-1.5'
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card Info */}
        <div className="p-3 sm:p-5 flex flex-col flex-grow bg-white/20">
          <h3 className="font-headline-md text-xs sm:text-base text-primary font-bold mb-1 group-hover:text-secondary transition-colors line-clamp-1">
            {cat.name}
          </h3>
          <p className="font-body-md text-[11px] sm:text-xs text-on-surface-variant/80 line-clamp-2 mb-3 sm:mb-4 flex-grow">
            {cat.subtitle}
          </p>
          <div className="pt-2 sm:pt-3 border-t border-outline-variant/30 flex items-center justify-between text-secondary font-label-sm text-[9px] sm:text-[11px] uppercase tracking-widest font-bold group-hover:translate-x-1 transition-transform">
            <span>Explore</span>
            <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
