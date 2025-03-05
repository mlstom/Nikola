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
router.post("/:idProizvod", (req, res) => {
    const idProizvod = req.params.idProizvod;
    const { urlSlika } = req.body;

    if (!urlSlika) {
        return res.status(400).json({ message: "Nema URL slike" });
    }

    db.query(
        "INSERT INTO ProizvodSlika (idProizvod, urlSlika) VALUES (?, ?)",
        [idProizvod, urlSlika],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Slika sačuvana u bazi", id: result.insertId, url: urlSlika });
        }
    );
});

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    // Prvo dohvatamo URL slike iz baze
    db.query("SELECT urlSlika FROM ProizvodSlika WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "Slika nije pronađena" });

        const filePath = path.join(__dirname, "..", results[0].urlSlika); // Dobijamo punu putanju do fajla

        // Brisanje fajla iz sistema
        fs.unlink(filePath, (err) => {
            if (err && err.code !== 'ENOENT') { // ENOENT znači da fajl ne postoji, pa ne pravimo problem
                console.error("Greška pri brisanju fajla:", err);
                return res.status(500).json({ message: "Greška pri brisanju fajla" });
            }

            // Ako je fajl uspešno obrisan, brišemo zapis iz baze
            db.query("DELETE FROM ProizvodSlika WHERE id = ?", [id], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Slika uspešno obrisana" });
            });
        });
    });
});



router.get("/proizvod/:id",(req,res)=>{
    db.query("Select * from ProizvodSlika where idProizvod= ?",[req.params.id],(err,results)=>{
        if (err) return res.status(500).json(err);
        res.json(results)
    })
})

router.delete("/brisanjePoProizvodu/:idProizvod", (req, res) => {
    db.query("SELECT urlSlika FROM ProizvodSlika WHERE idProizvod = ?", [req.params.idProizvod], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "Proizvod nema slike" });

        // Brisanje svih slika iz fajl sistema
        results.forEach((row) => {
            const filePath = "." + row.urlSlika;
            fs.unlink(filePath, (err) => {
                if (err && err.code !== 'ENOENT') console.error("Greška pri brisanju fajla:", err);
            });
        });

        // Brisanje zapisa iz baze
        db.query("DELETE FROM ProizvodSlika WHERE idProizvod = ?", [req.params.idProizvod], (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Sve slike za proizvod su obrisane" });
        });
    });
});

module.exports = router;
