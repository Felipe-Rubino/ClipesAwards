import { twMerge } from "tailwind-merge";
import {
  UserInfo,
  UserInfoSkeleton,
  VideoComponent,
  VideoComponentSkeleton,
} from "./components";
import ActionsComponent from "./components/actions";

function ClipeItem({
  children,
  className,
  ...props
}: React.PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div
      className={twMerge(
        "rounded-lg border p-4 bg-card shadow-sm dark:bg-card-dark dark:border-card-dark-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const User = UserInfo;
const Video = VideoComponent;
const Actions = ActionsComponent;

ClipeItem.User = User;
ClipeItem.Video = Video;
ClipeItem.Actions = Actions;

function ClipeItemSkeleton() {
  return (
    <ClipeItem>
      <UserInfoSkeleton />
      <VideoComponentSkeleton />
    </ClipeItem>
  );
}

export { ClipeItem, ClipeItemSkeleton };
