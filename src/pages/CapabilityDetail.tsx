import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MotionReveal from '../components/MotionReveal';
import { getCapabilityBySlug, CAPABILITY_CATEGORIES } from '../data/capabilities';

export default function CapabilityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const capability = getCapabilityBySlug(slug || '');

  if (!capability) {
    return <Navigate to="/marketplace?view=manufacture" replace />;
  }

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

      <main className="flex-grow pt-32 pb-24 relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          {/* Breadcrumb & Navigation */}
          <div className="mb-8 flex items-center gap-2 text-xs font-label-sm uppercase tracking-widest text-on-surface-variant/80">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/marketplace?view=manufacture" className="hover:text-primary transition-colors">Capabilities</Link>
            <span>/</span>
            <span className="text-primary font-bold">{capability.name}</span>
          </div>

          {/* Hero Header Card */}
          <MotionReveal>
            <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/60 shadow-[0px_20px_60px_rgba(45,90,97,0.08)] mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="font-label-sm text-xs uppercase tracking-widest text-secondary font-bold bg-secondary/10 px-3.5 py-1.5 rounded-full inline-block">
                  PARALLAX OEM / ODM MANUFACTURING
                </span>
                <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl text-primary font-bold tracking-tight">
                  {capability.name}
                </h1>
                <p className="font-body-lg text-lg text-primary/80 font-medium">
                  {capability.subtitle}
                </p>
                <p className="font-body-md text-on-surface-variant text-base leading-relaxed">
                  {capability.description}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link to="/build-sample" className="btn-primary py-3 px-6 text-xs uppercase tracking-widest inline-flex items-center gap-2">
                    Request Custom Quote <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                  <Link to="/marketplace?view=manufacture" className="px-6 py-3 rounded-full border border-outline-variant text-on-surface-variant font-label-sm text-xs uppercase tracking-widest hover:bg-white/40 transition-colors">
                    Explore All Capabilities
                  </Link>
                </div>
              </div>

              {/* Capability Visual Frame */}
              <div className="lg:col-span-5">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-white/50 relative group">
                  <img 
                    src={capability.image} 
                    alt={capability.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest opacity-80 block mb-1">Manufacturing Standard</span>
                    <span className="font-headline-md text-sm font-bold block">{capability.name} Accord</span>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>

          {/* Key Manufacturing Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-8 space-y-8">
              <div className="glass-panel p-8 rounded-2xl border border-white/50 space-y-6">
                <h2 className="font-headline-md text-2xl text-primary font-bold">Manufacturing Capabilities & Specifications</h2>
                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                  Our state-of-the-art facilities and experienced perfumery team support end-to-end production of {capability.name.toLowerCase()} for independent, emerging, and established global fragrance brands.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {capability.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white/40 p-4 rounded-xl border border-white/50">
                      <span className="material-symbols-outlined text-secondary text-xl shrink-0 mt-0.5">check_circle</span>
                      <span className="font-body-md text-xs font-semibold text-primary">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry & Contact Box */}
              <div className="glass-panel p-8 rounded-2xl border border-white/50 bg-primary/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="font-headline-md text-xl text-primary font-bold mb-2">Interested in manufacturing {capability.name}?</h3>
                  <p className="font-body-md text-sm text-on-surface-variant">Speak directly with our compounding specialists to request samples or discuss MOQs.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Link 
                    to="/request-sample"
                    className="btn-primary py-3 px-6 text-xs uppercase tracking-widest text-center"
                  >
                    DOUBTS? CONTACT US →
                  </Link>
                  <div className="text-right text-xs text-on-surface-variant font-mono space-y-0.5">
                    <div>contact@parallaxperfumery.com</div>
                    <div>+1 (800) 555-0199</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar — Other Capabilities */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/50">
                <h3 className="font-label-sm text-xs text-primary uppercase tracking-widest border-b border-outline-variant/40 pb-3 mb-4 font-bold">
                  Explore Other Capabilities
                </h3>
                <div className="space-y-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/capabilities/${rel.slug}`}
                      className="group flex items-center gap-4 p-3 rounded-xl bg-white/30 hover:bg-white/60 border border-white/40 transition-colors"
                    >
                      <img 
                        src={rel.image} 
                        alt={rel.name} 
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="overflow-hidden">
                        <span className="font-headline-md text-xs font-bold text-primary group-hover:text-secondary transition-colors block truncate">
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
