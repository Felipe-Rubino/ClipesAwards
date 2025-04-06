"use client";

import { Clipe } from "@/@types/Clipe";
import ClipeItem from "../clipe-item/clipe-item";
import {
  UserInfo,
  UserInfoSkeleton,
  VideoComponent,
  VotesComponent,
} from "../clipe-item/components";
import { VideoComponentSkeleton } from "../clipe-item/components/video";

type ClipesListProps = {
  data: Clipe[];
};

export function ClipesList({ data: clipes }: ClipesListProps) {
  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {clipes.map((clipe) => {
        return (
          <ClipeItem key={clipe.messageId}>
            <UserInfo user={clipe.usuario} />
            <VideoComponent src={clipe.videoSrc} />
            <VotesComponent />
          </ClipeItem>
        );
      })}
    </section>
  );
}

export function ClipesListSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      <ClipeItem>
        <UserInfoSkeleton />
        <VideoComponentSkeleton />
        <VotesComponent />
      </ClipeItem>
      <ClipeItem>
        <UserInfoSkeleton />
        <VideoComponentSkeleton />
        <VotesComponent />
      </ClipeItem>
      <ClipeItem>
        <UserInfoSkeleton />
        <VideoComponentSkeleton />
        <VotesComponent />
      </ClipeItem>
    </section>
  );
}
