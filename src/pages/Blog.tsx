import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Blog() {
  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface-bright flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-3" style={{ width: '600px', height: '600px', top: '5%' }}></div>
      </div>

      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16 text-center">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-4">Industry Insights</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Expert perspectives on fragrance formulation, supply chain logistics, and the business of building a luxury olfactory brand.
          </p>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Featured Article */}
          <div className="md:col-span-12 lg:col-span-8">
            <article className="glass-panel p-2 rounded-2xl h-full flex flex-col group cursor-pointer border border-white/40 hover:border-white transition-colors overflow-hidden">
              <div className="w-full h-72 md:h-96 rounded-xl overflow-hidden relative">
                 <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y0J28W5-U7zX4rP9V3oK6M92N_5nQ_lO-3mF3Z_q1bT-uY9B2D-kH6xU2_C-pG-0sL2uO7gY6bE-9hI_kM_aL7gZ_eU6V_lV8Z7Y_iP3kQ-6jW-0nR-gZ9-1M3_gR-6_Y_4L6vL_6K3wK_3P6fN8V6Z-1_bJ3tC_Q" alt="Featured" />
                 <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary">Market Trends</span>
                 </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-2 block">October 24, 2024</span>
                <h2 className="font-headline-lg text-headline-md md:text-headline-lg text-primary mb-4 group-hover:text-secondary transition-colors">The Shift Toward Iso E Super and Minimalist Formulations in 2025</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">
                  As consumer preferences pivot away from dense, complex orientals toward transparent, skin-like scents, we analyze the manufacturing implications of minimalist perfumery and why high-quality synthetics like Iso E Super are becoming the backbone of modern luxury brands.
                </p>
                <div className="mt-auto">
                   <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary border-b border-primary pb-1">Read Full Article</span>
                </div>
              </div>
            </article>
          </div>

          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-8">
            {/* Article 2 */}
            <article className="glass-panel p-6 rounded-2xl flex-1 group cursor-pointer border border-white/40 hover:border-white transition-colors">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-secondary mb-2 block">Formulation</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary transition-colors text-lg">Navigating IFRA Regulations: A Guide for New Brands</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4 line-clamp-2">Understanding maximum usage levels for natural extracts and how it impacts your final product cost and global compliance.</p>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest text-[10px]">5 Min Read</span>
            </article>

            {/* Article 3 */}
            <article className="glass-panel p-6 rounded-2xl flex-1 group cursor-pointer border border-white/40 hover:border-white transition-colors">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-secondary mb-2 block">Supply Chain</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary transition-colors text-lg">Heavy Glass vs. Minimalist Flacons: Packaging Economics</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4 line-clamp-2">How your choice of primary packaging affects MOQs, shipping logistics, and perceived brand value in the luxury sector.</p>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest text-[10px]">8 Min Read</span>
            </article>
            
            {/* Article 4 */}
            <article className="glass-panel p-6 rounded-2xl flex-1 group cursor-pointer border border-white/40 hover:border-white transition-colors bg-primary/5">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-secondary mb-2 block">Case Study</span>
              <h3 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary transition-colors text-lg">Scaling from 500 to 50,000 Units</h3>
              <p className="font-body-md text-sm text-on-surface-variant mb-4 line-clamp-2">A look at the production timeline and scaling strategies for one of our fastest-growing independent fragrance partners.</p>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest text-[10px]">12 Min Read</span>
            </article>
          </div>

        </div>
      </main>

      <footer className="w-full py-12 mt-auto bg-surface-bright/20 backdrop-blur-[30px] border-t border-white/30 z-10 relative">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-unit">
          <div className="font-headline-md text-headline-md text-primary mb-4 md:mb-0 flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-medium tracking-tight text-primary">Parallax OEM</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" to="/about">Manufacturing Quality</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" to="/blog">Industry Insights</Link>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" href="mailto:contact@parallaxperfumery.com">Contact Specialist</a>
          </nav>
          <div className="font-body-md text-body-md text-on-surface-variant text-sm">
            © 2024 Parallax Perfumery.
          </div>
        </div>
      </footer>
    </div>
  );
}
