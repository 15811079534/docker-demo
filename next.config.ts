import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Docker 部署必需
  eslint: {
    ignoreDuringBuilds: true, // 构建时忽略 ESLint 错误
  },
  typescript: {
    ignoreBuildErrors: true, // 构建时忽略 TypeScript 错误
  },
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'www.9agent.net',
        pathname:'/image/**'
      }
    ]
  }
};

export default nextConfig;

