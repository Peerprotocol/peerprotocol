/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "s2.coinmarketcap.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
