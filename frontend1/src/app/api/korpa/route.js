import db from '@/lib/db'
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { brojKorpe, idProizvod, kolicina } = await request.json();
  await db.execute(
    'INSERT INTO Korpa (brojKorpe, idProizvod, kolicina) VALUES (?, ?, ?)',
    [brojKorpe, idProizvod, kolicina]
  );
  return NextResponse.json({ message: 'Proizvod dodat u korpu' });
}

export async function GET(request) {
  const url = new URL(request.url);
  const brojKorpe = url.searchParams.get('brojKorpe');

  // Dohvatanje stavki iz korpe
  const params = [];
  let query = `
    SELECT k.brojKorpe, k.idProizvod, k.kolicina,
           p.naziv, p.sifra, p.cena AS cenaProizvoda
    FROM Korpa k
    JOIN Proizvod p ON p.id = k.idProizvod
  `;
  if (brojKorpe) {
    query += ` WHERE k.brojKorpe = ?`;
    params.push(brojKorpe);
  }

  const [rows] = await db.execute(query, params);

  // Grupisanje po korpi
  const korpeMap = {};
  for (const r of rows) {
    if (!korpeMap[r.brojKorpe]) {
      korpeMap[r.brojKorpe] = {
        brojKorpe: r.brojKorpe,
        korpa: [],
        ukupnaCena: 0
      };
    }
    korpeMap[r.brojKorpe].korpa.push({
      proizvod: {
        id: r.idProizvod,
        sifra: r.sifra,
        naziv: r.naziv,
        cena: r.cenaProizvoda
      },
      kolicina: r.kolicina
    });
    korpeMap[r.brojKorpe].ukupnaCena += r.cenaProizvoda * r.kolicina;
  }

  const korpe = Object.values(korpeMap);
  return NextResponse.json({ korpe });
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const brojKorpe = url.searchParams.get('brojKorpe');
  if (!brojKorpe) {
    return NextResponse.json({ error: 'brojKorpe je obavezan' }, { status: 400 });
  }
  await db.execute('DELETE FROM Korpa WHERE brojKorpe = ?', [brojKorpe]);
  return NextResponse.json({ message: 'Korpa obrisana' });
}