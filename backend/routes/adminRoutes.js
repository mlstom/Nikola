const express = require("express");
const db = require("../config/db");
const router = express.Router();

// GET - Lista svih admina
router.get("/", (req, res) => {
    db.query("SELECT * FROM Admin", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM Admin WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Narudžbina nije pronađena" });
        res.json(result[0]);
    });
});

// POST - Dodaj novi proizvod
router.post("/", (req, res) => {
    const {userName,lozinka  } = req.body;
    db.query(
        "INSERT INTO Admin (userName,lozinka , cena, stanje) VALUES (?, ?)",
        [userName,lozinka],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Admin dodat", id: result.insertId });
        }
    );
});

// PUT - Ažuriraj proizvod
router.put("/:id", (req, res) => {
    const { userName,lozinka  } = req.body;
    db.query(
        "UPDATE Admin SET userName = ?, lozinka = ?WHERE id = ?",
        [userName,lozinka , req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Admin ažuriran" });
        }
    );
});

// DELETE - Obrisi proizvod
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Admin WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Admin obrisan" });
    });
});

module.exports = router;
