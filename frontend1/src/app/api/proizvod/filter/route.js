// app/api/proizvod/filter/route.js
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
  const params = Object.fromEntries(request.nextUrl.searchParams);
  const {
    search = '',
    kategorija = '',
    podkategorija = '',
    sort = '',
    priceod = '',
    pricedo = '',
  } = params;

  // Parsiraj comma‑separated u nizove
  const cats   = kategorija   ? kategorija.split(',')   : [];
  const subs   = podkategorija? podkategorija.split(','): [];

  let sql = `
    SELECT
      p.id, p.naziv, p.opis, p.kategorija, p.sifra,
      p.cena, p.stanje, p.tezina,
      ps.id AS ps_id, ps.urlSlika
    FROM Proizvod p
    LEFT JOIN ProizvodSlika ps ON p.id = ps.idProizvod
  `;
  const whereClauses = [];
  const values       = [];

  if (search) {
    whereClauses.push('p.naziv LIKE ?');
    values.push(`%${search}%`);
  }

  if (cats.length) {
    // WHERE p.kategorija IN (?, ?, …)
    whereClauses.push(
      `p.kategorija IN (${cats.map(() => '?').join(',')})`
    );
    values.push(...cats);
  }

  if (subs.length) {
    // pretpostavka: u bazi je podkategorija zasebno polje ili parsiraj iz p.kategorija
    whereClauses.push(
      `p.kategorija LIKE ANY(${subs.map(() => '?').join(',')})`
    );
    // ili ako imaš kolonu podkategorija:
    // whereClauses.push(`p.podkategorija IN (${subs.map(()=>'?').join(',')})`);
    values.push(...subs.map(s => `%/${s}`)); 
  }

  if (priceod) {
    whereClauses.push('p.cena >= ?');
    values.push(Number(priceod));
  }
  if (pricedo) {
    whereClauses.push('p.cena <= ?');
    values.push(Number(pricedo));
  }

  if (whereClauses.length) {
    sql += ' WHERE ' + whereClauses.join(' AND ');
  }

  // ORDER BY
  if (sort === 'priceAsc') {
    sql += ' ORDER BY p.cena ASC';
  } else if (sort === 'priceDesc') {
    sql += ' ORDER BY p.cena DESC';
  } else if (sort === 'latest') {
    sql += ' ORDER BY p.createdAt DESC';
  } else {
    sql += ' ORDER BY p.id ASC';
  }

  const [rows] = await db.execute(sql, values);

  // Grupisanje slika
  const map = new Map();
  rows.forEach(r => {
    if (!map.has(r.id)) {
      map.set(r.id, { 
        id: r.id, naziv: r.naziv, opis: r.opis,
        kategorija: r.kategorija, sifra: r.sifra,
        cena: r.cena, stanje: r.stanje, tezina: r.tezina,
        slike: [] 
      });
    }
    if (r.ps_id && r.urlSlika) {
      map.get(r.id).slike.push({ id: r.ps_id, urlSlika: r.urlSlika });
    }
  });

  return NextResponse.json(Array.from(map.values()));
}
