const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Konfiguracija multer-a za upload slika
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, "Slika-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimalna veličina fajla: 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      return cb(null, true);
    } else {
      return cb(new Error("Samo slike su dozvoljene!"));
    }
  },
});

// 📤 1️⃣ Ruta za upload slike
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nije poslata slika" });
  }

  const filePath = `/uploads/${req.file.filename}`;

  res.json({
    message: "Uspešno uploadovana slika",
    filePath: filePath,
  });
});

// 📃 2️⃣ Ruta za listanje svih slika
router.get("/images", (req, res) => {
  fs.readdir("./uploads/", (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Greška pri čitanju foldera" });
    }

    // Vraćamo listu linkova ka slikama
    const imageLinks = files.map(file => ({
      filename: file,
      url: `http://localhost:5000/uploads/${file}`, // Promeni URL ako hostuješ aplikaciju
    }));

    res.json(imageLinks);
  });
});

// 🗑️ 3️⃣ Ruta za brisanje slike
router.delete("/delete/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  // Proveri da li fajl postoji
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Slika nije pronađena" });
    }

    // Brisanje fajla
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Greška pri brisanju slike" });
      }
      res.json({ message: "Slika uspešno obrisana" });
    });
  });
});

module.exports = router;
