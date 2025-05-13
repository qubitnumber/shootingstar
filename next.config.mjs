/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'formal-grasshopper-210.convex.cloud',
      },
      {
        hostname: 'images.unsplash.com',
      }
    ],
  }
};

export default nextConfig;
