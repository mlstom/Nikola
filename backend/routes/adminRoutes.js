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

// GET - Dohvati jednog admina po ID-u
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM Admin WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Admin nije pronađen" });
        res.json(result[0]);
    });
});

// POST - Dodaj novog admina
router.post("/", (req, res) => {
    const { userName, lozinka } = req.body;
    if (!userName || !lozinka) {
        return res.status(400).json({ message: "Morate uneti korisničko ime i lozinku" });
    }

    db.query(
        "INSERT INTO Admin (userName, lozinka) VALUES (?, ?)",
        [userName, lozinka],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Admin dodat", id: result.insertId });
        }
    );
});

// PUT - Ažuriraj admina
router.put("/:id", (req, res) => {
    const { userName, lozinka } = req.body;
    if (!userName || !lozinka) {
        return res.status(400).json({ message: "Morate uneti korisničko ime i lozinku" });
    }

    db.query(
        "UPDATE Admin SET userName = ?, lozinka = ? WHERE id = ?",
        [userName, lozinka, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Admin ažuriran" });
        }
    );
});

// DELETE - Obriši admina
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Admin WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Admin obrisan" });
    });
});

// POST - Login admina (osnovna provera bez JWT-a)
router.post("/login", (req, res) => {
    const { userName, lozinka } = req.body;
    if (!userName || !lozinka) {
        return res.status(400).json({ message: "Unesite korisničko ime i lozinku" });
    }

    db.query(
        "SELECT * FROM Admin WHERE userName = ? AND lozinka = ?",
        [userName, lozinka],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length === 0) {
                return res.status(401).json({ message: "Neispravno korisničko ime ili lozinka" });
            }
            res.json({ message: "Uspešna prijava", admin: result[0] });
        }
    );
});

module.exports = router;
