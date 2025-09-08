import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { RatingsApi } from "../api/end-point.api";
import type { Rating } from "../types/api-response.interface";

const QUERY_KEYS = {
  MOVIE: "movie",
  MOVIES: "movies",
} as const;

// ------------------- RATE MOVIE -------------------
export function useRateMovie(): UseMutationResult<Rating, Error, { movieId: number; score: number }> {
  const queryClient = useQueryClient();
  return useMutation<Rating, Error, { movieId: number; score: number }>({
    mutationFn: ({ movieId, score }) => RatingsApi.rate(movieId, score).then(res => res.data),
    onSuccess: (_, { movieId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MOVIE, movieId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MOVIES] });
    },
  });
}
