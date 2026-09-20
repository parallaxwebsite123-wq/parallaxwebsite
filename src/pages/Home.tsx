import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MotionReveal from '../components/MotionReveal';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import InquiryModal from '../components/InquiryModal';
import { getPublishedHomepageContent, HomepageContent } from '../services/homepageContent';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';
import { useAutoplayCarousel } from '../hooks/useAutoplayCarousel';
import CarouselProgressBar from '../components/CarouselProgressBar';

function CapacityCounter() {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(10000);
      setHasAnimated(true);
      return;
    }

    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          const target = 10000;
          const duration = 1800;
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 2);
            const currentCount = Math.floor(easedProgress * target);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  const formattedCount = count.toLocaleString('en-US');

  return (
    <div ref={sectionRef} aria-label="Capacity of 10,000 plus monthly">
      <span className="font-label-sm text-xs uppercase tracking-widest text-secondary-fixed-dim block mb-2 font-semibold">
        Capacity of
      </span>
      <h3 className="font-headline-md text-2xl md:text-4xl font-extrabold mb-2" aria-hidden="true">
        {formattedCount}+ monthly
      </h3>
    </div>
  );
}

const DEFAULT_PRODUCTS = [
  {
    id: "product-1",
    category: "Signature Collection",
    title: "Fine Fragrance Oils",
    link: "/marketplace?category=fine-fragrance",
    image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA", alt: "Fine Fragrance Oils" }
  },
  {
    id: "product-2",
    category: "Bespoke Tooling",
    title: "Custom Glassware",
    link: "/build-sample",
    image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA", alt: "Custom Glassware" }
  },
  {
    id: "product-3",
    category: "Home & Ambient",
    title: "Reed Diffusers & Sprays",
    link: "/marketplace?category=ambient",
    image: { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2RVrUT9aCMFofBgkTV06mfmP6SRbeYXsJDOUHgTEh45y7X7t0A06bRmomBNmsdPBgtduel1gR7trACZi47jS9yo0mxJ2Bb_nSbISPXyis3T761yLZz_1qZ_iDNyI08hx4dorgK0K1S0UPKeknPIP7gO9hdnV8wSsUV458sGIoL1MoW4leUJADvzOIdInqd4BhPutomPzrgnv18rQEUjEZhfOv33DbxeXKO3SsRdDhhIjO17egF_WJ_w", alt: "Reed Diffusers & Sprays" }
  },
  {
    id: "product-4",
    category: "Private Label",
    title: "Private Label Fragrance",
    link: "/marketplace",
    image: { url: "/images/product-4.png", alt: "Private Label Fragrance" }
  },
  {
    id: "product-5",
    category: "Packaging",
    title: "Bespoke Packaging",
    link: "/about",
    image: { url: "/images/product-5.png", alt: "Bespoke Packaging" }
  }
];

const CAPABILITIES = [
  {
    id: "cap-1",
    title: "White-label manufacturing",
    desc: "Launch under your own brand with ready-to-market fragrance manufacturing and private-label support."
  },
  {
    id: "cap-2",
    title: "Custom fragrance development",
    desc: "Develop a distinctive fragrance profile tailored to your brand, market and product positioning."
  },
  {
    id: "cap-3",
    title: "Premium packaging",
    desc: "From bottle selection to finishing details, create packaging designed to reflect your brand identity."
  },
  {
    id: "cap-4",
    title: "Scalable manufacturing",
    desc: "Move from initial sampling to larger production runs with manufacturing capacity designed to scale with demand."
  },
  {
    id: "cap-5",
    title: "Multiple fragrance formats",
    desc: "Manufacture across formats including Eau de Parfum, Extrait, Cologne, Attars, Oils and other fragrance applications."
  },
  {
    id: "cap-6",
    title: "End-to-end product development",
    desc: "Bring the complete product together from concept and formulation through packaging, sampling and manufacturing."
  }
];

export default function Home() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [openCapability, setOpenCapability] = useState<number>(0);

  // Inquiry Modal State
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedInquiryService, setSelectedInquiryService] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const fetchContent = () => {
      getPublishedHomepageContent()
        .then((data) => {
          if (isMounted) setContent(data);
        })
        .catch((err) => console.error("Failed to load homepage content:", err));
    };

    fetchContent();

    window.addEventListener('focus', fetchContent);

    let channel: any = null;
    if (isSupabaseConfigured()) {
      channel = supabase
        .channel('public:homepage_content_home')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'homepage_content' },
          () => {
            fetchContent();
          }
        )
        .subscribe();
    }

    return () => {
      isMounted = false;
      window.removeEventListener('focus', fetchContent);
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  const heroBanners = content?.hero?.banners && content.hero.banners.length > 0
    ? content.hero.banners
    : [
        {
          id: 'hero-default-1',
          order: 1,
          desktop: {
            url: content?.hero?.image?.url || '/images/hero/hero-banner.png',
            alt: content?.hero?.image?.alt || 'Our Preciously Curated Gift Collection - Parallax Perfumery'
          },
          mobile: {
            url: content?.mobileHero?.image?.url || content?.hero?.image?.url || '/images/hero/mobile-hero-banner.png',
            alt: content?.mobileHero?.image?.alt || 'Our Preciously Curated Gift Collection - Parallax Perfumery (Mobile)'
          }
        },
        {
          id: 'hero-default-2',
          order: 2,
          desktop: {
            url: '/images/product-4.png',
            alt: 'White-Label Fragrance Manufacturing - Parallax Perfumery'
          },
          mobile: {
            url: '/images/product-4.png',
            alt: 'White-Label Fragrance Manufacturing - Parallax Perfumery (Mobile)'
          }
        }
      ];

  const heroCarousel = useAutoplayCarousel({
    itemCount: heroBanners.length,
    duration: 3500,
  });

  const productList = (content?.products && content.products.length > 0) 
    ? content.products 
    : DEFAULT_PRODUCTS;
  
  const marqueeItems = [...productList, ...productList];

  const capabilityBanners = content?.capabilities?.banners && content.capabilities.banners.length > 0
    ? content.capabilities.banners
    : [
        {
          id: 'cap-default-1',
          order: 1,
          desktop: {
            url: content?.capabilities?.mainFineFragrance?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA",
            alt: "Fine Fragrance Manufacturing"
          },
          mobile: {
            url: content?.capabilities?.mainFineFragrance?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA",
            alt: "Fine Fragrance Manufacturing"
          }
        },
        {
          id: 'cap-default-2',
          order: 2,
          desktop: {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA",
            alt: "Custom Fragrance Development"
          },
          mobile: {
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA",
            alt: "Custom Fragrance Development"
          }
        },
        {
          id: 'cap-default-3',
          order: 3,
          desktop: {
            url: "/images/product-5.png",
            alt: "Premium Packaging & Bottling"
          },
          mobile: {
            url: "/images/product-5.png",
            alt: "Premium Packaging & Bottling"
          }
        }
      ];

  const capCarousel = useAutoplayCarousel({
    itemCount: capabilityBanners.length,
    duration: 3500,
  });

  // Touch gesture refs for mobile swipe
  const heroTouchStartX = useRef<number | null>(null);
  const heroTouchStartY = useRef<number | null>(null);

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    heroTouchStartX.current = e.touches[0].clientX;
    heroTouchStartY.current = e.touches[0].clientY;
  };

  const handleHeroTouchEnd = (e: React.TouchEvent) => {
    if (heroTouchStartX.current === null || heroTouchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - heroTouchStartX.current;
    const deltaY = e.changedTouches[0].clientY - heroTouchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) heroCarousel.nextSlide();
      else heroCarousel.prevSlide();
    }
    heroTouchStartX.current = null;
    heroTouchStartY.current = null;
  };

  const capTouchStartX = useRef<number | null>(null);
  const capTouchStartY = useRef<number | null>(null);

  const handleCapTouchStart = (e: React.TouchEvent) => {
    capTouchStartX.current = e.touches[0].clientX;
    capTouchStartY.current = e.touches[0].clientY;
  };

  const handleCapTouchEnd = (e: React.TouchEvent) => {
    if (capTouchStartX.current === null || capTouchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - capTouchStartX.current;
    const deltaY = e.changedTouches[0].clientY - capTouchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) capCarousel.nextSlide();
      else capCarousel.prevSlide();
    }
    capTouchStartX.current = null;
    capTouchStartY.current = null;
  };

  // Sync accordion click with capability carousel
  const handleCapabilitySelect = (idx: number) => {
    setOpenCapability(idx);
    capCarousel.goToSlide(idx);
  };

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen flex flex-col">
      
      {/* Gradient Foundation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-3]">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
        <div className="ambient-blob blob-3"></div>
      </div>
      
      <Navbar />

      <main className="flex-grow pt-28 md:pt-32 pb-24 relative">
        {/* Hero Section */}
        <section 
          className="w-full mb-4 md:mb-8 relative z-10 overflow-hidden group"
          onTouchStart={handleHeroTouchStart}
          onTouchEnd={handleHeroTouchEnd}
        >
          <h1 className="sr-only">Parallax OEM / ODM Manufacturing - Build Your Fragrance Brand</h1>
          
          <div className="w-full relative overflow-hidden bg-surface-bright">
            {/* Desktop Banner Track (Hidden on Mobile) */}
            <div className="hidden md:block w-full aspect-[1920/800] max-h-[800px] overflow-hidden relative">
              <div 
                className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${heroCarousel.currentIndex * 100}%)` }}
              >
                {heroBanners.map((banner, idx) => {
                  const desktopSrc = banner.desktop?.url || '/images/hero/hero-banner.png';
                  const desktopAlt = banner.desktop?.alt || 'Parallax Perfumery Desktop Banner';
                  return (
                    <div key={banner.id || `hero-desk-${idx}`} className="w-full h-full shrink-0 relative">
                      <img 
                        src={desktopSrc} 
                        alt={desktopAlt}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== '/images/hero/hero-banner.png') {
                            target.src = '/images/hero/hero-banner.png';
                          }
                        }}
                        className="w-full h-full object-cover object-center block"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Banner Track (Visible on Mobile) */}
            <div className="block md:hidden w-full aspect-[535/378] overflow-hidden bg-black/5 relative">
              <div 
                className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${heroCarousel.currentIndex * 100}%)` }}
              >
                {heroBanners.map((banner, idx) => {
                  const mobileSrc = banner.mobile?.url || banner.desktop?.url || '/images/hero/mobile-hero-banner.png';
                  const mobileAlt = banner.mobile?.alt || banner.desktop?.alt || 'Parallax Perfumery Mobile Banner';
                  return (
                    <div key={banner.id || `hero-mob-${idx}`} className="w-full h-full shrink-0 relative">
                      <img 
                        src={mobileSrc} 
                        alt={mobileAlt}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== '/images/hero/mobile-hero-banner.png') {
                            target.src = '/images/hero/mobile-hero-banner.png';
                          }
                        }}
                        className="w-full h-full object-cover object-center block"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sleek Ultra-Thin Progress Indicator Line */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 w-36 sm:w-56 flex items-center justify-center pointer-events-auto">
              <CarouselProgressBar
                itemCount={heroBanners.length}
                currentIndex={heroCarousel.currentIndex}
                progress={heroCarousel.progress}
                onSelect={(idx) => heroCarousel.goToSlide(idx)}
                theme="dark"
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Continuous Infinite Horizontal Product Marquee */}
        <section className="w-full mb-6 md:mb-12 relative z-10 overflow-hidden py-1">
          {/* Centered Heading above moving product row */}
          <div className="w-full text-center mb-4 md:mb-6 px-6">
            <h2 className="font-headline-md text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight max-w-4xl mx-auto">
              Leading White & Private labelling Manufacturer
            </h2>
          </div>

          <div className="w-full overflow-hidden">
            <div className="animate-marquee-left flex gap-6 md:gap-8 pr-6 md:pr-8">
              {marqueeItems.map((item, idx) => (
                <Link 
                  key={`${item.id}-${idx}`} 
                  to={item.link || "/marketplace"} 
                  className="w-[280px] sm:w-[360px] md:w-[440px] shrink-0 rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/10] relative block shadow-md hover:shadow-xl transition-all duration-500 border border-black/5 bg-surface-bright group"
                >
                  <img 
                    src={item.image?.url} 
                    alt={item.image?.alt || item.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 block" 
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                    <h3 className="font-headline-md text-xl md:text-2xl font-bold [text-shadow:_0_1px_3px_rgba(0,0,0,0.6)]">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Capabilities Section - Editorial Two Column Layout */}
        <section className="w-full px-6 md:px-12 lg:px-16 mb-12 md:mb-20 relative z-10">
          <MotionReveal delay={0.1}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
              <h2 className="font-headline-md text-headline-md text-primary">Manufacturing Capabilities</h2>
              <div className="hidden sm:block h-px flex-grow mx-4 md:mx-6 bg-gradient-to-r from-transparent via-outline-variant to-transparent opacity-50"></div>
              <div className="flex items-center gap-6 shrink-0">
                <Link className="hidden lg:inline-flex font-label-sm text-label-sm text-secondary uppercase tracking-widest hover:text-primary transition-colors items-center gap-2 group shrink-0" to="/marketplace">
                  View Marketplace
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </MotionReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Right Column (Rendered FIRST on Mobile) — 6 Accordion Capabilities List & Mobile View Marketplace Button */}
            <MotionReveal delay={0.1} className="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center">
              <div className="divide-y divide-black/10 border-t border-b border-black/10">
                {CAPABILITIES.map((item, idx) => {
                  const isOpen = openCapability === idx;
                  return (
                    <div key={item.id} className="py-4 md:py-5 transition-colors duration-300">
                      <button
                        type="button"
                        id={`capability-header-${idx}`}
                        aria-expanded={isOpen}
                        aria-controls={`capability-content-${idx}`}
                        onClick={() => handleCapabilitySelect(isOpen ? -1 : idx)}
                        className="w-full flex items-center justify-between text-left group focus:outline-none focus:ring-1 focus:ring-secondary/50 rounded-lg p-1 cursor-pointer"
                      >
                        <h3 className={`font-headline-md text-base md:text-lg lg:text-xl tracking-tight transition-colors duration-300 ${isOpen ? 'text-primary font-semibold' : 'text-on-surface hover:text-primary font-medium'}`}>
                          {item.title}
                        </h3>
                        <span className="material-symbols-outlined text-secondary text-xl transition-transform duration-300 shrink-0 ml-3">
                          {isOpen ? 'remove' : 'add'}
                        </span>
                      </button>

                      <div
                        id={`capability-content-${idx}`}
                        role="region"
                        aria-labelledby={`capability-header-${idx}`}
                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0 overflow-hidden'}`}
                      >
                        <div className="overflow-hidden pr-2">
                          <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed mb-4">
                            {item.desc}
                          </p>

                          <div className="flex items-center gap-4 mt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedInquiryService(item.title);
                                setInquiryModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-secondary transition-all shadow-sm active:scale-95 shrink-0 whitespace-nowrap cursor-pointer"
                            >
                              <span>Doubts? Contact us</span>
                              <span className="material-symbols-outlined text-xs">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile View Marketplace Button */}
              <div className="mt-8 flex justify-center lg:hidden">
                <Link 
                  to="/marketplace" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-white text-xs font-semibold uppercase tracking-widest hover:bg-secondary transition-all shadow-md active:scale-95 w-full text-center"
                >
                  <span>View Marketplace</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </MotionReveal>

            {/* Left Column (Rendered SECOND on Mobile, below View Marketplace button) — Capabilities Carousel Banner */}
            <MotionReveal delay={0.2} className="order-2 lg:order-1 lg:col-span-7 h-full mb-4 lg:mb-0">
              <div 
                className="-mx-6 lg:mx-0 w-[calc(100%+3rem)] lg:w-full aspect-[535/378] lg:aspect-auto lg:min-h-[580px] h-full rounded-none lg:rounded-3xl overflow-hidden relative block bg-surface-bright border-none lg:border lg:border-black/5 shadow-none lg:shadow-md group cursor-pointer"
                onTouchStart={handleCapTouchStart}
                onTouchEnd={handleCapTouchEnd}
              >
                {/* Horizontal Slide Track */}
                <div 
                  className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{ transform: `translateX(-${capCarousel.currentIndex * 100}%)` }}
                >
                  {capabilityBanners.map((banner, idx) => {
                    const desktopUrl = banner.desktop?.url || content?.capabilities?.mainFineFragrance?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA";
                    const mobileUrl = banner.mobile?.url || desktopUrl;
                    const capAlt = banner.desktop?.alt || "Manufacturing Capabilities";
                    return (
                      <div key={banner.id || idx} className="w-full h-full shrink-0 relative">
                        <picture className="w-full h-full block">
                          <source media="(max-width: 767px)" srcSet={mobileUrl} />
                          <img 
                            src={desktopUrl} 
                            alt={capAlt} 
                            className="w-full h-full object-cover object-center block" 
                          />
                        </picture>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none z-10"></div>

                <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-10 text-white z-20 w-full pointer-events-none">
                  <CapacityCounter />
                </div>
              </div>

              {/* Progress Bar for Capabilities Carousel */}
              {capabilityBanners.length > 1 && (
                <div className="mt-4 flex justify-center">
                  <CarouselProgressBar
                    itemCount={capabilityBanners.length}
                    currentIndex={capCarousel.currentIndex}
                    progress={capCarousel.progress}
                    onSelect={handleCapabilitySelect}
                    theme="light"
                  />
                </div>
              )}
            </MotionReveal>
          </div>
        </section>
      </main>

      <InquiryModal 
        isOpen={inquiryModalOpen} 
        onClose={() => setInquiryModalOpen(false)} 
        initialService={selectedInquiryService}
      />

      <Footer />
    </div>
  );
}

