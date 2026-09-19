import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MotionReveal from '../components/MotionReveal';
import MarketplaceBanner from '../components/MarketplaceBanner';
import { CAPABILITY_CATEGORIES } from '../data/capabilities';
import { fetchFragrances, FragranceItem } from '../services/fragranceService';
import { getPublishedHomepageContent, HomepageContent } from '../services/homepageContent';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800";

const CATEGORIES = [
  "Attars",
  "Eau de Toilette (EDT)",
  "Eau de Parfum (EDP)",
  "Deodorants",
  "Sports / active fragrances",
  "Scented and fragrance candles",
  "Incense products",
  "Dhoop / incense cones",
  "Car Freshners"
];

const FAMILIES = [
  "Woody",
  "Fresh",
  "Floral",
  "Amber & Oriental",
  "Woody Amber"
];

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawView = searchParams.get('view');
  const activeView = rawView === 'fragrances' ? 'fragrances' : 'manufacture';

  const [fragrances, setFragrances] = useState<FragranceItem[]>([]);
  const [cmsContent, setCmsContent] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const [fragranceData, contentData] = await Promise.all([
        fetchFragrances(),
        getPublishedHomepageContent().catch(() => null)
      ]);

      if (isMounted) {
        setFragrances(fragranceData);
        if (contentData) {
          setCmsContent(contentData);
        }
        setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  const setViewMode = (mode: 'manufacture' | 'fragrances') => {
    setSearchParams({ view: mode });
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleFamily = (fam: string) => {
    setSelectedFamilies(prev =>
      prev.includes(fam) ? prev.filter(f => f !== fam) : [...prev, fam]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedFamilies([]);
  };

  const filteredFragrances = useMemo(() => {
    return fragrances.filter(item => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          item.title?.toLowerCase().includes(query) ||
          item.name?.toLowerCase().includes(query) ||
          item.code?.toLowerCase().includes(query) ||
          item.profile?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query) ||
          item.family?.toLowerCase().includes(query) ||
          item.format?.toLowerCase().includes(query);

        if (!matchesQuery) return false;
      }

      // Category filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(item.category)) {
          return false;
        }
      }

      // Family filter
      if (selectedFamilies.length > 0) {
        if (!selectedFamilies.includes(item.family)) {
          return false;
        }
      }

      return true;
    });
  }, [fragrances, searchQuery, selectedCategories, selectedFamilies]);

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen flex flex-col bg-surface-bright">
      {/* Ambient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
        <div className="ambient-blob blob-3"></div>
      </div>
      
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28 md:pt-32 pb-24">
        {/* Full-Width Page Hero Banner */}
        <MarketplaceBanner
          title={activeView === 'manufacture' ? 'Manufacturing Capabilities' : 'Fragrance Library'}
          subtitle={
            activeView === 'manufacture'
              ? 'Explore our full spectrum of private-label, OEM/ODM fragrance formats and custom manufacturing capabilities.'
              : 'Explore our curated marketplace of base formulations and fragrance profiles available for private label manufacturing.'
          }
          imageSrc={
            cmsContent?.marketplaceBanner?.banners?.[0]?.desktop?.url ||
            cmsContent?.marketplaceBanner?.image?.url
          }
        />

        {/* Constrained Page Content Container */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
          
          {/* Mode Switcher Tabs + Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8 pb-6 border-b border-outline-variant/30">
            
            {/* View Mode Toggle Buttons */}
            <div className="inline-flex p-1.5 bg-white/60 backdrop-blur-md rounded-full border border-white/60 shadow-sm shrink-0 self-start md:self-auto">
              <button
                onClick={() => setViewMode('manufacture')}
                className={`font-label-sm text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeView === 'manufacture'
                    ? 'bg-primary text-white font-bold shadow-md'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                MANUFACTURE
              </button>
              <button
                onClick={() => setViewMode('fragrances')}
                className={`font-label-sm text-xs uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeView === 'fragrances'
                    ? 'bg-primary text-white font-bold shadow-md'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                FRAGRANCES
              </button>
            </div>

            {/* Search Input & Item Count */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-grow md:max-w-xl justify-end">
              {activeView === 'fragrances' && (
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search fragrance, notes, profile, category..."
                    className="w-full bg-white/70 backdrop-blur-md font-body-md text-xs sm:text-sm text-primary border border-outline-variant/60 rounded-full pl-10 pr-10 py-2.5 focus:outline-none focus:border-primary transition-all placeholder:text-on-surface-variant/50 shadow-sm"
                  />
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-sm pointer-events-none">
                    search
                  </span>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary text-sm"
                      title="Clear search"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  )}
                </div>
              )}

              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant/80 shrink-0 self-end sm:self-center">
                {activeView === 'manufacture'
                  ? `${CAPABILITY_CATEGORIES.length} Capabilities Available`
                  : `${filteredFragrances.length} Formulations Found`}
              </span>
            </div>
          </div>

          {/* VIEW MODE 1 — MANUFACTURE GRID */}
          {activeView === 'manufacture' && (
            <MotionReveal>
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                  {CAPABILITY_CATEGORIES.map((cat, idx) => (
                    <Link
                      key={cat.id}
                      to={`/capabilities/${cat.slug}`}
                      className="glass-panel glass-card-hover rounded-xl sm:rounded-2xl overflow-hidden group flex flex-col border border-white/50 hover:border-white shadow-sm transition-all duration-300"
                    >
                      {/* Image Frame */}
                      <div className="aspect-[4/3] w-full overflow-hidden bg-black/10 relative">
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/80 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full">
                          <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-widest text-primary font-bold">
                            0{idx + 1}
                          </span>
                        </div>
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
                  ))}
                </div>
              </div>
            </MotionReveal>
          )}

          {/* VIEW MODE 2 — FRAGRANCES LIBRARY */}
          {activeView === 'fragrances' && (
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Filters Sidebar */}
              <aside className="w-full lg:w-72 shrink-0">
                <div className="glass-panel rounded-2xl p-5 sm:p-6 sticky top-28 border border-white/50 shadow-sm">
                  <div className="flex justify-between items-center border-b border-outline-variant/50 pb-4 mb-6">
                    <h2 className="font-label-sm text-xs text-primary uppercase tracking-widest font-bold">
                      Refine Search
                    </h2>
                    {(selectedCategories.length > 0 || selectedFamilies.length > 0 || searchQuery) && (
                      <button
                        onClick={clearFilters}
                        className="text-[11px] text-secondary hover:underline uppercase tracking-wider font-semibold"
                      >
                        Reset All
                      </button>
                    )}
                  </div>
                  
                  {/* Product Category Filter */}
                  <div className="mb-8">
                    <h3 className="font-body-lg text-xs font-bold text-primary uppercase tracking-wider mb-3">
                      Product Category
                    </h3>
                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {CATEGORIES.map(cat => {
                        const checked = selectedCategories.includes(cat);
                        return (
                          <label key={cat} className="flex items-center gap-2.5 cursor-pointer group select-none">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCategory(cat)}
                              className="appearance-none w-4 h-4 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors shrink-0 cursor-pointer"
                            />
                            <span className={`font-body-md text-xs transition-colors ${
                              checked ? 'text-primary font-bold' : 'text-on-surface-variant group-hover:text-primary'
                            }`}>
                              {cat}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fragrance Family Filter */}
                  <div>
                    <h3 className="font-body-lg text-xs font-bold text-primary uppercase tracking-wider mb-3">
                      Fragrance Family
                    </h3>
                    <div className="space-y-2.5">
                      {FAMILIES.map(fam => {
                        const checked = selectedFamilies.includes(fam);
                        return (
                          <label key={fam} className="flex items-center gap-2.5 cursor-pointer group select-none">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleFamily(fam)}
                              className="appearance-none w-4 h-4 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors shrink-0 cursor-pointer"
                            />
                            <span className={`font-body-md text-xs transition-colors ${
                              checked ? 'text-primary font-bold' : 'text-on-surface-variant group-hover:text-primary'
                            }`}>
                              {fam}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Fragrance Cards Grid */}
              <div className="flex-grow w-full">
                {loading ? (
                  <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-body-md text-sm text-on-surface-variant">Loading fragrances...</p>
                  </div>
                ) : filteredFragrances.length === 0 ? (
                  <div className="glass-panel rounded-2xl p-12 text-center border border-white/50 my-4">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-3 block">
                      search_off
                    </span>
                    <h3 className="font-headline-md text-lg text-primary font-bold mb-2">
                      No fragrances found matching your search.
                    </h3>
                    <p className="font-body-md text-xs text-on-surface-variant max-w-md mx-auto mb-6">
                      Try clearing your search query or unchecking categories and fragrance families to see more options.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="btn-primary py-2.5 px-6 text-xs uppercase tracking-widest"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {filteredFragrances.map((item) => (
                      <div
                        key={item.id}
                        className="glass-panel glass-card-hover rounded-2xl overflow-hidden group flex flex-col h-full border border-white/50 shadow-sm transition-all duration-300"
                      >
                        {/* 1. Image Header */}
                        <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden bg-black/5">
                          <img 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block" 
                            src={item.image_url || FALLBACK_IMAGE} 
                            alt={item.title || item.name} 
                            onError={(e) => {
                              e.currentTarget.src = FALLBACK_IMAGE;
                            }}
                          />
                          <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                            <span className="font-label-sm text-[10px] uppercase tracking-wider text-primary font-bold">
                              {item.family}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex flex-col flex-grow bg-white/20">
                          {/* 2. Title */}
                          <h3 className="font-headline-md text-base sm:text-lg font-bold text-primary mb-2 line-clamp-2">
                            {item.title || item.name}
                          </h3>
                          
                          {/* Metadata Stack */}
                          <div className="space-y-2 mb-6 text-xs text-on-surface-variant flex-grow">
                            {/* 3. Profile */}
                            {item.profile && (
                              <p className="font-body-md leading-relaxed">
                                <strong className="text-primary font-semibold block sm:inline">Profile: </strong>
                                {item.profile}
                              </p>
                            )}

                            {/* 4. Formats */}
                            {item.format && (
                              <p className="font-body-md">
                                <strong className="text-primary font-semibold">Formats: </strong> 
                                {item.format}
                              </p>
                            )}

                            {/* 5. Longevity */}
                            {item.longevity && (
                              <p className="font-body-md">
                                <strong className="text-primary font-semibold">Longevity: </strong> 
                                {item.longevity}
                              </p>
                            )}
                          </div>

                          {/* 6. Single Centered EXPLORE Button inside card */}
                          <div className="pt-4 border-t border-outline-variant/30 mt-auto w-full">
                            <Link
                              to="/build-sample"
                              className="btn-primary w-full py-2.5 px-4 text-xs font-bold uppercase tracking-widest text-center block rounded-xl shadow-sm hover:shadow transition-all"
                            >
                              EXPLORE
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

