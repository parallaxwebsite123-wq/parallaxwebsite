import React from 'react';

interface MarketplaceBannerProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export default function MarketplaceBanner({ title, subtitle, imageSrc }: MarketplaceBannerProps) {
  const bannerImage = imageSrc || '/images/fragrance-library-banner.png';

  return (
    <section className="w-full relative overflow-hidden bg-surface-bright min-h-[260px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px] flex items-center">
      {/* Full-Width Background Banner Image */}
      <img
        src={bannerImage}
        alt={title}
        className="w-full h-full object-cover object-[25%_center] sm:object-[30%_center] md:object-center absolute inset-0 block"
      />

      {/* Right Gradient Overlay for crisp text contrast without obscuring atomizer */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/45 to-black/85 sm:from-transparent sm:via-black/35 sm:to-black/85 z-10 pointer-events-none"></div>

      {/* Right-Aligned Text Content Container aligned with main grid container */}
      <div className="relative z-20 w-full h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14 flex items-center justify-end text-right">
        <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-white space-y-2 sm:space-y-3 md:space-y-4">
          <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
            {title}
          </h1>
          <p className="font-body-md text-xs sm:text-sm md:text-base text-white/95 leading-relaxed font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.75)] max-w-xs sm:max-w-md ml-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

