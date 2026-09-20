import { Link } from 'react-router-dom';

export default function RequestSuccess() {
  return (
    <div className="text-on-surface font-body-md text-body-md antialiased min-h-screen bg-surface-bright flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-ethereal z-0"></div>
      
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-lg text-center">
          <div className="w-24 h-24 mx-auto bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center mb-8 border border-white/60 shadow-[0_0_40px_rgba(255,255,255,0.8)] animate-pulse">
            <span className="material-symbols-outlined text-4xl text-primary">check</span>
          </div>
          
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-primary mb-4">
            Request Received
          </h1>
          
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30">
            Thank you. Your sample request <strong>#PRX-0982</strong> is confirmed. A fragrance specialist will review your brief and contact you within 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace" className="iridescent-btn text-white font-label-sm text-label-sm uppercase tracking-widest py-4 px-8 rounded-xl shadow-md">
              Track Request
            </Link>
            <Link to="/marketplace" className="bg-white/40 backdrop-blur-md border border-white/50 text-primary font-label-sm text-label-sm uppercase tracking-widest py-4 px-8 rounded-xl shadow-sm hover:bg-white/60 transition-colors">
              Continue Exploring
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
