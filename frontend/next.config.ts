// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'statuapp.ailonline.com.ar',
        port: '',
        pathname: '/media/**', // ajustá si cambia la ruta
      },
    ],
    // domains: ['statuapp.ailonline.com.ar'], // alternativa simple
  },
};

export default nextConfig;
