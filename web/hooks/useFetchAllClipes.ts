import { ClipeDTO } from "@/@types/Clipe";
import getAllClips from "@/components/clipes-list/getAllClips";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetAllClipes() {
  return useInfiniteQuery<ClipeDTO>({
    queryKey: ["clipes"],
    queryFn: getAllClips,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
