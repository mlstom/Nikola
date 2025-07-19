import db from "@/lib/db";
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { idProizvod } = req.query;

  if (req.method === "DELETE") {
    db.execute("SELECT urlSlika FROM ProizvodSlika WHERE idProizvod = ?", [idProizvod], (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) return res.status(404).json({ message: "Proizvod nema slike" });

      results.forEach((row) => {
        const filePath = path.join(process.cwd(), "public", row.urlSlika);
        fs.unlink(filePath, (err) => {
          if (err && err.code !== "ENOENT") console.error("Greška pri brisanju fajla:", err);
        });
      });

      db.execute("DELETE FROM ProizvodSlika WHERE idProizvod = ?", [idProizvod], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Sve slike za proizvod su obrisane" });
      });
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
