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
  
};

export default nextConfig;
