import type { NextConfig } from "next";

const nextConfig: NextConfig = {

   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yts.mx',
      },
    ],
}
};;

export default nextConfig;
