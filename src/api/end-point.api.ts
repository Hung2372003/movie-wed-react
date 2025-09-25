import AxiosClient from "./axios-client";
import type { Movie, Episode, Comment, Rating, Favorite, RegisterResponse, LoginResponse ,User} from "../types/api-response.interface";

// ================= MOVIES =================

export const MoviesApi = {
  getAll: (
    page = 1,
    pageSize = 10,
    search?: string,
    type?: string,
    country?: string,
    year?: number
  ) =>
    AxiosClient.get<{ total: number; page: number; pageSize: number; data: Movie[] }>(
      `/movies?page=${page}&pageSize=${pageSize}` +
        (search ? `&search=${search}` : "") +
        (type ? `&type=${type}` : "") +
        (country ? `&country=${country}` : "") +
        (year ? `&year=${year}` : "")
    ),

  getById: (id: number) => AxiosClient.get<Movie>(`/movies/${id}`),

  create: (data: FormData) =>
    AxiosClient.post<Movie>("/movies", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id: number, data: FormData) =>
    AxiosClient.put<Movie>(`/movies/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id: number) => AxiosClient.delete<void>(`/movies/${id}`),
};


// ================= EPISODES =================
export const EpisodesApi = {
   getAllEpisode: () =>
    AxiosClient.get<Episode[]>(`/episodes/movie/all`),

  getByMovie: (movieId: number) =>
    AxiosClient.get<Episode[]>(`/episodes/movie/${movieId}`),

  getById: (id: number) =>
    AxiosClient.get<Episode>(`/episodes/${id}`),

  create: (movieId: number, data: Omit<Episode, "id" | "createdAt" | "updatedAt"> & { video?: File }) => {
    const formData = new FormData();
    formData.append("episodeNumber", data.episodeNumber.toString());
    formData.append("title", data.title ?? "");

    // Nếu có file video thì append
    if (data.video) {
      formData.append("video", data.video);
    }

    return AxiosClient.post<Episode>(`/episodes/movie/${movieId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update: (
  id: number,
  data: Partial<Episode> & { video?: File }
    ) => {
      const formData = new FormData();

      if (data.episodeNumber !== undefined) {
        formData.append("episodeNumber", data.episodeNumber.toString());
      }

      if (data.title !== undefined) {
        formData.append("title", data.title);
      }

      if (data.video) {
        formData.append("video", data.video);
      }

      return AxiosClient.put<Episode>(
        `/episodes/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    },

  delete: (id: number) =>
    AxiosClient.delete<void>(`/episodes/${id}`),
};

// ================= FAVORITES =================
export const FavoritesApi = {
  getMyFavorites: () =>
    AxiosClient.get<Favorite[]>("/favorites"),

  add: (movieId: number) =>
    AxiosClient.post<Favorite>(`/favorites/movie/${movieId}`),

  remove: (movieId: number) =>
    AxiosClient.delete<void>(`/favorites/movie/${movieId}`),
};

// ================= RATINGS =================
export const RatingsApi = {
  rate: (movieId: number, score: number) =>
    AxiosClient.post<Rating>(`/ratings/${movieId}`, { score }),
  getAverageRating: (movieId: number) =>
    AxiosClient.get<{ average: number ,total:number,data:[] }>(`/ratings/movie/${movieId}`),
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
    AxiosClient.post<RegisterResponse>("/auth/register", data),

  login: (data: { identifier: string; password: string }) =>
    AxiosClient.post<LoginResponse>("/auth/login", data),
};

export const UserApi = {
  // ADMIN
  getAll: () => AxiosClient.get<User[]>("/users"),
  getById: (id: number) => AxiosClient.get<User>(`/users/${id}`),
  delete: (id: number) => AxiosClient.delete(`/users/${id}`),

  // USER
  getMe: () => AxiosClient.get<User>("/users/me"),

  updateMe: (data: FormData) =>
    AxiosClient.put<User>("/users/me", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
