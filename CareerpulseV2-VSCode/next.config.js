module.exports = {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "/api/:path*", // Ensures API routes are recognized
        },
      ];
    },
  };
  