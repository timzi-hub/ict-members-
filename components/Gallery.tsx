
import React, { useState, useEffect } from 'react';
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [reportedIds, setReportedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let timer: number;
    if (showSuccess) {
      timer = window.setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setShowSuccess(false);
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
      setShowSuccess(true);
    } catch (err) {
      setError("Failed to generate art. Check your API key or try a different prompt.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReport = (id: string) => {
    setReportedIds(prev => new Set(prev).add(id));
    // In a real app, this would send a signal to the backend
    setTimeout(() => {
      setReportedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 3000);
  };

  return (
    <section id="gallery" className="py-32 px-6 transition-colors relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-xs font-bold tracking-widest text-black dark:text-white uppercase mb-4 block transition-colors">The Collection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white transition-colors">
              Recent <span className="text-italics">Creations</span>
            </h2>
          </div>
          
          <div className="flex-1 max-w-lg relative">
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
            {error && <p className="text-red-600 dark:text-red-400 text-xs mt-2 font-black animate-in fade-in slide-in-from-top-1">{error}</p>}
            {showSuccess && (
              <div className="absolute -bottom-12 left-0 right-0 flex justify-center md:justify-start pointer-events-none">
                <p className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  ✨ Masterpiece ready!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artworks.map((art) => {
            const isFav = user?.favorites.some(f => f.id === art.id);
            const isReported = reportedIds.has(art.id);
            return (
              <div key={art.id} className="group cursor-pointer relative animate-in fade-in zoom-in duration-500">
                <div className="aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl overflow-hidden mb-4 shadow-sm border border-gray-100 dark:border-white/10 group-hover:shadow-xl transition-all duration-500 relative">
                  <img 
                    src={art.imageUrl} 
                    alt={art.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onFavorite(art); }}
                      title="Favorite"
                      className={`w-10 h-10 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 active:scale-90 ${isFav ? 'text-red-500' : 'text-black/30 dark:text-white/30'}`}
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleReport(art.id); }}
                      title="Report Content"
                      disabled={isReported}
                      className={`w-10 h-10 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 active:scale-90 ${isReported ? 'text-orange-500' : 'text-black/30 dark:text-white/30'}`}
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
                      </svg>
                    </button>
                  </div>

                  {/* Reported Confirmation Overlay */}
                  {isReported && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 text-center animate-in fade-in duration-300">
                      <p className="text-white text-xs font-black uppercase tracking-widest leading-relaxed">
                        Flagged for review.<br/>Thank you for helping us curate.
                      </p>
                    </div>
                  )}
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
