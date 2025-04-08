if (!process.env.NEXT_PUBLIC_BASE_API_URL) {
  console.error("Env variable NEXT_PUBLIC_BASE_API_URL needs to be defined");
}
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
