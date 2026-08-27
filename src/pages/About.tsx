import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen flex flex-col bg-surface-bright">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
        <div className="ambient-blob blob-3"></div>
      </div>
      
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-xl z-50 bg-white/40 backdrop-blur-[40px] border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
        <div className="flex justify-between items-center px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-medium tracking-tight text-primary">Parallax</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/marketplace">Marketplace</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/build-sample">Build a Sample</Link>
            <Link className="font-label-sm text-label-sm text-secondary font-semibold border-b-2 border-secondary pb-1 uppercase tracking-widest active:scale-95 transition-transform" to="/about">Capabilities</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/blog">Journal</Link>
          </nav>
          <div className="flex gap-4">
            <Link aria-label="admin_panel_settings" className="text-primary hover:bg-white/20 transition-all duration-300 p-2 rounded-full active:scale-95" to="/admin">
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </Link>
            <Link aria-label="person" className="text-primary hover:bg-white/20 transition-all duration-300 p-2 rounded-full active:scale-95" to="/profile">
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-24">
        <section className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-[60vh] flex items-center mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative z-10">
              <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-6">Precision Manufacturing</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                Parallax doesn't simply manufacture perfume. We help build fragrance brands. Operating out of our state-of-the-art facilities in India, we provide end-to-end OEM & ODM solutions for luxury brands worldwide.
              </p>
              <div className="flex gap-6">
                <div className="glass-panel p-6 rounded-xl flex-1 text-center">
                  <span className="font-headline-md text-headline-md text-secondary block mb-2">IFRA</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Certified</span>
                </div>
                <div className="glass-panel p-6 rounded-xl flex-1 text-center">
                  <span className="font-headline-md text-headline-md text-secondary block mb-2">10k+</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Monthly Capacity</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative h-[50vh] md:h-[70vh] w-full rounded-2xl overflow-hidden glass-panel p-2">
               <img className="w-full h-full object-cover rounded-xl opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y0J28W5-U7zX4rP9V3oK6M92N_5nQ_lO-3mF3Z_q1bT-uY9B2D-kH6xU2_C-pG-0sL2uO7gY6bE-9hI_kM_aL7gZ_eU6V_lV8Z7Y_iP3kQ-6jW-0nR-gZ9-1M3_gR-6_Y_4L6vL_6K3wK_3P6fN8V6Z-1_bJ3tC_Q" alt="Our Manufacturing Facility" />
            </div>
          </div>
        </section>

        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-32">
          <div className="glass-panel rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed/30 to-transparent z-0"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="material-symbols-outlined text-4xl text-secondary mb-6 block">precision_manufacturing</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">End-to-End Brand Development</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">
                From initial olfactory profiling and molecular formulation to custom glass tooling, automated filling, and final assembly, our infrastructure is designed to scale with your brand's ambition without compromising on luxury positioning.
              </p>
              <Link to="/build-sample" className="btn-primary text-lg">
                Initiate Project
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 mt-auto bg-surface-bright/20 backdrop-blur-[30px] border-t border-white/30 z-10 relative">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-unit">
          <div className="font-headline-md text-headline-md text-primary mb-4 md:mb-0 flex items-center gap-2">
            Parallax OEM
          </div>
          <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" to="/about">Manufacturing Quality</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" to="/blog">Industry Insights</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" to="/return-policy">Policies</Link>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest cursor-pointer" href="mailto:concierge@parallaxperfumery.com">Contact Specialist</a>
          </nav>
          <div className="font-body-md text-body-md text-on-surface-variant text-sm">
            © 2024 Parallax Perfumery. Where Fragrance Ideas Become Brands.
          </div>
        </div>
      </footer>
    </div>
  );
}
