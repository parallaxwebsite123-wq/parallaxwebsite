import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  BuildSampleState,
  getStoredSampleState,
  saveStoredSampleState
} from '../services/sampleBuilderState';

export default function SampleBuilder() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<BuildSampleState>(getStoredSampleState());
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load state and simulate background visual asset readiness
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 250); // Minimal display to prevent layout jump while loading stored state & assets

    return () => clearTimeout(timer);
  }, []);

  // Update state helper
  const updateField = (field: keyof BuildSampleState, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    saveStoredSampleState(updated);
    setValidationError(null);
  };

  // Step Validation logic
  const validateCurrentStep = (): boolean => {
    setValidationError(null);
    if (step === 1) {
      if (!formData.step1_direction) {
        setValidationError('Please select a fragrance direction to continue.');
        return false;
      }
    } else if (step === 2) {
      if (!formData.step2_category) {
        setValidationError('Please select a product category to continue.');
        return false;
      }
    } else if (step === 3) {
      if (!formData.step3_family) {
        setValidationError('Please select your desired fragrance family to continue.');
        return false;
      }
    } else if (step === 4) {
      if (!formData.step4_packaging) {
        setValidationError('Please select your packaging preference to continue.');
        return false;
      }
    } else if (step === 5) {
      if (!formData.step5_quantity) {
        setValidationError('Please select an estimated quantity (MOQ).');
        return false;
      }
      if (!formData.step5_timeline) {
        setValidationError('Please select your target launch timeline.');
        return false;
      }
      if (!formData.step5_brand_type) {
        setValidationError('Please specify your brand venture type.');
        return false;
      }
    }
    return true;
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final step 5 submission to Request Sample route
      saveStoredSampleState(formData);
      navigate('/request-sample');
    }
  };

  const prevStep = () => {
    setValidationError(null);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen flex flex-col bg-surface overflow-x-hidden">
      
      {/* Background Image Container — Perfume Spray visually positioned on the right */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-no-repeat bg-[center_top] lg:bg-[right_center] transition-opacity duration-700 pointer-events-none"
        style={{ backgroundImage: `url('/images/perfume-sprayed-bg.png')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/30 to-transparent hidden lg:block"></div>
        <div className="absolute inset-0 bg-surface/40 lg:hidden"></div>
      </div>

      <Navbar />

      <main className="flex-grow pt-28 pb-20 relative z-10 flex items-center">
        <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          {/* Hero Header */}
          <div className="mb-8 md:mb-10 text-center">
            <h1 className="font-headline-lg text-headline-lg text-primary mb-3 font-bold tracking-tight">
              Formulate Your Brand
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto font-medium">
              Your first 10ml lab sample is complimentary for B2B Orders
            </p>
          </div>

          {/* Form / Skeleton Shimmer Layout — Shifted Left on Desktop to occupy ~40-45% width, keeping perfume bottle visible on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-5 xl:col-span-5">
              
              {loading ? (
                /* PART 4 — Skeleton Shimmer Loading State */
                <div 
                  className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden border border-white/60 shadow-xl"
                  aria-label="Loading form contents..."
                >
                  {/* Step indicators skeleton */}
                  <div className="flex justify-between mb-10 relative">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="w-9 h-9 rounded-full bg-black/10 animate-pulse flex items-center justify-center"></div>
                    ))}
                  </div>

                  {/* Step Heading Skeleton */}
                  <div className="h-8 bg-black/10 rounded-lg w-2/3 mb-8 animate-pulse"></div>

                  {/* Options Skeleton Shimmer Lines */}
                  <div className="space-y-4 mb-10">
                    <div className="h-14 bg-gradient-to-r from-black/5 via-black/15 to-black/5 rounded-xl animate-shimmer bg-[length:200%_100%] motion-reduce:animate-none"></div>
                    <div className="h-14 bg-gradient-to-r from-black/5 via-black/15 to-black/5 rounded-xl animate-shimmer bg-[length:200%_100%] motion-reduce:animate-none"></div>
                    <div className="h-14 bg-gradient-to-r from-black/5 via-black/15 to-black/5 rounded-xl animate-shimmer bg-[length:200%_100%] motion-reduce:animate-none"></div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="flex justify-end pt-4 border-t border-outline-variant/30">
                    <div className="h-12 w-36 bg-black/15 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              ) : (
                /* Actual Form Card */
                <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden border border-white/60 shadow-xl backdrop-blur-md bg-white/70">
                  
                  {/* Step Progress Indicators */}
                  <div className="flex justify-between mb-10 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-outline-variant/30 -translate-y-1/2 z-0"></div>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div 
                        key={num} 
                        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          step >= num 
                            ? 'bg-primary text-white shadow-md scale-105' 
                            : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/40'
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>

                  {/* Validation Error Alert */}
                  {validationError && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2 animate-fade-in">
                      <span className="material-symbols-outlined text-rose-600 text-lg">error</span>
                      <span className="font-medium">{validationError}</span>
                    </div>
                  )}

                  <form onSubmit={nextStep}>
                    
                    {/* STEP 1: Fragrance Direction */}
                    {step === 1 && (
                      <div className="animate-fade-in space-y-6">
                        <div>
                          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-2">Step 1: Fragrance Direction</h2>
                          <p className="font-body-md text-sm text-on-surface-variant">Choose how you would like to initiate your custom formulation.</p>
                        </div>

                        <div className="space-y-4">
                          {[
                            'Develop a completely custom fragrance from scratch',
                            'I need consultation / Not sure yet'
                          ].map((option) => (
                            <label 
                              key={option} 
                              className={`block p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                                formData.step1_direction === option
                                  ? 'border-primary bg-primary/10 shadow-sm font-semibold text-primary'
                                  : 'border-outline/40 hover:border-primary/50 bg-white/50 text-on-surface'
                              }`}
                            >
                              <div className="flex items-center">
                                <input 
                                  type="radio" 
                                  name="fragrance_type" 
                                  value={option}
                                  checked={formData.step1_direction === option}
                                  onChange={(e) => updateField('step1_direction', e.target.value)}
                                  className="mr-3 accent-primary w-4 h-4"
                                />
                                <span className="font-body-md text-base">{option}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Product Category */}
                    {step === 2 && (
                      <div className="animate-fade-in space-y-6">
                        <div>
                          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-2">Step 2: Product Category</h2>
                          <p className="font-body-md text-sm text-on-surface-variant">Select the manufacturing format for your sample.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          {[
                            'Eau de Parfum',
                            'Eau de Toilette',
                            'Body Mist',
                            'Home Fragrance',
                            'Room Spray',
                            'Reed Diffuser',
                            'Other'
                          ].map((cat) => (
                            <label 
                              key={cat} 
                              className={`block p-4 border rounded-xl cursor-pointer text-center transition-all duration-200 ${
                                formData.step2_category === cat
                                  ? 'border-primary bg-primary/10 shadow-sm font-semibold text-primary'
                                  : 'border-outline/40 hover:border-primary/50 bg-white/50 text-on-surface'
                              }`}
                            >
                              <input 
                                type="radio" 
                                name="product_cat" 
                                value={cat}
                                checked={formData.step2_category === cat}
                                onChange={(e) => updateField('step2_category', e.target.value)}
                                className="hidden" 
                              />
                              <span className="font-body-md text-sm sm:text-base block">{cat}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Olfactory Profile */}
                    {step === 3 && (
                      <div className="animate-fade-in space-y-6">
                        <div>
                          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-2">Step 3: Olfactory Profile</h2>
                          <p className="font-body-md text-sm text-on-surface-variant">Specify your desired notes and scent direction.</p>
                        </div>

                        <div className="space-y-5">
                          <div>
                            <label className="block font-label-sm text-xs uppercase tracking-widest text-primary font-bold mb-2">
                              Desired Fragrance Family *
                            </label>
                            <select 
                              value={formData.step3_family}
                              onChange={(e) => updateField('step3_family', e.target.value)}
                              className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border border-outline/40 focus:border-primary focus:outline-none"
                            >
                              <option value="Woody">Woody</option>
                              <option value="Fresh / Citrus">Fresh / Citrus</option>
                              <option value="Floral">Floral</option>
                              <option value="Oriental / Amber">Oriental / Amber</option>
                              <option value="Gourmand">Gourmand</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                              Key Notes (Optional)
                            </label>
                            <input 
                              type="text" 
                              value={formData.step3_notes}
                              onChange={(e) => updateField('step3_notes', e.target.value)}
                              className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border border-outline/40 focus:border-primary focus:outline-none" 
                              placeholder="e.g., Bergamot, Sandalwood, Rose" 
                            />
                          </div>

                          <div>
                            <label className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                              Target Audience / Positioning
                            </label>
                            <input 
                              type="text" 
                              value={formData.step3_target}
                              onChange={(e) => updateField('step3_target', e.target.value)}
                              className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border border-outline/40 focus:border-primary focus:outline-none" 
                              placeholder="e.g., Unisex, Premium Niche, Gen Z" 
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Packaging Vision */}
                    {step === 4 && (
                      <div className="animate-fade-in space-y-6">
                        <div>
                          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-2">Step 4: Packaging Vision</h2>
                          <p className="font-body-md text-sm text-on-surface-variant">Select bottle and packaging styling preferences.</p>
                        </div>

                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {[
                              'Minimal Glass',
                              'Luxury Heavy Glass',
                              'Custom Mold',
                              'Eco-Friendly / Recycled'
                            ].map((pack) => (
                              <label 
                                key={pack} 
                                className={`block p-4 border rounded-xl cursor-pointer text-center transition-all duration-200 ${
                                  formData.step4_packaging === pack
                                    ? 'border-primary bg-primary/10 shadow-sm font-semibold text-primary'
                                    : 'border-outline/40 hover:border-primary/50 bg-white/50 text-on-surface'
                                }`}
                              >
                                <input 
                                  type="radio" 
                                  name="packaging" 
                                  value={pack}
                                  checked={formData.step4_packaging === pack}
                                  onChange={(e) => updateField('step4_packaging', e.target.value)}
                                  className="hidden" 
                                />
                                <span className="font-body-md text-xs sm:text-sm block font-medium">{pack}</span>
                              </label>
                            ))}
                          </div>

                          <div>
                            <label className="block font-label-sm text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-2">
                              Describe Packaging Requirements (Optional)
                            </label>
                            <textarea 
                              value={formData.step4_details}
                              onChange={(e) => updateField('step4_details', e.target.value)}
                              className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border border-outline/40 focus:border-primary focus:outline-none min-h-[90px]" 
                              placeholder="Specific caps, finishes, boxing requirements..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: Business Requirements */}
                    {step === 5 && (
                      <div className="animate-fade-in space-y-6">
                        <div>
                          <h2 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-2">Step 5: Business Requirements</h2>
                          <p className="font-body-md text-sm text-on-surface-variant">Provide production volume and timeline estimates.</p>
                        </div>

                        <div className="space-y-5">
                          <div>
                            <label className="block font-label-sm text-xs uppercase tracking-widest text-primary font-bold mb-2 leading-relaxed">
                              Estimated Quantity (MOQ) <span className="text-on-surface-variant font-normal lowercase">(How much stock you plan to get in future) *</span>
                            </label>
                            <select 
                              value={formData.step5_quantity}
                              onChange={(e) => updateField('step5_quantity', e.target.value)}
                              className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border border-outline/40 focus:border-primary focus:outline-none"
                            >
                              <option value="100 - 500 units (Pilot Run)">100 - 500 units (Pilot Run)</option>
                              <option value="500 - 2,000 units">500 - 2,000 units</option>
                              <option value="2,000 - 10,000 units">2,000 - 10,000 units</option>
                              <option value="10,000+ units">10,000+ units</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-label-sm text-xs uppercase tracking-widest text-primary font-bold mb-2 leading-relaxed">
                              Launch Timeline <span className="text-on-surface-variant font-normal lowercase">(How soon you would launch your brand) *</span>
                            </label>
                            <select 
                              value={formData.step5_timeline}
                              onChange={(e) => updateField('step5_timeline', e.target.value)}
                              className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border border-outline/40 focus:border-primary focus:outline-none"
                            >
                              <option value="ASAP (3-4 Months)">ASAP (3-4 Months)</option>
                              <option value="6 Months">6 Months</option>
                              <option value="9-12 Months">9-12 Months</option>
                              <option value="Exploring / No fixed date">Exploring / No fixed date</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-label-sm text-xs uppercase tracking-widest text-primary font-bold mb-2">
                              Existing Brand or New Venture? *
                            </label>
                            <select 
                              value={formData.step5_brand_type}
                              onChange={(e) => updateField('step5_brand_type', e.target.value)}
                              className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border border-outline/40 focus:border-primary focus:outline-none"
                            >
                              <option value="New Fragrance Brand">New Fragrance Brand</option>
                              <option value="Existing Brand Expanding into Fragrance">Existing Brand Expanding into Fragrance</option>
                              <option value="Retailer / Hospitality">Retailer / Hospitality</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="mt-8 pt-6 border-t border-outline-variant/30 flex justify-between items-center">
                      {step > 1 ? (
                        <button 
                          type="button" 
                          onClick={prevStep} 
                          className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors font-bold flex items-center gap-1 cursor-pointer py-2 px-3"
                        >
                          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
                        </button>
                      ) : <div></div>}

                      <button 
                        type="submit" 
                        className="bg-primary text-white font-label-sm text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-md hover:bg-primary/90 transition-all font-bold cursor-pointer active:scale-95"
                      >
                        {step === 5 ? 'Claim 10ML Sample' : 'Continue'}
                      </button>
                    </div>

                  </form>
                </div>
              )}

            </div>

            {/* Right column space is left unobstructed on desktop so perfume spray image subject is visible */}
            <div className="hidden lg:block lg:col-span-7 xl:col-span-7 pointer-events-none"></div>

          </div>

        </div>
      </main>
    </div>
  );
}
