import React, { useState, useEffect, useRef } from 'react';
import { OEM_SERVICE_OPTIONS, submitInquiry } from '../services/inquiriesService';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function InquiryModal({ isOpen, onClose, initialService, triggerRef }: InquiryModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || OEM_SERVICE_OPTIONS[0]);

  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; service?: string }>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initialService if passed
  useEffect(() => {
    if (initialService && OEM_SERVICE_OPTIONS.includes(initialService)) {
      setService(initialService);
    } else {
      setService(OEM_SERVICE_OPTIONS[0]);
    }
  }, [initialService, isOpen]);

  // Lock body scroll and set up keyboard focus trap & ESC handler
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    // Focus initial input
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      
      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    // Return focus to trigger button
    if (triggerRef?.current) {
      triggerRef.current.focus();
    }
    // Reset state after transition
    setTimeout(() => {
      setIsSubmitted(false);
      setSubmitError(null);
      setErrors({});
      setName('');
      setPhone('');
      setEmail('');
    }, 200);
  };

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

    if (isSubmitting) return;

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
      console.error('Inquiry submission error:', err);
      setSubmitError(err.message || "We couldn't submit your query right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] bg-[#faf8f5] rounded-2xl p-6 sm:p-8 shadow-[0px_24px_60px_rgba(45,90,97,0.25)] border border-[#0e3237]/10 relative text-[#0e3237]"
      >
        {/* Close X Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#0e3237]/60 hover:text-[#0e3237] p-2 rounded-full hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0e3237]/20"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {isSubmitted ? (
          /* SUCCESS STATE */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-700">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="font-headline-md text-2xl font-bold text-[#0e3237]">
              Query submitted
            </h3>
            <p className="font-body-md text-sm text-[#0e3237]/80 leading-relaxed max-w-xs mx-auto">
              Thank you for reaching out. Our team will get back to you shortly.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-full bg-[#0e3237] text-white font-label-sm text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-all active:scale-95 shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* INQUIRY FORM STATE */
          <div>
            <div className="mb-6 pr-6">
              <h2 id="inquiry-modal-title" className="font-headline-md text-2xl font-bold text-primary mb-1">
                Tell us what you need
              </h2>
              <p className="font-body-md text-xs sm:text-sm text-[#0e3237]/70 leading-relaxed">
                Send us your details and our team will get back to you.
              </p>
            </div>

            {submitError && (
              <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-800 font-medium">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Name */}
              <div>
                <label className="block font-label-sm text-xs uppercase tracking-wider font-semibold mb-1.5 text-[#0e3237]/80">
                  Name <span className="text-red-500">*</span>
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
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                    errors.name ? 'border-red-500' : 'border-[#0e3237]/20 focus:border-[#0e3237]'
                  } text-xs font-body-md focus:outline-none transition-colors shadow-sm`}
                />
                {errors.name && (
                  <span className="text-[11px] text-red-600 font-medium mt-1 block">{errors.name}</span>
                )}
              </div>

              {/* Field 2: Number */}
              <div>
                <label className="block font-label-sm text-xs uppercase tracking-wider font-semibold mb-1.5 text-[#0e3237]/80">
                  Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="Your phone number"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                    errors.phone ? 'border-red-500' : 'border-[#0e3237]/20 focus:border-[#0e3237]'
                  } text-xs font-body-md focus:outline-none transition-colors shadow-sm`}
                />
                {errors.phone && (
                  <span className="text-[11px] text-red-600 font-medium mt-1 block">{errors.phone}</span>
                )}
              </div>

              {/* Field 3: Email */}
              <div>
                <label className="block font-label-sm text-xs uppercase tracking-wider font-semibold mb-1.5 text-[#0e3237]/80">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="Your email address"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                    errors.email ? 'border-red-500' : 'border-[#0e3237]/20 focus:border-[#0e3237]'
                  } text-xs font-body-md focus:outline-none transition-colors shadow-sm`}
                />
                {errors.email && (
                  <span className="text-[11px] text-red-600 font-medium mt-1 block">{errors.email}</span>
                )}
              </div>

              {/* Field 4: I have a doubt in (Dropdown containing 6 OEM capabilities) */}
              <div>
                <label className="block font-label-sm text-xs uppercase tracking-wider font-semibold mb-1.5 text-[#0e3237]/80">
                  I have a doubt in <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => {
                      setService(e.target.value);
                      if (errors.service) setErrors(prev => ({ ...prev, service: undefined }));
                    }}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white border ${
                      errors.service ? 'border-red-500' : 'border-[#0e3237]/20 focus:border-[#0e3237]'
                    } text-xs font-body-md focus:outline-none transition-colors appearance-none pr-10 shadow-sm cursor-pointer`}
                  >
                    {OEM_SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#0e3237]/60 pointer-events-none">
                    expand_more
                  </span>
                </div>
                {errors.service && (
                  <span className="text-[11px] text-red-600 font-medium mt-1 block">{errors.service}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#0e3237] text-white font-label-sm text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
