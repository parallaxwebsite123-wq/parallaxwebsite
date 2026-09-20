import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MotionReveal from '../components/MotionReveal';
import QuickQuoteReveal from '../components/QuickQuoteReveal';
import { getCapabilityBySlug, CAPABILITY_CATEGORIES } from '../data/capabilities';
import { getPublishedHomepageContent, HomepageContent, BannerItem } from '../services/homepageContent';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800";

export default function CapabilityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const capability = getCapabilityBySlug(slug || '');

  const [cmsContent, setCmsContent] = useState<HomepageContent | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    let isMounted = true;
    getPublishedHomepageContent().then((content) => {
      if (isMounted) setCmsContent(content);
    });
    return () => { isMounted = false; };
  }, []);

  if (!capability) {
    return <Navigate to="/marketplace?view=manufacture" replace />;
  }

  const currentSlug = slug || capability.slug;
  const slugBanners = cmsContent?.capabilityBanners?.[currentSlug];
  const marketplaceBanners = cmsContent?.marketplaceBanner?.banners;

  const adminBanners: BannerItem[] | undefined =
    slugBanners && slugBanners.length > 0
      ? slugBanners
      : marketplaceBanners && marketplaceBanners.length > 0
      ? marketplaceBanners
      : undefined;

  const activeBanners: BannerItem[] = adminBanners || [
    {
      id: `${currentSlug}-fallback`,
      order: 1,
      desktop: { url: capability.image, alt: capability.name },
      mobile: { url: capability.image, alt: capability.name }
    }
  ];

  const hasMultipleImages = activeBanners.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;
    const timer = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % activeBanners.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [hasMultipleImages, activeBanners.length]);

  const introImage = capability.bottleImage || capability.image;

  // Related capabilities (excluding current)
  const related = CAPABILITY_CATEGORIES.filter((c) => c.slug !== capability.slug).slice(0, 3);

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen flex flex-col bg-surface-bright">
      {/* Background Ambient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
        <div className="ambient-blob blob-3"></div>
      </div>

      <Navbar />

      <main className="flex-grow pt-20 sm:pt-24 md:pt-28 pb-24 relative">
        
        {/* 1. FULL-WIDTH HERO BANNER (Positioned directly below Navbar) */}
        <section className="w-full relative overflow-hidden aspect-[535/378] sm:aspect-[1920/800] sm:max-h-[600px] lg:max-h-[680px] flex items-center">
          {hasMultipleImages ? (
            activeBanners.map((banner, i) => (
              <div
                key={banner.id}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
                  i === activeImageIdx ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                {/* Desktop Banner Image (Hidden on mobile) */}
                <img
                  src={banner.desktop?.url || banner.mobile?.url || FALLBACK_IMAGE}
                  alt={banner.desktop?.alt || capability.name}
                  className="hidden sm:block w-full h-full object-cover object-center"
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                />
                {/* Mobile Banner Image (Hidden on desktop) */}
                <img
                  src={banner.mobile?.url || banner.desktop?.url || FALLBACK_IMAGE}
                  alt={banner.mobile?.alt || capability.name}
                  className="block sm:hidden w-full h-full object-cover object-center"
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                />
              </div>
            ))
          ) : (
            <div className="absolute inset-0 w-full h-full">
              {/* Desktop Banner Image */}
              <img
                src={activeBanners[0]?.desktop?.url || activeBanners[0]?.mobile?.url || capability.image || FALLBACK_IMAGE}
                alt={activeBanners[0]?.desktop?.alt || capability.name}
                className="hidden sm:block w-full h-full object-cover object-center"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              />
              {/* Mobile Banner Image */}
              <img
                src={activeBanners[0]?.mobile?.url || activeBanners[0]?.desktop?.url || capability.image || FALLBACK_IMAGE}
                alt={activeBanners[0]?.mobile?.alt || capability.name}
                className="block sm:hidden w-full h-full object-cover object-center"
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              />
            </div>
          )}

          {/* Subtle Carousel Dots (If multi-image banner) */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              {activeBanners.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeImageIdx ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/80 w-2'
                  }`}
                  aria-label={`Go to hero slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* 2. CONSTRAINED WIDE PAGE CONTENT CONTAINER */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-8 flex items-center gap-2 text-xs font-label-sm uppercase tracking-widest text-on-surface-variant/80">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/marketplace?view=manufacture" className="hover:text-primary transition-colors">Capabilities</Link>
            <span>/</span>
            <span className="text-primary font-bold">{capability.name}</span>
          </div>

          {/* 3. PRODUCT INTRODUCTION SECTION (TEXT + CORRESPONDING MEGA-MENU IMAGE) */}
          <MotionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-6 pb-6 sm:mb-8 sm:pb-6 border-b border-outline-variant/30">
              
              {/* LEFT COLUMN — Product Text Content */}
              <div className="lg:col-span-7 space-y-6 order-1">
                <div>
                  <span className="font-label-sm text-xs uppercase tracking-widest text-secondary font-bold block mb-2">
                    FORMAT OVERVIEW & FORMULATION
                  </span>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl text-primary font-bold tracking-tight mb-3">
                    {capability.name}
                  </h2>
                  <p className="font-body-lg text-base sm:text-lg text-primary/80 font-medium leading-snug">
                    {capability.subtitle}
                  </p>
                </div>

                <p className="font-body-md text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  {capability.description}
                </p>

                {/* Mobile-only placement of Mega-Menu Image between text and buttons */}
                <div className="lg:hidden my-6 flex justify-center items-center bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-sm">
                  <img
                    src={introImage}
                    alt={capability.name}
                    className="max-h-[280px] w-auto max-w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] block"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link 
                    to="/build-sample" 
                    className="btn-primary py-3.5 px-7 text-xs uppercase tracking-widest inline-flex items-center gap-2 rounded-xl shadow-md"
                  >
                    Request Custom Quote <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                  <Link 
                    to="/marketplace?view=manufacture" 
                    className="px-6 py-3.5 rounded-xl border border-outline-variant/60 text-on-surface-variant font-label-sm text-xs uppercase tracking-widest hover:bg-white/60 transition-colors bg-white/30"
                  >
                    Explore All Capabilities
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN — Corresponding Mega-Menu Product Image (Desktop) */}
              <div className="hidden lg:flex lg:col-span-5 justify-center items-center order-2">
                <div className="w-full flex justify-center items-center p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_20px_50px_rgba(45,90,97,0.08)] transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src={introImage}
                    alt={`${capability.name} Mega Menu Asset`}
                    className="max-h-[380px] w-auto max-w-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:scale-105 block"
                  />
                </div>
              </div>

            </div>
          </MotionReveal>

          {/* 4. KEY MANUFACTURING SPECIFICATIONS & SIDEBAR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* LEFT — Specifications & Inquiry Box */}
            <div className="lg:col-span-8 space-y-8">
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/50 space-y-6 shadow-sm">
                <h3 className="font-headline-md text-xl sm:text-2xl text-primary font-bold">
                  Manufacturing Capabilities & Specifications
                </h3>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                  Our state-of-the-art facilities and experienced perfumery team support end-to-end production of {capability.name.toLowerCase()} for independent, emerging, and established global fragrance brands.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {capability.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/50 p-4 rounded-xl border border-white/60 shadow-xs">
                      <span className="material-symbols-outlined text-secondary text-xl shrink-0 mt-0.5">check_circle</span>
                      <span className="font-body-md text-xs sm:text-sm font-semibold text-primary">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry & Contact Box */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/50 bg-primary/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
                <div>
                  <h3 className="font-headline-md text-lg sm:text-xl text-primary font-bold mb-1.5">
                    Interested in manufacturing {capability.name}?
                  </h3>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface-variant">
                    Speak directly with our compounding specialists to request samples or discuss MOQs.
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                  <QuickQuoteReveal
                    buttonLabel="Doubts? Contact us"
                    buttonBgColor="#114349"
                    buttonTextColor="#ffffff"
                    defaultService={capability.name}
                    align="right"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — Sidebar (Other Capabilities) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/50 shadow-sm">
                <h3 className="font-label-sm text-xs text-primary uppercase tracking-widest border-b border-outline-variant/40 pb-3 mb-4 font-bold">
                  Explore Other Capabilities
                </h3>
                <div className="space-y-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/capabilities/${rel.slug}`}
                      className="group flex items-center gap-4 p-3 rounded-xl bg-white/30 hover:bg-white/70 border border-white/40 transition-all duration-300 shadow-xs"
                    >
                      <img 
                        src={rel.image} 
                        alt={rel.name} 
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      />
                      <div className="overflow-hidden">
                        <span className="font-headline-md text-xs sm:text-sm font-bold text-primary group-hover:text-secondary transition-colors block truncate">
                          {rel.name}
                        </span>
                        <span className="font-body-md text-[11px] text-on-surface-variant/80 block truncate">
                          {rel.subtitle}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

