import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Stranica nije pronađena</h1>
      <p className="text-lg mb-6">Stranica koju tražiš ne postoji ili je pomerena.</p>
      <Link
        href="/"
        className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition"
      >
        Vrati se na početnu
      </Link>
    </div>
  );
}