"use client";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export type VideoComponentProps = {
  src: string;
};

function VideoComponent({ src }: VideoComponentProps) {
  return (
    <div
      className="w-full rounded-md relative"
      style={{ position: "relative", paddingBottom: "56.25%" }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-md"
        src={src}
        allow="picture-in-picture"
        allowFullScreen
        marginWidth={0}
        marginHeight={0}
        scrolling="No"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

function VideoComponentSkeleton() {
  return <Skeleton className="w-full h-[180px]" />;
}

export { VideoComponentSkeleton, VideoComponent };
