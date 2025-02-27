const express = require("express");
const db = require("../config/db");
const router = express.Router();

// GET - Lista svih proizvoda
router.get("/", (req, res) => {
    db.query("SELECT * FROM Narudzbina", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

router.get("/:id", (req, res) => {
    db.query("SELECT * FROM Narudzbina WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Narudžbina nije pronađena" });
        res.json(result[0]);
    });
});

// POST - Dodaj novi proizvod
router.post("/", (req, res) => {
    const { idProizvod, idPodaciKupca, brojPosiljke, ukupnaCena, poslato, kolicinaProizvoda } = req.body;
    db.query(
        "INSERT INTO Narudzbina (idProizvod, idPodaciKupca, brojPosiljke, ukupnaCena, poslato, kolicinaProizvoda) VALUES (?, ?, ?, ?, ?, ?)",
        [idProizvod, idPodaciKupca, brojPosiljke, ukupnaCena, poslato, kolicinaProizvoda],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Narudžbina dodata", id: result.insertId });
        }
    );
});

// PUT - Ažuriraj proizvod
router.put("/:id", (req, res) => {
    const { idProizvod, idPodaciKupca, brojPosiljke, ukupnaCena, poslato, kolicinaProizvoda } = req.body;
    db.query(
        "UPDATE Narudzbina SET idProizvod = ?, idPodaciKupca = ?, brojPosiljke = ?, ukupnaCena = ?, poslato = ?, kolicinaProizvoda = ? WHERE id = ?",
        [idProizvod, idPodaciKupca, brojPosiljke, ukupnaCena, poslato, kolicinaProizvoda, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Narudžbina ažurirana" });
        }
    );
});

// DELETE - Obrisi proizvod
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Narudzbina WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Narudžbina obrisana" });
    });
});

router.get("/sveNarudzbine", (req, res) => {
    db.query("SELECT DISTINCT brojPosiljke FROM Narudzbina", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results.map(row => row.brojPosiljke));
    });
});

router.get("/konacnaNarudzbina/:brojPosiljke", (req, res) => {
    const brojPosiljke = req.params.brojPosiljke;
    db.query(
        "SELECT SUM(ukupnaCena) AS ukupnaCena FROM Narudzbina WHERE brojPosiljke = ?",
        [brojPosiljke],
        (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length === 0 || result[0].ukupnaCena === null) {
                return res.status(404).json({ message: "Nema narudžbina za dati broj pošiljke" });
            }
            db.query(
                "SELECT * FROM Narudzbina WHERE brojPosiljke = ?",
                [brojPosiljke],
                (err, results) => {
                    if (err) return res.status(500).json(err);
                    res.json({ brojPosiljke, ukupnaCena: result[0].ukupnaCena, narudzbine: results });
                }
            );
        }
    );
});


module.exports = router;
