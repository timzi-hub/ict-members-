
import React, { useState } from 'react';

interface FAQProps {
  onOpenModal: (type: 'login' | 'join') => void;
}

const faqs = [
  {
    q: "How fast will I receive my custom commissions?",
    a: "On average, custom pieces are generated and curated in just a few minutes. For high-end human-refined pieces, it can take up to 48 hours."
  },
  {
    q: "How does onboarding work?",
    a: "Subscribe to a plan and we'll immediately grant you access to your ArtJoy dashboard. You can start requesting custom pieces or downloading from the vault instantly."
  },
  {
    q: "Who are the artists?",
    a: "ArtJoy is powered by a proprietary blend of advanced AI models (like Gemini) and curated by a dedicated group of digital art directors."
  },
  {
    q: "Is there a limit to how many requests I can make?",
    a: "Depending on your plan, you can add as many requests as you'd like to your queue. They are delivered one by one for the Pro plan, and in batches for Elite."
  },
  {
    q: "How does the pause feature work?",
    a: "Billing cycles are based on a 31-day period. If you use the service for 20 days and then pause, you'll have 11 days of service remaining to use whenever you want."
  }
];

const FAQ: React.FC<FAQProps> = ({ onOpenModal }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-black dark:text-white transition-colors">
            <span className="text-italics">Frequently</span> asked questions
          </h2>
          
          <div className="mt-12 bg-white dark:bg-[#141414] rounded-3xl border border-black dark:border-white p-8 shadow-sm transition-colors">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center text-2xl">📞</div>
                <div>
                   <h4 className="font-bold text-lg text-black dark:text-white transition-colors">Still have questions?</h4>
                   <p className="text-black dark:text-white text-sm font-bold transition-colors">Book a quick 15-min discovery call.</p>
                </div>
             </div>
             <button 
                onClick={() => onOpenModal('join')}
                className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-opacity"
             >
               Schedule a call
             </button>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border-b-2 border-black dark:border-white pb-4 transition-colors"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between py-6 text-left group"
              >
                <span className="text-xl font-black text-black dark:text-white group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors">{faq.q}</span>
                <span className={`text-2xl text-black dark:text-white transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                  ↓
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <p className="text-black dark:text-white font-bold leading-relaxed text-lg transition-colors">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
