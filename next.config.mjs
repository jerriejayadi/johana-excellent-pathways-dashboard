/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST: process.env.HOST,
  },
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination: this.env.HOST + ":path*", // Proxy to Backend External
      },
    ];
  },
};

export default nextConfig;
