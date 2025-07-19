import db from "@/lib/db";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// GET: Vrati sve slike za proizvod
export async function GET(_req, { params }) {
  const { id } = params;

  try {
    const [results] = await db.execute(
      "SELECT * FROM ProizvodSlika WHERE idProizvod = ?",
      [id]
    );
    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Dodaj jednu novu sliku za proizvod
export async function POST(req, { params }) {
  const { id } =await  params;
  const { urlSlike } = await req.json();

  try {
    await db.execute(
      "INSERT INTO ProizvodSlika (idProizvod, urlSlika) VALUES (?, ?)",
      [id, urlSlike]
    );
    return NextResponse.json({ message: "Slika uspešno dodata." });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Obriši sliku iz baze i sa diska (koristi ID slike)
export async function DELETE(req, { params }) {
  const { id } = await params; // id iz ProizvodSlika
  try {
    // Prvo uzmi url iz baze
    const [results] = await db.execute(
      "SELECT urlSlika FROM ProizvodSlika WHERE id = ?",
      [id]
    );

    if (!results || results.length === 0) {
      return NextResponse.json({ error: "Slika nije pronađena." }, { status: 404 });
    }

    const fileUrl = results[0].urlSlika;
    const filePath = path.join(process.cwd(), "public", fileUrl);

    // Pokušaj brisanje fajla ako postoji
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Obriši iz baze
    await db.execute("DELETE FROM ProizvodSlika WHERE id = ?", [id]);

    return NextResponse.json({ message: "Slika uspešno obrisana." });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
