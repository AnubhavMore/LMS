import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/learner',
        destination: '/learner/courses',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
