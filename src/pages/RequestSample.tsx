import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getStoredSampleState, BuildSampleState } from '../services/sampleBuilderState';
import { CustomerDetails, submitSampleRequest } from '../services/sampleRequestService';

export default function RequestSample() {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<BuildSampleState>(getStoredSampleState());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [customer, setCustomer] = useState<CustomerDetails>({
    company: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsapp: '',
    businessType: '',
    country: 'India',
    address: '',
    city: '',
    zip: '',
    notes: ''
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Ensure product details state is loaded
    setProductDetails(getStoredSampleState());
  }, []);

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!customer.company.trim()) errors.company = 'Company / Brand Name is required.';
    if (!customer.firstName.trim()) errors.firstName = 'First name is required.';
    if (!customer.lastName.trim()) errors.lastName = 'Last name is required.';
    if (!customer.email.trim()) {
      errors.email = 'Business email is required.';
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!customer.phone.trim()) errors.phone = 'Phone number is required.';
    if (!customer.businessType) errors.businessType = 'Please select a business type.';
    if (!customer.country) errors.country = 'Country is required.';
    if (!customer.address.trim()) errors.address = 'Street address is required.';
    if (!customer.city.trim()) errors.city = 'City is required.';
    if (!customer.zip.trim()) errors.zip = 'Postal / ZIP code is required.';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) {
      setErrorMessage('Please fill in all mandatory business and delivery details before submitting.');
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit persisted record with Product Details and Customer Details
      await submitSampleRequest({
        product_details: productDetails,
        customer_details: customer
      });

      // 2. Clear stored draft upon successful submission
      sessionStorage.removeItem('parallax_build_sample_state');

      // 3. Navigate to success page
      navigate('/request-success');
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface-bright flex flex-col">
      <div className="blob-bg w-[800px] h-[800px] bg-secondary-fixed-dim top-[-200px] left-[-200px]"></div>
      <div className="blob-bg w-[600px] h-[600px] bg-primary-fixed-dim bottom-[-100px] right-[-100px]"></div>

      <Navbar />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Main Request Form */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <h1 className="font-headline-lg text-headline-lg text-primary mb-2 font-bold tracking-tight">Claim Your Sample</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Tell us about your fragrance project. Our fragrance specialists will contact you to discuss formulation, packaging, MOQ, pricing and production.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-8 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3 animate-fade-in">
                <span className="material-symbols-outlined text-rose-600 text-xl">error</span>
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            <form className="space-y-10" onSubmit={handleSubmit} noValidate>
              
              {/* Business Information */}
              <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/60 shadow-sm bg-white/60">
                <h2 className="font-headline-md text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">business</span> Business Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label htmlFor="company" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      Company / Brand Name *
                    </label>
                    <input 
                      type="text" 
                      id="company" 
                      value={customer.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.company ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none`} 
                      placeholder="Enter your business name" 
                    />
                    {fieldErrors.company && <p className="text-xs text-rose-600 mt-1">{fieldErrors.company}</p>}
                  </div>

                  <div>
                    <label htmlFor="firstName" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      id="firstName" 
                      value={customer.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.firstName ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none`} 
                      placeholder="First name"
                    />
                    {fieldErrors.firstName && <p className="text-xs text-rose-600 mt-1">{fieldErrors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      id="lastName" 
                      value={customer.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.lastName ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none`} 
                      placeholder="Last name"
                    />
                    {fieldErrors.lastName && <p className="text-xs text-rose-600 mt-1">{fieldErrors.lastName}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      Business Email *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      value={customer.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.email ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none`} 
                      placeholder="you@company.com" 
                    />
                    {fieldErrors.email && <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      value={customer.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.phone ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none`} 
                      placeholder="+1 (555) 000-0000"
                    />
                    {fieldErrors.phone && <p className="text-xs text-rose-600 mt-1">{fieldErrors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block font-label-sm text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                      WhatsApp Number (Optional)
                    </label>
                    <input 
                      type="tel" 
                      id="whatsapp" 
                      value={customer.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border border-outline/40 focus:border-primary focus:outline-none" 
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="type" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      Business Type *
                    </label>
                    <select 
                      id="type" 
                      value={customer.businessType}
                      onChange={(e) => handleInputChange('businessType', e.target.value)}
                      className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.businessType ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none appearance-none cursor-pointer`}
                    >
                      <option value="">Select an option...</option>
                      <option value="DTC Brand">DTC Brand</option>
                      <option value="Retailer / Boutique">Retailer / Boutique</option>
                      <option value="Hospitality / Hotel">Hospitality / Hotel</option>
                      <option value="Corporate Gifting">Corporate Gifting</option>
                      <option value="Entrepreneur / Startup">Entrepreneur / Startup</option>
                    </select>
                    {fieldErrors.businessType && <p className="text-xs text-rose-600 mt-1">{fieldErrors.businessType}</p>}
                  </div>
                </div>
              </section>

              {/* Delivery Details */}
              <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/60 shadow-sm bg-white/60">
                <h2 className="font-headline-md text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">local_shipping</span> Delivery Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label htmlFor="country" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      Country/Region *
                    </label>
                    <div className="relative">
                      <select 
                        id="country" 
                        value={customer.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.country ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none appearance-none cursor-pointer`}
                      >
                        <option value="India">India</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">expand_more</span>
                    </div>
                    {fieldErrors.country && <p className="text-xs text-rose-600 mt-1">{fieldErrors.country}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      Address *
                    </label>
                    <input 
                      type="text" 
                      id="address" 
                      value={customer.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.address ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none`} 
                      placeholder="Street address, building, suite..."
                    />
                    {fieldErrors.address && <p className="text-xs text-rose-600 mt-1">{fieldErrors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="city" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      City *
                    </label>
                    <input 
                      type="text" 
                      id="city" 
                      value={customer.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.city ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none`} 
                      placeholder="City"
                    />
                    {fieldErrors.city && <p className="text-xs text-rose-600 mt-1">{fieldErrors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="zip" className="block font-label-sm text-xs font-bold text-primary uppercase tracking-widest mb-2">
                      Postal / ZIP Code *
                    </label>
                    <input 
                      type="text" 
                      id="zip" 
                      value={customer.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      className={`w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border ${fieldErrors.zip ? 'border-rose-500' : 'border-outline/40'} focus:border-primary focus:outline-none`} 
                      placeholder="Postal code"
                    />
                    {fieldErrors.zip && <p className="text-xs text-rose-600 mt-1">{fieldErrors.zip}</p>}
                  </div>

                  <div className="md:col-span-2 mt-2">
                    <label htmlFor="notes" className="block font-label-sm text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                      Additional Project Details (Optional)
                    </label>
                    <textarea 
                      id="notes" 
                      value={customer.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full glass-input rounded-xl px-4 py-3 font-body-md text-primary bg-white/80 border border-outline/40 focus:border-primary focus:outline-none min-h-[90px]" 
                      placeholder="Tell us more about your vision, specific packaging requests, or target pricing..."
                    ></textarea>
                  </div>
                </div>
              </section>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full block text-center iridescent-btn text-white font-label-sm text-xs uppercase tracking-widest py-4 rounded-xl shadow-md cursor-pointer border-none font-bold disabled:opacity-50 transition-all active:scale-98"
              >
                {isSubmitting ? 'Submitting Request...' : 'Request My Sample'}
              </button>
              
              <p className="text-center font-body-md text-xs text-on-surface-variant mt-2">
                By submitting, you agree to our B2B manufacturing terms. No payment is required for initial sampling.
              </p>

            </form>
          </div>

          {/* PART 12 — Dynamically Rendered Build a Sample Summary Sidebar */}
          <aside className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl sticky top-28 border border-white/60 shadow-lg bg-white/70 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4 mb-6">
                <h2 className="font-headline-md text-lg font-bold text-primary">Formulation Summary</h2>
                <button 
                  type="button" 
                  onClick={() => navigate('/build-sample')}
                  className="font-label-sm text-[11px] uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-1 font-bold"
                >
                  <span className="material-symbols-outlined text-xs">edit</span> Edit
                </button>
              </div>
              
              {/* Product Details Specs */}
              <div className="space-y-4 mb-6 border-b border-outline-variant/40 pb-6 text-sm">
                
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-16 bg-primary/10 rounded-xl overflow-hidden shrink-0 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                    <span className="material-symbols-outlined text-2xl">science</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-body-lg font-bold text-primary text-base truncate mb-0.5">
                      {productDetails.step1_direction}
                    </h3>
                    <p className="font-body-md text-on-surface-variant text-xs mb-1">
                      Format: <strong className="text-primary">{productDetails.step2_category}</strong>
                    </p>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-wider">
                      Family: {productDetails.step3_family}
                    </span>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 space-y-2 text-xs">
                  <div>
                    <span className="text-on-surface-variant font-medium">Packaging: </span>
                    <strong className="text-primary font-bold">{productDetails.step4_packaging}</strong>
                  </div>
                  <div>
                    <span className="text-on-surface-variant font-medium">Target MOQ: </span>
                    <strong className="text-primary font-bold">{productDetails.step5_quantity}</strong>
                  </div>
                  <div>
                    <span className="text-on-surface-variant font-medium">Timeline: </span>
                    <strong className="text-primary font-bold">{productDetails.step5_timeline}</strong>
                  </div>
                  <div>
                    <span className="text-on-surface-variant font-medium">Venture: </span>
                    <strong className="text-primary font-bold">{productDetails.step5_brand_type}</strong>
                  </div>
                  {productDetails.step3_notes && (
                    <div>
                      <span className="text-on-surface-variant font-medium">Key Notes: </span>
                      <strong className="text-primary font-bold">{productDetails.step3_notes}</strong>
                    </div>
                  )}
                </div>

              </div>

              {/* Financial summary pricing info */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center font-body-md text-xs text-on-surface-variant">
                  <span>Development Fee</span>
                  <span className="font-bold text-emerald-700 uppercase">Waived</span>
                </div>
                <div className="flex justify-between items-center font-body-md text-xs text-on-surface-variant">
                  <span>10ML Pilot Sample</span>
                  <span className="font-bold text-emerald-700 uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between items-center font-body-md text-xs text-on-surface-variant border-b border-outline-variant/40 pb-3">
                  <span>Shipping (B2B Sample)</span>
                  <span className="font-bold text-emerald-700 uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-headline-md text-base font-bold text-primary">Total Due Today</span>
                  <span className="font-headline-md text-xl font-extrabold text-primary">₹0.00</span>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
