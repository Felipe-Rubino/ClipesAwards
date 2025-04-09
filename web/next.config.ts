import withVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
};

export default withVercelToolbar()(nextConfig);
