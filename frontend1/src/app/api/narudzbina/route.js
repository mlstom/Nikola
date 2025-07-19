import { NextResponse } from "next/server";
import db from '@/lib/db'; 
export async function GET() {
  const query = `
    SELECT
      n.id AS narudzbinaId, n.brojKorpe, n.brojPosiljke, n.poslato,
      n.cena AS ukupnaCena, n.postarina, n.popust,
      pk.id AS kupacId, pk.ime, pk.prezime, pk.email, pk.telefon, pk.adresa, pk.postanskiBroj, pk.mesto,
      p.id AS proizvodId, p.naziv, p.sifra, p.cena AS cenaProizvoda,
      c.kolicina
    FROM Narudzbina n
    JOIN PodaciKupca pk ON n.idKupac = pk.id
    JOIN Korpa c ON n.brojKorpe = c.brojKorpe
    JOIN Proizvod p ON p.id = c.idProizvod
    ORDER BY n.id DESC
  `;
  const [rows] = await db.execute(query);

  // Grupisanje narudžbina po narudzbinaId
  const map = {};
  for (const r of rows) {
    if (!map[r.narudzbinaId]) {
      map[r.narudzbinaId] = {
        id: r.narudzbinaId,
        brojKorpe: r.brojKorpe,
        brojPosiljke: r.brojPosiljke,
        poslato: !!r.poslato,
        ukupnaCena: r.ukupnaCena,
        postarina: r.postarina,
        popust: r.popust,
        kupac: {
          id: r.kupacId,
          ime: r.ime,
          prezime: r.prezime,
          email: r.email,
          telefon: r.telefon,
          adresa: r.adresa,
          postanskiBroj: r.postanskiBroj,
          mesto: r.mesto,
        },
        proizvodi: [],
      };
    }
    map[r.narudzbinaId].proizvodi.push({
      id: r.proizvodId,
      naziv: r.naziv,
      sifra: r.sifra,
      cena: r.cenaProizvoda,
      kolicina: r.kolicina,
    });
  }

  const narudzbine = Object.values(map);
  return NextResponse.json({ narudzbine });
}

// Dodavanje nove narudžbine
export async function POST(request) {
  const { brojKorpe,  idKupac, brojPosiljke, poslato, cena, postarina, popust } = await request.json();
  const [result] = await db.execute(
    'INSERT INTO Narudzbina (brojKorpe, idKupac, brojPosiljke, poslato, cena, postarina, popust) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [brojKorpe, idKupac, brojPosiljke, poslato, cena, postarina, popust]
  );
  return NextResponse.json({ message: 'Narudžbina dodata', id: result.insertId });
}