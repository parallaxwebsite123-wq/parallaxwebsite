import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CAPABILITY_CATEGORIES, OEM_CAPABILITIES, CapabilityCategory } from '../data/capabilities';

type ActiveMenu = 'capabilities' | 'marketplace' | 'journal' | null;

type MobileScreenLevel = 'root' | 'capabilities' | 'manufacture' | 'oem' | 'marketplace' | 'journal';

interface MobileScreen {
  level: MobileScreenLevel;
  title: string;
}

const slideVariants = {
  enter: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? '-100%' : '100%',
    opacity: 0,
  }),
};

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;

  // Single Shared Mega-Menu Shell State (Desktop)
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [displayedMenu, setDisplayedMenu] = useState<ActiveMenu>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHoverFormat, setActiveHoverFormat] = useState<CapabilityCategory | null>(null);

  // Hover timeout ref for smooth hover bridge & intent
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile Navigation Drawer Stack & Transition State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuStack, setMenuStack] = useState<MobileScreen[]>([{ level: 'root', title: '' }]);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');

  // Prevent background scroll while mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close drawer on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        handleCloseDrawer();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mobileMenuOpen]);

  const pushScreen = (screen: MobileScreen) => {
    setSlideDirection('forward');
    setMenuStack((prev) => [...prev, screen]);
  };

  const popScreen = () => {
    if (menuStack.length > 1) {
      setSlideDirection('backward');
      setMenuStack((prev) => prev.slice(0, -1));
    }
  };

  const handleCloseDrawer = () => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      setMenuStack([{ level: 'root', title: '' }]);
    }, 300);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      setMenuStack([{ level: 'root', title: '' }]);
    }, 300);
  };

  const currentScreen = menuStack[menuStack.length - 1] || { level: 'root', title: '' };

  // Handle desktop menu hover enter & transition
  const handleMouseEnter = (menu: ActiveMenu) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveMenu(menu);
    setDisplayedMenu(menu);
    setIsMenuOpen(true);
  };

  // Handle desktop menu hover leave with graceful delay
  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setIsMenuOpen(false);
      setActiveHoverFormat(null);
    }, 180);
  };

  // Close desktop menu on ESC key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActiveMenu(null);
      setIsMenuOpen(false);
      setActiveHoverFormat(null);
    }
  };

  const isCapabilitiesActive = pathname.startsWith('/capabilities') || pathname === '/about';
  const isMarketplaceActive = pathname.startsWith('/marketplace') || pathname === '/shop';
  const isBuildSampleActive = pathname.startsWith('/build-sample');
  const isJournalActive = pathname.startsWith('/blog');

  return (
    <>
      <header 
        className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-xl z-50 bg-white/40 backdrop-blur-[40px] border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]"
        onKeyDown={handleKeyDown}
      >
      <div className="flex justify-between items-center px-6 md:px-8 py-2 md:py-2.5 relative">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center shrink-0" aria-label="Parallax Perfumery Home">
          <img 
            src="/images/parallax-black-logo.png" 
            alt="Parallax Perfumery" 
            className="h-[46px] sm:h-[58px] md:h-[70px] lg:h-[78px] w-auto object-contain transition-transform duration-200 hover:scale-[1.02]" 
          />
        </Link>

        {/* Desktop Navigation (UNTOUCHED) */}
        <nav 
          className="hidden md:flex items-center gap-8"
          onMouseLeave={handleMouseLeave}
        >
          
          {/* 1. CAPABILITIES */}
          <div 
            className="relative pt-2 pb-2"
            onMouseEnter={() => handleMouseEnter('capabilities')}
            onFocus={() => handleMouseEnter('capabilities')}
          >
            <Link 
              to="/about" 
              className={`font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 flex items-center gap-1 active:scale-95 ${
                isCapabilitiesActive 
                  ? 'text-secondary font-semibold border-b-2 border-secondary pb-0.5' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Capabilities
              <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${isMenuOpen && activeMenu === 'capabilities' ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </Link>
          </div>

          {/* 2. MARKETPLACE */}
          <div 
            className="relative pt-2 pb-2"
            onMouseEnter={() => handleMouseEnter('marketplace')}
            onFocus={() => handleMouseEnter('marketplace')}
          >
            <Link 
              to="/marketplace" 
              className={`font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 flex items-center gap-1 active:scale-95 ${
                isMarketplaceActive 
                  ? 'text-secondary font-semibold border-b-2 border-secondary pb-0.5' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Marketplace
              <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${isMenuOpen && activeMenu === 'marketplace' ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </Link>
          </div>

          {/* 3. BUILD A SAMPLE (DIRECT LINK - EXCLUDED FROM MEGA-MENU) */}
          <Link 
            to="/build-sample" 
            onMouseEnter={handleMouseLeave}
            className={`font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 active:scale-95 ${
              isBuildSampleActive 
                ? 'text-secondary font-semibold border-b-2 border-secondary pb-0.5' 
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Build a Sample
          </Link>

          {/* 4. JOURNAL */}
          <div 
            className="relative pt-2 pb-2"
            onMouseEnter={() => handleMouseEnter('journal')}
            onFocus={() => handleMouseEnter('journal')}
          >
            <Link 
              to="/blog" 
              className={`font-label-sm text-label-sm uppercase tracking-widest transition-all duration-200 flex items-center gap-1 active:scale-95 ${
                isJournalActive 
                  ? 'text-secondary font-semibold border-b-2 border-secondary pb-0.5' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Journal
              <span className={`material-symbols-outlined text-sm transition-transform duration-200 ${isMenuOpen && activeMenu === 'journal' ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </Link>
          </div>

        </nav>

        {/* SINGLE SHARED REUSABLE MEGA-MENU CONTAINER (DESKTOP) */}
        <div 
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
          className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ease-out z-50 ${
            isMenuOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
              : 'opacity-0 -translate-y-2 pointer-events-none scale-[0.98]'
          }`}
        >
          {/* Functional Hover Bridge */}
          <div className="absolute -top-3 left-0 w-full h-3"></div>

          <div 
            className={`bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-[0px_24px_60px_rgba(45,90,97,0.15)] transition-all duration-250 ease-out overflow-hidden ${
              displayedMenu === 'capabilities' 
                ? (activeHoverFormat ? 'w-[1080px] min-h-[460px]' : 'w-[700px] min-h-[460px]')
                : displayedMenu === 'marketplace'
                ? 'w-[280px] min-h-0'
                : displayedMenu === 'journal'
                ? 'w-[320px] min-h-0'
                : 'w-[300px]'
            }`}
          >
            {/* Dynamic Content Switcher with Crossfade */}
            <div key={displayedMenu} className="animate-fade-in transition-opacity duration-200">
              
              {/* CAPABILITIES CONTENT */}
              {displayedMenu === 'capabilities' && (
                <div className="flex gap-6">
                  {/* COLUMN 1: KNOW US */}
                  <div 
                    className="w-[170px] shrink-0 pr-4 border-r border-outline-variant/25 space-y-2 flex flex-col justify-between"
                    onMouseEnter={() => setActiveHoverFormat(null)}
                  >
                    <div>
                      <div className="px-2 py-1 border-b border-outline-variant/30 mb-3">
                        <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary/70 font-bold block">
                          KNOW US
                        </span>
                      </div>
                      <div className="space-y-2">
                        <Link
                          to="/about"
                          className="block px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-black/5 transition-colors leading-relaxed"
                        >
                          About us
                        </Link>
                        <Link
                          to="/about#faqs"
                          className="block px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-black/5 transition-colors leading-relaxed"
                        >
                          FAQs
                        </Link>
                        <Link
                          to="/about#clients"
                          className="block px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-black/5 transition-colors leading-relaxed"
                        >
                          Clients
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* COLUMN 2: OEM MANUFACTURING */}
                  <div 
                    className="w-[210px] shrink-0 pr-4 border-r border-outline-variant/25 space-y-2 flex flex-col justify-between"
                    onMouseEnter={() => setActiveHoverFormat(null)}
                  >
                    <div>
                      <div className="px-2 py-1 border-b border-outline-variant/30 mb-3">
                        <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary/70 font-bold block">
                          OEM MANUFACTURING
                        </span>
                      </div>
                      <div className="space-y-2">
                        {OEM_CAPABILITIES.map((oem) => (
                          <Link
                            key={oem.id}
                            to={oem.link}
                            className="block px-2.5 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-black/5 transition-colors leading-relaxed"
                          >
                            {oem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* COLUMN 3: MANUFACTURE YOUR OWN */}
                  <div className="w-[220px] shrink-0 space-y-1">
                    <div className="px-2 py-1 border-b border-outline-variant/30 mb-3">
                      <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary/70 font-bold block">
                        Manufacture your own
                      </span>
                    </div>
                    <div className="space-y-1">
                      {CAPABILITY_CATEGORIES.map((cat) => {
                        const isSelected = activeHoverFormat?.slug === cat.slug;
                        return (
                          <Link
                            key={cat.id}
                            to={`/capabilities/${cat.slug}`}
                            onMouseEnter={() => setActiveHoverFormat(cat)}
                            className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                              isSelected 
                                ? 'bg-primary/10 text-primary font-bold translate-x-1' 
                                : 'text-on-surface-variant hover:text-primary hover:bg-black/5'
                            }`}
                          >
                            <span>{cat.name}</span>
                            {isSelected && <span className="material-symbols-outlined text-sm text-primary">chevron_right</span>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* COLUMN 4: PRODUCT IMAGE PREVIEW AREA WITH CROSSFADE */}
                  {activeHoverFormat && (
                    <div className="w-[380px] shrink-0 border-l border-outline-variant/25 pl-6 flex items-center justify-center relative overflow-hidden transition-all duration-300">
                      {activeHoverFormat.bottleImage ? (
                        <div className="w-full h-full flex items-center justify-center p-2">
                          <img 
                            key={activeHoverFormat.slug}
                            src={activeHoverFormat.bottleImage} 
                            alt={activeHoverFormat.name} 
                            className="max-h-[430px] w-auto max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] transition-all duration-250 scale-110 hover:scale-115 opacity-100 animate-fade-in block"
                          />
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              )}

              {/* MARKETPLACE CONTENT */}
              {displayedMenu === 'marketplace' && (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 border-b border-outline-variant/30 mb-1">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary/70 font-bold block">
                      Product library
                    </span>
                  </div>
                  <Link
                    to="/marketplace?view=manufacture"
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isMarketplaceActive && (search.includes('view=manufacture') || !search.includes('view=fragrances'))
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface-variant hover:text-primary hover:bg-black/5'
                    }`}
                  >
                    <span>Products library</span>
                    <span className="material-symbols-outlined text-sm">grid_view</span>
                  </Link>
                  <Link
                    to="/marketplace?view=fragrances"
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isMarketplaceActive && search.includes('view=fragrances')
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-on-surface-variant hover:text-primary hover:bg-black/5'
                    }`}
                  >
                    <span>Fragrance Library</span>
                    <span className="material-symbols-outlined text-sm">science</span>
                  </Link>
                </div>
              )}

              {/* JOURNAL CONTENT */}
              {displayedMenu === 'journal' && (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 border-b border-outline-variant/30 mb-1">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary/70 font-bold block">
                      Industry Insights
                    </span>
                  </div>
                  <Link
                    to="/blog"
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-black/5 transition-colors"
                  >
                    All Journal Articles
                  </Link>
                  <Link
                    to="/blog"
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-black/5 transition-colors"
                  >
                    Market Trends & Minimalist Scents
                  </Link>
                  <Link
                    to="/blog"
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-black/5 transition-colors"
                  >
                    IFRA Regulation & Compliance
                  </Link>
                  <Link
                    to="/blog"
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-black/5 transition-colors"
                  >
                    Packaging Economics & MOQs
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className="md:hidden text-primary p-2 focus:outline-none rounded-lg active:bg-black/5 cursor-pointer"
            aria-label="Open Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </div>
    </header>

    {/* RESTRUCTURED SMOOTH LAYERED MOBILE NAVIGATION DRAWER */}
    <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Subtle Backdrop Overlay */}
            <motion.div
              key="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleCloseDrawer}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[99] md:hidden"
              aria-hidden="true"
            />

            {/* Premium Sliding Navigation Drawer Panel */}
            <motion.div
              key="mobile-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 right-0 h-full w-[88vw] max-w-[380px] sm:max-w-[400px] bg-[#faf8f5] z-[100] md:hidden shadow-[0px_0px_50px_rgba(14,50,55,0.2)] flex flex-col font-body-md text-[#0e3237] border-l border-[#0e3237]/10 overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {/* Drawer Header Bar */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#0e3237]/10 bg-[#faf8f5]/95 backdrop-blur-md shrink-0 min-h-[64px]">
                {menuStack.length > 1 ? (
                  <button
                    type="button"
                    onClick={popScreen}
                    className="flex items-center gap-2 text-[#0e3237] font-headline-md text-xs sm:text-sm font-bold tracking-wider hover:text-secondary transition-colors cursor-pointer py-1.5 focus:outline-none"
                    aria-label="Back to previous menu"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    <span className="truncate max-w-[200px] uppercase">{currentScreen.title}</span>
                  </button>
                ) : (
                  <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="flex items-center shrink-0"
                    aria-label="Parallax Perfumery Home"
                  >
                    <img
                      src="/images/parallax-black-logo.png"
                      alt="Parallax Perfumery"
                      className="h-[36px] sm:h-[42px] w-auto object-contain"
                    />
                  </Link>
                )}

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className="text-[#0e3237] p-2 rounded-full hover:bg-[#0e3237]/5 active:scale-95 focus:outline-none transition-all cursor-pointer"
                    aria-label="Close menu"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>
              </div>

              {/* Layered Submenu Directional Viewport */}
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence initial={false} mode="wait" custom={slideDirection}>
                  <motion.div
                    key={menuStack.length}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full overflow-y-auto px-6 py-6 space-y-1.5"
                  >
                    {/* LEVEL 0: ROOT MAIN MENU */}
                    {currentScreen.level === 'root' && (
                      <div className="space-y-2.5 py-2">
                        {/* 1. CAPABILITIES */}
                        <button
                          type="button"
                          onClick={() => pushScreen({ level: 'capabilities', title: 'CAPABILITIES' })}
                          className="w-full min-h-[52px] px-5 py-3.5 rounded-xl bg-white/70 hover:bg-white border border-[#0e3237]/8 flex items-center justify-between font-headline-md text-base font-bold tracking-wider text-primary shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                        >
                          <span>CAPABILITIES</span>
                          <span className="material-symbols-outlined text-xl text-secondary">chevron_right</span>
                        </button>

                        {/* 2. MARKETPLACE */}
                        <button
                          type="button"
                          onClick={() => pushScreen({ level: 'marketplace', title: 'MARKETPLACE' })}
                          className="w-full min-h-[52px] px-5 py-3.5 rounded-xl bg-white/70 hover:bg-white border border-[#0e3237]/8 flex items-center justify-between font-headline-md text-base font-bold tracking-wider text-primary shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                        >
                          <span>MARKETPLACE</span>
                          <span className="material-symbols-outlined text-xl text-secondary">chevron_right</span>
                        </button>

                        {/* 3. BUILD A SAMPLE (DIRECT LINK) */}
                        <Link
                          to="/build-sample"
                          onClick={handleLinkClick}
                          className="w-full min-h-[52px] px-5 py-3.5 rounded-xl bg-white/70 hover:bg-white border border-[#0e3237]/8 flex items-center justify-between font-headline-md text-base font-bold tracking-wider text-primary shadow-xs transition-all active:scale-[0.99]"
                        >
                          <span>BUILD A SAMPLE</span>
                          <span className="material-symbols-outlined text-lg text-primary/40">open_in_new</span>
                        </Link>

                        {/* 4. JOURNAL */}
                        <button
                          type="button"
                          onClick={() => pushScreen({ level: 'journal', title: 'JOURNAL' })}
                          className="w-full min-h-[52px] px-5 py-3.5 rounded-xl bg-white/70 hover:bg-white border border-[#0e3237]/8 flex items-center justify-between font-headline-md text-base font-bold tracking-wider text-primary shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                        >
                          <span>JOURNAL</span>
                          <span className="material-symbols-outlined text-xl text-secondary">chevron_right</span>
                        </button>
                      </div>
                    )}

                    {/* LEVEL 1: CAPABILITIES SUBMENU */}
                    {currentScreen.level === 'capabilities' && (
                      <div className="space-y-2.5 py-2">
                        <button
                          type="button"
                          onClick={() => pushScreen({ level: 'oem', title: 'OEM MANUFACTURING' })}
                          className="w-full min-h-[50px] px-5 py-3.5 rounded-xl bg-white/70 hover:bg-white border border-[#0e3237]/8 flex items-center justify-between font-headline-md text-sm font-bold tracking-wider text-primary shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                        >
                          <span>OEM MANUFACTURING</span>
                          <span className="material-symbols-outlined text-xl text-secondary">chevron_right</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => pushScreen({ level: 'manufacture', title: 'MANUFACTURE YOUR OWN' })}
                          className="w-full min-h-[50px] px-5 py-3.5 rounded-xl bg-white/70 hover:bg-white border border-[#0e3237]/8 flex items-center justify-between font-headline-md text-sm font-bold tracking-wider text-primary shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                        >
                          <span>MANUFACTURE YOUR OWN</span>
                          <span className="material-symbols-outlined text-xl text-secondary">chevron_right</span>
                        </button>

                        <div className="pt-3">
                          <Link
                            to="/about"
                            onClick={handleLinkClick}
                            className="w-full min-h-[46px] px-5 py-3 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-wider text-primary flex items-center justify-between transition-colors"
                          >
                            <span>Explore Capabilities Overview</span>
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* LEVEL 2: MANUFACTURE YOUR OWN (INDIVIDUAL PRODUCT OPTIONS) */}
                    {currentScreen.level === 'manufacture' && (
                      <div className="space-y-1.5 py-1">
                        <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#0e3237]/60 font-bold block mb-2 px-1">
                          PRODUCT CATEGORIES
                        </span>
                        {CAPABILITY_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/capabilities/${cat.slug}`}
                            onClick={handleLinkClick}
                            className="flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xl bg-white/60 hover:bg-white border border-[#0e3237]/5 text-sm font-semibold text-[#0e3237]/90 hover:text-primary transition-all active:scale-[0.99]"
                          >
                            <span>{cat.name}</span>
                            <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* LEVEL 2: OEM MANUFACTURING */}
                    {currentScreen.level === 'oem' && (
                      <div className="space-y-1.5 py-1">
                        <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#0e3237]/60 font-bold block mb-2 px-1">
                          OEM SERVICES
                        </span>
                        {OEM_CAPABILITIES.map((oem) => (
                          <Link
                            key={oem.id}
                            to={oem.link}
                            onClick={handleLinkClick}
                            className="flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xl bg-white/60 hover:bg-white border border-[#0e3237]/5 text-sm font-semibold text-[#0e3237]/90 hover:text-primary transition-all active:scale-[0.99]"
                          >
                            <span>{oem.title}</span>
                            <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* LEVEL 1: MARKETPLACE */}
                    {currentScreen.level === 'marketplace' && (
                      <div className="space-y-1.5 py-1">
                        <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#0e3237]/60 font-bold block mb-2 px-1">
                          PRODUCT LIBRARIES
                        </span>
                        <Link
                          to="/marketplace?view=manufacture"
                          onClick={handleLinkClick}
                          className="flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xl bg-white/60 hover:bg-white border border-[#0e3237]/5 text-sm font-semibold text-[#0e3237]/90 hover:text-primary transition-all"
                        >
                          <span>Products Library</span>
                          <span className="material-symbols-outlined text-sm text-secondary">grid_view</span>
                        </Link>
                        <Link
                          to="/marketplace?view=fragrances"
                          onClick={handleLinkClick}
                          className="flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xl bg-white/60 hover:bg-white border border-[#0e3237]/5 text-sm font-semibold text-[#0e3237]/90 hover:text-primary transition-all"
                        >
                          <span>Fragrance Library</span>
                          <span className="material-symbols-outlined text-sm text-secondary">science</span>
                        </Link>
                        <Link
                          to="/marketplace"
                          onClick={handleLinkClick}
                          className="flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xl bg-white/60 hover:bg-white border border-[#0e3237]/5 text-sm font-semibold text-[#0e3237]/90 hover:text-primary transition-all"
                        >
                          <span>All Marketplace Products</span>
                          <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
                        </Link>
                      </div>
                    )}

                    {/* LEVEL 1: JOURNAL */}
                    {currentScreen.level === 'journal' && (
                      <div className="space-y-1.5 py-1">
                        <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#0e3237]/60 font-bold block mb-2 px-1">
                          INSIGHTS & REGULATORY
                        </span>
                        <Link
                          to="/blog"
                          onClick={handleLinkClick}
                          className="block px-4 py-3 min-h-[46px] rounded-xl bg-white/60 hover:bg-white border border-[#0e3237]/5 text-sm font-semibold text-[#0e3237]/90 hover:text-primary transition-all"
                        >
                          All Journal Articles
                        </Link>
                        <Link
                          to="/blog"
                          onClick={handleLinkClick}
                          className="block px-4 py-3 min-h-[46px] rounded-xl bg-white/60 hover:bg-white border border-[#0e3237]/5 text-sm font-semibold text-[#0e3237]/90 hover:text-primary transition-all"
                        >
                          Market Trends & Minimalist Scents
                        </Link>
                        <Link
                          to="/blog"
                          onClick={handleLinkClick}
                          className="block px-4 py-3 min-h-[46px] rounded-xl bg-white/60 hover:bg-white border border-[#0e3237]/5 text-sm font-semibold text-[#0e3237]/90 hover:text-primary transition-all"
                        >
                          IFRA Regulation & Compliance
                        </Link>
                        <Link
                          to="/blog"
                          onClick={handleLinkClick}
                          className="block px-4 py-3 min-h-[46px] rounded-xl bg-white/60 hover:bg-white border border-[#0e3237]/5 text-sm font-semibold text-[#0e3237]/90 hover:text-primary transition-all"
                        >
                          Packaging Economics & MOQs
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
