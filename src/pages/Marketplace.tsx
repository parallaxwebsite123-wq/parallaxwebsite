import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MotionReveal from '../components/MotionReveal';
import { CAPABILITY_CATEGORIES } from '../data/capabilities';

const FRAGRANCE_PRODUCTS = [
  { 
    id: "px-104",
    title: "PX-104: Amber Resonance", 
    family: "Woody Amber", 
    notes: "Top: Bergamot, Pink Pepper | Heart: Iris, Olibanum | Base: Cedar, Vetiver, Amber", 
    format: "Eau de Parfum, Extrait", 
    longevity: "8-10 Hours", 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA" 
  },
  { 
    id: "px-209",
    title: "PX-209: Midnight Flora", 
    family: "Floral", 
    notes: "Top: Mandarin | Heart: Night Jasmine, Tuberose | Base: Sandalwood, Musk", 
    format: "Eau de Parfum, Body Mist", 
    longevity: "6-8 Hours", 
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1000" 
  },
  { 
    id: "px-042",
    title: "PX-042: Oudh Absolute", 
    family: "Oriental", 
    notes: "Top: Saffron | Heart: Rose, Patchouli | Base: Agarwood, Leather", 
    format: "Attar, Extrait", 
    longevity: "12+ Hours", 
    img: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=1000" 
  },
  { 
    id: "px-311",
    title: "PX-311: Solar Citrus", 
    family: "Fresh Citrus", 
    notes: "Top: Neroli, Lemon | Heart: Orange Blossom | Base: Sun-baked Clay, Musk", 
    format: "Eau de Toilette, Room Spray", 
    longevity: "4-6 Hours", 
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000" 
  }
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800";

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawView = searchParams.get('view');
  const activeView = rawView === 'fragrances' ? 'fragrances' : 'manufacture';

  const setViewMode = (mode: 'manufacture' | 'fragrances') => {
    setSearchParams({ view: mode });
  };

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen flex flex-col bg-surface-bright">
      {/* Ambient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
        <div className="ambient-blob blob-3"></div>
      </div>
      
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Page Header */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-8 text-center">
          <span className="font-label-sm text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">
            PARALLAX OEM & FRAGRANCE MARKETPLACE
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-headline-lg text-primary mb-4 font-bold">
            {activeView === 'manufacture' ? 'Manufacturing Capabilities' : 'Fragrance Library'}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            {activeView === 'manufacture' 
              ? 'Explore our full spectrum of private-label, OEM/ODM fragrance formats and custom manufacturing capabilities.'
              : 'Explore our curated marketplace of base formulations and fragrance profiles available for private label manufacturing.'}
          </p>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          {/* Mode Switcher Tabs — Replaces "Showing Base Formulations" */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-outline-variant/30">
            
            {/* Clear Toggle Buttons */}
            <div className="inline-flex p-1.5 bg-white/50 backdrop-blur-md rounded-full border border-white/60 shadow-sm">
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

            {/* Right side info / Sort control */}
            <div className="flex items-center gap-4">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant/80">
                {activeView === 'manufacture' ? '9 Capabilities Available' : '4 Base Formulations'}
              </span>
              {activeView === 'fragrances' && (
                <div className="relative">
                  <select className="appearance-none bg-white/40 font-body-md text-xs text-primary border border-outline-variant/60 rounded-full px-5 py-2 pr-9 focus:outline-none focus:border-primary transition-colors cursor-pointer" aria-label="Sort by">
                    <option>Most Popular</option>
                    <option>Newest Developments</option>
                    <option>Highest Concentration</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary text-sm">expand_more</span>
                </div>
              )}
            </div>
          </div>

          {/* VIEW MODE 1 — MANUFACTURE GRID (2-COLUMN MOBILE, 5-COLUMN DESKTOP LAYOUT) */}
          {activeView === 'manufacture' && (
            <MotionReveal>
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
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
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <aside className="w-full lg:w-64 shrink-0">
                <div className="glass-panel rounded-2xl p-6 sticky top-32 border border-white/50">
                  <h2 className="font-label-sm text-xs text-primary uppercase tracking-widest border-b border-outline-variant/50 pb-4 mb-6 font-bold">Refine Search</h2>
                  
                  <div className="mb-8">
                    <h3 className="font-body-lg text-sm text-primary font-bold mb-4">Product Category</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="appearance-none w-4 h-4 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" defaultChecked />
                        <span className="font-body-md text-xs text-on-surface-variant group-hover:text-primary transition-colors">Fine Fragrance</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="appearance-none w-4 h-4 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                        <span className="font-body-md text-xs text-on-surface-variant group-hover:text-primary transition-colors">Home & Ambient</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="appearance-none w-4 h-4 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                        <span className="font-body-md text-xs text-on-surface-variant group-hover:text-primary transition-colors">Personal Care</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-body-lg text-sm text-primary font-bold mb-4">Fragrance Family</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="appearance-none w-4 h-4 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                        <span className="font-body-md text-xs text-on-surface-variant group-hover:text-primary transition-colors">Woody</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="appearance-none w-4 h-4 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                        <span className="font-body-md text-xs text-on-surface-variant group-hover:text-primary transition-colors">Fresh</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="appearance-none w-4 h-4 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                        <span className="font-body-md text-xs text-on-surface-variant group-hover:text-primary transition-colors">Floral</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="appearance-none w-4 h-4 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                        <span className="font-body-md text-xs text-on-surface-variant group-hover:text-primary transition-colors">Amber & Oriental</span>
                      </label>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Fragrance Products Grid (2-Column Mobile, 2-Column Desktop) */}
              <div className="flex-grow">
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-3.5 sm:gap-6">
                  {FRAGRANCE_PRODUCTS.map((item) => (
                    <div key={item.id} className="glass-panel glass-card-hover rounded-2xl overflow-hidden group flex flex-col md:flex-row h-auto md:h-64 border border-white/50">
                      
                      {/* Audited Image Frame with Fallback Handler */}
                      <div className="relative w-full md:w-48 shrink-0 overflow-hidden bg-black/5 h-48 md:h-full">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block" 
                          src={item.img} 
                          alt={item.title} 
                          onError={(e) => {
                            // Graceful fallback image if source URL fails to load
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-headline-md text-lg font-bold text-primary">{item.title}</h3>
                          <span className="font-label-sm text-[10px] uppercase tracking-widest bg-primary/10 text-primary px-2.5 py-1 rounded-md shrink-0 ml-4 font-bold">
                            {item.family}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-4 mt-2 text-xs">
                          <p className="font-body-md text-on-surface-variant">
                            <strong className="text-primary font-semibold">Profile:</strong> {item.notes}
                          </p>
                          <p className="font-body-md text-on-surface-variant">
                            <strong className="text-primary font-semibold">Formats:</strong> {item.format}
                          </p>
                          <p className="font-body-md text-on-surface-variant">
                            <strong className="text-primary font-semibold">Longevity:</strong> {item.longevity}
                          </p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                          <Link to="/build-sample" className="text-secondary hover:text-primary transition-colors font-label-sm text-xs uppercase tracking-widest flex items-center gap-1 font-bold">
                            Customize Formulation
                          </Link>
                          <Link to="/build-sample" className="btn-primary py-2 px-4 text-xs uppercase tracking-widest">
                            Request Sample
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-center gap-2">
                  <button className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-primary font-body-md font-bold active" aria-label="Page 1">1</button>
                  <button className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors font-body-md" aria-label="Page 2">2</button>
                  <button className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors font-body-md" aria-label="Next page">
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
