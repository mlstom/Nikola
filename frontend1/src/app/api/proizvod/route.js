import { NextResponse } from "next/server";
import db from '@/lib/db'; 

export async function GET(request) {
  const [rows] = await db.execute(`
    SELECT 
      p.id, p.naziv, p.opis, p.kategorija, p.sifra, p.cena, p.stanje, p.tezina,
      ps.id   AS ps_id,
      ps.urlSlika
    FROM Proizvod p
    LEFT JOIN ProizvodSlika ps ON p.id = ps.idProizvod
  `);

  const grouped = (rows ).reduce((acc, row) => {
    // Nađemo ili kreiramo objekat proizvoda
    let prod = acc.find((p) => p.id === row.id);
    if (!prod) {
      prod = {
        id: row.id,
        naziv: row.naziv,
        opis: row.opis,
        kategorija: row.kategorija,
        sifra: row.sifra,
        cena: row.cena,
        stanje: row.stanje,
        tezina: row.tezina,
        slike: []
      };
      acc.push(prod);
    }

    // Ako postoji slika, dodaj je
    if (row.ps_id != null) {
      prod.slike.push({
        id: row.ps_id,
        urlSlika: row.urlSlika
      });
    }

    return acc;
  });

  return NextResponse.json(grouped);
}
export async function POST(request) {
  const { sifra, naziv, opis, kategorija, cena, stanje, tezina } = await request.json();
  const [result] = await db.execute(
    'INSERT INTO Proizvod (sifra, naziv, opis, kategorija, cena, stanje, tezina) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [sifra, naziv, opis, kategorija, cena, stanje, tezina]
  );
  return NextResponse.json({ message: 'Proizvod dodat', id: result.insertId });
}