"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useFetchVideoURL } from "@/hooks/useFetchVideoURL";

export type VideoComponentProps = {
  src: string;
};

function VideoComponent({ src }: VideoComponentProps) {
  const resolvedSrc = useFetchVideoURL(src);
  if (!resolvedSrc) return <VideoComponentSkeleton />;

  return (
    <div
      className="w-full rounded-md relative"
      style={{ position: "relative", paddingBottom: "56.25%" }}
    >
      <iframe
        src={resolvedSrc}
        className="absolute top-0 left-0 w-full h-full rounded-md"
      />
    </div>
  );
}

function VideoComponentSkeleton() {
  return <Skeleton className="w-full h-[180px]" />;
}
export { VideoComponentSkeleton, VideoComponent };
