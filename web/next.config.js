/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',
  outputFileTracingRoot: __dirname,
  sassOptions: {
    includePaths: [path.join(__dirname, 'sass')],
  },
  images: {
    domains: ["cdn.sanity.io"],
    dangerouslyAllowSVG: true,
    // in seconds
    minimumCacheTTL: 60 * 60, // 1 hour
    loader: "custom",
    loaderFile: "./image-loader.ts"
  }
};

module.exports = nextConfig;
