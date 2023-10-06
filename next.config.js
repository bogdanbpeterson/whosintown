/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
  },
  images: {
    domains: ["photos.bandsintown.com"],
  },
};

module.exports = nextConfig;
