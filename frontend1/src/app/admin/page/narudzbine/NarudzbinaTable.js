'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Trash2, PackageCheck, PackageX } from 'lucide-react'; // ikone za status
import axios from 'axios';
import Loader from '@/components/Loader';

export default function NarudzbinaTable({ initialNarudzbine }) {
  const [narudzbine, setNarudzbine] = useState(initialNarudzbine);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [loading, setLoading] = useState(false)
  const filtered = useMemo(() => {
    let arr = narudzbine;
    if (search) {
      arr = arr.filter(n =>
        n.brojPosiljke.includes(search) ||
        n.kupac.ime.toLowerCase().includes(search.toLowerCase())
      );
    }
    return arr.slice().sort((a, b) =>
      sortOrder === 'newest' ? b.id - a.id : a.id - b.id
    );
  }, [search, sortOrder, narudzbine]);

  const izracunajFinalnuCenu = (n) => {
    const cenaArtikala = n.proizvodi.reduce(
      (sum, p) => sum + p.cena * p.kolicina, 0
    );
    const cenaPrePopusta = cenaArtikala + Number(n.postarina || 0);
    const popustIznos = n.popust ? (n.popust / 100) * cenaArtikala : 0;
    return Math.round(cenaPrePopusta - popustIznos);
  };
  const handleDelete = async (n) => {
    const potvrdi = confirm(`Da li sigurno želiš da obrišeš pošiljku ${n.brojPosiljke}?`);
    if (!potvrdi) return;
    setLoading(true)
    try {
      await axios.delete(`/api/kupac/${n.kupac.id}`);
      await axios.delete(`/api/korpa?brojKorpe=${n.brojKorpe}`);
      await axios.delete(`/api/narudzbina/${n.id}`);
      setNarudzbine(prev => prev.filter(x => x.id !== n.id));
    } catch (err) {
      console.error('Greška pri brisanju:', err);
      alert('Greška prilikom brisanja narudžbine.');
    }
    setLoading(false)
  };

  if(loading) return <Loader />

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Pretraga pošiljke ili imena..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="newest">Najnovije</option>
          <option value="oldest">Najstarije</option>
        </select>
        <Link
          href={`modalnarudzbina`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Dodaj
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(n => (
          <div key={n.id} className="relative">
            <button
              onClick={(e) => {
                e.preventDefault(); // spreči da klik vodi na link
                handleDelete(n);
              }}
              className="absolute top-2 right-2 text-2xl hover:cursor-pointer text-red-600 hover:text-red-800"
              title="Obriši pošiljku"
            >
              <Trash2 size={18} />
            </button>

            <Link
              key={n.id}
              href={`modalnarudzbina?id=${n.id}`}
              className="block bg-white p-4 rounded-lg shadow hover:shadow-lg transition border cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2 text-orange-600">
                
                {n.poslato
                  ? <span className="text-green-600 font-semibold flex items-center gap-1"><PackageCheck size={18} /> Poslato</span>
                  : <span className="text-red-500 flex items-center gap-1"><PackageX size={18} /> Nije poslato</span>}
              </div>
              <h3 className="font-semibold text-lg">Pošiljka: {n.brojPosiljke}</h3>
              <p className="text-sm">Kupac: {n.kupac.ime} {n.kupac.prezime}</p>
              <p className="text-sm">Telefon: {n.kupac.telefon}</p>
              <p className="mt-2 text-md font-semibold text-gray-700">
                Za uplatu: {izracunajFinalnuCenu(n)} RSD
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
