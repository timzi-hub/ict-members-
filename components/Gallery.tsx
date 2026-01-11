
import React, { useState } from 'react';
import { generateArtPiece } from '../services/geminiService';
import { ArtPiece, User } from '../types';

const INITIAL_ART: ArtPiece[] = [
  { id: '1', title: 'Midnight Bloom', artist: 'AI Collective', category: 'Abstract', imageUrl: 'https://picsum.photos/600/600?random=10', description: 'A deep dive into nocturnal floral patterns.' },
  { id: '2', title: 'Geometric Flow', artist: 'ArtJoy Original', category: 'Minimalism', imageUrl: 'https://picsum.photos/600/600?random=11', description: 'Precise lines meeting fluid emotions.' },
  { id: '3', title: 'Desert Mirage', artist: 'Visionary Studio', category: 'Surrealism', imageUrl: 'https://picsum.photos/600/600?random=12', description: 'Heat waves captured in digital amber.' },
  { id: '4', title: 'Urban Echo', artist: 'Street Digital', category: 'Glitch Art', imageUrl: 'https://picsum.photos/600/600?random=13', description: 'The sound of city lights.' },
];

interface GalleryProps {
  onFavorite: (piece: ArtPiece) => void;
  onGenerate: (piece: ArtPiece) => void;
  user: User | null;
}

const Gallery: React.FC<GalleryProps> = ({ onFavorite, onGenerate, user }) => {
  const [artworks, setArtworks] = useState<ArtPiece[]>(INITIAL_ART);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateArtPiece(prompt);
      const newArt: ArtPiece = {
        id: Date.now().toString(),
        title: prompt.length > 20 ? prompt.substring(0, 17) + '...' : prompt,
        artist: user ? user.name : 'Curious Mind',
        category: 'AI Custom',
        imageUrl,
        description: `Generated from prompt: "${prompt}"`
      };
      setArtworks([newArt, ...artworks]);
      onGenerate(newArt);
      setPrompt('');
    } catch (err) {
      setError("Failed to generate art. Check your API key or try a different prompt.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="gallery" className="py-32 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-xs font-bold tracking-widest text-black dark:text-white uppercase mb-4 block transition-colors">The Collection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white transition-colors">
              Recent <span className="text-italics">Creations</span>
            </h2>
          </div>
          
          <div className="flex-1 max-w-lg">
            <p className="text-sm text-black dark:text-white mb-4 font-black uppercase tracking-tight italic transition-colors">Generate your own masterpiece (AI Powered)</p>
            <div className="relative group">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision (e.g. A cyberpunk forest in rain)..."
                className="w-full px-6 py-4 bg-gray-100 dark:bg-white/5 rounded-2xl border-2 border-black dark:border-white focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-black outline-none transition-all pr-32 text-black dark:text-white font-bold"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="absolute right-2 top-2 bottom-2 px-6 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
              >
                {isGenerating ? '...' : 'Create'}
              </button>
            </div>
            {error && <p className="text-red-600 dark:text-red-400 text-xs mt-2 font-black">{error}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artworks.map((art) => {
            const isFav = user?.favorites.some(f => f.id === art.id);
            return (
              <div key={art.id} className="group cursor-pointer relative">
                <div className="aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden mb-4 shadow-sm border border-gray-100 dark:border-white/10 group-hover:shadow-xl transition-all duration-500 relative">
                  <img 
                    src={art.imageUrl} 
                    alt={art.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); onFavorite(art); }}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 active:scale-90 ${isFav ? 'text-red-500' : 'text-black/30 dark:text-white/30'}`}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-black dark:text-white transition-colors">{art.title}</h4>
                  <div className="flex items-center justify-between text-xs font-black text-black dark:text-white/60 uppercase tracking-widest transition-colors">
                    <span>{art.artist}</span>
                    <span className="px-2 py-0.5 bg-black dark:bg-white text-white dark:text-black rounded text-[10px] transition-colors">{art.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
