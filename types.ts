
export interface Movie {
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  quote: string;
}

export interface Song {
  title: string;
  artist: string;
  imageUrl: string;
  message: string;
}

export enum Page {
  LANDING = 'landing',
  MOVIES = 'movies',
  MUSIC = 'music',
  PROPOSAL = 'proposal'
}
