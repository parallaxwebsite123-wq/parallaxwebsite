import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Profile() {
  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface-bright flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-1" style={{ width: '400px', height: '400px', top: '10%' }}></div>
        <div className="ambient-blob blob-2" style={{ width: '500px', height: '500px', bottom: '10%', right: '-100px' }}></div>
      </div>

      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Profile Sidebar */}
          <aside className="lg:col-span-1">
            <div className="glass-panel p-8 rounded-2xl text-center sticky top-32">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary-fixed to-secondary-fixed flex items-center justify-center text-primary font-headline-md text-headline-md mb-4 shadow-inner border border-white/50">
                EV
              </div>
              <h1 className="font-headline-md text-headline-md text-primary mb-1">Elara Vance</h1>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-8">Luminous Member since 2024</p>
              
              <nav className="flex flex-col gap-2 text-left">
                <a href="#" className="font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg bg-white/40 text-primary font-semibold flex items-center gap-3 border border-white/50 shadow-sm">
                  <span className="material-symbols-outlined text-secondary">history</span> Order History
                </a>
                <a href="#" className="font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg text-on-surface-variant hover:bg-white/20 hover:text-primary transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined">favorite</span> Saved Essences
                </a>
                <a href="#" className="font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg text-on-surface-variant hover:bg-white/20 hover:text-primary transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined">settings</span> Settings
                </a>
                <a href="#" className="font-label-sm text-label-sm uppercase tracking-widest p-3 rounded-lg text-on-surface-variant hover:bg-white/20 hover:text-primary transition-colors flex items-center gap-3 mt-8">
                  <span className="material-symbols-outlined text-outline">logout</span> Sign Out
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <section className="glass-panel p-8 rounded-2xl">
               <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-outline-variant/50 pb-4">Recent Orders</h2>
               
               <div className="space-y-6">
                 {/* Order Item */}
                 <div className="bg-white/30 rounded-xl p-6 border border-white/40 hover:bg-white/50 transition-colors">
                   <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                     <div>
                       <span className="font-label-sm text-primary font-bold tracking-widest block mb-1 text-sm">Order #PRX-0982</span>
                       <span className="font-body-md text-on-surface-variant text-sm">Placed on October 24, 2024</span>
                     </div>
                     <div className="text-right">
                       <span className="font-headline-md text-primary tracking-widest block mb-1 text-lg font-bold">$223.45</span>
                       <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-label-sm tracking-widest rounded-full">In Transit</span>
                     </div>
                   </div>
                   
                   <div className="flex gap-4 items-center border-t border-outline-variant/30 pt-4">
                     <div className="flex -space-x-4">
                       <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA" alt="Item" />
                       <img className="w-12 h-12 rounded-full border-2 border-white object-cover mix-blend-luminosity bg-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y0J28W5-U7zX4rP9V3oK6M92N_5nQ_lO-3mF3Z_q1bT-uY9B2D-kH6xU2_C-pG-0sL2uO7gY6bE-9hI_kM_aL7gZ_eU6V_lV8Z7Y_iP3kQ-6jW-0nR-gZ9-1M3_gR-6_Y_4L6vL_6K3wK_3P6fN8V6Z-1_bJ3tC_Q" alt="Item" />
                     </div>
                     <div className="flex-grow">
                       <p className="font-body-md text-body-md text-on-surface-variant text-sm">Prismatic Woods, Discovery Set</p>
                     </div>
                     <Link to="/track-order" className="btn-primary py-2 px-6 text-sm">
                       Track Order
                     </Link>
                   </div>
                 </div>

                 {/* Order Item Past */}
                 <div className="bg-white/20 rounded-xl p-6 border border-white/30">
                   <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                     <div>
                       <span className="font-label-sm text-primary font-bold tracking-widest block mb-1 text-sm">Order #PRX-0841</span>
                       <span className="font-body-md text-on-surface-variant text-sm">Placed on September 12, 2024</span>
                     </div>
                     <div className="text-right">
                       <span className="font-headline-md text-primary tracking-widest block mb-1 text-lg font-bold">$120.00</span>
                       <span className="inline-block px-3 py-1 bg-surface-container-highest text-on-surface-variant font-label-sm tracking-widest rounded-full">Delivered</span>
                     </div>
                   </div>
                   <div className="flex gap-4 items-center border-t border-outline-variant/30 pt-4">
                     <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA" alt="Item" />
                     <div className="flex-grow">
                       <p className="font-body-md text-body-md text-on-surface-variant text-sm">Lumière No. 1</p>
                     </div>
                     <button className="text-secondary font-label-sm hover:text-primary transition-colors">
                       View Details
                     </button>
                   </div>
                 </div>
               </div>
            </section>

            <section className="glass-panel p-8 rounded-2xl">
               <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-outline-variant/50 pb-4">Aura Profile</h2>
               <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                 <h3 className="font-body-lg text-body-lg text-primary mb-2 flex items-center gap-2">
                   <span className="material-symbols-outlined text-secondary">auto_awesome</span> Your Scent Aura
                 </h3>
                 <p className="font-body-md text-body-md text-on-surface-variant mb-6">Based on your past selections, your preferred olfactory landscape is <strong className="text-primary font-medium">Woody & Ethereal</strong>.</p>
                 <button className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors border-b border-secondary hover:border-primary pb-1">
                   Retake Aura Quiz
                 </button>
               </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 mt-auto border-t border-white/30 z-10 text-center">
        <div className="font-body-md text-body-md text-on-surface-variant text-sm">
          © 2024 Parallax Perfumery. Member Portal.
        </div>
      </footer>
    </div>
  );
}
