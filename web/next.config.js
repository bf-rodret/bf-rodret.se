/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'sass')],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    domains: ["cdn.sanity.io"],
    dangerouslyAllowSVG: true,
    // in seconds
    minimumCacheTTL: 60 * 60 // 1 hour
  }
};

module.exports = nextConfig;
