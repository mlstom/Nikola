import { NextResponse } from "next/server";
import db from '@/lib/db';

// GET narudžbine po ID-u
export async function GET(_, { params }) {
  const { id } = params;

  const [rows] = await db.execute(
    `SELECT n.*, pk.*, c.idProizvod, c.kolicina, p.naziv AS nazivProizvoda, p.cena AS cenaProizvoda
     FROM Narudzbina n
     JOIN PodaciKupca pk ON pk.id = n.idKupac
     JOIN Korpa c ON c.brojKorpe = n.brojKorpe
     JOIN Proizvod p ON p.id = c.idProizvod
     WHERE n.id = ?`,
    [id]
  );

  if (!rows.length) {
    return NextResponse.json({ message: 'Narudžbina nije pronađena' }, { status: 404 });
  }

  const narudzbina = {
    brojKorpe: rows[0].brojKorpe,
    brojPosiljke: rows[0].brojPosiljke,
    poslato: rows[0].poslato,
    cena: rows[0].cena,
    postarina: rows[0].postarina,
    popust: rows[0].popust,
    kupac: {
      id: rows[0].id,
      ime: rows[0].ime,
      prezime: rows[0].prezime,
      email: rows[0].email,
      telefon: rows[0].telefon,
      adresa: rows[0].adresa,
      postanskiBroj: rows[0].postanskiBroj,
      mesto: rows[0].mesto,
    },
    proizvodi: rows.map(r => ({
      id: r.idProizvod,
      naziv: r.nazivProizvoda,
      cena: r.cenaProizvoda,
      kolicina: r.kolicina
    }))
  };

  return NextResponse.json(narudzbina);
}

// PUT za ažuriranje narudžbine
export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  const fields = [];
  const values = [];

  for (const key of ['brojKorpe', 'brojPosiljke', 'poslato', 'cena', 'postarina', 'popust']) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }

  if (!fields.length) {
    return NextResponse.json({ message: 'Nema polja za ažuriranje' }, { status: 400 });
  }

  values.push(id);
  await db.execute(
    `UPDATE Narudzbina SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  return NextResponse.json({ message: 'Narudžbina ažurirana' });
}

// DELETE narudžbine po ID-u
export async function DELETE(_, { params }) {
  const { id } = params;

  // Opcionalno možeš prvo obrisati iz `Korpa` ako koristiš foreign key constraints
  await db.execute('DELETE FROM Narudzbina WHERE id = ?', [id]);

  return NextResponse.json({ message: 'Narudžbina obrisana' });
}
