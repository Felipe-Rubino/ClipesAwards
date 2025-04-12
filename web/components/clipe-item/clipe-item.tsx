import { Clipe } from "@/@types/Clipe";
import {
  ActionsComponent,
  CommentsComponent,
  UserInfo,
  UserInfoSkeleton,
  VideoComponent,
  VideoComponentSkeleton,
  VotesComponent,
} from "./components";

interface ClipeItemProps {
  data: Clipe;
}

function ClipeItem({ data: clipe }: ClipeItemProps) {
  return (
    <div className="rounded-lg border p-4 bg-card shadow-sm dark:bg-card-dark dark:border-card-dark-border">
      <UserInfo user={clipe.user} posted_at={clipe.posted_at} />
      <VideoComponent src={clipe.video_src} />
      <ActionsComponent>
        <VotesComponent />
        <CommentsComponent />
      </ActionsComponent>
    </div>
  );
}

function ClipeItemSkeleton() {
  return (
    <div className="rounded-lg border p-4 bg-card shadow-sm dark:bg-card-dark dark:border-card-dark-border">
      <UserInfoSkeleton />
      <VideoComponentSkeleton />
    </div>
  );
}

export { ClipeItem, ClipeItemSkeleton };
