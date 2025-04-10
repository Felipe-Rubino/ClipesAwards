import { twMerge } from "tailwind-merge";
import { UserInfoSkeleton, VideoComponentSkeleton } from "./components";

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

function ClipeItemSkeleton() {
  return (
    <ClipeItem>
      <UserInfoSkeleton />
      <VideoComponentSkeleton />
    </ClipeItem>
  );
}

export { ClipeItem, ClipeItemSkeleton };
