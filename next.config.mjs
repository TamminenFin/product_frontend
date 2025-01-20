/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config;
  },
  images: {
    domains: ["localhost", "via.placeholder.com", "res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
