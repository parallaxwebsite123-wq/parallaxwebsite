import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0e3237] text-white pt-16 pb-8 relative z-20 font-body-md border-t border-[#16474e]">
      <div className="w-full px-6 md:px-12 lg:px-16">
        
        {/* AREA 1 — MAIN FOOTER (4 COLUMNS - EDGE TO EDGE SPREAD) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 justify-between">
          
          {/* COLUMN 1 — BRAND */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="font-headline-md text-3xl font-bold tracking-tight text-white group-hover:text-primary-fixed-dim transition-colors">
                Parallax
              </span>
            </Link>
            <p className="font-body-md text-sm text-white/80 leading-relaxed max-w-md">
              Parallax transforms fragrance ideas into market-ready products. From concept and formulation to luxury packaging, sampling, and full-scale OEM / ODM manufacturing.
            </p>
          </div>

          {/* COLUMN 2 — QUICK LINKS */}
          <div className="lg:col-span-3 space-y-4 lg:pl-6">
            <h3 className="font-label-sm text-xs text-white/60 uppercase tracking-widest font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors">
                  Capabilities & Quality
                </Link>
              </li>
              <li>
                <Link to="/build-sample" className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors">
                  Build a Sample
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors">
                  Journal & Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — INFORMATION */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-label-sm text-xs text-white/60 uppercase tracking-widest font-semibold">
              Information
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/request-sample" className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors">
                  B2B Sample Request
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 — CONTACT */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-label-sm text-xs text-white/60 uppercase tracking-widest font-semibold">
              Contact Us
            </h3>
            <div className="space-y-2.5 text-sm text-white/80">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-secondary-fixed-dim">mail</span>
                <a href="mailto:contact@parallaxperfumery.com" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  contact@parallaxperfumery.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-secondary-fixed-dim">precision_manufacturing</span>
                <span>OEM / ODM Manufacturing Specialist</span>
              </p>
              <p className="flex items-start gap-2 pt-1">
                <span className="material-symbols-outlined text-base text-secondary-fixed-dim shrink-0 mt-0.5">location_on</span>
                <span className="leading-relaxed">Gala 123 & 124, 34, Dapode, Om Sainath Complex, Thane - 421302, Maharashtra, India</span>
              </p>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-white/10 my-8"></div>

        {/* AREA 2 — LOWER UTILITY BAR (EDGE TO EDGE SPREAD) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-2">
          
          {/* LEFT: SOCIAL MEDIA */}
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">camera_alt</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">work</span>
            </a>
            <a 
              href="mailto:contact@parallaxperfumery.com" 
              aria-label="Email Us"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>

          {/* CENTER: COPYRIGHT */}
          <div className="font-body-md text-xs text-white/60 text-center">
            © 2026 Parallax Perfumery. All rights reserved.
          </div>

          {/* RIGHT: BACK TO TOP BUTTON */}
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all active:scale-90 shadow-sm"
              title="Back to top"
            >
              <span className="material-symbols-outlined text-xl">arrow_upward</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
