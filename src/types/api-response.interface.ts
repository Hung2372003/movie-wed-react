// User
export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

// Movie
export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  trailerUrl: string;
  releaseYear: number;
  country: string;
  director: string;
  duration: number;
  type: string;
  createdAt: string;
  updatedAt?: string;
}

// Episode
export interface Episode {
  id: number;
  movieId: number;
  episodeNumber: number;
  title: string;
  videoUrl: string;
  createdAt: string;
  updatedAt?: string;
}

// Comment
export interface Comment {
  id: number;
  movieId: number;
  userId: number;
  content: string;
  createdAt: string;
  user?: User;
}

// Rating
export interface Rating {
  id: number;
  movieId: number;
  userId: number;
  score: number;
  createdAt: string;
}

// Favorite
export interface Favorite {
  id: number;
  movieId: number;
  userId: number;
  createdAt: string;
}
