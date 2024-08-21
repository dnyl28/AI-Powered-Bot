import dotenv from 'dotenv';
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's strict mode for highlighting potential problems
  swcMinify: true,       // Enables SWC-based minification for faster builds
  env: {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY, // Make the OpenRouter API key available in the Next.js application
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, os: false }; // Polyfills for Node.js modules that are not available in the browser
    return config;
  },
};

export default nextConfig;
