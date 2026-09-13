import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CAPABILITY_CATEGORIES, OEM_CAPABILITIES, CapabilityCategory } from '../data/capabilities';

type ActiveMenu = 'capabilities' | 'marketplace' | 'journal' | null;

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;

  // Single Shared Mega-Menu Shell State
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [displayedMenu, setDisplayedMenu] = useState<ActiveMenu>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHoverFormat, setActiveHoverFormat] = useState<CapabilityCategory | null>(null);

  // Hover timeout ref for smooth hover bridge & intent
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile Navigation Drawer States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOemOpen, setMobileOemOpen] = useState(false);
  const [mobileFormatsOpen, setMobileFormatsOpen] = useState(false);
  const [mobileMarketplaceOpen, setMobileMarketplaceOpen] = useState(false);
  const [mobileJournalOpen, setMobileJournalOpen] = useState(false);

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

  // Close menu on ESC key press for accessibility
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
    <header 
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-xl z-50 bg-white/40 backdrop-blur-[40px] border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]"
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-center px-6 md:px-8 py-4 relative">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-headline-md text-headline-md font-medium tracking-tight text-black">Parallax</span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* SINGLE SHARED REUSABLE MEGA-MENU CONTAINER */}
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
          <Link aria-label="person" className="text-primary hover:bg-white/20 transition-all duration-300 p-2 rounded-full active:scale-95" to="/profile">
            <span className="material-symbols-outlined">person</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-primary p-2 focus:outline-none rounded-lg active:bg-black/5"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* FULL-SCREEN PREMIUM MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full min-h-screen bg-[#faf8f5] z-[100] flex flex-col md:hidden text-[#0e3237] animate-fade-in">
          
          {/* Mobile Header Bar inside Drawer */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-[#0e3237]/10 bg-[#faf8f5]/90 backdrop-blur-md shrink-0">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className="font-headline-md text-2xl font-semibold tracking-tight text-[#0e3237]"
            >
              Parallax
            </Link>
            <div className="flex items-center gap-3">
              <Link 
                to="/profile" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#0e3237] p-2 rounded-full hover:bg-black/5" 
                aria-label="Account profile"
              >
                <span className="material-symbols-outlined text-xl">person</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#0e3237] p-2 rounded-full hover:bg-black/5 focus:outline-none"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>
          </div>

          {/* Scrollable Navigation Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            
            {/* CAPABILITIES SECTION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#0e3237]/15">
                <span className="font-headline-md text-lg font-bold tracking-tight text-primary">
                  CAPABILITIES
                </span>
              </div>

              {/* 1. KNOW US (Expanded by Default) */}
              <div className="pl-2 space-y-2">
                <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#0e3237]/70 font-semibold block mb-2">
                  KNOW US
                </span>
                <div className="space-y-1.5">
                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-[#0e3237]/90 hover:text-secondary py-1 transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/about#faqs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-[#0e3237]/90 hover:text-secondary py-1 transition-colors"
                  >
                    FAQs
                  </Link>
                  <Link
                    to="/about#clients"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-[#0e3237]/90 hover:text-secondary py-1 transition-colors"
                  >
                    Clients
                  </Link>
                </div>
              </div>

              <div className="w-full h-px bg-[#0e3237]/10 my-3"></div>

              {/* 2. OEM MANUFACTURING (Accordion) */}
              <div className="pl-2">
                <button
                  type="button"
                  onClick={() => setMobileOemOpen(!mobileOemOpen)}
                  aria-expanded={mobileOemOpen}
                  aria-controls="mobile-oem-list"
                  className="w-full flex items-center justify-between py-2 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#0e3237]/70 font-semibold">
                    OEM MANUFACTURING
                  </span>
                  <span className="text-base font-bold text-secondary w-5 h-5 flex items-center justify-center">
                    {mobileOemOpen ? '−' : '+'}
                  </span>
                </button>

                <div 
                  id="mobile-oem-list"
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    mobileOemOpen ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div className="space-y-2 py-1 pl-1">
                    {OEM_CAPABILITIES.map((oem) => (
                      <Link
                        key={oem.id}
                        to={oem.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-sm font-medium text-[#0e3237]/85 hover:text-primary py-1 transition-colors"
                      >
                        {oem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-[#0e3237]/10 my-3"></div>

              {/* 3. MANUFACTURE YOUR OWN (Accordion with Chevron Arrows) */}
              <div className="pl-2">
                <button
                  type="button"
                  onClick={() => setMobileFormatsOpen(!mobileFormatsOpen)}
                  aria-expanded={mobileFormatsOpen}
                  aria-controls="mobile-formats-list"
                  className="w-full flex items-center justify-between py-2 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-label-sm text-[11px] uppercase tracking-widest text-[#0e3237]/70 font-semibold">
                    MANUFACTURE YOUR OWN
                  </span>
                  <span className="text-base font-bold text-secondary w-5 h-5 flex items-center justify-center">
                    {mobileFormatsOpen ? '−' : '+'}
                  </span>
                </button>

                <div 
                  id="mobile-formats-list"
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    mobileFormatsOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div className="space-y-1 py-1 pl-1">
                    {CAPABILITY_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/capabilities/${cat.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-2 text-sm font-medium text-[#0e3237]/85 hover:text-primary transition-colors border-b border-[#0e3237]/5 last:border-0"
                      >
                        <span>{cat.name}</span>
                        <span className="material-symbols-outlined text-xs text-secondary">arrow_forward</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            <div className="w-full h-px bg-[#0e3237]/15 my-6"></div>

            {/* MARKETPLACE SECTION */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setMobileMarketplaceOpen(!mobileMarketplaceOpen)}
                className="w-full flex items-center justify-between py-2 text-left focus:outline-none font-headline-md text-base font-bold tracking-tight text-primary cursor-pointer"
              >
                <span>MARKETPLACE</span>
                <span className="material-symbols-outlined text-sm text-secondary">
                  {mobileMarketplaceOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {mobileMarketplaceOpen && (
                <div className="pl-4 space-y-2 py-2 border-l-2 border-primary/20">
                  <Link
                    to="/marketplace?view=manufacture"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-[#0e3237]/85 hover:text-primary py-1"
                  >
                    Products library
                  </Link>
                  <Link
                    to="/marketplace?view=fragrances"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-[#0e3237]/85 hover:text-primary py-1"
                  >
                    Fragrance Library
                  </Link>
                </div>
              )}
            </div>

            <div className="w-full h-px bg-[#0e3237]/10 my-4"></div>

            {/* BUILD A SAMPLE */}
            <Link
              to="/build-sample"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-headline-md text-base font-bold tracking-tight text-primary hover:text-secondary transition-colors"
            >
              BUILD A SAMPLE
            </Link>

            <div className="w-full h-px bg-[#0e3237]/10 my-4"></div>

            {/* JOURNAL SECTION */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setMobileJournalOpen(!mobileJournalOpen)}
                className="w-full flex items-center justify-between py-2 text-left focus:outline-none font-headline-md text-base font-bold tracking-tight text-primary cursor-pointer"
              >
                <span>JOURNAL</span>
                <span className="material-symbols-outlined text-sm text-secondary">
                  {mobileJournalOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {mobileJournalOpen && (
                <div className="pl-4 space-y-2 py-2 border-l-2 border-primary/20">
                  <Link
                    to="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-[#0e3237]/85 hover:text-primary py-1"
                  >
                    All Journal Articles
                  </Link>
                  <Link
                    to="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-medium text-[#0e3237]/85 hover:text-primary py-1"
                  >
                    Industry Insights
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
