import db from "@/lib/db";
import { NextResponse } from 'next/server';
export async function GET(request) {
  // fetch all
  const [results] = await db.execute('SELECT * FROM ProizvodSlika');
  return NextResponse.json(results);
}

export async function DELETE() {
  try {
    // 1. Dohvati sve slike iz baze

    // 2. Pokušaj da obrišeš svaki fajl sa dis    // 3. Očisti bazu
    await db.execute("DELETE FROM ProizvodSlika");

    return NextResponse.json({ message: "Sve slike su obrisane." });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
