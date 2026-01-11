
import React from 'react';

const Marquee: React.FC = () => {
  const tags = [
    "Abstract", "Minimalism", "Vaporwave", "Surrealism", "Digital Oils", 
    "Geometric", "AI-Generated", "Cinematic", "Branding Art", "Interactive",
    "3D Sculpts", "Retro-Future", "Glitch Art", "Neo-Noir"
  ];

  return (
    <div className="py-20 border-y border-gray-100 dark:border-white/10 bg-white dark:bg-black transition-colors">
      <div className="marquee-container">
        <div className="marquee-content flex gap-8 py-4">
          {[...tags, ...tags].map((tag, idx) => (
            <div key={idx} className="px-8 py-3 rounded-full border border-gray-200 dark:border-white/10 text-lg font-bold text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all cursor-default">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
