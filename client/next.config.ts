/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      new URL("https://thumbs.dreamstime.com/**"),
      new URL("https://images.pexels.com/**"),
      new URL("https://apartment-app.s3.eu-north-1.amazonaws.com/**"),
      new URL("http://localhost:5000/**"),
    ],
  },
};
module.exports = nextConfig;
