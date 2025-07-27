import { NextResponse } from "next/server";
import db from '@/lib/db'; 

export async function GET(request) {
  
  const [results] = await db.execute(`
    SELECT p.*, ps.id as ps_id, ps.urlSlika 
    FROM Proizvod p
    LEFT JOIN ProizvodSlika ps ON p.id = ps.idProizvod
  `);

  // Parsiraj JSON niz slika
 const map = new Map();

  results.forEach(row => {
    // Ako proizvod još nije u mapi, dodaj ga sa praznim nizom slika
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        naziv: row.naziv,
        opis: row.opis,
        kategorija: row.kategorija,
        marka:row.marka,
        sifra:row.sifra,
        cena:row.cena,
        stanje:row.stanje,
        tezina:row.tezina,
        slike: []
      });
    }

    // Ako postoji slika (nije null), dodaj je u niz slika tog proizvoda
    if (row.ps_id) {
      map.get(row.id).slike.push({
        id: row.ps_id,
        urlSlika: row.urlSlika
      });
    }
  });
  const groupedProducts = Array.from(map.values())

  return NextResponse.json(groupedProducts);
}

export async function POST(request) {
  const { sifra, naziv, opis, kategorija, cena, stanje, tezina,marka } = await request.json();
  const [result] = await db.execute(
    'INSERT INTO Proizvod (sifra, naziv, opis, kategorija, cena, stanje, tezina,marka) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [sifra, naziv, opis, kategorija, cena, stanje, tezina,marka]
  );
  return NextResponse.json({ message: 'Proizvod dodat', id: result.insertId });
}