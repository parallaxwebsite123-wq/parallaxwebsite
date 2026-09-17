import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MotionReveal from '../components/MotionReveal';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import InquiryModal from '../components/InquiryModal';
import QuickQuoteReveal from '../components/QuickQuoteReveal';
import { getPublishedHomepageContent, HomepageContent } from '../services/homepageContent';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

// Animated Counter Component for About Page Manufacturing Scale
function AboutCapacityCounter() {
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
    <div ref={sectionRef} aria-label="10,000 plus monthly manufacturing capacity">
      <div className="font-['Cormorant_Garamond',serif] text-5xl md:text-7xl font-bold text-[#0e3237] tracking-tight mb-2" aria-hidden="true">
        {formattedCount}+
      </div>
      <p className="font-label-sm text-xs md:text-sm uppercase tracking-widest text-[#914a39] font-bold">
        Monthly Manufacturing Capacity
      </p>
    </div>
  );
}

const PROCESS_STEPS = [
  {
    step: '01',
    name: 'DISCOVER',
    desc: 'Understanding the brand identity, market positioning, and target product requirements.'
  },
  {
    step: '02',
    name: 'DEVELOP',
    desc: 'Fragrance formulation, olfactory profiling, stability testing, and compound approval.'
  },
  {
    step: '03',
    name: 'DESIGN',
    desc: 'Bottle selection, glass tooling, custom cap fitting, and outer box artwork refinement.'
  },
  {
    step: '04',
    name: 'MANUFACTURE',
    desc: 'Controlled maceration, compounding, automated bottle filling, and stringent QC checks.'
  },
  {
    step: '05',
    name: 'DELIVER',
    desc: 'Finished products packaged, quality-certified, and prepared for global market distribution.'
  }
];

