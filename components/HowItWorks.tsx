
import React from 'react';

const steps = [
  {
    title: "Subscribe",
    desc: "Join a plan and unlock unlimited browsing and exclusive weekly drops.",
    icon: "💳"
  },
  {
    title: "Request",
    desc: "Describe your custom vision using our integrated AI studio.",
    icon: "🎨"
  },
  {
    title: "Display",
    desc: "Receive 4K digital files instantly to beam to your screens.",
    icon: "📺"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 leading-[1.2] text-black dark:text-white">
          The way art <br />
          <span className="text-italics">should've</span> been collected.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="p-10 rounded-[40px] border border-gray-100 dark:border-white/10 gradient-card flex flex-col items-center text-center group hover:scale-[1.02] transition-transform">
              <div className="w-20 h-20 rounded-3xl bg-white dark:bg-white/10 shadow-lg flex items-center justify-center text-4xl mb-8 group-hover:rotate-6 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{step.title}</h3>
              <p className="text-black dark:text-white leading-relaxed font-bold">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
