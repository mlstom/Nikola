import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const [result] = await db.execute('SELECT * FROM Kupon WHERE id = ?', [id]);
    if (result.length === 0) return NextResponse.json({ message: 'Nije pronađeno' }, { status: 404 });
    return NextResponse.json(result[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { kod, popust } = await req.json();
  try {
    await db.execute('UPDATE Kupon SET kod = ?, popust = ? WHERE id = ?', [kod, popust, id]);
    return NextResponse.json({ message: 'Kupon ažuriran',kupon:{id,kod,popust} });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await db.execute('DELETE FROM Kupon WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Kupon obrisan' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
