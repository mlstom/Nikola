const express = require("express");
const db = require("../config/db");
const router = express.Router();

// GET - Lista svih proizvoda
router.get("/", (req, res) => {
    db.query("SELECT * FROM Kupon", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// GET - Dohvati proizvod po ID-u
router.get("/:kod", (req, res) => {
    db.query("SELECT * FROM Kupon WHERE kod = ?", [req.params.kod], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Proizvod nije pronađen" });
        res.json(result[0]);
    });
});

// POST - Dodaj novi proizvod
router.post("/", (req, res) => {
    const { kod,popust} = req.body;

    db.query(
        "INSERT INTO Kupon (kod, popust) VALUES (?, ?)",
        [kod,popust],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Proizvod dodat", id: result.insertId });
        }
    );
});

// PUT - Ažuriraj proizvod
router.put("/:id", (req, res) => {
    const { kod,popust } = req.body;

    db.query(
        "UPDATE Kupon SET kod = ?, popust = ? WHERE id = ?",
        [kod, popust,  req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Proizvod ažuriran" });
        }
    );
});

// DELETE - Obrisi proizvod
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Kupon WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Proizvod obrisan" });
    });
});



module.exports = router;
