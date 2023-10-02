/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/public/:path*",
        destination: "/:path*", // Перенаправьте запросы из /public/ в корень проекта
        // transpilePackages: ["three"],
      },
    ];
  },
};

module.exports = nextConfig;
