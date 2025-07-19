// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: { bodyParser: false },
};

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), 'uploads');
    const files = fs.readdirSync(dirPath);

    const fileUrls = files.map((fileName) => ({
      name: fileName,
      url: `uploads/${fileName}`,
    }));

    return NextResponse.json(fileUrls);
  } catch (error) {
    return NextResponse.json({ message: 'Greška pri čitanju foldera.' }, { status: 500 });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('image'); // Očekujemo da je "image" ime polja za upload

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

 const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Dobijamo ime fajla (može biti undefined)
  const filename = `${Date.now()}`+file.name || `upload-${Date.now()}`;

  // Path gde ćemo da snimimo fajl
  const filePath = path.join(uploadDir, filename);

  // file je Web API File/Blob - možemo da pročita sadržaj sa arrayBuffer()
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upisujemo fajl u sistem
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ path: `uploads/${filename}` });
}
