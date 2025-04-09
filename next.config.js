/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ]
  },
  async redirects() {
    return []
  },
  images: {
    domains: ['127.0.0.1'],
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    webpackBuildWorker: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
    }
    return config
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    hostname: '127.0.0.1',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    hostname: '127.0.0.1',
  }
}

module.exports = nextConfig 