import { NextResponse } from "next/server";
import db from '@/lib/db'; 

export async function GET(request, { params }) {
  const { id } = params;

  // Dohvati flat rezultate (proizvod + po jedna slika po redu)
  const [rows] = await db.execute(
    `
    SELECT
      p.id,
      p.sifra,
      p.naziv,
      p.opis,
      p.kategorija,
      p.cena,
      p.stanje,
      p.tezina,
      ps.id      AS ps_id,
      ps.urlSlika
    FROM Proizvod p
    LEFT JOIN ProizvodSlika ps
      ON p.id = ps.idProizvod
    WHERE p.id = ?
  `,
    [id]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { message: 'Proizvod nije pronađen' },
      { status: 404 }
    );
  }

  // Grupisanje u jednu mapu (po id-u proizvoda)
  const map = new Map();

  rows.forEach((row) => {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        sifra: row.sifra,
        naziv: row.naziv,
        opis: row.opis,
        kategorija: row.kategorija,
        cena: row.cena,
        stanje: row.stanje,
        tezina: row.tezina,
        slike: [],
      });
    }

    if (row.ps_id && row.urlSlika) {
      map.get(row.id).slike.push({
        id: row.ps_id,
        urlSlika: row.urlSlika,
      });
    }
  });

  // Pošto je samo jedan proizvod, uzmi prvi (i jedini) element iz mape
  const proizvod = map.values().next().value;

  return NextResponse.json(proizvod);
}


export async function PUT(request, { params }) {
  const { id } = await params;
  const { sifra, naziv, opis, kategorija, cena, stanje, tezina } = await request.json();
  await db.execute(
    'UPDATE Proizvod SET sifra=?, naziv=?, opis=?, kategorija=?, cena=?, stanje=?, tezina=? WHERE id=?',
    [sifra, naziv, opis, kategorija, cena, stanje, tezina, id]
  );
  return NextResponse.json({ message: 'Proizvod ažuriran' });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await db.execute('DELETE FROM Proizvod WHERE id = ?', [id]);
  return NextResponse.json({ message: 'Proizvod obrisan' });
}
