import { useEffect, useState } from "react";

interface Usuario {
  name: string;
  avatar_url: string;
  clip_posted_at: string;
}

interface Clipe {
  videoSrc: string;
  usuario: Usuario;
}

const useFetchClipe = () => {
  const [clipe, setClipe] = useState<Clipe | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // const baseUrl = "http://localhost:3100";

      // if (process.env.VERCEL_ENV === "preview") {
      //   baseUrl = `https://${process.env.VERCEL_BRANCH_URL}`;
      // } else if (
      //   process.env.VERCEL_ENV === "production" ||
      //   process.env.VERCEL_ENV === "development"
      // ) {
      //   baseUrl = `https://${process.env.VERCEL_URL}`;
      // }
      try {
        const clipeData: Clipe = {
          videoSrc:
            "https://cdn.discordapp.com/attachments/1358265578305097811/1358316140895408230/clipe.mp4?ex=67f40ebc&is=67f2bd3c&hm=38725cd438c813c4b946e7af803b6cf1f2cd1cd52413492ce95d0b23bef09c92&",
          usuario: {
            name: "Gabriel Damico",
            avatar_url: "https://avatars.githubusercontent.com/u/62900084?v=4",
            clip_posted_at: new Date().toISOString(),
          },
        };

        setClipe(clipeData);
      } catch (error) {
        console.error("Error fetching clipe data:", error);
      }
    };

    fetchData();
  }, []);

  return clipe;
};

export default useFetchClipe;
