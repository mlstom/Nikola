import { NextResponse } from "next/server";
import db from '@/lib/db'; 

export async function GET(request, { params }) {
  const { id } = params;
  const [rows] = await db.execute('SELECT * FROM PodaciKupca WHERE id = ?', [id]);
  if (rows.length === 0) return NextResponse.json({ message: 'Kupac nije pronađen' }, { status: 404 });
  return NextResponse.json(rows[0]);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const { ime, prezime, email, telefon, adresa, postanskiBroj, mesto } = await request.json();
  await db.execute(
    'UPDATE PodaciKupca SET ime = ?, prezime = ?, email = ?, telefon = ?, adresa = ?, postanskiBroj = ?, mesto = ? WHERE id = ?',
    [ime, prezime, email, telefon, adresa, postanskiBroj, mesto, id]
  );
  return NextResponse.json({ message: 'Kupac ažuriran' });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await db.execute('DELETE FROM PodaciKupca WHERE id = ?', [id]);
  return NextResponse.json({ message: 'Kupac obrisan' });
}