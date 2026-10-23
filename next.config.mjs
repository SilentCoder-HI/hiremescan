/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  serverExternalPackages: ["pdf-parse"],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
