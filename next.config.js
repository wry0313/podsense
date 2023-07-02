/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      { // https://stackoverflow.com/questions/61909298/how-to-use-self-hosted-fonts-face-using-nextjs/70920009#70920009
        source: "/fonts/cal-sans.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "cnvniiywuoskmrtwfpum.supabase.co",
      "megaphone.imgix.net",
      "lexfridman.com",
      "ssl-static.libsyn.com",
      "bookworm.fm",
    ],
  },
};

module.exports = nextConfig;
