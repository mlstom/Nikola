require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://alatinidza.rs',          // glavna prodavnica
  'https://admin.srv758372.hstgr.cloud',    // admin panel na posebnom domenu
  'https://admin.srv758372.hstgr.cloud/'       // dodatna klijentska aplikacija
];

// ✅ CORS za sve
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    // Dozvoli specifični origin
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // Dozvoli HTTP metode
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  // Dozvoli određene zaglavlja
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Ako je preflight (OPTIONS), odmah odgovori 204 No Content
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
