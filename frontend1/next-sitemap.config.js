/** @type {import('next-sitemap').IConfig} */
const axios = require('axios');

module.exports = {
  siteUrl: 'https://alatinidza.rs',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.8,

  additionalPaths: async (config) => {
    const res = await axios.get('https://alatinidza.rs/api/proizvod');
    const proizvodi = res.data;

    const staticRoutes = [
      '/kontakt',
      '/korpa',
      '/proizvodi',
      '/placanje',
      '/',
    ].map((path) => ({
      loc: path,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));

    const dynamicRoutes = proizvodi.map((proizvod) => ({
      loc: `/proizvod/${proizvod.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));

    return [...staticRoutes, ...dynamicRoutes];
  },
};
