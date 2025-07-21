/** @type {import('next-sitemap').IConfig} */
const fetch = require('node-fetch');

module.exports = {
  siteUrl: 'https://alatinidza.rs',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.8,
  exclude: [],

  // Ovo dodaje proizvode dinamički u sitemap
  additionalPaths: async (config) => {
    const res = await fetch('https://alatinidza.rs/api/proizvodi');
    const proizvodi = await res.json();

    return proizvodi.map((proizvod) => ({
      loc: `/proizvod/${proizvod.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
