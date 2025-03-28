const express = require("express");
const db = require("../config/db");
const router = express.Router();

// GET - Lista svih proizvoda
router.get("/", (req, res) => {
    db.query("SELECT * FROM Proizvod", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// GET - Dohvati proizvod po ID-u
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM Proizvod WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Proizvod nije pronađen" });
        res.json(result[0]);
    });
});

// POST - Dodaj novi proizvod
router.post("/", (req, res) => {
    const { sifra, naziv, opis, kategorija, cena, stanje,tezina } = req.body;

    db.query(
        "INSERT INTO Proizvod (sifra, naziv, opis, kategorija, cena, stanje,tezina) VALUES (?, ?, ?, ?, ?, ?,?)",
        [sifra, naziv, opis, kategorija, cena, stanje,tezina],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Proizvod dodat", id: result.insertId });
        }
    );
});

// PUT - Ažuriraj proizvod
router.put("/:id", (req, res) => {
    const { sifra, naziv, opis, kategorija, cena, stanje,tezina } = req.body;

    db.query(
        "UPDATE Proizvod SET sifra = ?, naziv = ?, opis = ?, kategorija = ?, cena = ?, stanje = ?,tezina = ? WHERE id = ?",
        [sifra, naziv, opis, kategorija, cena, stanje,tezina, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Proizvod ažuriran" });
        }
    );
});

// DELETE - Obrisi proizvod
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Proizvod WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Proizvod obrisan" });
    });
});

// GET - Pretraga proizvoda po nazivu, šifri, opisu ili kategoriji (Case-insensitive)
router.get("/search/:query", (req, res) => {
    const query = `%${req.params.query}%`;

    db.query(
        `SELECT * FROM Proizvod 
         WHERE LOWER(naziv) LIKE LOWER(?) 
         OR LOWER(sifra) LIKE LOWER(?) 
         OR LOWER(opis) LIKE LOWER(?)
         OR LOWER(kategorija) LIKE LOWER(?)`,
        [query, query, query, query],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        }
    );
});

module.exports = router;
