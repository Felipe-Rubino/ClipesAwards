import { twMerge } from "tailwind-merge";
import {
  UserInfo,
  UserInfoSkeleton,
  VideoComponent,
  VideoComponentSkeleton,
} from "./components";
import ActionsComponent from "./components/actions";
import {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
} from "react";

interface ClipeItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface ClipeItemComponent
  extends ForwardRefExoticComponent<
    ClipeItemProps & RefAttributes<HTMLDivElement>
  > {
  User: typeof UserInfo;
  Video: typeof VideoComponent;
  Actions: typeof ActionsComponent;
}

const ClipeItem = forwardRef<HTMLDivElement, ClipeItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{ contentVisibility: "auto" }}
        className={twMerge(
          "rounded-lg border p-4 bg-card shadow-sm dark:bg-card-dark dark:border-card-dark-border",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
) as ClipeItemComponent;

ClipeItem.User = UserInfo;
ClipeItem.Video = VideoComponent;
ClipeItem.Actions = ActionsComponent;
ClipeItem.displayName = "ClipeItem";

function ClipeItemSkeleton() {
  return (
    <ClipeItem>
      <UserInfoSkeleton />
      <VideoComponentSkeleton />
    </ClipeItem>
  );
}

export { ClipeItem, ClipeItemSkeleton };
