export interface MovieAdmin {
  id: number;
  title: string;
  description?: string;
  posterUrl?: string;
  trailerUrl?: string;
  type: string;
  releaseYear: number;
  country: string;
  director?: string;
  duration?: number;
  posterFile?: File;
  trailerFile?: File;

}

