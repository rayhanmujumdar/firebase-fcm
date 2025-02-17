const nextConfig = {
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_DISABLE_ESLINT === 'true',
  },
};

module.exports = nextConfig;
