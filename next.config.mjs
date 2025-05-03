/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'formal-grasshopper-210.convex.cloud',
      },
    ],
  },
  devIndicators: true,
};

export default nextConfig;
