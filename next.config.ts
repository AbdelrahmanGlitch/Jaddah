import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every <Image> goes through lib/image-loader.ts. Remote Unsplash demo photos
    // are resized by Unsplash's CDN; local photos in /public are served as-is,
    // so real company photos can be dropped into /public/images at any time.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
