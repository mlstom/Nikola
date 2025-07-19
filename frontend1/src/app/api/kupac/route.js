import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
  // fetch all
  const [results] = await db.execute('SELECT * FROM PodaciKupca');
  return NextResponse.json(results);
}

export async function POST(request) {
  const { ime, prezime, email, telefon, adresa, postanskiBroj, mesto } = await request.json();
  const [result] = await db.execute(
    'INSERT INTO PodaciKupca (ime, prezime, email, telefon, adresa, postanskiBroj, mesto) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [ime, prezime, email, telefon, adresa, postanskiBroj, mesto]
  );
  return NextResponse.json({ message: 'Kupac dodat', id: result.insertId });
}