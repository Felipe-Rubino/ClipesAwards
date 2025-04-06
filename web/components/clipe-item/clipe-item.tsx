import { Suspense } from "react";
import {
  UserInfo,
  UserInfoSkeleton,
  VideoComponent,
  VideoSkeleton,
  VotesComponent,
} from "./components";
import { UserInfoProps } from "./components/user-info";
import { VideoComponentProps } from "./components/video";

export interface ClipeItemProps {
  src: VideoComponentProps["src"];
  user: UserInfoProps["user"];
}

export default async function ClipeItem({
  src,
  user: userInfoData,
}: ClipeItemProps) {
  const videoSrc = src;

  return (
    <div className="rounded-lg border p-4 bg-card shadow-sm dark:bg-card-dark dark:border-card-dark-border">
      <Suspense fallback={<UserInfoSkeleton />}>
        <UserInfo user={userInfoData} />
      </Suspense>

      <Suspense fallback={<VideoSkeleton />}>
        <VideoComponent src={videoSrc} />
      </Suspense>
      <VotesComponent />
    </div>
  );
}
