import { QueryFunctionContext } from "@tanstack/react-query";

export default async function getAllClips(params: QueryFunctionContext) {
  // const direction = params.direction;
  const cursor = params.pageParam;

  const fetchURL = new URL("/api/clips", process.env.NEXT_PUBLIC_BASE_API_URL);

  if (cursor) {
    fetchURL.searchParams.append("cursor", String(cursor));
    // fetchURL.searchParams.append("direction", String(direction)); //forward ou backward;
  }

  const response = await fetch(fetchURL);

  if (!response.ok) {
    throw new Error("Erro ao buscar os clipes");
  }

  return await response.json();
}
