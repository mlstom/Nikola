const express = require("express");
const db = require("../config/db");
const router = express.Router();

// GET - Lista svih proizvoda
router.get("/", (req, res) => {
    const query = `
        SELECT n.*, p.*, pk.*,c.*
        FROM Narudzbina n
        JOIN Korpa c ON n.brojKorpe = c.brojKorpe
        JOIN PodaciKupca pk ON n.idKupac = pk.id
        JOIN Proizvod p ON p.id = c.idProizvod
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

router.get("jednaNarudzbina/:id", (req, res) => {
    db.query("SELECT * FROM Narudzbina WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json({ message: "Narudžbina nije pronađena" });
        res.json(result[0]);
    });
});

// POST - Dodaj novi proizvod
router.post("/", (req, res) => {
    const { idProizvod, idPodaciKupca, brojPosiljke, poslato } = req.body;
    db.query(
        "INSERT INTO Narudzbina (idProizvod, idPodaciKupca, brojPosiljke,  poslato) VALUES (?, ?, ?, ?)",
        [idProizvod, idPodaciKupca, brojPosiljke, poslato],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Narudžbina dodata", id: result.insertId });
        }
    );
});

// PUT - Ažuriraj proizvod
// Ažuriranje broja pošiljke
router.put("/broj/:brojPosiljke", (req, res) => {
    const { noviBroj } = req.body; // Novi broj pošiljke
    db.query(
        "UPDATE Narudzbina SET brojPosiljke = ? WHERE brojPosiljke = ?",
        [noviBroj, req.params.brojPosiljke],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Broj pošiljke ažuriran" });
        }
    );
});

router.get('/korpa/:brojKorpe', (res, req) => {
    console.log("Primljen zahtev:", req.body);
    db.query("select * from Korpa where brojKorpe = ?", [req.params.brojKorpe], (err, result) => {
        res.json(result[0])
    })
})

router.post("/korpa",(res,req)=>{
    const{idProizvod,kolicina} = req.body
    const brojKorpe = "KORPA" + Math.floor(100000 + Math.random() * 900000)
    db.query("INSERT INTO Korpa (brojKorpe, idProizvod, kolicina) VALUES (?, ?, ?)", [brojKorpe,idProizvod,kolicina], (err, result) => {
        res.json(result)
    })
})

router.put('/korpa/:brojKorpe/:idProizvoda', async (req, res) => {
    try {
        const { brojKorpe, idProizvoda } = req.params; // uzimamo parametre iz URL-a
        const { akcija } = req.body; // pretpostavljamo da šaljete akciju (npr. 'povecaj' ili 'smanji')

        db.query(` SELECT * FROM Korpa k JOIN Proizvod p ON k.idProizvod = p.id  WHERE brojKorpe = ? AND idProizvod = ?`,[brojKorpe,idProizvoda],(err,result)=>{
            let kolicina = result[0].kolicina
            if(akcija == 'plus'){
                kolicina++
            }
            if(akcija == 'minus'){
                kolicina--
            }

            if(kolicina !=0){db.query("Update Korpa set kolicina = ? where brojKorpe = ? and idProizvod = ? ",[kolicina,brojKorpe,idProizvoda],(err,result)=>{
                return res.json({message:'Uspesno si promenio kolicinu'})
            })}
            else{
                db.query("DELETE FROM korpa WHERE idProizvod = ? AND brojKorpe = ?",[idProizvoda,brojKorpe], (err,result)=>{
                    return res.json({message:'uspesno brsianje iz korpe'})
                })
            }
        })               
    } catch (error) {
        console.error("Greška pri ažuriranju količine:", error);
        return res.status(500).json({ message: 'Greška na serveru' });
    }
});


// Ažuriranje statusa "poslato"
router.put("/:brojPosiljke/poslato", (req, res) => {
    const { poslato } = req.body; // Novi status "poslato"
    db.query(
        "UPDATE Narudzbina SET poslato = ? WHERE brojPosiljke = ?",
        [poslato, req.params.brojPosiljke],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Status poslato ažuriran" });
        }
    );
});
// Ažuriranje broja pošiljke
router.put("/broj/:brojPosiljke", (req, res) => {
    const { noviBroj } = req.body; // Novi broj pošiljke
    db.query(
        "UPDATE Narudzbina SET brojPosiljke = ? WHERE brojPosiljke = ?",
        [noviBroj, req.params.brojPosiljke],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Broj pošiljke ažuriran" });
        }
    );
});

// Ažuriranje statusa "poslato"
router.put("/poslato/:brojPosiljke", (req, res) => {
    const { poslato } = req.body; // Novi status "poslato"
    db.query(
        "UPDATE Narudzbina SET poslato = ? WHERE brojPosiljke = ?",
        [poslato, req.params.brojPosiljke],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Status poslato ažuriran" });
        }
    );
});


// DELETE - Obrisi proizvod
router.delete("/:brojPosiljke", (req, res) => {
    db.query("DELETE FROM Narudzbina WHERE brojPosiljke = ?", [req.params.brojPosiljke], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Narudžbina obrisana" });
    });
});



router.get("/konacnaNarudzbina", (req, res) => {
    const query = `
        SELECT 
            n.brojPosiljke, 
            n.brojKorpe,
            n.poslato,
            p.id AS proizvod_id,
            p.naziv AS proizvod_naziv,
            p.cena AS proizvod_cena,
            p.opis AS proizvod_opis,
            p.kategorija as proizvod_kategorija,
            p.sifra as proizvod_sifra,
            p.stanje as proizvod_stanje,
            k.id AS kupac_id,
            k.ime AS kupac_ime,
            k.prezime AS kupac_prezime,
            k.email AS kupac_email,
            k.telefon AS kupac_telefon,
            k.adresa AS kupac_adresa,
            k.postanskiBroj AS kupac_postanskiBroj,
            k.mesto AS kupac_mesto,
            SUM(c.kolicina * p.cena) AS ukupnaCena,
            c.kolicina
        FROM Narudzbina n
        JOIN Korpa c ON n.brojKorpe = c.brojKorpe
        JOIN Proizvod p ON c.idProizvod = p.id
        JOIN PodaciKupca k ON n.idKupac = k.id
        GROUP BY 
            n.brojPosiljke, 
            n.poslato,
            n.brojKorpe,
            p.id,
            p.naziv,
            p.cena,
            p.opis,
            p.stanje,
            p.kategorija,
            p.sifra,
            k.id,
            k.ime,
            k.prezime,
            k.email,
            k.telefon,
            k.adresa,
            k.postanskiBroj,
            k.mesto,
            c.kolicina
        ORDER BY n.brojPosiljke;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) {
            return res.json({ message: "Nema narudžbina" });
        }

        const narudzbineMap = new Map();

        results.forEach(row => {
            if (!narudzbineMap.has(row.brojPosiljke)) {
                narudzbineMap.set(row.brojPosiljke, {
                    poslato: row.poslato,
                    brojPosiljke: row.brojPosiljke,
                    kupac: {
                        id: row.kupac_id,
                        ime: row.kupac_ime,
                        prezime: row.kupac_prezime,
                        email: row.kupac_email,
                        telefon: row.kupac_telefon,
                        adresa: row.kupac_adresa,
                        postanskiBroj: row.kupac_postanskiBroj,
                        mesto: row.kupac_mesto

                    },
                    proizvodi: [],
                    ukupnaCena: 0,
                    brojKorpe: row.brojKorpe,
                });
            }

            const narudzbina = narudzbineMap.get(row.brojPosiljke);
            narudzbina.proizvodi.push({
                id: row.proizvod_id,
                naziv: row.proizvod_naziv,
                sifra: row.proizvod_sifra,
                kategorija: row.proizvod_kategorija,
                stanje: row.proizvod_stanje,
                cena: row.proizvod_cena,
                opis: row.proizvod_opis,
                kolicina: row.kolicina
            });
            narudzbina.ukupnaCena += row.kolicina * row.proizvod_cena;
        });

        res.json({ narudzbine: Array.from(narudzbineMap.values()) });
    });
});


