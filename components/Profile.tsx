
import React from 'react';
import { User, ArtPiece } from '../types';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onScrollTo: (id: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onScrollTo }) => {
  const stats = [
    { label: 'Favorites', value: user.favorites.length },
    { label: 'Generated', value: user.generated.length },
    { label: 'Plan', value: user.subscription.toUpperCase() },
  ];

  const renderGallery = (items: ArtPiece[], title: string) => (
    <div className="mb-20">
      <h3 className="text-2xl font-black mb-8 text-black dark:text-white uppercase tracking-tighter">{title}</h3>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((art) => (
            <div key={art.id} className="group">
              <div className="aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden mb-4 border border-gray-100 dark:border-white/10">
                <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h4 className="font-bold text-black dark:text-white">{art.title}</h4>
              <p className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">{art.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-20 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[40px] text-center">
          <p className="text-black dark:text-white font-bold opacity-40">Nothing to show here yet.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="pt-32 pb-20 px-6 transition-colors dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20">
          <div>
            <span className="text-xs font-black tracking-widest text-black dark:text-white uppercase mb-4 block">Collector Profile</span>
            <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter">
              Hey, <span className="text-italics">{user.name.split(' ')[0]}</span>
            </h1>
          </div>
          <button 
            onClick={onLogout}
            className="px-8 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-black rounded-xl hover:bg-red-100 transition-colors uppercase text-xs tracking-widest"
          >
            Sign Out
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="p-10 rounded-[40px] bg-white dark:bg-[#141414] border border-gray-100 dark:border-white/10 shadow-sm transition-colors">
              <div className="text-[10px] font-black uppercase text-black/40 dark:text-white/40 tracking-widest mb-2">{s.label}</div>
              <div className="text-4xl font-black text-black dark:text-white">{s.value}</div>
            </div>
          ))}
        </div>

        {renderGallery(user.generated, "Your Generations")}
        {renderGallery(user.favorites, "Your Collection Favorites")}

        <div className="bg-black dark:bg-white text-white dark:text-black rounded-[60px] p-16 text-center transition-colors">
          <h2 className="text-3xl md:text-5xl font-black mb-8 italic">Ready for another masterpiece?</h2>
          <button 
            onClick={() => onScrollTo('gallery')}
            className="px-10 py-5 bg-white dark:bg-black text-black dark:text-white rounded-2xl font-black text-lg hover:scale-105 transition-transform"
          >
            Launch Studio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
