import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { FavoritesApi } from "../api/end-point.api";
import type { Favorite } from "../types/api-response.interface";

const QUERY_KEYS = {
  MY_FAVORITES: "myFavorites",
} as const;

// ------------------- LIST FAVORITES -------------------
export function useMyFavorites(): UseQueryResult<Favorite[], Error> {
  return useQuery<Favorite[], Error>({
    queryKey: [QUERY_KEYS.MY_FAVORITES],
    queryFn: async () => (await FavoritesApi.getMyFavorites()).data,
    staleTime: 5 * 60 * 1000,
  });
}

// ------------------- ADD FAVORITE -------------------
export function useAddFavorite(): UseMutationResult<Favorite, Error, number> {
  const queryClient = useQueryClient();
  return useMutation<Favorite, Error, number>({
    mutationFn: (movieId) => FavoritesApi.add(movieId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_FAVORITES] });
    },
  });
}

// ------------------- REMOVE FAVORITE -------------------
export function useRemoveFavorite(): UseMutationResult<void, Error, number> {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (movieId) => {
      await FavoritesApi.remove(movieId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_FAVORITES] });
    },
  });
}
