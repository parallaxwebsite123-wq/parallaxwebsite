import React from 'react';

interface MarketplaceBannerProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  mobileImageSrc?: string;
}

export default function MarketplaceBanner({ title, subtitle, imageSrc, mobileImageSrc }: MarketplaceBannerProps) {
  const desktopBanner = (imageSrc && imageSrc.trim()) ? imageSrc.trim() : '/images/fragrance-library-banner.png';
  const mobileBanner = (mobileImageSrc && mobileImageSrc.trim()) ? mobileImageSrc.trim() : desktopBanner;

  return (
    <section className="w-full relative overflow-hidden bg-surface-bright aspect-[535/378] sm:aspect-[1920/800] sm:max-h-[800px] lg:max-h-[800px] flex items-center">
      {/* Desktop Background Banner Image */}
      <img
        src={desktopBanner}
        alt={title}
        className="hidden sm:block w-full h-full object-cover object-center absolute inset-0"
      />
      {/* Mobile Background Banner Image */}
      <img
        src={mobileBanner}
        alt={title}
        className="block sm:hidden w-full h-full object-cover object-center absolute inset-0"
      />

      {/* Right-Aligned Text Content Container (Hidden on mobile view, visible on desktop) */}
      <div className="hidden sm:flex relative z-20 w-full h-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14 items-center justify-end text-right">
        <div className="max-w-[240px] sm:max-w-md md:max-w-lg lg:max-w-xl space-y-1.5 sm:space-y-3 md:space-y-4">
          <h1 className="font-headline-lg text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary">
            {title}
          </h1>
          <p className="font-body-md text-[11px] sm:text-sm md:text-base text-primary/95 leading-relaxed font-medium max-w-[230px] sm:max-w-md ml-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}


