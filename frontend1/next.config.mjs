/** @type {import('next-sitemap').IConfig} */
const nextConfig = {
  images: {
    domains: ['alatinidza.rs', 'www.alatinidza.rs'],
  },
  reactStrictMode: false,

  async rewrites() {
    return [
      { source: '/',             destination: '/home' },
      { source: '/placanje',     destination: '/home/placanje' },
      { source: '/placanje',     destination: '/home/placanje' },
      { source: '/korpa',        destination: '/home/korpa' },
      { source: '/proizvodi',    destination: '/home/proizvodi' },
      { source: '/proizvod/:id', destination: '/home/proizvod/:id' },
      { source: '/kontakt', destination: '/home/kontakt' }
    ];
  },
};

export default nextConfig;
