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
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM Proizvod WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Narudžbina nije pronađena" });
        res.json(result[0]);
    });
});
// POST - Dodaj novi proizvod
router.post("/", (req, res) => {
    const { sifra, naziv, cena, stanje } = req.body;
    db.query(
        "INSERT INTO Proizvod (sifra, naziv, cena, stanje) VALUES (?, ?, ?, ?)",
        [sifra, naziv, cena, stanje],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Proizvod dodat", id: result.insertId });
        }
    );
});

// PUT - Ažuriraj proizvod
router.put("/:id", (req, res) => {
    const { naziv, cena, stanje } = req.body;
    db.query(
        "UPDATE Proizvod SET naziv = ?, cena = ?, stanje = ? WHERE id = ?",
        [naziv, cena, stanje, req.params.id],
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

module.exports = router;
