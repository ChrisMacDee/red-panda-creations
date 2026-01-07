/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/red-panda-creations',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
