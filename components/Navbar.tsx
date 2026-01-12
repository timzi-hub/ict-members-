
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenModal: (type: 'login' | 'join') => void;
  onNavigate: (view: 'home' | 'learn' | 'profile') => void;
  onScrollTo: (id: string) => void;
  onBookCall: () => void;
  currentView: 'home' | 'learn' | 'profile';
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme, onOpenModal, onNavigate, onScrollTo, onBookCall, currentView, user }) => {
  const navItems = [
    { label: 'Home', view: 'home', type: 'nav' },
    { label: 'Learn', view: 'learn', type: 'nav' },
    { label: 'Gallery', id: 'gallery', type: 'scroll' },
    { label: 'Pricing', id: 'pricing', type: 'scroll' },
  ];

  const isActive = (view: string) => currentView === view;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="w-10 h-10 bg-black dark:bg-white rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg">
            <div className="w-4 h-4 bg-white dark:bg-black rounded-sm rotate-45 transition-colors"></div>
          </div>
          <span className="text-2xl font-black tracking-tighter text-black dark:text-white transition-colors">ArtJoy</span>
        </div>
        
        {/* Main Nav Links */}
        <div className="hidden lg:flex items-center bg-gray-100/50 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 transition-colors">
          {navItems.map((item) => {
            const active = item.type === 'nav' && isActive(item.view as string);
            return (
              <button 
                key={item.label}
                onClick={() => item.type === 'nav' ? onNavigate(item.view as any) : onScrollTo(item.id as string)} 
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  active 
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md scale-105' 
                    : 'text-black/60 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBookCall}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 border-2 border-black/10 dark:border-white/10 rounded-xl hover:border-black dark:hover:border-white transition-all text-[10px] font-black uppercase tracking-widest text-black dark:text-white"
          >
            Book a call
          </button>
          
          <button 
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl border-2 border-black/5 dark:border-white/5 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center justify-center w-11 h-11"
            aria-label="Toggle Theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <button 
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-3 pl-2 pr-5 py-2 rounded-2xl border-2 transition-all ${
                isActive('profile') 
                  ? 'border-black dark:border-white bg-black/5 dark:bg-white/5' 
                  : 'border-transparent hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-black text-xs shadow-md">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:block text-xs font-black text-black dark:text-white uppercase tracking-widest">Account</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onOpenModal('login')}
                className="hidden sm:block px-6 py-2.5 text-[10px] font-black text-black/60 dark:text-white/40 hover:text-black dark:hover:text-white transition-all uppercase tracking-widest"
              >
                Login
              </button>
              <button 
                onClick={() => onOpenModal('join')}
                className="px-6 py-2.5 text-[10px] font-black bg-black dark:bg-white text-white dark:text-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg uppercase tracking-widest"
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
