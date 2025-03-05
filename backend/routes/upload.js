const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("📂 Kreiran 'uploads' folder.");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 📤 1️⃣ Ruta za upload slike
router.post('/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: "Greška pri uploadu fajla" });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Nijedan fajl nije uploadovan" });
    }
    res.json({ filePath: `/uploads/${req.file.filename}` });
  });
});

// 📃 2️⃣ Ruta za listanje svih slika
router.get("/images", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Greška pri čitanju foldera" });
    }

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
  const filePath = path.join(uploadDir, filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Slika nije pronađena" });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Greška pri brisanju slike" });
      }
      res.json({ message: "Slika uspešno obrisana" });
    });
  });
});

module.exports = router;