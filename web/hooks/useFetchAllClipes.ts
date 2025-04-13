import { ClipeDTO } from "@/@types/Clipe";
import getAllClips from "@/components/clipes-list/getAllClips";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetAllClipes() {
  return useInfiniteQuery<ClipeDTO>({
    queryKey: ["clipes"],
    queryFn: (pageParam) => getAllClips(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    // getPreviousPageParam: (firstPage) => firstPage.prevCursor ?? null,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
