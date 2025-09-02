import axiosClient from "./axios-client";
import type { Movie, Episode, Comment, Rating, Favorite, User } from "../types/api-response.interface";

// ================= MOVIES =================
export const MoviesApi = {
  getAll: (page = 1, pageSize = 10, search?: string) =>
    axiosClient.get<{ total: number; page: number; pageSize: number; data: Movie[] }>(
      `/movies?page=${page}&pageSize=${pageSize}${search ? `&search=${search}` : ""}`
    ),

  getById: (id: number) =>
    axiosClient.get<Movie>(`/movies/${id}`),

  create: (data: Omit<Movie, "id" | "createdAt" | "updatedAt">) =>
    axiosClient.post<Movie>("/movies", data),

  update: (id: number, data: Partial<Movie>) =>
    axiosClient.put<Movie>(`/movies/${id}`, data),

  delete: (id: number) =>
    axiosClient.delete<void>(`/movies/${id}`),
};

// ================= EPISODES =================
export const EpisodesApi = {
  getByMovie: (movieId: number) =>
    axiosClient.get<Episode[]>(`/episodes/movie/${movieId}`),

  getById: (id: number) =>
    axiosClient.get<Episode>(`/episodes/${id}`),

  create: (movieId: number, data: Omit<Episode, "id" | "createdAt" | "updatedAt">) =>
    axiosClient.post<Episode>(`/episodes/movie/${movieId}`, data),

  update: (id: number, data: Partial<Episode>) =>
    axiosClient.put<Episode>(`/episodes/${id}`, data),

  delete: (id: number) =>
    axiosClient.delete<void>(`/episodes/${id}`),
};

// ================= FAVORITES =================
export const FavoritesApi = {
  getMyFavorites: () =>
    axiosClient.get<Favorite[]>("/favorites/me"),

  add: (movieId: number) =>
    axiosClient.post<Favorite>("/favorites", { movieId }),

  remove: (movieId: number) =>
    axiosClient.delete<void>(`/favorites/${movieId}`),
};

// ================= RATINGS =================
export const RatingsApi = {
  rate: (movieId: number, score: number) =>
    axiosClient.post<Rating>("/ratings", { movieId, score }),
};

// ================= COMMENTS =================
export const CommentsApi = {
  getByMovie: (movieId: number) =>
    axiosClient.get<Comment[]>(`/comments/movie/${movieId}`),

  add: (movieId: number, content: string) =>
    axiosClient.post<Comment>("/comments", { movieId, content }),
};

// ================= AUTH =================
export const AuthApi = {
  register: (data: { username: string; email: string; password: string }) =>
    axiosClient.post<User>("/auth/register", data),

  login: (data: { emailOrUsername: string; password: string }) =>
    axiosClient.post<{ token: string }>("/auth/login", data),
};