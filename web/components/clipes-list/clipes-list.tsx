"use client";
import useGetAllClipes from "@/hooks/useFetchAllClipes";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ClipeItem } from "../clipe-item/clipe-item";
import { UserInfoSkeleton, VotesComponent } from "../clipe-item/components";
import CommentsComponent from "../clipe-item/components/comments";
import { VideoComponentSkeleton } from "../clipe-item/components/video";
import CongratulationsAlert from "./components/congratulations-alert";
import InfiniteScroll from "./components/infinite-scroll";

export function ClipesList() {
  const response = useGetAllClipes();
  const {
    data,
    isFetchingNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
    hasNextPage,
    fetchNextPage,
  } = response;

  const { ref: nextVideoRef, inView: inViewNext } = useInView();

  const { ref: previousVideoRef, inView: inViewPrevious } = useInView();

  useEffect(() => {
    if (inViewPrevious && !isFetchingPreviousPage && hasPreviousPage) {
      fetchPreviousPage();
    }
  }, [
    inViewPrevious,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
  ]);

  useEffect(() => {
    if (
      inViewNext &&
      !isFetchingNextPage &&
      !isFetchingPreviousPage &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [
    inViewNext,
    fetchNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
  ]);

  if (!data || data.pages.length === 0) {
    return <ClipesListSkeleton />;
  }

  const renderCLipes = data.pages.map((page, index) => (
    <div
      key={page.nextCursor}
      className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
      style={{
        position: "relative",
      }}
    >
      {index === 1 && hasPreviousPage && (
        <div
          ref={previousVideoRef}
          style={{
            zIndex: 99,
            top: 0,
            height: "30%",
            width: "100%",
            position: "absolute",
            pointerEvents: "none",
          }}
        />
      )}
      {page.data.map((clipe) => (
        <ClipeItem key={clipe.clip_id}>
          <ClipeItem.User user={clipe.user} posted_at={clipe.posted_at} />
          <ClipeItem.Video src={clipe.video_src} />
          <ClipeItem.Actions>
            <VotesComponent />
            <CommentsComponent />
          </ClipeItem.Actions>
        </ClipeItem>
      ))}
      {index === data.pages.length - 1 && hasNextPage && (
        <div
          style={{
            zIndex: 99,
            bottom: 0,
            height: "15%",
            width: "100%",
            position: "absolute",
            pointerEvents: "none",
          }}
          ref={nextVideoRef}
        />
      )}
    </div>
  ));

  return (
    <InfiniteScroll
      queryResponse={response}
      pendingComponent={<ClipesListSkeleton />}
      hasNoMorePagesComponent={<CongratulationsAlert />}
    >
      <section className="flex flex-col gap-12">
        {isFetchingPreviousPage && <ClipesListSkeleton />}
        {renderCLipes}
        {isFetchingNextPage && <ClipesListSkeleton />}
      </section>
    </InfiniteScroll>
  );
}

export function ClipesListSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      <ClipeItem>
        <UserInfoSkeleton />
        <VideoComponentSkeleton />
      </ClipeItem>
      <ClipeItem>
        <UserInfoSkeleton />
        <VideoComponentSkeleton />
      </ClipeItem>
      <ClipeItem>
        <UserInfoSkeleton />
        <VideoComponentSkeleton />
      </ClipeItem>
    </section>
  );
}
