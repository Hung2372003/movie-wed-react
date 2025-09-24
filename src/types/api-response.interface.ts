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
  description?: string | null;
  posterUrl?: string | null;
  posterPublicId?: string | null;
  trailerUrl?: string | null;
  trailerPublicId?: string | null;
  releaseYear?: number | null;
  country?: string | null;
  director?: string | null;
  duration?: number | null; // phút
  type: string;             // ví dụ: "Action", "Drama"...
  createdAt: string;        // ISO string
  updatedAt?: string | null;
  averageRating?: number | null;
  // Quan hệ
  episodes?: Episode[];
  comments?: Comment[];
  ratings?: Rating[];
  favorites?: Favorite[];
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

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}
