import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function RequestSample() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/request-success');
  };

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface-bright flex flex-col">
      <div className="blob-bg w-[800px] h-[800px] bg-secondary-fixed-dim top-[-200px] left-[-200px]"></div>
      <div className="blob-bg w-[600px] h-[600px] bg-primary-fixed-dim bottom-[-100px] right-[-100px]"></div>

      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <div className="mb-12">
              <h1 className="font-headline-lg text-headline-lg text-primary mb-2">Claim Your Sample</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Tell us about your fragrance project. Our fragrance specialists will contact you to discuss formulation, packaging, MOQ, pricing and production.</p>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <section className="glass-panel p-8 rounded-2xl">
                <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">business</span> Business Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="company" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Company / Brand Name *</label>
                    <input type="text" id="company" required className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" placeholder="Enter your business name" />
                  </div>
                  <div>
                    <label htmlFor="firstName" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">First Name *</label>
                    <input type="text" id="firstName" required className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Last Name *</label>
                    <input type="text" id="lastName" required className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Business Email *</label>
                    <input type="email" id="email" required className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary placeholder:text-outline" placeholder="you@company.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Phone Number *</label>
                    <input type="tel" id="phone" required className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" />
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">WhatsApp Number (Optional)</label>
                    <input type="tel" id="whatsapp" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" />
                  </div>
                  <div className="md:col-span-2">
                     <label htmlFor="type" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Business Type *</label>
                     <select id="type" required className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary appearance-none cursor-pointer">
                        <option value="">Select an option...</option>
                        <option>DTC Brand</option>
                        <option>Retailer / Boutique</option>
                        <option>Hospitality / Hotel</option>
                        <option>Corporate Gifting</option>
                        <option>Entrepreneur / Startup</option>
                      </select>
                  </div>
                </div>
              </section>

              <section className="glass-panel p-8 rounded-2xl">
                <h2 className="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">local_shipping</span> Delivery Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="country" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Country/Region *</label>
                    <div className="relative">
                      <select id="country" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary appearance-none cursor-pointer">
                        <option>India</option>
                        <option>United Arab Emirates</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Singapore</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Address *</label>
                    <input type="text" id="address" required className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary mb-2" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">City *</label>
                    <input type="text" id="city" required className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Postal / ZIP Code *</label>
                    <input type="text" id="zip" required className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" />
                  </div>
                  <div className="md:col-span-2 mt-4">
                    <label htmlFor="notes" className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Additional Project Details</label>
                    <textarea id="notes" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary min-h-[100px]" placeholder="Tell us more about your vision, specific packaging requests, or target pricing..."></textarea>
                  </div>
                </div>
              </section>

              <button type="submit" className="w-full block text-center iridescent-btn text-white font-label-sm text-label-sm uppercase tracking-widest py-4 rounded-xl shadow-md cursor-pointer border-none">
                Request My Sample
              </button>
              <p className="text-center font-body-md text-xs text-on-surface-variant mt-4">
                By submitting, you agree to our B2B manufacturing terms. No payment is required for initial sampling.
              </p>
            </form>
          </div>

          <aside className="lg:col-span-5">
            <div className="glass-panel p-8 rounded-2xl sticky top-32">
              <h2 className="font-headline-md text-headline-md text-primary mb-6 border-b border-outline-variant/50 pb-4">Formulation Request</h2>
              
              <div className="space-y-6 mb-8 border-b border-outline-variant/50 pb-8">
                
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-24 bg-surface-container-low rounded-lg overflow-hidden shrink-0 border border-white/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-3xl">science</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-body-lg text-body-lg text-primary mb-1">Custom Development</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-2">Fine Fragrance - Eau de Parfum</p>
                    <div className="flex justify-between items-center">
                      <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Profile: Woody / Oriental</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                   <p className="font-body-md text-sm text-on-surface-variant mb-2"><strong className="text-primary">Packaging:</strong> Luxury Heavy Glass</p>
                   <p className="font-body-md text-sm text-on-surface-variant mb-2"><strong className="text-primary">MOQ:</strong> 500 - 2,000 units</p>
                   <p className="font-body-md text-sm text-on-surface-variant"><strong className="text-primary">Timeline:</strong> 6 Months</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                  <span>Development Fee</span>
                  <span>Waived</span>
                </div>
                <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant">
                  <span>10ML Pilot Sample</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between items-center font-body-md text-body-md text-on-surface-variant border-b border-outline-variant/50 pb-4">
                  <span>Shipping (India)</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-headline-md text-headline-md text-primary">Total Due Today</span>
                  <span className="font-headline-md text-headline-md text-primary">₹0.00</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
