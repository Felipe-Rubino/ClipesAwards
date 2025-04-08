import { Clipe } from "@/@types/Clipe";
import { BASE_URL } from "@/lib/constants";

export default async function getAllClips(): Promise<Clipe[]> {
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
