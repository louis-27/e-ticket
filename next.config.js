/** @type {import('next').NextConfig} */
const nextConfig = {
  generateEtags: false,
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
