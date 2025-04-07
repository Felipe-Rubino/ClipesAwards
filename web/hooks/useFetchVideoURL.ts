import { useState, useEffect } from "react";

async function getVideoSrc(baseUrl: string, rawUrl: string) {
  const fetchURL = new URL("/api/proxy", baseUrl);
  fetchURL.searchParams.append("url", encodeURIComponent(rawUrl));

  const response = await fetch(fetchURL);

  if (!response.ok) {
    console.error("Failed to fetch clipe data:", response.statusText);
    return null;
  }

  return response.url;
}

export const useFetchVideoURL = (src: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  if (!BASE_URL) throw new Error("baseUrl needs to be defined");

  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    getVideoSrc(BASE_URL, src).then((result) => {
      setResolvedSrc(result);
    });
  }, [BASE_URL, src]);

  return resolvedSrc;
};
