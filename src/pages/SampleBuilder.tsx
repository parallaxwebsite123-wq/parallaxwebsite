import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SampleBuilder() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      navigate('/request-sample');
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen flex flex-col bg-surface">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-2" style={{ top: '10%' }}></div>
      </div>
      
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-container-max rounded-xl z-50 bg-white/40 backdrop-blur-[40px] border border-white/50 shadow-[0px_20px_60px_rgba(45,90,97,0.08)]">
        <div className="flex justify-between items-center px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md font-medium tracking-tight text-primary">Parallax</span>
          </Link>
          <Link to="/marketplace" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">close</span> Exit Builder
          </Link>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-24 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="mb-12 text-center">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-4">Formulate Your Brand</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              Configure your bespoke fragrance requirement. Your first 10ml lab sample is complimentary for verified B2B partners.
            </p>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-outline-variant/30 -translate-y-1/2 z-0"></div>
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${step >= num ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  {num}
                </div>
              ))}
            </div>

            <form onSubmit={nextStep}>
              {step === 1 && (
                <div className="animate-fade-in">
                  <h2 className="font-headline-md text-headline-md text-primary mb-6">Step 1: Fragrance Direction</h2>
                  <div className="space-y-4">
                    <label className="block p-4 border border-outline rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input type="radio" name="fragrance_type" className="mr-3" defaultChecked />
                      <span className="font-body-lg text-primary">Modify an existing marketplace formulation</span>
                    </label>
                    <label className="block p-4 border border-outline rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input type="radio" name="fragrance_type" className="mr-3" />
                      <span className="font-body-lg text-primary">Develop a completely custom fragrance from scratch</span>
                    </label>
                    <label className="block p-4 border border-outline rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input type="radio" name="fragrance_type" className="mr-3" />
                      <span className="font-body-lg text-primary">I need consultation / Not sure yet</span>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fade-in">
                  <h2 className="font-headline-md text-headline-md text-primary mb-6">Step 2: Product Category</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Eau de Parfum', 'Eau de Toilette', 'Extrait', 'Body Mist', 'Home Fragrance', 'Room Spray', 'Reed Diffuser', 'Other'].map((cat) => (
                      <label key={cat} className="block p-4 border border-outline rounded-xl cursor-pointer hover:border-primary text-center transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input type="radio" name="product_cat" className="hidden" />
                        <span className="font-body-md text-primary block">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-fade-in">
                  <h2 className="font-headline-md text-headline-md text-primary mb-6">Step 3: Olfactory Profile</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-2">Desired Fragrance Family</label>
                      <select className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary">
                        <option>Woody</option>
                        <option>Fresh / Citrus</option>
                        <option>Floral</option>
                        <option>Oriental / Amber</option>
                        <option>Gourmand</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-2">Key Notes (Optional)</label>
                      <input type="text" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" placeholder="e.g., Bergamot, Sandalwood, Rose" />
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-2">Target Audience / Positioning</label>
                      <input type="text" className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary" placeholder="e.g., Unisex, Premium Niche, Gen Z" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="animate-fade-in">
                  <h2 className="font-headline-md text-headline-md text-primary mb-6">Step 4: Packaging Vision</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      {['Minimal Glass', 'Luxury Heavy Glass', 'Custom Mold', 'Eco-Friendly / Recycled'].map((pack) => (
                        <label key={pack} className="block p-4 border border-outline rounded-xl cursor-pointer hover:border-primary text-center transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                          <input type="radio" name="packaging" className="hidden" />
                          <span className="font-body-md text-primary block">{pack}</span>
                        </label>
                      ))}
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-2">Describe Packaging Requirements</label>
                      <textarea className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary min-h-[100px]" placeholder="Specific caps, finishes, boxing requirements..."></textarea>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="animate-fade-in">
                  <h2 className="font-headline-md text-headline-md text-primary mb-6">Step 5: Business Requirements</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-2">Estimated Quantity (MOQ)</label>
                      <select className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary">
                        <option>100 - 500 units (Pilot Run)</option>
                        <option>500 - 2,000 units</option>
                        <option>2,000 - 10,000 units</option>
                        <option>10,000+ units</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-2">Launch Timeline</label>
                      <select className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary">
                        <option>ASAP (3-4 Months)</option>
                        <option>6 Months</option>
                        <option>9-12 Months</option>
                        <option>Exploring / No fixed date</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-2">Existing Brand or New Venture?</label>
                      <select className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary">
                        <option>New Fragrance Brand</option>
                        <option>Existing Brand Expanding into Fragrance</option>
                        <option>Retailer / Hospitality</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 pt-6 border-t border-outline-variant/30 flex justify-between">
                {step > 1 ? (
                  <button type="button" onClick={prevStep} className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors">
                    Back
                  </button>
                ) : <div></div>}
                <button type="submit" className="bg-primary text-white font-label-sm text-label-sm uppercase tracking-widest px-8 py-3 rounded-xl shadow-md hover:bg-primary/90 transition-colors">
                  {step === 5 ? 'Claim 10ML Sample' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
