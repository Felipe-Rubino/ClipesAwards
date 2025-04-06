import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export type UserInfoProps = {
  user: {
    name: string;
    avatar_url: string;
    clip_posted_at: string;
  };
};

async function UserInfo({ user }: UserInfoProps) {
  const { name, avatar_url, clip_posted_at } = user;

  const date = new Date(clip_posted_at);
  const formattedDate = formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
    includeSeconds: true,
  });

  return (
    <div className="flex items-center gap-2.5 mb-4">
      <Avatar>
        <AvatarImage src={avatar_url} />
      </Avatar>

      <div className="text-sm flex flex-col items-start flex-nowrap">
        <span className="font-semibold leading-4">{name}</span>
        <span className="text-gray-500">{formattedDate}</span>
      </div>
    </div>
  );
}

function UserInfoSkeleton() {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <Skeleton className="aspect-square h-[40px] w-[40px] rounded-full" />

      <div className="text-sm flex flex-col items-start flex-nowrap gap-1">
        <Skeleton className="w-[100px] h-[12px]" />
        <Skeleton className="w-[180px] h-[12px]" />
      </div>
    </div>
  );
}

export { UserInfo, UserInfoSkeleton };
