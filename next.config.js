/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CHATGPT_API_KEY: process.env.CHATGPT_API_KEY,
  },
}

module.exports = nextConfig
