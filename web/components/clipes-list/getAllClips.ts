import { Clipe } from "@/@types/Clipe";

export default async function getAllClips(): Promise<Clipe[]> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  if (!BASE_URL) {
    console.error("baseUrl needs to be defined");
  }
  try {
    const fetchURL = new URL("/api/clips", BASE_URL);

    const response = await fetch(fetchURL);

    if (!response.ok) {
      throw new Error(`Erro ao buscar clipes: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar clipes:", error);
    throw new Error("Erro ao buscar clipes");
  }
}
