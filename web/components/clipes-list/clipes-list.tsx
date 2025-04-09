"use client";
import ClipeItem from "../clipe-item/clipe-item";
import {
  UserInfo,
  UserInfoSkeleton,
  VideoComponent,
} from "../clipe-item/components";
import { VideoComponentSkeleton } from "../clipe-item/components/video";
import useGetAllClipes from "@/hooks/useFetchAllClipes";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import ConfettiExplosion from "react-confetti-explosion";

export function ClipesList() {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useGetAllClipes();
  const [sawAllClipsModal, setSawAllClipsModal] = useState(false);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (!isFetching && !isFetchingNextPage && !hasNextPage) {
      console.log("a");
      setSawAllClipsModal(true);
    }
  }, [isFetching, isFetchingNextPage, hasNextPage]);

  return (
    <>
      <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.data.map((clipe) => (
              <ClipeItem key={clipe.clip_id}>
                <UserInfo user={clipe.user} posted_at={clipe.posted_at} />
                <VideoComponent src={clipe.video_src} />
                {/* {showVotesComponent && <VotesComponent />} */}
              </ClipeItem>
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && hasNextPage && (
          <ClipeItem>
            <UserInfoSkeleton />
            <VideoComponentSkeleton />
          </ClipeItem>
        )}
        <div ref={ref} />
      </section>
      <AlertDialog open={sawAllClipsModal} onOpenChange={setSawAllClipsModal}>
        <AlertDialogContent className="flex flex-col items-center justify-center gap-12 px-12">
          <ConfettiExplosion zIndex={9999} />
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flex-col items-center justify-center gap-4">
              <span className="text-6xl ">🎉</span>
              <span className="text-2xl font-semibold">
                Parabéns, você viu todos os clipes!
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription className="flex items-center justify-center text-center">
              Foi uma longa jornada até aqui. Aproveite o momento e descanse um
              pouco.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Valeu!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
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
