import { Link } from 'react-router-dom';

export default function Checkout() {
  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface-bright flex flex-col">
      <div className="blob-bg w-[800px] h-[800px] bg-secondary-fixed-dim top-[-200px] left-[-200px]"></div>
      <div className="blob-bg w-[600px] h-[600px] bg-primary-fixed-dim bottom-[-100px] right-[-100px]"></div>

      <header className="w-full border-b border-outline-variant/30 bg-surface-bright/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-medium tracking-tight text-primary">Parallax</span>
          </Link>
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">lock</span> Secure Checkout
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <div className="mb-12">
              <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Checkout</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Please review and complete your order.</p>
            </div>

            <form className="space-y-10">
              <section className="glass-panel p-8 rounded-2xl">
                <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">contact_mail</span> Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Email Address</label>
                    <input type="email" id="email" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary placeholder:text-outline" placeholder="elara.vance@example.com" defaultValue="elara.vance@example.com" />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="appearance-none w-5 h-5 border border-outline rounded-sm checked:bg-primary checked:border-primary transition-colors" defaultChecked />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary transition-colors text-sm">Email me with news and offers</span>
                  </label>
                </div>
              </section>

              <section className="glass-panel p-8 rounded-2xl">
                <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">local_shipping</span> Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="country" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Country/Region</label>
                    <div className="relative">
                      <select id="country" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary appearance-none cursor-pointer">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="firstName" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">First Name</label>
                    <input type="text" id="firstName" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" defaultValue="Elara" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Last Name</label>
                    <input type="text" id="lastName" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" defaultValue="Vance" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Address</label>
                    <input type="text" id="address" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary mb-2" defaultValue="420 Luminous Way" />
                    <input type="text" id="apt" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary placeholder:text-outline" placeholder="Apartment, suite, etc. (optional)" defaultValue="Apt 3B" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">City</label>
                    <input type="text" id="city" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" defaultValue="Los Angeles" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">ZIP Code</label>
                    <input type="text" id="zip" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" defaultValue="90001" />
                  </div>
                </div>
              </section>
              
              <section className="glass-panel p-8 rounded-2xl">
                <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">payment</span> Payment
                </h2>
                <div className="text-on-surface-variant font-body-md mb-4 text-sm bg-primary-fixed-dim/20 p-4 rounded-lg flex items-start gap-2">
                   <span className="material-symbols-outlined text-primary text-base">info</span>
                   This is a secure, encrypted connection.
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Card Number</label>
                    <div className="relative">
                      <input type="text" id="cardNumber" className="w-full glass-input rounded-xl px-4 py-3 pl-12 font-body-md text-primary placeholder:text-outline" placeholder="0000 0000 0000 0000" />
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">credit_card</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="exp" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Expiration Date (MM/YY)</label>
                      <input type="text" id="exp" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary placeholder:text-outline" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Security Code</label>
                      <input type="text" id="cvc" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary placeholder:text-outline" placeholder="CVC" />
                    </div>
                  </div>
                </div>
              </section>

              <Link to="/order-success" className="btn-primary w-full mt-8 py-4 text-lg">
                Complete Purchase
              </Link>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <div className="glass-panel p-8 rounded-2xl sticky top-32">
              <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-outline-variant/50 pb-4">Order Summary</h2>
              
              <div className="space-y-6 mb-8 border-b border-outline-variant/50 pb-8">
                
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-24 bg-surface-container-low rounded-lg overflow-hidden shrink-0 border border-white/40">
                    <img className="w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMdbLYDwtvawQ8hBII-JwKaecMQyRXAQmQtv8cDDv55u7HI87JZVsTGNCImOkuwbEHZ6pl5T_-LVBNd7KBegBdENHJ1DXgLYFgVAZJXO7D9Gc-B7iv1IEhyk2SwERlK-gtZsDvzFOmIwgQpjT0ssjASyHky8KrrRJD7O3QT9E-4zwJwtYYbpvG5C5QDjYBs2w-wTyEtGXZcjkhGnDF_-DxOMo9ezOMs7PNHIPdLMwoiyf6xEquI4IaTA" alt="Prismatic Woods" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-body-lg text-body-lg text-primary mb-1">Prismatic Woods</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-2">50ml / Signature Glass</p>
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Qty: 1</span>
                      <span className="font-label-sm text-label-sm text-primary tracking-widest">$130.00</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-20 h-24 bg-surface-container-low rounded-lg overflow-hidden shrink-0 border border-white/40">
                    <img className="w-full h-full object-cover opacity-90 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Y0J28W5-U7zX4rP9V3oK6M92N_5nQ_lO-3mF3Z_q1bT-uY9B2D-kH6xU2_C-pG-0sL2uO7gY6bE-9hI_kM_aL7gZ_eU6V_lV8Z7Y_iP3kQ-6jW-0nR-gZ9-1M3_gR-6_Y_4L6vL_6K3wK_3P6fN8V6Z-1_bJ3tC_Q" alt="Discovery Set" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-body-lg text-body-lg text-primary mb-1">Discovery Set</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-2">5 x 10ml vials</p>
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Qty: 1</span>
                      <span className="font-label-sm text-label-sm text-primary tracking-widest">$75.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>$205.00</span>
                </div>
                <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant border-b border-outline-variant/50 pb-4">
                  <span>Taxes (Estimated)</span>
                  <span>$18.45</span>
                </div>
                <div className="flex justify-between items-center pt-6 mt-4 border-t border-outline-variant/50">
                  <span className="font-headline-md text-headline-md text-primary">Total</span>
                  <span className="font-headline-md text-headline-md text-primary font-bold">$223.45</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="w-full py-6 bg-surface-bright/20 backdrop-blur-[30px] border-t border-white/30 z-10 text-center">
        <div className="font-body-md text-body-md text-on-surface-variant text-sm">
          © 2024 Parallax Perfumery. Secure Checkout.
        </div>
      </footer>
    </div>
  );
}
