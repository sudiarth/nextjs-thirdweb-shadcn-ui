/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN,
      NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
      THIRDWEB_TOKEN_CONTRACT_ADDRESS: process.env.THIRDWEB_TOKEN_CONTRACT_ADDRESS,
    }
  };

export default nextConfig;
