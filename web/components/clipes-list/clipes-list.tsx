"use client";
import useGetAllClipes from "@/hooks/useFetchAllClipes";
import React from "react";

import {
  UserInfo,
  UserInfoSkeleton,
  VideoComponent,
  VotesComponent,
} from "../clipe-item/components";
import { VideoComponentSkeleton } from "../clipe-item/components/video";

import { ClipeItem, ClipeItemSkeleton } from "../clipe-item/clipe-item";
import InfiniteScroll from "./components/infinite-scroll";
import CongratulationsAlert from "./components/congratulations-alert";

export function ClipesList() {
  const response = useGetAllClipes();
  const { data, isFetchingNextPage } = response;

  const renderCLipes = data?.pages.map((group, i) => (
    <React.Fragment key={i}>
      {group?.data.map((clipe) => (
        <ClipeItem key={clipe.clip_id}>
          <UserInfo user={clipe.user} posted_at={clipe.posted_at} />
          <VideoComponent src={clipe.video_src} />
          {/* <VotesComponent /> */}
        </ClipeItem>
      ))}
    </React.Fragment>
  ));

  return (
    <InfiniteScroll
      queryResponse={response}
      pendingComponent={<ClipesListSkeleton />}
      hasNoMorePagesComponent={<CongratulationsAlert />}
    >
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {renderCLipes}
        {isFetchingNextPage && <ClipeItemSkeleton />}
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
