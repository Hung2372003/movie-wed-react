import AxiosClient from "./axios-client";
import type { Movie, Episode, Comment, Rating, Favorite, User } from "../types/api-response.interface";

// ================= MOVIES =================
export const MoviesApi = {
  getAll: (page = 1, pageSize = 10, search?: string) =>
    AxiosClient.get<{ total: number; page: number; pageSize: number; data: Movie[] }>(
      `/movies?page=${page}&pageSize=${pageSize}${search ? `&search=${search}` : ""}`
    ),

  getById: (id: number) =>
    AxiosClient.get<Movie>(`/movies/${id}`),

  create: (data: Omit<Movie, "id" | "createdAt" | "updatedAt">) =>
    AxiosClient.post<Movie>("/movies", data),

  update: (id: number, data: Partial<Movie>) =>
    AxiosClient.put<Movie>(`/movies/${id}`, data),

  delete: (id: number) =>
    AxiosClient.delete<void>(`/movies/${id}`),
};

// ================= EPISODES =================
export const EpisodesApi = {
  getByMovie: (movieId: number) =>
    AxiosClient.get<Episode[]>(`/episodes/movie/${movieId}`),

  getById: (id: number) =>
    AxiosClient.get<Episode>(`/episodes/${id}`),

  create: (movieId: number, data: Omit<Episode, "id" | "createdAt" | "updatedAt">) =>
    AxiosClient.post<Episode>(`/episodes/movie/${movieId}`, data),

  update: (id: number, data: Partial<Episode>) =>
    AxiosClient.put<Episode>(`/episodes/${id}`, data),

  delete: (id: number) =>
    AxiosClient.delete<void>(`/episodes/${id}`),
};

// ================= FAVORITES =================
export const FavoritesApi = {
  getMyFavorites: () =>
    AxiosClient.get<Favorite[]>("/favorites/me"),

  add: (movieId: number) =>
    AxiosClient.post<Favorite>("/favorites", { movieId }),

  remove: (movieId: number) =>
    AxiosClient.delete<void>(`/favorites/${movieId}`),
};

// ================= RATINGS =================
export const RatingsApi = {
  rate: (movieId: number, score: number) =>
    AxiosClient.post<Rating>("/ratings", { movieId, score }),
};

// ================= COMMENTS =================
export const CommentsApi = {
  getByMovie: (movieId: number) =>
    AxiosClient.get<Comment[]>(`/comments/movie/${movieId}`),

  add: (movieId: number, content: string) =>
    AxiosClient.post<Comment>("/comments", { movieId, content }),
};

// ================= AUTH =================
export const AuthApi = {
  register: (data: { username: string; email: string; password: string }) =>
    AxiosClient.post<User>("/auth/register", data),

  login: (data: { emailOrUsername: string; password: string }) =>
    AxiosClient.post<{ token: string }>("/auth/login", data),
};