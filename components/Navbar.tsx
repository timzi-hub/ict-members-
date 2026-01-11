
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenModal: (type: 'login' | 'join') => void;
  onNavigate: (view: 'home' | 'learn' | 'profile') => void;
  onScrollTo: (id: string) => void;
  currentView: 'home' | 'learn' | 'profile';
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme, onOpenModal, onNavigate, onScrollTo, currentView, user }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center transition-colors">
            <div className="w-3 h-3 bg-white dark:bg-black rounded-sm rotate-45 transition-colors"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-black dark:text-white transition-colors">ArtJoy</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-black text-black dark:text-white transition-colors">
          <button 
            onClick={() => onNavigate('home')} 
            className={`hover:opacity-60 transition-opacity uppercase tracking-widest ${currentView === 'home' ? 'underline decoration-2 underline-offset-8' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('learn')} 
            className={`hover:opacity-60 transition-opacity uppercase tracking-widest ${currentView === 'learn' ? 'underline decoration-2 underline-offset-8' : ''}`}
          >
            Learn
          </button>
          <button 
            onClick={() => onScrollTo('gallery')}
            className="hover:opacity-60 transition-opacity uppercase tracking-widest"
          >
            Gallery
          </button>
          <button 
            onClick={() => onScrollTo('pricing')}
            className="hover:opacity-60 transition-opacity uppercase tracking-widest"
          >
            Pricing
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleTheme}
            className="p-2.5 rounded-lg border border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center justify-center w-10 h-10"
            aria-label="Toggle Theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <button 
              onClick={() => onNavigate('profile')}
              className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full border-2 ${currentView === 'profile' ? 'border-black dark:border-white' : 'border-transparent'} hover:bg-gray-100 dark:hover:bg-white/5 transition-all`}
            >
              <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-black text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:block text-sm font-black text-black dark:text-white uppercase tracking-tighter">Profile</span>
            </button>
          ) : (
            <>
              <button 
                onClick={() => onOpenModal('login')}
                className="hidden sm:block px-5 py-2.5 text-sm font-black border border-black dark:border-white text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-all uppercase tracking-tighter"
              >
                Login
              </button>
              <button 
                onClick={() => onOpenModal('join')}
                className="px-5 py-2.5 text-sm font-black bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 transition-all uppercase tracking-tighter"
              >
                Join
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
