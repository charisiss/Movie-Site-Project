/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/bs8ntwkklfua/**",
      },
    ],
  },
  // Disable pre-generation of JSON files
  // https://vercel.com/docs/concepts/deployments/vercel-json
  target: "server",
};

module.exports = nextConfig;
