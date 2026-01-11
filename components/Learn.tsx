
import React from 'react';

const modules = [
  {
    tag: "Level 01",
    title: "The Digital Canvas",
    desc: "Understanding resolution, color profiles (RGB vs CMYK), and the infinite possibilities of the non-destructive workflow.",
    icon: "🖌️"
  },
  {
    tag: "Level 02",
    title: "Hardware & Tools",
    desc: "From iPad Pro + Apple Pencil to Wacom Intuos. Finding the right tactile response for your specific drawing style.",
    icon: "🖊️"
  },
  {
    tag: "Level 03",
    title: "Layer Mastery",
    desc: "Learn how to stack your work. Using clipping masks, alpha locks, and blending modes to create complex lighting and depth.",
    icon: "🥞"
  },
  {
    tag: "Level 04",
    title: "AI as a Brush",
    desc: "ArtJoy exclusive: How to use generative models as a starting point. Prompt engineering for texture, mood, and composition.",
    icon: "✨"
  }
];

const Learn: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 transition-colors dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <span className="text-xs font-black tracking-widest text-black dark:text-white uppercase mb-4 block">The Academy</span>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.95] mb-8 tracking-tighter text-black dark:text-white">
            Master the <br />
            <span className="text-italics">digital</span> craft.
          </h1>
          <p className="text-2xl text-black dark:text-white max-w-2xl font-bold leading-relaxed opacity-80">
            Digital art isn't just about the software—it's about the vision. We teach you how to bridge the gap between imagination and pixels.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {modules.map((m, i) => (
            <div key={i} className="p-12 rounded-[50px] border-2 border-black dark:border-white bg-white dark:bg-[#141414] group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500">
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded-full group-hover:bg-white dark:group-hover:bg-black group-hover:text-black dark:group-hover:text-white transition-colors">
                  {m.tag}
                </span>
                <span className="text-4xl">{m.icon}</span>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{m.title}</h3>
              <p className="text-lg font-bold opacity-70 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-black dark:bg-white text-white dark:text-black rounded-[60px] p-16 md:p-24 relative overflow-hidden transition-colors">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 italic">
                The Prompt <br />
                Manifesto
              </h2>
              <p className="text-xl font-bold opacity-80 mb-8 leading-relaxed">
                "A cyberpunk garden in 4:5 aspect ratio, high-fidelity, volumetric lighting, Octane render style, inspired by Moebius."
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex-shrink-0"></div>
                  <p className="font-black text-sm uppercase tracking-widest">Tip: Specify lighting (e.g., 'Golden Hour')</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0"></div>
                  <p className="font-black text-sm uppercase tracking-widest">Tip: Name your medium (e.g., 'Oil on canvas')</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full aspect-square rounded-[40px] overflow-hidden border-8 border-white/10 dark:border-black/10 shadow-2xl">
              <img 
                src="https://picsum.photos/800/800?random=academy" 
                alt="AI Art Process" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]"></div>
        </section>

        <div className="mt-32 text-center">
          <h2 className="text-4xl font-black mb-8 text-black dark:text-white transition-colors tracking-tight">Ready to create?</h2>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-6 bg-black dark:bg-white text-white dark:text-black text-xl font-black rounded-3xl hover:scale-105 transition-transform"
          >
            Join the ArtJoy Club
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learn;
