
import React from 'react';

interface FooterProps {
  onOpenModal: (type: 'login' | 'join') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-black text-white pt-32 pb-12 px-6 overflow-hidden relative">
       {/* Aesthetic grid line for footer */}
       <div className="absolute top-0 left-[10%] bottom-0 w-[1px] bg-white/10"></div>
       <div className="absolute top-0 right-[10%] bottom-0 w-[1px] bg-white/10"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-[1.1] max-w-3xl">
          See if ArtJoy is the right fit for your <span className="text-italics text-white">(it totally is)</span>
        </h2>
        
        <button 
          onClick={() => onOpenModal('join')}
          className="px-10 py-5 bg-white text-black text-xl font-bold rounded-2xl hover:scale-105 transition-transform mb-20"
        >
          Book a 15-min intro call
        </button>

        <div className="w-full h-px bg-white/10 mb-12"></div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rotate-45"></div>
            </div>
            <span className="text-lg font-bold tracking-tight">ArtJoy</span>
          </div>

          <div className="flex gap-10 text-xs font-black uppercase tracking-widest text-white">
            <a href="#" className="hover:opacity-60 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Terms</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Instagram</a>
          </div>
          
          <div className="text-xs text-white font-bold">
            © 2025 ArtJoy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
