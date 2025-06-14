require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS za sve
app.use(cors({ origin: '*' }));

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
