const fs = require('fs');
const axios = require('axios');

(async () => {
  const baseUrl = 'https://alatinidza.rs';

  // Static routes koje će uvek biti uključene u sitemap
  const staticUrls = [
    { loc: '/', changefreq: 'daily', priority: 1.0 },
    { loc: '/proizvodi', changefreq: 'weekly', priority: 0.8 },
    { loc: '/kontakt', changefreq: 'monthly', priority: 0.6 },
  ];

  try {
    // API poziv za dinamičke rute proizvoda
    const response = await axios.get(`${baseUrl}/api/proizvodi`);
    const proizvodi = response.data;

    // Generisanje dinamičkih ruta za proizvode
    const dynamicUrls = proizvodi.map((proizvod) => ({
      loc: `/proizvod/${proizvod.id}`,
      changefreq: 'weekly',
      priority: 0.7,
    }));

    // Kombinovanje svih ruta
    const urls = [...staticUrls, ...dynamicUrls];

    // Kreiranje XML strukture za sitemap
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

    // Snimanje sitemap-a u public folder (da bude dostupan nakon build-a)
    fs.writeFileSync('./public/sitemap.xml', sitemap, 'utf-8');
    console.log('✅ Sitemap je uspešno generisan i sačuvan u public/sitemap.xml!');
  } catch (error) {
    console.error('❌ Greška pri generisanju sitemap-a:', error);
  }
})();
