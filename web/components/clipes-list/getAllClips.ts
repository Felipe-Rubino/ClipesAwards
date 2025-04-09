import { Clipe } from "@/@types/Clipe";
import { env } from "@/env";

export default async function getAllClips(): Promise<Clipe[]> {
  try {
    const fetchURL = new URL("/api/clips", env.NEXT_PUBLIC_BASE_API_URL);
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
