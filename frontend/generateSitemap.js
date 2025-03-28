import fs from 'fs';
import axios from 'axios';

(async () => {
  const baseUrl = 'https://backend.srv758372.hstgr.cloud';

  // Static URLs
  const staticUrls = [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/proizvodi', changefreq: 'weekly', priority: 0.8 },
    { loc: '/kontakt', changefreq: 'monthly', priority: 0.6 },
  ];

  try {
    // Fetch dynamic routes
    const response = await axios.get(`${baseUrl}/api/proizvodi`);
    const proizvodi = response.data;

    // Generate dynamic product URLs
    const dynamicUrls = proizvodi.map((proizvod) => ({
      loc: `/proizvod/${proizvod.id}`,
      changefreq: 'weekly',
      priority: 0.7,
    }));

    // Combine all URLs
    const urls = [...staticUrls, ...dynamicUrls];

    // Create XML structure for sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

    // Write the sitemap to the public folder
    fs.writeFileSync('./public/sitemap.xml', sitemap, 'utf-8');
    console.log('✅ Sitemap je uspešno generisan i sačuvan u public/sitemap.xml!');
  } catch (error) {
    console.error('❌ Greška pri generisanju sitemap-a:', error);
  }
})();
