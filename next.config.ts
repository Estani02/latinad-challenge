import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['publinet-prod.s3.amazonaws.com'],
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'publinet-prod.s3.amazonaws.com',
    },
  ],
};

export default nextConfig;
