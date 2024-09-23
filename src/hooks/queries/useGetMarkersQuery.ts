import { getMarkers } from "@/api/marker";
import { UseQueryCustomOptions } from "@/types/commons";
import { Marker } from "@/types/domains";
import { useQuery } from "@tanstack/react-query";

export default function useGetMarkersQuery(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: ["marker", "getMarkers"],
    ...queryOptions
  });
};