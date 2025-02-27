const express = require("express");
const db = require("../config/db");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Konfiguracija za upload slika
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// GET - Lista svih slika
router.get("/", (req, res) => {
    db.query("SELECT * FROM ProizvodSlika", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM ProizvodSlika WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Narudžbina nije pronađena" });
        res.json(result[0]);
    });
});

// POST - Upload slike i čuvanje putanje u bazi
router.post("/:idProizvod", upload.single("slika"), (req, res) => {
    const idProizvod = req.params.idProizvod;
    const urlSlika = "/uploads/" + req.file.filename;

    db.query("INSERT INTO ProizvodSlika (idProizvod, urlSlika) VALUES (?, ?)", [idProizvod, urlSlika], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Slika dodata", id: result.insertId, url: urlSlika });
    });
});

// DELETE - Brisanje slike
router.delete("/:id", (req, res) => {
    db.query("SELECT urlSlika FROM ProizvodSlika WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "Slika ne postoji" });

        const filePath = "." + results[0].urlSlika;
        fs.unlink(filePath, (err) => {
            if (err) return res.status(500).json(err);
            db.query("DELETE FROM ProizvodSlika WHERE id = ?", [req.params.id], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Slika obrisana" });
            });
        });
    });
});

module.exports = router;
