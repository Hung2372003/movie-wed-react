import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {  UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { MoviesApi } from "../api/end-point.api";
import type { Movie } from "../types/api-response.interface";

// ------------------- LIST MOVIES -------------------
type MoviesList = { total: number; page: number; pageSize: number; data: Movie[] };

export function useMovies(
  page = 1,
  pageSize = 10,
  search?: string,
  type?: string,
  country?: string,
  year?: number
): UseQueryResult<MoviesList, Error> {
  const queryKey = ["movies", { page, pageSize, search, type, country, year }] as const;

  return useQuery<MoviesList, Error>({
    queryKey,
    queryFn: async () => (await MoviesApi.getAll(page, pageSize, search, type, country, year)).data,
    staleTime: 5 * 60 * 1000,
    // v5 không dùng keepPreviousData trực tiếp, TS sẽ không báo lỗi
  });
}

// ------------------- SINGLE MOVIE -------------------
export function useMovie(id: number): UseQueryResult<Movie, Error> {
  return useQuery<Movie, Error>({
    queryKey: ["movie", id],
    queryFn: async () => (await MoviesApi.getById(id)).data,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// ------------------- CREATE MOVIE -------------------
export function useCreateMovie(): UseMutationResult<Movie, Error, FormData> {
  const queryClient = useQueryClient();
  return useMutation<Movie, Error, FormData>({
    mutationFn: (data: FormData) => MoviesApi.create(data).then(res => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
  });
}

// ------------------- UPDATE MOVIE -------------------
export function useUpdateMovie(): UseMutationResult<Movie, Error, { id: number; data: FormData }> {
  const queryClient = useQueryClient();
  return useMutation<Movie, Error, { id: number; data: FormData }>({
    mutationFn: ({ id, data }) => MoviesApi.update(id, data).then(res => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie", id] });
    },
  });
}
// ------------------- DELETE MOVIE -------------------
export function useDeleteMovie(): UseMutationResult<void, Error, number> {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await MoviesApi.delete(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
  });
}
