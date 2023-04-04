/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.ctfassets.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "443",
        pathname: "/bs8ntwkklfua/**",
      },
    ],
  },
};

module.exports = nextConfig;
