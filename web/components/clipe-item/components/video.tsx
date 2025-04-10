"use client";

import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export type VideoComponentProps = {
  src: string;
};

function VideoComponent({ src }: VideoComponentProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full rounded-md relative overflow-hidden aspect-video">
      {isLoading && <VideoComponentSkeleton />}

      <video
        key={src}
        preload="metadata"
        controls
        controlsList="nodownload"
        className={`absolute top-0 left-0 w-full h-full rounded-md transition-opacity duration-300 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onLoadedMetadata={() => setIsLoading(false)}
      >
        <source src={src} />
      </video>
    </div>
  );
}

function VideoComponentSkeleton(props: React.ComponentProps<"div">) {
  return (
    <Skeleton
      {...props}
      className={`w-full aspect-video ${props.className ?? ""}`}
    />
  );
}

export { VideoComponent, VideoComponentSkeleton };
