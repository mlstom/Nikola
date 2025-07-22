/** @type {import('next-sitemap').IConfig} */
const axios = require('axios');

module.exports = {
  siteUrl: 'https://alatinidza.rs',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.8,

  exclude: ['/home', '/home/**'], // Izbacuje "tehničke" rute

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  additionalPaths: async (config) => {
    const staticRoutes = [
      '/', '/kontakt', '/korpa', '/proizvodi', '/placanje'
    ].map((path) => ({
      loc: path,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));

    try {
      const res = await axios.get('https://alatinidza.rs/api/proizvod');
      const proizvodi = res.data;

      const dynamicRoutes = proizvodi.map((proizvod) => ({
        loc: `/proizvod/${proizvod.id}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }));

      return [...staticRoutes, ...dynamicRoutes];
    } catch (error) {
      console.error('Greška prilikom dohvata proizvoda za sitemap:', error.message);
      return staticRoutes; // vraćamo samo statične rute ako API ne radi
    }
  },
};
