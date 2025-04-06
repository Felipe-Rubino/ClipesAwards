import { Skeleton } from "@/components/ui/skeleton";

export type VideoComponentProps = {
  src: string;
};

async function VideoComponent({ src }: VideoComponentProps) {
  return (
    <div
      className="w-full rounded-md relative"
      style={{ position: "relative", paddingBottom: "56.25%" }}
    >
      <iframe
        src={src}
        className="absolute top-0 left-0 w-full h-full rounded-md"
      />
    </div>
  );
}

function VideoSkeleton() {
  return <Skeleton className="w-full h-[180px]" />;
}

export { VideoComponent, VideoSkeleton };
