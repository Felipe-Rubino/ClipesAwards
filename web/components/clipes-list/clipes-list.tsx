"use client";
import { useFetchVideoURL } from "@/hooks/useFetchVideoURL";
import ClipeItem from "../clipe-item/clipe-item";
import {
  UserInfo,
  VideoComponent,
  VotesComponent,
} from "../clipe-item/components";
import { useEffect } from "react";

export default function ClipesList() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
  if (!baseUrl) throw new Error("baseURL not defined");

  const clipeData = {
    videoSrc:
      "https://cdn.discordapp.com/attachments/1358265578305097811/1358316140895408230/clipe.mp4?ex=67f40ebc&is=67f2bd3c&hm=38725cd438c813c4b946e7af803b6cf1f2cd1cd52413492ce95d0b23bef09c92&",
    usuario: {
      name: "Gabriel Damico",
      avatar_url: "https://avatars.githubusercontent.com/u/62900084?v=4",
      clip_posted_at: new Date().toISOString(),
    },
  };
  const resolvedSrc = useFetchVideoURL(baseUrl, clipeData.videoSrc);

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      <ClipeItem>
        <UserInfo user={clipeData.usuario} />
        <VideoComponent src={resolvedSrc} />
        <VotesComponent />
      </ClipeItem>
    </section>
  );
}
