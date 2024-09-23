import { createPost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { UseMutationCustomOptions } from "@/types/commons";
import { Marker } from "@/types/domains";
import { useMutation } from "@tanstack/react-query";

export default function useCreatePostMutation(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    // 1. invalidate cache
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["marker", "getMarkers"]
      });
    },
    // 2. set cache data
    // onSuccess: (newPost) => {
    //   queryClient.setQueryData<Marker[]>(
    //     ["marker", "getMarkers"],
    //     (existingMarkers) => {
    //       const newMarker = {
    //         id: newPost.id,
    //         latitude: newPost.latitude,
    //         longitude: newPost.longitude,
    //         color: newPost.color,
    //         score: newPost.score,
    //       };

    //       return existingMarkers
    //         ? [...existingMarkers, newMarker]
    //         : [newMarker];
    //     }
    //   )
    // },
    ...mutationOptions
  });
};