import { Link } from 'react-router-dom';

export default function ReturnPolicy() {
  return (
    <div className="text-on-surface font-body-md text-body-md antialiased relative min-h-screen bg-surface flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="ambient-blob blob-3" style={{ bottom: 'auto', top: '10%' }}></div>
      </div>

      <header className="w-full bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center shrink-0" aria-label="Parallax Perfumery Home">
            <img 
              src="/images/parallax-black-logo.png" 
              alt="Parallax Perfumery" 
              className="h-[46px] md:h-[68px] w-auto object-contain" 
            />
          </Link>
          <Link to="/" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow w-full max-w-3xl mx-auto px-margin-mobile py-16 md:py-24">
        <div className="mb-12">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-4">Return Policy & Agreement</h1>
          <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest">Last Updated: October 24, 2024</p>
        </div>

        <div className="prose prose-p:font-body-md prose-p:text-body-md prose-p:text-on-surface-variant prose-headings:font-headline-md prose-headings:text-primary max-w-none space-y-8 bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/50">
          
          <section>
            <h2 className="text-xl mb-4">1. The Ethereal Guarantee</h2>
            <p className="mb-4">
              At Parallax, we understand that an olfactory signature is deeply personal. If your chosen essence does not perfectly align with your aura, we accept returns of unopened and completely sealed full-size (50ml or 100ml) bottles within 14 days of delivery.
            </p>
            <p>
              Please note that to maintain the highest standards of hygiene and purity, any bottle where the tamper-evident seal is broken or the pump has been primed cannot be returned or exchanged.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-4">2. Discovery Sets & Samples</h2>
            <p>
              Our Discovery Sets and 10ml travel vials are considered final sale and are not eligible for return or exchange. We highly recommend experiencing our Discovery Set prior to committing to a full-size signature bottle.
            </p>
          </section>

          <section>
            <h2 className="text-xl mb-4">3. Initiation Process</h2>
            <p className="mb-4">To initiate a return, please follow these steps:</p>
            <ul className="list-disc pl-5 space-y-2 font-body-md text-on-surface-variant">
              <li>Log into your Parallax Profile and navigate to Order History.</li>
              <li>Select the eligible item and click "Request Return".</li>
              <li>You will receive a pre-paid shipping label via email. A $10 processing and shipping fee will be deducted from your final refund.</li>
              <li>Carefully package the item in its original protective casing to prevent transit damage.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl mb-4">4. Refunds</h2>
            <p>
              Once your return is received at our laboratory, it will undergo inspection. Approved returns will be refunded to the original payment method within 5-7 business days. You will receive an email confirmation once the molecular transfer (refund) is complete.
            </p>
          </section>

          <section className="pt-8 border-t border-outline-variant/30 mt-8">
            <h2 className="text-xl mb-4">Need Assistance?</h2>
            <p className="mb-4">Our specialists are available to assist you with scent matching or return inquiries.</p>
            <Link to="/request-sample" className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors border-b border-secondary pb-1">
              Contact Specialist
            </Link>
          </section>

        </div>
      </main>

      <footer className="w-full py-8 mt-auto border-t border-outline-variant/30 text-center">
        <div className="font-body-md text-body-md text-on-surface-variant text-sm">
          © 2024 Parallax Perfumery. Legal & Policies.
        </div>
      </footer>
    </div>
  );
}
