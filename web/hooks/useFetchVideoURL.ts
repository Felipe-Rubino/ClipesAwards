import { useState, useEffect } from "react";

async function getVideoSrc(baseUrl: string, rawUrl: string) {
  const fetchURL = new URL("/api/proxy", baseUrl);
  fetchURL.searchParams.append("url", encodeURIComponent(rawUrl));

  const response = await fetch(fetchURL, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Failed to fetch clipe data:", response.statusText);
    return null;
  }

  return response.url;
}

export const useFetchVideoURL = (baseUrl: string, src: string) => {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    getVideoSrc(baseUrl, src).then((result) => {
      setResolvedSrc(result);
    });
  }, [baseUrl, src]);

  return resolvedSrc;
};
