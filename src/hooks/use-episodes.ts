import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { EpisodesApi } from "../api/end-point.api";
import type { Episode } from "../types/api-response.interface";

const QUERY_KEYS = {
  EPISODES_BY_MOVIE: "episodesByMovie",
  EPISODE: "episode",
} as const;

// ------------------- LIST EPISODES BY MOVIE -------------------
export function useEpisodesByMovie(movieId: number): UseQueryResult<Episode[], Error> {
  return useQuery<Episode[], Error>({
    queryKey: [QUERY_KEYS.EPISODES_BY_MOVIE, movieId],
    queryFn: async () => (await EpisodesApi.getByMovie(movieId)).data,
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000,
  });
}

// ------------------- SINGLE EPISODE -------------------
export function useEpisode(id: number): UseQueryResult<Episode, Error> {
  return useQuery<Episode, Error>({
    queryKey: [QUERY_KEYS.EPISODE, id],
    queryFn: async () => (await EpisodesApi.getById(id)).data,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// ------------------- CREATE EPISODE -------------------
export function useCreateEpisode(movieId: number): UseMutationResult<Episode, Error, Omit<Episode, "id" | "createdAt" | "updatedAt">> {
  const queryClient = useQueryClient();
  return useMutation<Episode, Error, Omit<Episode, "id" | "createdAt" | "updatedAt">>({
    mutationFn: (data) => EpisodesApi.create(movieId, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EPISODES_BY_MOVIE, movieId] });
    },
  });
}

// ------------------- UPDATE EPISODE -------------------
export function useUpdateEpisode(): UseMutationResult<Episode, Error, { id: number; data: Partial<Episode> }> {
  const queryClient = useQueryClient();
  return useMutation<Episode, Error, { id: number; data: Partial<Episode> }>({
    mutationFn: ({ id, data }) => EpisodesApi.update(id, data).then(res => res.data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EPISODES_BY_MOVIE] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EPISODE, id] });
    },
  });
}

// ------------------- DELETE EPISODE -------------------
export function useDeleteEpisode(movieId: number): UseMutationResult<void, Error, number> {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await EpisodesApi.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EPISODES_BY_MOVIE, movieId] });
    },
  });
}
