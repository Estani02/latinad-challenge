import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['publinet-prod.s3.amazonaws.com', 'publinet-dev.s3.amazonaws.com'],
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'publinet-prod.s3.amazonaws.com',
    },
    {
      protocol: 'https',
      hostname: 'publinet-dev.s3.amazonaws.com',
    },
  ],
};

export default nextConfig;
