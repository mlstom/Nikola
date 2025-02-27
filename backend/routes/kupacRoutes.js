const express = require("express");
const db = require("../config/db");
const router = express.Router();

// GET - Lista svih proizvoda
router.get("/", (req, res) => {
    db.query("SELECT * FROM PodaciKupca", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM PodaciKupca WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Narudžbina nije pronađena" });
        res.json(result[0]);
    });
});

// POST - Dodaj novi proizvod
router.post("/", (req, res) => {
    const { ime,prezime,email,telefon,adresa,postanskiBroj,mesto  } = req.body;
    db.query(
        "INSERT INTO PodaciKupca (ime,prezime,email,telefon,adresa,postanskiBroj,mesto  ) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [ime,prezime,email,telefon,adresa,postanskiBroj,mesto ],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Kupac dodat", id: result.insertId });
        }
    );
});

// PUT - Ažuriraj proizvod
router.put("/:id", (req, res) => {
    const { ime,prezime,email,telefon,adresa,postanskiBroj,mesto } = req.body;
    db.query(
        "UPDATE PodaciKupca SET ime = ?, prezime = ?,email = ?, telefon = ?,adresa = ?, postanskiBroj = ?,mesto = ?  WHERE id = ?",
        [ime,prezime,email,telefon,adresa,postanskiBroj,mesto, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Kupac ažuriran" });
        }
    );
});

// DELETE - Obrisi proizvod
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM PodaciKupca WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Proizvod obrisan" });
    });
});

module.exports = router;
