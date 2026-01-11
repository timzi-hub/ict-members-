
import React from 'react';

const benefits = [
  {
    title: "Curated board",
    desc: "Easily manage your art collection queue with a dedicated dashboard.",
    icon: "https://cdn.prod.website-files.com/5837424ae11409586f837994/678548430d58f4cbecec1999_Trello-Logo--Streamline-Logos.png",
    bg: "bg-[#f3f7ff] dark:bg-blue-900/10"
  },
  {
    title: "Fixed monthly rate",
    desc: "No hidden fees or auctions. Pay the same fixed price each month.",
    icon: "https://cdn.prod.website-files.com/5837424ae11409586f837994/678548430d58f4cbecec199b_Lock-Square-Dial-Pad--Streamline-Nova.png",
    bg: "bg-[#fff9f3] dark:bg-orange-900/10"
  },
  {
    title: "Instant delivery",
    desc: "Receive your high-res digital files the moment they are curated.",
    icon: "https://cdn.prod.website-files.com/5837424ae11409586f837994/678548430d58f4cbecec1997_Flash-Enable-Allow-1--Streamline-Nova.png",
    bg: "bg-[#f3fff5] dark:bg-green-900/10"
  },
  {
    title: "Top-notch quality",
    desc: "World-class digital art from leading AI models and human curators.",
    icon: "https://cdn.prod.website-files.com/5837424ae11409586f837994/678548430d58f4cbecec199d_Star--Streamline-Nova.png",
    bg: "bg-[#fff3f3] dark:bg-red-900/10"
  },
  {
    title: "Flexible and scalable",
    desc: "Pause or cancel your subscription anytime, no questions asked.",
    icon: "https://cdn.prod.website-files.com/5837424ae11409586f83799f/678548430d58f4cbecec199f_Resize-Expand--Streamline-Nova.png",
    bg: "bg-[#f3fbff] dark:bg-indigo-900/10"
  },
  {
    title: "Unique and all yours",
    desc: "Every custom commissioned piece is 100% yours to keep forever.",
    icon: "https://cdn.prod.website-files.com/5837424ae11409586f8379a1/678548430d58f4cbecec19a1_Touch-Id--Streamline-Nova.png",
    bg: "bg-[#f9f3ff] dark:bg-purple-900/10"
  }
];

const Benefits: React.FC = () => {
  return (
    <section className="py-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-xs font-bold tracking-widest text-black dark:text-white uppercase mb-4 block transition-colors">Membership benefits</span>
          <h2 className="text-4xl md:text-6xl font-bold max-w-2xl leading-[1.1] text-black dark:text-white transition-colors">
            It's <span className="text-italics">"you'll never go back"</span> better
          </h2>
          <p className="text-xl text-black dark:text-white mt-8 max-w-xl font-bold transition-colors">
            ArtJoy replaces expensive custom commissions and stock art for one flat monthly fee, delivered with speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="group">
              <div className={`w-full aspect-[16/10] ${benefit.bg} rounded-3xl mb-8 flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/5 transition-all duration-300`}>
                <img 
                  src={benefit.icon} 
                  alt={benefit.title} 
                  className="w-24 h-24 object-contain group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 dark:invert" 
                />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black dark:text-white transition-colors">{benefit.title}</h3>
              <p className="text-black dark:text-white leading-relaxed font-bold transition-colors">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
