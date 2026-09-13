import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { OEM_SERVICE_OPTIONS, submitInquiry } from '../services/inquiriesService';

type AnimStatus = 'closed' | 'opening' | 'open' | 'closing';

export default function QuickQuoteReveal() {
  const [status, setStatus] = useState<AnimStatus>('closed');
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('End-to-end product development');

  // Form states
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; service?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formHeight, setFormHeight] = useState<number>(560);

  // Measure form content height when open or when fields change
  useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentRect.height > 0) {
            setFormHeight(Math.max(540, entry.contentRect.height + 40));
          }
        }
      });
      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [status, isSubmitted, errors, submitError]);

  const isOpen = status === 'open' || status === 'opening';

  const handleOpen = () => {
    if (status !== 'closed') return;
    setStatus('opening');
    setTimeout(() => {
      setStatus('open');
      nameInputRef.current?.focus();
    }, 450);
  };

  const handleClose = () => {
    if (status === 'closed' || status === 'closing') return;
    setStatus('closing');
    setTimeout(() => {
      setStatus('closed');
      setIsSubmitted(false);
      setSubmitError(null);
      setErrors({});
      setName('');
      setPhone('');
      setEmail('');
      setService('End-to-end product development');
      buttonRef.current?.focus();
    }, 400);
  };

  // Keyboard Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, status]);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; email?: string; service?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    } else if (phone.trim().length < 6) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!service) {
      newErrors.service = 'Please select a service capability.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (isSubmitting || status !== 'open') return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await submitInquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        service
      });

      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Quick Quote inquiry submission error:', err);
      setSubmitError(err.message || "We couldn't submit your query right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-2 relative min-h-[52px]">
      <motion.div
        initial={false}
        animate={{
          width: isOpen ? '100%' : '220px',
          maxWidth: isOpen ? '480px' : '220px',
          height: isOpen ? (status === 'open' ? 'auto' : `${formHeight}px`) : '48px',
          borderRadius: isOpen ? '24px' : '9999px',
          backgroundColor: '#d4af37',
          boxShadow: isOpen 
            ? '0px 24px 60px rgba(0, 0, 0, 0.5)' 
            : '0px 4px 14px rgba(0, 0, 0, 0.15)'
        }}
        transition={{
          duration: 0.42,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="relative border border-black/20 text-left overflow-hidden"
      >
        {/* CLOSED BUTTON CONTENT */}
        {status === 'closed' && (
          <button
            ref={buttonRef}
            type="button"
            onClick={handleOpen}
            className="w-full h-full px-6 flex items-center justify-center gap-2 text-black font-label-sm text-xs uppercase tracking-widest font-bold focus:outline-none hover:bg-[#e5c158] transition-colors cursor-pointer"
            aria-expanded={false}
            aria-label="Get a quick quote"
          >
            <span>Get a quick quote</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        )}

        {/* OPEN FORM CONTENT */}
        {(status === 'opening' || status === 'open' || status === 'closing') && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 8 }}
            animate={{ 
              opacity: status === 'closing' ? 0 : 1, 
              y: status === 'closing' ? -6 : 0 
            }}
            transition={{ 
              duration: status === 'closing' ? 0.15 : 0.25, 
              delay: status === 'opening' ? 0.12 : 0 
            }}
            className="p-6 sm:p-8 text-black relative w-full"
          >
            {/* Close Button X */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 text-black/70 hover:text-black p-2 rounded-full hover:bg-black/10 transition-colors focus:outline-none cursor-pointer z-10"
              aria-label="Close form"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {isSubmitted ? (
              /* SUCCESS STATE */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-black/10 border border-black/20 rounded-full flex items-center justify-center mx-auto text-black">
                  <span className="material-symbols-outlined text-3xl">check</span>
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-black">
                  Query submitted
                </h3>
                <p className="font-body-md text-sm text-black/80 leading-relaxed max-w-xs mx-auto">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full py-3.5 rounded-full bg-black text-white font-label-sm text-xs uppercase tracking-widest font-bold hover:bg-black/90 transition-all shadow-md cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* INQUIRY FORM STATE */
              <div>
                <div className="mb-6 pr-8">
                  <h2 className="font-headline-md text-2xl font-bold text-black mb-1">
                    Tell us what you need
                  </h2>
                  <p className="font-body-md text-xs sm:text-sm text-black/80 leading-relaxed">
                    Send us your details and our team will get back to you.
                  </p>
                </div>

                {submitError && (
                  <div className="mb-5 p-3.5 bg-red-900/20 border border-red-900/40 rounded-xl text-xs text-red-950 font-medium">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Field 1: Name */}
                  <div>
                    <label className="block font-label-sm text-xs uppercase tracking-wider font-bold mb-1.5 text-black">
                      Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Your name"
                      disabled={status !== 'open'}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                        errors.name ? 'border-red-600' : 'border-black/20 focus:border-black'
                      } text-xs font-body-md text-black focus:outline-none transition-colors shadow-sm`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-800 font-bold mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  {/* Field 2: Number */}
                  <div>
                    <label className="block font-label-sm text-xs uppercase tracking-wider font-bold mb-1.5 text-black">
                      Number <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="Your phone number"
                      disabled={status !== 'open'}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                        errors.phone ? 'border-red-600' : 'border-black/20 focus:border-black'
                      } text-xs font-body-md text-black focus:outline-none transition-colors shadow-sm`}
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-red-800 font-bold mt-1 block">{errors.phone}</span>
                    )}
                  </div>

                  {/* Field 3: Email */}
                  <div>
                    <label className="block font-label-sm text-xs uppercase tracking-wider font-bold mb-1.5 text-black">
                      Email <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      placeholder="Your email address"
                      disabled={status !== 'open'}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                        errors.email ? 'border-red-600' : 'border-black/20 focus:border-black'
                      } text-xs font-body-md text-black focus:outline-none transition-colors shadow-sm`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-800 font-bold mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  {/* Field 4: I HAVE A DOUBT IN */}
                  <div>
                    <label className="block font-label-sm text-xs uppercase tracking-wider font-bold mb-1.5 text-black">
                      I have a doubt in <span className="text-red-700">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={service}
                        disabled={status !== 'open'}
                        onChange={(e) => {
                          setService(e.target.value);
                          if (errors.service) setErrors(prev => ({ ...prev, service: undefined }));
                        }}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                          errors.service ? 'border-red-600' : 'border-black/20 focus:border-black'
                        } text-xs font-body-md text-black focus:outline-none transition-colors appearance-none pr-10 shadow-sm cursor-pointer`}
                      >
                        {OEM_SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-sm text-black/70 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                    {errors.service && (
                      <span className="text-[11px] text-red-800 font-bold mt-1 block">{errors.service}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 pb-1">
                    <button
                      type="submit"
                      disabled={isSubmitting || status !== 'open'}
                      className="w-full py-3.5 rounded-full bg-black text-white font-label-sm text-xs uppercase tracking-widest font-bold hover:bg-black/90 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
