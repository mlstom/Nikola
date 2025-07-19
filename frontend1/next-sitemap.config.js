/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://alatinidza.rs',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  // Ako ti treba custom ruta:
  // additionalPaths: async (config) => [
  //   await config.transform(config, '/custom-page'),
  // ],
};