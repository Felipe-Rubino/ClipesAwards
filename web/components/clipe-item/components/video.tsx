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

      <iframe
        className={`absolute top-0 left-0 w-full h-full rounded-md transition-opacity duration-300 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        src={src}
        onLoad={() => setIsLoading(false)}
        allow="picture-in-picture"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}

function VideoComponentSkeleton(props: React.ComponentProps<"div">) {
  return (
    <Skeleton
      {...props}
      className={`w-full h-full absolute top-0 left-0 ${props.className ?? ""}`}
    />
  );
}

export { VideoComponent, VideoComponentSkeleton };
