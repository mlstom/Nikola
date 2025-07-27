'use client';
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductTable({ proizvodi }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');

  const filteredProizvodi = useMemo(() => {
    let rez = proizvodi;

    if (search.trim()) {
      rez = rez.filter(p =>
        p.naziv.toLowerCase().includes(search.toLowerCase()) ||
        p.sifra.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOrder === 'latest') {
      rez = rez.slice().sort((a, b) => b.id - a.id); // najnoviji prvi
    } else {
      rez = rez.slice().sort((a, b) => a.id - b.id); // najstariji prvi
    }

    return rez;
  }, [search, sortOrder, proizvodi]);

  return (
    <div className="overflow-x-auto pt-6">
      {/* Gornji red: dugme + search + sort */}
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <Link
          href="/admin/page/modal"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Dodaj novi proizvod
        </Link>

        <input
          type="text"
          placeholder="Pretraga po nazivu ili šifri..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-60"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="latest">Najnoviji prvo</option>
          <option value="oldest">Najstariji prvo</option>
        </select>
      </div>

      {/* Tabela */}
      <table className="table-auto w-full border border-gray-300 bg-white text-sm">
        <thead className="bg-orange-500">
          <tr>
            <th className="px-4 py-2 border text-white">ID</th>
            <th className="px-4 py-2 border text-white">Šifra</th>
            <th className="px-4 py-2 border text-white">Naziv</th>
            <th className="px-4 py-2 border text-white">Opis</th>
            <th className="px-4 py-2 border text-white">Kategorija</th>
            <th className="px-4 py-2 border text-white">Marka</th>
            <th className="px-4 py-2 border text-white">Cena</th>
            <th className="px-4 py-2 border text-white">Stanje</th>
            <th className="px-4 py-2 border text-white">Težina</th>
            <th className="px-4 py-2 border text-white">Slike</th>
            <th className="px-4 py-2 border text-white">Akcije</th>
          </tr>
        </thead>
        <tbody>
          {filteredProizvodi.map((p) => (
            <tr key={p.id} className="hover:bg-orange-200">
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.sifra}</td>
              <td className="border px-4 py-2">{p.naziv}</td>
              <td className="border px-4 py-2">{p.opis}</td>
              <td className="border px-4 py-2">{p.kategorija}</td>
              <td className="border px-4 py-2">{p.marka}</td>
              <td className="border px-4 py-2">{p.cena}</td>
              <td className="border px-4 py-2">{p.stanje}</td>
              <td className="border px-4 py-2">{p.tezina}</td>
              <td className="border px-4 py-2">
                <div className="flex flex-wrap justify-start gap-2">
                  {p.slike && p.slike.length > 0 && (
                    p.slike.map((img, index) => (
                      <div
                        key={index}
                        className="relative w-16 grid grid-cols-2 gap-2 h-16 sm:w-20 sm:h-20 rounded-lg border-2 border-gray-300"
                      >
                        <Image
                          src={`https://alatinidza.rs/${img.urlSlika}`}
                          alt={`Slika ${index + 1}`}
                          fill
                          className="object-contain rounded-lg"
                          sizes="80px"
                        />
                      </div>
                    ))
                  )}
                </div>
              </td>


              <td className="border px-4 py-2">
                <Link
                  href={`/admin/page/modal?id=${p.id}`}
                  className="text-white px-4 py-2 rounded-sm bg-orange-500 hover:bg-orange-700 mr-2"
                >
                  Uredi
                </Link>
                <Link
                  href={`/admin/page/delete?id=${p.id}`}
                  className="text-white px-4 py-2 rounded-sm bg-red-500 hover:bg-red-700"
                >
                  Obriši
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
