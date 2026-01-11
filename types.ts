
export type SubscriptionStatus = 'none' | 'individual' | 'pro' | 'elite';

export interface ArtPiece {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  category: string;
  description: string;
}

export interface User {
  name: string;
  email: string;
  subscription: SubscriptionStatus;
  favorites: ArtPiece[];
  generated: ArtPiece[];
}

export interface GalleryState {
  items: ArtPiece[];
  loading: boolean;
  error: string | null;
}