router.get("/search/:query", (req, res) => {
    const searchParam = `%${req.params.query}%`;

    const searchQuery = `
        SELECT 
            n.brojPosiljke, 
            n.brojKorpe,
            n.poslato,
            p.id AS proizvod_id,
            p.naziv AS proizvod_naziv,
            p.cena AS proizvod_cena,
            p.opis AS proizvod_opis,
            p.kategorija as proizvod_kategorija,
            p.sifra as proizvod_sifra,
            p.stanje as proizvod_stanje,
            k.id AS kupac_id,
            k.ime AS kupac_ime,
            k.prezime AS kupac_prezime,
            k.email AS kupac_email,
            k.telefon AS kupac_telefon,
            k.adresa AS kupac_adresa,
            k.postanskiBroj AS kupac_postanskiBroj,
            k.mesto AS kupac_mesto,
            SUM(c.kolicina * p.cena) AS ukupnaCena,
            c.kolicina
        FROM Narudzbina n
        JOIN Korpa c ON n.brojKorpe = c.brojKorpe
        JOIN Proizvod p ON c.idProizvod = p.id
        JOIN PodaciKupca k ON n.idKupac = k.id
        WHERE 
            LOWER(n.brojPosiljke) LIKE LOWER(?) OR 
            LOWER(n.brojKorpe) LIKE LOWER(?) OR 
            LOWER(k.ime) LIKE LOWER(?) OR 
            LOWER(k.prezime) LIKE LOWER(?) OR 
            LOWER(k.email) LIKE LOWER(?) OR 
            LOWER(k.adresa) LIKE LOWER(?)
        GROUP BY 
            n.brojPosiljke, 
            n.poslato,
            n.brojKorpe,
            p.id,
            p.naziv,
            p.cena,
            p.opis,
            p.stanje,
            p.kategorija,
            p.sifra,
            k.id,
            k.ime,
            k.prezime,
            k.email,
            k.telefon,
            k.adresa,
            k.postanskiBroj,
            k.mesto,
            c.kolicina
        ORDER BY n.brojPosiljke;
    `;

    db.query(searchQuery, [searchParam, searchParam, searchParam, searchParam, searchParam, searchParam], (err, results) => {
        if (err) return res.status(500).json({ error: "Greška pri pretrazi", details: err });

        if (results.length === 0) {
            return res.status(404).json({ message: "Nema narudžbina koje odgovaraju pretrazi" });
        }

        const narudzbineMap = new Map();

        results.forEach(row => {
            if (!narudzbineMap.has(row.brojPosiljke)) {
                narudzbineMap.set(row.brojPosiljke, {
                    poslato: row.poslato,
                    brojPosiljke: row.brojPosiljke,
                    kupac: {
                        id: row.kupac_id,
                        ime: row.kupac_ime,
                        prezime: row.kupac_prezime,
                        email: row.kupac_email,
                        telefon: row.kupac_telefon,
                        ulica: row.kupac_adresa,
                        postanskiBroj: row.kupac_postanskiBroj,
                        mesto: row.kupac_mesto
                    },
                    proizvodi: [],
                    ukupnaCena: 0,
                    brojKorpe: row.brojKorpe,
                });
            }

            const narudzbina = narudzbineMap.get(row.brojPosiljke);
            narudzbina.proizvodi.push({
                id: row.proizvod_id,
                naziv: row.proizvod_naziv,
                sifra: row.proizvod_sifra,
                kategorija: row.proizvod_kategorija,
                stanje: row.proizvod_stanje,
                cena: row.proizvod_cena,
                opis: row.proizvod_opis,
                kolicina: row.kolicina
            });

            narudzbina.ukupnaCena += row.kolicina * row.proizvod_cena;
        });

        res.json({ narudzbine: Array.from(narudzbineMap.values()) });
    });
});


module.exports = router;
