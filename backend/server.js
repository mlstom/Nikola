require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { SitemapStream, streamToPromise } = require("sitemap");

const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['https://alatinidza.rs', 'https://admin.srv758372.hstgr.cloud','http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("./uploads"));

app.use("/api/proizvod", require("./routes/proizvodRoutes"));
app.use("/api/proizvodSlika", require("./routes/proizvodSlikaRoutes"));
app.use("/api/kupac", require("./routes/kupacRoutes"));
app.use("/api/narudzbina", require("./routes/narudzbinaRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/kupon", require("./routes/kuponRoutes"));

app.use("/api/uploads", require("./routes/upload"));

// Ruta za generisanje sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  try {
    // Kreiraj novi stream za sitemap
    const sitemapStream = new SitemapStream({ hostname: 'https://alatinidza.rs' });

    // Započni odgovor sa XML headerom
    res.header('Content-Type', 'application/xml');
    
    // Pozovi API da dobiješ proizvode (ili koristi bazu ako je potrebno)
    const response = await axios.get('https://backend.srv758372.hstgr.cloud/api/proizvod');
    const proizvodi = response.data;

    // Dodaj URL za svaki proizvod u sitemap
    proizvodi.forEach((proizvod) => {
      sitemapStream.write({
        url: `/proizvod/${proizvod.id}`,
        changefreq: 'weekly',
        priority: 0.8
      });
    });

    // Dodaj druge URL-ove koji bi mogli biti važni za SEO
    sitemapStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    sitemapStream.write({ url: '/proizvodi', changefreq: 'weekly', priority: 0.8 });
    sitemapStream.write({ url: '/kontakt', changefreq: 'monthly', priority: 0.5 });

    // Zatvori stream i pošaljemo XML odgovor
    sitemapStream.end();

    // Pretvaranje streama u podatke i slanje odgovora
    const data = await streamToPromise(sitemapStream);
    res.send(data);
  } catch (error) {
    console.error('Greška pri generisanju sitemap-a:', error);
    res.status(500).send('Greška pri generisanju sitemap-a');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
