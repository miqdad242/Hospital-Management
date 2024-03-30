/** @type {import('next').NextConfig} */
const path = require('path')
let prodURL = "https://api-test.21ccare.com";
let devURL = "http://localhost:8081";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  output: 'standalone',
  env: {
    baseURL: process.env.NODE_ENV === "production" ? prodURL :  devURL ,
  },
  transpilePackages: ['@coreui/utils'],
  // config.infrastructureLogging = { debug: /PackFileCache/ }
}

module.exports = nextConfig;
