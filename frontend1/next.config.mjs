/** @type {import('next-sitemap').IConfig} */
const nextConfig = {
  images: {
    domains: ['alatinidza.rs','www.alatinidza.rs'],          // dodeli svoj domen
    // ili, za App Router i Next.js 13+, možeš koristiti remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'alatinidza.rs',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/',       
        destination: '/home' 
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/home',    
        destination: '/',   
        permanent: true     
      },
    ]
  },
  siteUrl: process.env.SITE_URL || 'https://alatinidza.rs',

  // Generiši i robots.txt
  generateRobotsTxt: true,

  // Osnovni parametri
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,

  // Izuzmi admin rute
  exclude: ['/admin/*'],

  // Po meri robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/admin'],
      },
    ],
  },
};

export default nextConfig;
