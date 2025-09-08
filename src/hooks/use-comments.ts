import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { CommentsApi } from "../api/end-point.api";
import type { Comment } from "../types/api-response.interface";

const QUERY_KEYS = {
  COMMENTS_BY_MOVIE: "commentsByMovie",
} as const;

// ------------------- LIST COMMENTS -------------------
export function useComments(movieId: number): UseQueryResult<Comment[], Error> {
  return useQuery<Comment[], Error>({
    queryKey: [QUERY_KEYS.COMMENTS_BY_MOVIE, movieId],
    queryFn: async () => (await CommentsApi.getByMovie(movieId)).data,
    enabled: !!movieId,
    staleTime: 2 * 60 * 1000,
  });
}

// ------------------- ADD COMMENT -------------------
export function useAddComment(movieId: number): UseMutationResult<Comment, Error, string> {
  const queryClient = useQueryClient();
  return useMutation<Comment, Error, string>({
    mutationFn: (content) => CommentsApi.add(movieId, content).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENTS_BY_MOVIE, movieId] });
    },
  });
}
