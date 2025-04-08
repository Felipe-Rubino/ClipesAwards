import { useState, useEffect } from "react";
import { Clipe } from "@/@types/Clipe";

export const useFetchAllClipes = (): Clipe[] | null => {
  const [clipes, setClipes] = useState<Clipe[] | null>(null);

  useEffect(() => {
    const fetchClipes = async () => {
      const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
      if (!BASE_URL) {
        console.error("baseUrl needs to be defined");
        return;
      }
      try {
        const fetchURL = new URL("/api/clips", BASE_URL);

        const response = await fetch(fetchURL);

        if (!response.ok) {
          throw new Error(`Erro ao buscar clipes: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        setClipes(data);
      } catch (error) {
        console.error("Erro ao buscar clipes:", error);
      }
    };

    fetchClipes();
  }, []);

  return clipes;
};
