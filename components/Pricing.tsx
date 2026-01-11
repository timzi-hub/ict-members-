
import React from 'react';

interface PricingProps {
  onOpenModal: (type: 'login' | 'join') => void;
}

const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  return (
    <section id="pricing" className="py-32 px-6 bg-gray-50 dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold tracking-widest text-black dark:text-white uppercase mb-4 block transition-colors">Membership</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white transition-colors">
            One subscription, <br />
            <span className="text-italics">infinite inspiration.</span>
          </h2>
          <p className="text-black dark:text-white font-bold max-w-xl mx-auto transition-colors">
            Choose the plan that fits your space. Pause or cancel anytime. All plans include 4K resolution digital files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="bg-white dark:bg-[#141414] p-8 rounded-3xl border-2 border-black dark:border-white flex flex-col hover:shadow-xl transition-all">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Individual Club</h3>
              <p className="text-sm text-black dark:text-white font-black uppercase tracking-tight transition-colors">Perfect for your home office</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black text-black dark:text-white">$199</span>
              <span className="text-black dark:text-white font-black">/month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-sm font-black text-black dark:text-white transition-colors">
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span> 5 AI generations per month
              </li>
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span> Access to basic gallery
              </li>
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span> 4K Digital delivery
              </li>
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span> Personal use only
              </li>
            </ul>
            <button 
              onClick={() => onOpenModal('join')}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Plan 2 - Featured */}
          <div className="bg-black dark:bg-white text-white dark:text-black p-8 rounded-3xl relative overflow-hidden flex flex-col transform md:-translate-y-4 shadow-2xl transition-all">
            <div className="absolute top-0 right-0 px-4 py-1 bg-white dark:bg-black text-black dark:text-white text-[10px] font-black uppercase rounded-bl-xl tracking-tighter transition-colors">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Creator Pro</h3>
              <p className="text-sm text-white dark:text-black font-black uppercase tracking-tight transition-colors">For active curators and agencies</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black">$499</span>
              <span className="text-white dark:text-black font-black">/month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-sm font-black text-white dark:text-black transition-colors">
              <li className="flex items-center gap-2">
                <span className="font-bold">✓</span> Unlimited AI generations
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold">✓</span> Exclusive weekly art drops
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold">✓</span> High-res SVG & Video exports
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold">✓</span> Commercial license included
              </li>
              <li className="flex items-center gap-2">
                <span className="font-bold">✓</span> Priority curation support
              </li>
            </ul>
            <button 
              onClick={() => onOpenModal('join')}
              className="w-full py-4 bg-white dark:bg-black text-black dark:text-white rounded-xl font-bold hover:opacity-80 transition-all"
            >
              Join the Pro Club
            </button>
          </div>

          {/* Plan 3 */}
          <div className="bg-white dark:bg-[#141414] p-8 rounded-3xl border-2 border-black dark:border-white flex flex-col hover:shadow-xl transition-all">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Gallery Elite</h3>
              <p className="text-sm text-black dark:text-white font-black uppercase tracking-tight transition-colors">Bespoke curation for luxury spaces</p>
            </div>
            <div className="mb-8 text-xl font-black text-black dark:text-white transition-colors">
              Contact Us
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-sm font-black text-black dark:text-white transition-colors">
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span> 1-on-1 Artist collaboration
              </li>
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span> Multi-screen synchronization
              </li>
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span> Physical print coordination
              </li>
              <li className="flex items-center gap-2">
                <span className="text-black dark:text-white font-bold">✓</span> Global licensing
              </li>
            </ul>
            <button 
              onClick={() => onOpenModal('join')}
              className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold transition-all"
            >
              Request a Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
