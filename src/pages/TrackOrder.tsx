import { Link } from 'react-router-dom';

export default function TrackOrder() {
  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-2" style={{ animationDelay: '-5s' }}></div>
      </div>

      <header className="w-full bg-white/40 backdrop-blur-md sticky top-0 z-50 border-b border-white/50 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-medium tracking-tight text-primary">Parallax</span>
          </Link>
          <Link to="/profile" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">close</span> Close Tracker
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Order PRX-0982</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Arriving on Oct 28, 2024</p>
            </div>

            <div className="relative mb-16 pt-8 pb-4 px-4">
              <div className="progress-line w-full left-0"></div>
              <div className="progress-line progress-line-fill w-1/2 left-0 absolute top-1/2 -translate-y-1/2 z-[-1]"></div>
              
              <div className="flex justify-between relative z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-sphere completed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-lg">check</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest text-[10px] md:text-xs text-center">Confirmed</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-sphere active flex items-center justify-center text-secondary relative">
                    <span className="material-symbols-outlined text-lg animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                    <div className="absolute inset-0 rounded-full border border-secondary/30 animate-ping"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest text-[10px] md:text-xs text-center font-bold">In Transit</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass-sphere flex items-center justify-center text-outline">
                    <span className="material-symbols-outlined text-lg">home</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest text-[10px] md:text-xs text-center">Delivered</span>
                </div>
              </div>
            </div>

            <div className="bg-white/40 rounded-xl p-6 border border-white/50 mb-8">
              <h2 className="font-body-lg text-body-lg text-primary mb-4 border-b border-outline-variant/30 pb-2">Latest Updates</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest w-24 shrink-0">Oct 26, 8:42 AM</span>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Departed regional facility. <br/><em>Los Angeles, CA</em></p>
                </div>
                <div className="flex gap-4 opacity-60">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest w-24 shrink-0">Oct 25, 6:15 PM</span>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Package processed at origin facility. <br/><em>San Francisco, CA</em></p>
                </div>
                <div className="flex gap-4 opacity-60">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest w-24 shrink-0">Oct 24, 10:05 AM</span>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">Tracking number generated. Order confirmed.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="font-label-sm text-label-sm uppercase tracking-widest text-primary hover:text-secondary transition-colors border-b border-primary hover:border-secondary pb-1">
                View Order Details
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
