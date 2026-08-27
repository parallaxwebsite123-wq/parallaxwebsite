import { Link } from 'react-router-dom';

export default function Marketplace() {
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
            <Link className="font-label-sm text-label-sm text-secondary font-semibold border-b-2 border-secondary pb-1 uppercase tracking-widest active:scale-95 transition-transform" to="/marketplace">Marketplace</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/build-sample">Build a Sample</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors duration-300 uppercase tracking-widest active:scale-95 transition-transform" to="/about">Capabilities</Link>
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
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12">
          <h1 className="font-headline-lg text-headline-lg text-primary text-center mb-4">Fragrance Library</h1>
          <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-2xl mx-auto">
            Explore our curated marketplace of base formulations and fragrance profiles available for private label manufacturing and brand development.
          </p>
        </div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="glass-panel rounded-xl p-6 sticky top-32">
              <h2 className="font-label-sm text-label-sm text-primary uppercase tracking-widest border-b border-outline-variant pb-4 mb-6">Refine Search</h2>
              
              <div className="mb-8">
                <h3 className="font-body-lg text-body-lg text-primary mb-4">Product Category</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-5 h-5 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" defaultChecked />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Fine Fragrance</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-5 h-5 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Home & Ambient</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-5 h-5 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Personal Care</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-body-lg text-body-lg text-primary mb-4">Fragrance Family</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-5 h-5 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Woody</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-5 h-5 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Fresh</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-5 h-5 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Floral</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-5 h-5 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors">Amber & Oriental</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-grow">
            <div className="flex justify-between items-center mb-8">
              <span className="font-body-md text-body-md text-on-surface-variant">Showing Base Formulations</span>
              <div className="relative">
                <select className="appearance-none bg-transparent font-body-md text-body-md text-primary border border-outline-variant rounded-full px-6 py-2 pr-10 focus:outline-none focus:border-primary transition-colors cursor-pointer" aria-label="Sort by">
                  <option>Most Popular</option>
                  <option>Newest Developments</option>
                  <option>Highest Concentration</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {[
                { title: "PX-104: Amber Resonance", family: "Woody Amber", notes: "Top: Bergamot, Pink Pepper | Heart: Iris, Olibanum | Base: Cedar, Vetiver, Amber", format: "Eau de Parfum, Extrait", longevity: "8-10 Hours", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1EipLAYOO-BThxksFM92AqMAnsoEw0VNhaHTr3BAkDssz2UaHaDumTq_l7sN-wk02S_qbBOTKwbCU3WmaKh14z-dsTsaJ9VZ62TNML3kPqDHQ9dvM35pCWPf54RfTqzjtWr7lj-_AIaAmIE4K1t-3m2R7D3vm0ei3hr6XABktI8QrbzKk3FDDmXJmAKX1ZuvoS4doPNfnFqJ6V_HY9CC-AS8XdsnzH2vmKB0vPHiUXHZ75zO-B4iscA" },
                { title: "PX-209: Midnight Flora", family: "Floral", notes: "Top: Mandarin | Heart: Night Jasmine, Tuberose | Base: Sandalwood, Musk", format: "Eau de Parfum, Body Mist", longevity: "6-8 Hours", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9392Q69nQv_2hZfF_x8L2_O1T36V0qVb5w9O5D1_bX22G9uB05R5tM4R_9Mv-2x5O_v9wZ9h_6W-hX9Yw9_M_XwB08-3wQnJg7bFj7-N_yY7PZfQ9oG4fM3D8_K5oW8wE8fX59vW4zB-q7C46W_4L_R5l7_r9O_tC-A" },
                { title: "PX-042: Oudh Absolute", family: "Oriental", notes: "Top: Saffron | Heart: Rose, Patchouli | Base: Agarwood, Leather", format: "Attar, Extrait", longevity: "12+ Hours", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA" },
                { title: "PX-311: Solar Citrus", family: "Fresh Citrus", notes: "Top: Neroli, Lemon | Heart: Orange Blossom | Base: Sun-baked Clay, Musk", format: "Eau de Toilette, Room Spray", longevity: "4-6 Hours", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2RVrUT9aCMFofBgkTV06mfmP6SRbeYXsJDOUHgTEh45y7X7t0A06bRmomBNmsdPBgtduel1gR7trACZi47jS9yo0mxJ2Bb_nSbISPXyis3T761yLZz_1qZ_iDNyI08hx4dorgK0K1S0UPKeknPIP7gO9hdnV8wSsUV458sGIoL1MoW4leUJADvzOIdInqd4BhPutomPzrgnv18rQEUjEZhfOv33DbxeXKO3SsRdDhhIjO17egF_WJ_w" },
              ].map((item, idx) => (
                <div key={idx} className="glass-panel glass-card-hover rounded-xl overflow-hidden group flex flex-col md:flex-row h-auto md:h-64">
                  <div className="relative w-full md:w-48 shrink-0 overflow-hidden bg-surface-container-low h-48 md:h-full">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" src={item.img} alt={item.title} />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline-md text-headline-md text-primary">{item.title}</h3>
                      <span className="font-label-sm uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-md shrink-0 ml-4">{item.family}</span>
                    </div>
                    
                    <div className="space-y-3 mb-6 mt-2">
                      <p className="font-body-md text-on-surface-variant"><strong className="text-primary font-semibold">Profile:</strong> {item.notes}</p>
                      <p className="font-body-md text-on-surface-variant"><strong className="text-primary font-semibold">Formats:</strong> {item.format}</p>
                      <p className="font-body-md text-on-surface-variant"><strong className="text-primary font-semibold">Longevity:</strong> {item.longevity}</p>
                    </div>

                    <div className="mt-auto pt-5 border-t border-outline-variant/30 flex justify-between items-center">
                      <Link to="/build-sample" className="text-secondary hover:text-primary transition-colors font-label-sm uppercase tracking-widest flex items-center gap-1">
                        Customize Formulation
                      </Link>
                      <Link to="/build-sample" className="btn-primary">
                        Request Sample
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center gap-2">
              <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary font-body-md active" aria-label="Page 1">1</button>
              <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors font-body-md" aria-label="Page 2">2</button>
              <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors font-body-md" aria-label="Next page">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
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
