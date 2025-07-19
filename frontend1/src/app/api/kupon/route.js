import { NextResponse } from 'next/server';
import db from '@/lib/db'; 

export async function GET(req) {
  try {
    const [results] = await db.execute('SELECT * FROM Kupon');
    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { kod, popust } = await req.json();

    const [result] = await db.execute(
      'INSERT INTO Kupon (kod, popust) VALUES (?, ?)',
      [kod, popust]
    );

    return NextResponse.json({ message: 'Kupon dodat',kupon:{id: result.insertId, kod:kod,popust:popust} });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Za PUT i DELETE treba da pravis zasebne fajlove sa parametrom u putanji
// npr. app/api/kupon/[id]/route.js za rute koje primaju id parametar
