require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://alatinidza.rs',  
  'https://admin.srv758372.hstgr.cloud',
];

// ✅ CORS middleware samo za API i opšti promet
app.use(cors({
  origin: (origin, callback) => {
    // Dozvoli ako nema origin (npr. curl ili server-side) ili je na listi
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ JSON i URL-encoded parsiranje
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS za statične fajlove u /uploads (slike)
const uploadsRouter = express.Router();
uploadsRouter.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
}));
uploadsRouter.use(express.static(path.join(__dirname, "uploads")));
app.use("/uploads", uploadsRouter);

// ✅ API rute
app.use("/api/proizvod", require("./routes/proizvodRoutes"));
app.use("/api/proizvodSlika", require("./routes/proizvodSlikaRoutes"));
app.use("/api/kupac", require("./routes/kupacRoutes"));
app.use("/api/narudzbina", require("./routes/narudzbinaRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/kupon", require("./routes/kuponRoutes"));
app.use("/api/uploads", require("./routes/upload"));

// ✅ Pokretanje servera
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
