
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import HowItWorks from './components/HowItWorks';
import Gallery from './components/Gallery';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Learn from './components/Learn';
import Profile from './components/Profile';
import { User, ArtPiece, SubscriptionStatus } from './types';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'join' | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'learn' | 'profile'>('home');
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('artjoy_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('artjoy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('artjoy_user');
    }
  }, [user]);

  const toggleTheme = () => setIsDark(!isDark);
  const openModal = (type: 'login' | 'join') => setModalType(type);
  const closeModal = () => setModalType(null);

  const handleLogin = (name: string, email: string, sub: SubscriptionStatus = 'individual') => {
    setUser({
      name,
      email,
      subscription: sub,
      favorites: [],
      generated: [],
    });
    setModalType(null);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const navigateTo = (view: 'home' | 'learn' | 'profile') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFavorite = useCallback((piece: ArtPiece) => {
    if (!user) {
      setModalType('login');
      return;
    }
    setUser(prev => {
      if (!prev) return null;
      const exists = prev.favorites.find(f => f.id === piece.id);
      if (exists) {
        return { ...prev, favorites: prev.favorites.filter(f => f.id !== piece.id) };
      }
      return { ...prev, favorites: [...prev.favorites, piece] };
    });
  }, [user]);

  const addGeneratedPiece = useCallback((piece: ArtPiece) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, generated: [piece, ...prev.generated] };
    });
  }, []);

  return (
    <div className="min-h-screen selection:bg-black selection:text-white transition-colors duration-300 dark:bg-[#0a0a0a]">
      <Navbar 
        isDark={isDark} 
        onToggleTheme={toggleTheme} 
        onOpenModal={openModal} 
        onNavigate={navigateTo}
        onScrollTo={scrollToSection}
        currentView={currentView}
        user={user}
      />
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero onOpenModal={openModal} onScrollTo={scrollToSection} />
            <Marquee />
            <HowItWorks />
            <Gallery onFavorite={toggleFavorite} onGenerate={addGeneratedPiece} user={user} />
            <section className="py-32 text-center px-6">
               <div className="max-w-4xl mx-auto p-16 bg-black dark:bg-[#141414] text-white rounded-[60px] shadow-2xl relative overflow-hidden transition-colors">
                  <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-3xl"></div>
                  <p className="text-3xl md:text-5xl font-bold italic mb-12 leading-tight">
                    "ArtJoy has completely redefined how we think about office aesthetics. The quality is unmatched."
                  </p>
                  <div className="flex flex-col items-center gap-4">
                     <div className="w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden shadow-lg">
                        <img src="https://i.pravatar.cc/150?u=artlover" alt="Reviewer" />
                     </div>
                     <div>
                        <h5 className="font-bold text-xl text-white">Elena Vankova</h5>
                        <p className="text-sm text-white uppercase tracking-widest font-bold">Head of Design, Lumos Tech</p>
                     </div>
                  </div>
               </div>
            </section>
            <Benefits />
            <Pricing onOpenModal={openModal} />
            <FAQ onOpenModal={openModal} />
          </>
        )}
        {currentView === 'learn' && <Learn />}
        {currentView === 'profile' && user && (
          <Profile user={user} onLogout={handleLogout} onScrollTo={scrollToSection} />
        )}
      </main>

      <Footer onOpenModal={openModal} />
      
      {/* Floating CTA Badge */}
      {!user && (
        <div className="fixed bottom-8 right-8 z-[100] hidden sm:block">
          <button 
            onClick={() => openModal('join')}
            className="flex items-center gap-4 pl-3 pr-8 py-3 bg-white dark:bg-[#141414] border border-gray-100 dark:border-white/10 rounded-full shadow-2xl hover:scale-105 transition-all group border-2 border-black dark:border-white"
          >
            <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner">
               <span className="text-white dark:text-black text-xl">✨</span>
            </div>
            <div className="text-left">
               <div className="text-[10px] font-black uppercase text-black dark:text-white leading-none mb-1 tracking-wider">Start Today</div>
               <div className="text-sm font-black leading-none text-black dark:text-white">Join ArtJoy</div>
            </div>
          </button>
        </div>
      )}

      <Modal 
        isOpen={!!modalType} 
        onClose={closeModal} 
        type={modalType} 
        onSuccess={handleLogin}
      />
    </div>
  );
};

export default App;
