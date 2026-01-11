
import React from 'react';

interface HeroProps {
  onOpenModal: (type: 'login' | 'join') => void;
  onScrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal, onScrollTo }) => {
  return (
    <section className="pt-40 pb-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky lg:top-40">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black tracking-widest uppercase rounded-full mb-8 transition-colors">
             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
             Limited spots available
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] mb-10 tracking-tighter text-black dark:text-white transition-colors">
            Digital art <br />
            subscriptions for <br />
            <span className="text-italics">everyone</span>
          </h1>
          <p className="text-2xl text-black dark:text-white max-w-lg mb-12 leading-relaxed font-bold transition-colors">
            Curated collections delivered to your screen. <span className="font-bold text-black dark:text-white underline decoration-pink-500 decoration-4">Pause or cancel anytime.</span>
          </p>
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => onScrollTo('pricing')}
              className="px-10 py-5 bg-black dark:bg-white text-white dark:text-black text-lg font-bold rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-black/10"
            >
              See pricing
            </button>
            <button 
              onClick={() => onScrollTo('gallery')}
              className="px-10 py-5 bg-white dark:bg-[#141414] border border-gray-200 dark:border-white/10 text-lg font-bold rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-black dark:text-white"
            >
              Explore Gallery
            </button>
          </div>
        </div>

        <div className="relative pt-10 lg:pt-0">
          {/* Card Mockup Container */}
          <div className="relative z-10 p-8 bg-white dark:bg-[#141414] border border-gray-100 dark:border-white/10 rounded-[40px] shadow-2xl overflow-hidden group transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 dark:bg-pink-900/20 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform"></div>
            
            <div className="flex justify-between items-start mb-12">
               <div>
                 <div className="text-[10px] font-black uppercase text-black/40 dark:text-white/40 tracking-widest mb-1">Membership Card</div>
                 <div className="text-2xl font-bold text-black dark:text-white transition-colors">ArtJoy Elite</div>
               </div>
               <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-bold italic transition-colors">AJ</div>
            </div>

            <div className="aspect-video bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden mb-10 shadow-inner">
               <img 
                 src="https://picsum.photos/800/450?random=art1" 
                 alt="Art Mockup" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/10">
                  <span className="text-black/40 dark:text-white/40 text-sm font-bold">Curations this month</span>
                  <span className="font-bold text-black dark:text-white">24 / Unlimited</span>
               </div>
               <div className="flex justify-between items-center py-4">
                  <span className="text-black/40 dark:text-white/40 text-sm font-bold">Next Drop</span>
                  <span className="font-bold text-green-500">In 2 hours</span>
               </div>
            </div>

            <button 
              onClick={() => onOpenModal('join')}
              className="w-full mt-8 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity"
            >
               Join ArtJoy
            </button>
          </div>

          {/* Decorative background element */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-20 -z-0"></div>
          <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-purple-500 rounded-full blur-[120px] opacity-20 -z-0"></div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-8 -right-8 z-20 bg-white dark:bg-[#1a1a1a] p-6 rounded-3xl shadow-2xl border border-gray-50 dark:border-white/10 max-w-[240px] transition-colors">
             <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-2xl transition-colors">✓</div>
                <div>
                   <div className="text-xs font-black text-black/40 dark:text-white/40 uppercase">Available</div>
                   <div className="font-bold text-black dark:text-white">12 Artist Slots</div>
                </div>
             </div>
             <p className="text-[11px] text-black dark:text-white font-medium leading-relaxed opacity-60 transition-colors">We focus on quality, only taking a limited roster of collectors at a time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
