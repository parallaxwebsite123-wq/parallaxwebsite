import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import MotionReveal from '../components/MotionReveal';
import { motion } from 'motion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'hero-video'), (docSnap) => {
      if (docSnap.exists() && docSnap.data().url) {
        setVideoUrl(docSnap.data().url);
      } else {
        setVideoUrl(null);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen flex flex-col">
      
      {/* Gradient Foundation (Fallback) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-3]">
        <div className="ambient-blob blob-1"></div>
        <div className="ambient-blob blob-2"></div>
        <div className="ambient-blob blob-3"></div>
      </div>

      {/* Hero Video */}
      {videoUrl && (
        <div className="absolute top-0 left-0 w-full h-screen z-[-2] overflow-hidden">
          <motion.video 
            ref={videoRef}
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setVideoReady(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Hero Video Overlay */}
      {videoUrl && (
        <div className="absolute top-0 left-0 w-full h-screen z-[-1] bg-surface/40 backdrop-blur-[2px] pointer-events-none"></div>
      )}
      
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-xl z-50 bg-white/40 backdrop-blur-[40px] border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
        <div className="flex justify-between items-center px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-medium tracking-tight text-primary">Parallax</span>
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link className="font-label-sm text-label-sm text-secondary font-semibold border-b-2 border-secondary pb-1 uppercase tracking-widest active:scale-95 transition-transform" to="/marketplace">Marketplace</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/build-sample">Build a Sample</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/about">Capabilities</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/blog">Journal</Link>
          </nav>
          <div className="flex gap-4">
            <Link aria-label="person" className="text-primary hover:bg-white/20 transition-all duration-300 p-2 rounded-full active:scale-95" to="/profile">
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-24 relative">
        <section className="relative w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-[80vh] flex items-center justify-center mb-32 z-10">
          <div className="glass-panel rounded-xl p-8 md:p-16 max-w-4xl w-full text-center relative mx-4 border border-white/40 shadow-xl backdrop-blur-md">
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="inline-block px-4 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-sm text-label-sm uppercase tracking-widest mb-6 border border-white/50 shadow-sm"
            >
              OEM / ODM Manufacturing
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-6"
            >
              BUILD YOUR FRAGRANCE BRAND.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="font-body-lg text-body-lg text-primary max-w-2xl mx-auto mb-10 font-medium drop-shadow-md"
            >
              From concept and fragrance development to packaging, sampling and full-scale manufacturing, Parallax transforms fragrance ideas into market-ready products.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link to="/build-sample" className="btn-primary py-4 px-8 text-lg w-full sm:w-auto">
                Create Your Fragrance
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center bg-white text-primary font-body-md font-semibold py-4 px-8 rounded-xl shadow-md hover:bg-white/90 transition-all duration-300 active:scale-95 w-full sm:w-auto">
                Explore Our Capabilities
              </Link>
            </motion.div>
          </div>
          
          <div className="absolute inset-0 z-[-1] flex items-center justify-center opacity-30 mix-blend-multiply pointer-events-none">
             {!videoUrl && (
               <img className="w-full h-full object-cover max-w-5xl max-h-[80vh] rounded-3xl blur-[2px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2RVrUT9aCMFofBgkTV06mfmP6SRbeYXsJDOUHgTEh45y7X7t0A06bRmomBNmsdPBgtduel1gR7trACZi47jS9yo0mxJ2Bb_nSbISPXyis3T761yLZz_1qZ_iDNyI08hx4dorgK0K1S0UPKeknPIP7gO9hdnV8wSsUV458sGIoL1MoW4leUJADvzOIdInqd4BhPutomPzrgnv18rQEUjEZhfOv33DbxeXKO3SsRdDhhIjO17egF_WJ_w" alt="Ethereal Essence Laboratory" />
             )}
          </div>
        </section>

        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-32 relative z-10 bg-surface-bright/50 p-8 rounded-3xl backdrop-blur-sm border border-white/30">
          <MotionReveal delay={0.1}>
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-headline-md text-headline-md text-primary">Manufacturing Capabilities</h2>
              <div className="h-px flex-grow mx-8 bg-gradient-to-r from-transparent via-outline-variant to-transparent opacity-50"></div>
              <Link className="font-label-sm text-label-sm text-secondary uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 group" to="/marketplace">
                View Marketplace
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </MotionReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[300px]">
            <MotionReveal delay={0.2} className="md:col-span-8 h-full">
              <Link className="h-full w-full glass-panel glass-panel-hover rounded-xl overflow-hidden relative group block" to="/marketplace?category=fine-fragrance">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary-container/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <div className="absolute inset-0 z-0">
                  <img className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA" alt="Fine Fragrance" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-white/90 to-transparent">
                  <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:-translate-y-1 transition-transform duration-300">Fine Fragrance</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2 group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                    Eau de Parfum, Extrait, Cologne, Attars & Oils.
                    <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_right_alt</span>
                  </p>
                </div>
              </Link>
            </MotionReveal>

            <MotionReveal delay={0.3} className="md:col-span-4 h-full">
              <Link className="h-full w-full glass-panel glass-panel-hover rounded-xl overflow-hidden relative group block" to="/marketplace?category=personal-care">
                <div className="absolute inset-0 bg-gradient-to-bl from-primary-fixed-dim/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <div className="absolute inset-0 z-0">
                  <img className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity hover:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA" alt="Personal Care" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">Personal Care</h3>
                  <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Body Mists & Deodorants</p>
                </div>
              </Link>
            </MotionReveal>

            <MotionReveal delay={0.4} className="md:col-span-6 h-full">
              <Link className="h-full w-full glass-panel glass-panel-hover rounded-xl overflow-hidden relative group block" to="/marketplace?category=ambient">
                <div className="absolute inset-0 z-0 bg-surface-container-low/50">
                  <div className="w-full h-full bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8bLxdKqxQUfJUkgswReuYaV1zAmpZED6RSzWaKUXf6ZlBr3P05m0fpG7NCBv9G9k3E7axg_zCfpAZW7dYOFfPM3aYQxZJ4ey_B2aETnFfjE1U4ocXj7RNmzQI6R5l-vrIdydP4GBquYnKfU4Jku9GxyH60N57Cwbuu-8b_0Bct3kTinKn43sNMLY890YfZDqFm8vOMlv150RiX99UA_PbY8T-aXqXq1uf8e4NFmFqhBy76y4duszksw')" }}></div>
                </div>
                <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">air</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2">Home & Ambient</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Room Sprays, Reed Diffusers, Candles & Dispensers.</p>
                  </div>
                </div>
              </Link>
            </MotionReveal>

            <MotionReveal delay={0.5} className="md:col-span-6 h-full">
              <Link className="h-full w-full glass-panel glass-panel-hover rounded-xl p-8 relative group block flex flex-col justify-center items-center text-center bg-gradient-to-br from-surface to-surface-container-low" to="/build-sample">
                <span className="material-symbols-outlined text-4xl text-secondary mb-4 group-hover:scale-110 transition-transform duration-300">science</span>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">Custom Development</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">Develop a unique olfactory signature for your brand.</p>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest border-b border-primary pb-1 group-hover:text-secondary group-hover:border-secondary transition-colors">Start Formulation</span>
              </Link>
            </MotionReveal>
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
