import { Link, useParams } from 'react-router-dom';

export default function BlogPost() {
  const { slug } = useParams();

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface-bright flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-3" style={{ width: '600px', height: '600px', top: '5%' }}></div>
      </div>

      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-xl z-50 bg-white/40 backdrop-blur-[40px] border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
        <div className="flex justify-between items-center px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-medium tracking-tight text-primary">Parallax OEM</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/marketplace">Marketplace</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/build-sample">Build a Sample</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/about">Capabilities</Link>
            <Link className="font-label-sm text-label-sm text-secondary font-semibold border-b-2 border-secondary pb-1 uppercase tracking-widest active:scale-95 transition-transform" to="/blog">Journal</Link>
          </nav>
          <div className="flex gap-4">
            <Link aria-label="admin_panel_settings" className="text-primary hover:bg-white/20 transition-all duration-300 p-2 rounded-full active:scale-95" to="/admin">
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-12">
            <Link to="/blog" className="font-label-sm text-label-sm text-secondary uppercase tracking-widest hover:text-primary transition-colors mb-6 inline-block flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Journal
            </Link>
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary mb-4 block">Market Trends • October 24, 2024</span>
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-6">The Shift Toward Iso E Super and Minimalist Formulations in 2025</h1>
            
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden relative mb-12">
               <img className="w-full h-full object-cover mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y0J28W5-U7zX4rP9V3oK6M92N_5nQ_lO-3mF3Z_q1bT-uY9B2D-kH6xU2_C-pG-0sL2uO7gY6bE-9hI_kM_aL7gZ_eU6V_lV8Z7Y_iP3kQ-6jW-0nR-gZ9-1M3_gR-6_Y_4L6vL_6K3wK_3P6fN8V6Z-1_bJ3tC_Q" alt="Featured" />
            </div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-headline-md prose-headings:text-primary prose-p:font-body-lg prose-p:text-on-surface-variant prose-p:leading-relaxed prose-strong:text-primary prose-strong:font-semibold">
            <p>
              As consumer preferences pivot away from dense, complex orientals toward transparent, skin-like scents, we analyze the manufacturing implications of minimalist perfumery and why high-quality synthetics like Iso E Super are becoming the backbone of modern luxury brands.
            </p>
            <h2>The Rise of "Skin Scents"</h2>
            <p>
              The market is seeing a massive surge in demand for fragrances that don't overpower the wearer's natural aroma but instead enhance it. This "your skin but better" trend relies heavily on large molecules that stay close to the skin, offering longevity without overwhelming sillage.
            </p>
            <p>
              For brands developing new lines, this means a fundamental shift in how briefs are structured. Instead of requesting a heavy "beast mode" fragrance, founders are asking for intimacy, transparency, and a clean dry-down.
            </p>
            <h2>Manufacturing Implications</h2>
            <p>
              From an OEM perspective, minimalist formulas are often paradoxically more challenging to compound and stabilize. When a formula only contains 5 to 15 ingredients, the quality of each individual raw material is magnified. There is nowhere to hide imperfections.
            </p>
            <ul>
              <li><strong>Maceration Time:</strong> High-dose synthetic molecules often require specific maceration periods to fully integrate with the alcohol base.</li>
              <li><strong>Filtration:</strong> Specialized chilling and filtration processes must be meticulously controlled to ensure absolute clarity in the final product.</li>
              <li><strong>Cost Structure:</strong> While the number of ingredients is lower, the reliance on patented captive molecules can keep cost-of-goods (COGs) high.</li>
            </ul>
            <h2>How Parallax Can Help</h2>
            <p>
              At Parallax, we specialize in high-precision compounding. Our marketplace formulations include several "transparent" profiles ready for private label, allowing you to quickly capitalize on this trend without the extended timeline of a from-scratch custom development.
            </p>
          </div>
        </article>
      </main>

      <footer className="w-full py-12 mt-auto bg-surface-bright/20 backdrop-blur-[30px] border-t border-white/30 z-10 relative">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-unit">
          <div className="font-headline-md text-headline-md text-primary mb-4 md:mb-0 flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-medium tracking-tight text-primary">Parallax OEM</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" to="/about">Manufacturing Quality</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" to="/blog">Industry Insights</Link>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" href="mailto:concierge@parallaxperfumery.com">Contact Specialist</a>
          </nav>
          <div className="font-body-md text-body-md text-on-surface-variant text-sm">
            © 2024 Parallax Perfumery.
          </div>
        </div>
      </footer>
    </div>
  );
}
