export default async function getAllClips({
  pageParam,
}: {
  pageParam: unknown;
}) {
  const fetchURL = new URL("/api/clips", process.env.NEXT_PUBLIC_BASE_API_URL);
  if (pageParam) {
    fetchURL.searchParams.append("cursor", String(pageParam));
  }

  const response = await fetch(fetchURL);
  return await response.json();
}