export default function About() {
  const [content, setContent] = useState<HomepageContent | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const fetchContent = () => {
      getPublishedHomepageContent()
        .then((data) => {
          if (isMounted) setContent(data);
        })
        .catch((err) => console.error("Failed to load about page content:", err));
    };

    fetchContent();

    // Refetch when window regains focus to ensure multi-device sync
    window.addEventListener('focus', fetchContent);

    // Supabase Realtime subscription for instant multi-device update
    let channel: any = null;
    if (isSupabaseConfigured()) {
      channel = supabase
        .channel('public:homepage_content_about')
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

  const aboutBanners = content?.aboutBanner?.banners && content.aboutBanner.banners.length > 0
    ? content.aboutBanner.banners
    : [
        {
          id: 'about-default',
          order: 1,
          desktop: {
            url: content?.aboutBanner?.image?.url || '/images/about-banner-bg.png',
            alt: 'Parallax Banner (Desktop)'
          },
          mobile: {
            url: content?.aboutMobileBanner?.image?.url || content?.aboutBanner?.image?.url || '/images/about-mobile-banner.png',
            alt: 'Parallax Banner (Mobile)'
          }
        }
      ];

  const [currentAboutIdx, setCurrentAboutIdx] = useState(0);

  useEffect(() => {
    if (aboutBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentAboutIdx((prev) => (prev + 1) % aboutBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [aboutBanners.length]);

  const activeAboutBanner = aboutBanners[currentAboutIdx] || aboutBanners[0];
  const desktopBannerSrc = activeAboutBanner.desktop.url || '/images/about-banner-bg.png';
  const mobileBannerSrc = activeAboutBanner.mobile.url || desktopBannerSrc;

  const openInquiry = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setInquiryModalOpen(true);
  };

  return (
    <div className="text-[#0e3237] font-body-md antialiased relative min-h-screen flex flex-col bg-[#faf8f5]">
      {/* Background ambient accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-1 opacity-25"></div>
        <div className="ambient-blob blob-2 opacity-25"></div>
      </div>

      <Navbar />

      <main className="flex-grow pt-20 md:pt-24 pb-20">
        
        {/* ================================================== */}
        {/* 1. HERO BANNER SECTION */}
        {/* ================================================== */}
        <section className="relative w-full aspect-[535/378] sm:aspect-[1900/840] flex items-center mb-8 md:mb-12 overflow-hidden [container-type:inline-size]">
          {/* Full-width Responsive Background Image starting right below Navbar */}
          <picture key={`${activeAboutBanner.id}-${desktopBannerSrc}-${mobileBannerSrc}`} className="absolute inset-0 w-full h-full z-0">
            <source media="(max-width: 639px)" srcSet={mobileBannerSrc} />
            <img 
              src={desktopBannerSrc} 
              alt="Parallax Banner" 
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== '/images/about-banner-bg.png') {
                  target.src = '/images/about-banner-bg.png';
                }
              }}
              className="w-full h-full object-cover object-center block transition-opacity duration-700 animate-fade-in"
            />
          </picture>
          
          {/* Dots Indicator for Multiple About Banners */}
          {aboutBanners.length > 1 && (
            <div className="absolute bottom-4 left-6 sm:left-12 flex items-center gap-2 z-20 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
              {aboutBanners.map((banner, idx) => (
                <button
                  key={banner.id}
                  onClick={() => setCurrentAboutIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentAboutIdx === idx
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 w-full h-full px-[3.5cqw] sm:px-[4.5cqw] py-[2.5cqw] sm:py-[3.5cqw] flex flex-col justify-end pointer-events-none">
            <h1 className="sr-only">About Parallax Perfumery - Fragrance Manufacturing</h1>

            {/* Bottom Left: Explore More Button (Centered below PRIVATE LABEL • WHITE LABEL • FRAGRANCE MANUFACTURING line) */}
            <MotionReveal delay={0.2} className="mr-auto mt-auto pointer-events-auto ml-[7.5cqw] sm:ml-[9cqw]">
              <div className="pt-[1.5cqw] sm:pt-[1cqw]">
                <button
                  type="button"
                  onClick={() => openInquiry()}
                  className="inline-flex items-center gap-[0.5cqw] sm:gap-[0.6cqw] px-[2.2cqw] sm:px-[1.8cqw] py-[0.7cqw] sm:py-[0.7cqw] rounded-full border border-white sm:border-[0.15cqw] bg-[#c59b27] hover:bg-[#a8821d] text-white font-label-sm text-[2.1cqw] sm:text-[0.95cqw] uppercase tracking-wider font-bold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer backdrop-blur-sm"
                >
                  <span>Explore more</span>
                  <span className="material-symbols-outlined text-[2.4cqw] sm:text-[1.1cqw]">arrow_forward</span>
                </button>
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* ================================================== */}
        {/* 2. BUSINESS PILLARS / 4-COLUMN CAPABILITIES */}
        {/* ================================================== */}
        <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 mb-10 md:mb-14">
          <MotionReveal delay={0.1}>
            <div className="mb-12 border-b border-[#0e3237]/10 pb-6">
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl md:text-4xl font-medium text-[#0e3237] mb-2">
                Business Pillars
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-[#0e3237]/70">
                Commitements we live upto
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#0e3237]/10">
            {/* Pillar 1 */}
            <MotionReveal delay={0.1} className="pt-6 md:pt-0 md:px-4 first:pl-0">
              <span className="font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#914a39] block mb-3">01</span>
              <h3 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#0e3237] mb-3 uppercase tracking-wider">
                Fragrance Development
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-[#0e3237]/75 leading-relaxed">
                We develop custom fragrance profiles tailored to your brand, target audience, and product category with our team of experts
              </p>
            </MotionReveal>

            {/* Pillar 2 */}
            <MotionReveal delay={0.2} className="pt-6 md:pt-0 md:px-4">
              <span className="font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#914a39] block mb-3">02</span>
              <h3 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#0e3237] mb-3 uppercase tracking-wider">
                Private-Label Manufacturing
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-[#0e3237]/75 leading-relaxed">
                Build your fragrance line without building a factory, end-to-end private-label manufacturing solutions with established brands
              </p>
            </MotionReveal>

            {/* Pillar 3 */}
            <MotionReveal delay={0.3} className="pt-6 md:pt-0 md:px-4">
              <span className="font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#914a39] block mb-3">03</span>
              <h3 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#0e3237] mb-3 uppercase tracking-wider">
                Packaging & Product Design
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-[#0e3237]/75 leading-relaxed">
                A complete, market-ready product. with customized packaging solutions, including bottles, caps, labels, boxes, and finishing.
              </p>
            </MotionReveal>

            {/* Pillar 4 */}
            <MotionReveal delay={0.4} className="pt-6 md:pt-0 md:px-4 last:pr-0">
              <span className="font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#914a39] block mb-3">04</span>
              <h3 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#0e3237] mb-3 uppercase tracking-wider">
                Scalable Production
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-[#0e3237]/75 leading-relaxed">
                Scale as your brand grows.<br />With a 3,500 sq. ft. manufacturing facility, capacity of up to 15,000 units per day, we support both new launches and growing fragrance brands.
              </p>
            </MotionReveal>
          </div>
        </section>

        {/* ================================================== */}
        {/* 4. "WHY PARALLAX" SECTION */}
        {/* ================================================== */}
        <section className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 mb-8 md:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side */}
            <MotionReveal delay={0.1} className="lg:col-span-5 lg:sticky lg:top-36">
              <span className="font-label-sm text-xs uppercase tracking-widest text-[#914a39] font-bold block mb-3">
                THE PARALLAX ADVANTAGE
              </span>
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl lg:text-5xl font-medium text-[#0e3237] mb-6 leading-tight">
                Why Brands Choose Parallax
              </h2>
              <p className="font-body-md text-sm sm:text-base text-[#0e3237]/80 leading-relaxed mb-8">
                We combine technical perfumery expertise with state-of-the-art manufacturing facilities in India to deliver flawless execution for boutique and global fragrance brands.
              </p>
              <button
                type="button"
                onClick={() => openInquiry('Build a sample of my perfume')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0e3237] text-white font-label-sm text-xs uppercase tracking-widest font-semibold hover:bg-[#914a39] transition-colors shadow-sm cursor-pointer"
              >
                <span>Request Sample Formulation</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </MotionReveal>

            {/* Right Side — Rows */}
            <MotionReveal delay={0.2} className="lg:col-span-7">
              <div className="divide-y divide-[#0e3237]/15 border-t border-b border-[#0e3237]/15">
                {[
                  {
                    num: '01',
                    title: 'End-to-end manufacturing support',
                    desc: 'Full lifecycle assistance from initial concept formulation through packaging to final delivery.'
                  },
                  {
                    num: '02',
                    title: 'Flexible private-label solutions',
                    desc: 'Custom-tailored production agreements designed for boutique niche brands to global commercial houses.'
                  },
                  {
                    num: '03',
                    title: 'Custom fragrance development',
                    desc: 'Molecular formulation and olfactory profiling created exclusively for your market positioning.'
                  }
                ].map((item) => (
                  <div key={item.num} className="py-6 group flex items-start gap-4 sm:gap-6 hover:bg-black/[0.01] transition-colors">
                    <span className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#914a39] shrink-0 pt-0.5">
                      {item.num}
                    </span>
                    <div className="flex-grow">
                      <h3 className="font-headline-md text-base sm:text-lg font-bold text-[#0e3237] mb-1 group-hover:text-[#914a39] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body-md text-xs sm:text-sm text-[#0e3237]/70 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[#0e3237]/40 group-hover:text-[#914a39] group-hover:translate-x-1 transition-all text-lg shrink-0 pt-1">
                      arrow_forward
                    </span>
                  </div>
                ))}
              </div>
            </MotionReveal>

          </div>
        </section>

        {/* ================================================== */}
        {/* 5. MANUFACTURING / SCALE SECTION */}
        {/* ================================================== */}
        <section className="w-full border-t border-b border-[#0e3237]/10 py-10 md:py-16 bg-white/80 mb-12 md:mb-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Image Column */}
              <MotionReveal delay={0.1} className="lg:col-span-6">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-[#0e3237]/10 min-h-[350px] sm:min-h-[440px]">
                  <img 
                    src="/images/product-4.png" 
                    alt="Parallax Laboratory & Manufacturing Scale" 
                    className="w-full h-full object-cover object-center block absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white text-xs sm:text-sm font-medium tracking-wide">
                    Controlled compounding & automated filling infrastructure
                  </div>
                </div>
              </MotionReveal>

              {/* Stat & Content Column */}
              <MotionReveal delay={0.2} className="lg:col-span-6 flex flex-col justify-center space-y-8">
                <div>
                  <span className="font-label-sm text-xs uppercase tracking-widest text-[#914a39] font-bold block mb-3">
                    PRODUCTION SCALE
                  </span>
                  <AboutCapacityCounter />
                  <p className="font-body-md text-sm sm:text-base text-[#0e3237]/80 leading-relaxed mt-4">
                    From initial bench-scale formulation and batch testing to full commercial production, our facility handles compounding, maceration, filling, and final assembly under strict ISO quality standards.
                  </p>
                </div>

                {/* IFRA Certification Integration */}
                <div className="pt-4 border-t border-[#0e3237]/10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img 
                    src="/images/ifra-logo.jpg" 
                    alt="International Fragrance Association (IFRA) Certified" 
                    className="h-16 w-auto object-contain shrink-0 mix-blend-multiply"
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="font-headline-md text-xs font-bold uppercase tracking-wider text-[#0e3237] mb-1">
                      IFRA Certified Compliance
                    </h4>
                    <p className="font-body-md text-xs text-[#0e3237]/70 leading-relaxed">
                      Certified by the International Fragrance Association (IFRA), guaranteeing strict adherence to international safety, purity, and environmental standards.
                    </p>
                  </div>
                </div>

                {/* Quality Control & Consistency Highlight */}
                <div className="pt-4 border-t border-[#0e3237]/10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img 
                    src="/images/quality-icon.jpg" 
                    alt="Quality Control & Consistency" 
                    className="h-16 w-auto object-contain shrink-0 mix-blend-multiply"
                  />
                  <div className="text-center sm:text-left">
                    <h4 className="font-headline-md text-xs font-bold uppercase tracking-wider text-[#0e3237] mb-1">
                      QUALITY CONTROL & CONSISTENCY
                    </h4>
                    <p className="font-body-md text-xs text-[#0e3237]/70 leading-relaxed">
                      Rigorous quality-control processes help maintain consistent fragrance quality and product uniformity across production batches.
                    </p>
                  </div>
                </div>
              </MotionReveal>

            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* 7. BRAND PARTNERSHIP / FULL-WIDTH BANNER SECTION */}
        {/* ================================================== */}
        <section className="w-full bg-black mb-20 md:mb-32 py-12 md:py-16">
          <MotionReveal delay={0.1}>
            <div className="w-full flex flex-col items-center text-center">
              {/* Eyebrow & Title container */}
              <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
                {/* 1. Eyebrow */}
                <span className="font-label-sm text-xs uppercase tracking-widest text-[#c5a059] font-bold block mb-3">
                  PARTNER WITH PARALLAX
                </span>

                {/* 2. Main Title - Golden Text on Black Background */}
                <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#d4af37] leading-tight max-w-3xl mb-8 md:mb-12">
                  From Fragrance Idea to<br className="hidden sm:inline" /> Finished Product.
                </h2>
              </div>

              {/* 3. Full-Width Banner Image (Extends whole webpage section, uncropped) */}
              <div className="w-full relative mb-8 md:mb-12 aspect-[2754/1536]">
                <img 
                  src="/images/about-banner-2.png" 
                  alt="Parallax Fragrance Manufacturing Banner" 
                  className="w-full h-full object-contain object-center block"
                />
              </div>

              {/* Subtext & Button container */}
              <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center">
                {/* 4. Subtext - White Text on Black Background */}
                <p className="font-body-md text-sm md:text-base text-white/90 max-w-xl mx-auto leading-relaxed mb-6">
                  One manufacturing partner for formulation, packaging, production and product development.
                </p>

                {/* 5. In-place expanding Quick Quote button & form */}
                <div className="w-full flex justify-center">
                  <QuickQuoteReveal />
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>

      </main>

      {/* Shared Inquiry Modal connected to state */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={selectedService}
      />

      <Footer />
    </div>
  );
}
