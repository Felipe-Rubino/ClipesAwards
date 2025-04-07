import ClipeItem from "../clipe-item/clipe-item";
import {
  UserInfo,
  UserInfoSkeleton,
  VideoComponent,
  VotesComponent,
} from "../clipe-item/components";
import { VideoComponentSkeleton } from "../clipe-item/components/video";
import getAllClips from "./getAllClips";

export async function ClipesList() {
  const clipes = await getAllClips();

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {clipes.map((clipe, index) => {
        return (
          <ClipeItem key={index}>
            <UserInfo user={clipe.user} posted_at={clipe.posted_at} />
            <VideoComponent src={clipe.video_src} />
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
