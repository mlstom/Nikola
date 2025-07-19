'use client';

import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload';
import Loader from './Loader';
import kategorije from '../data/kategorije';

export default function ProductForm({ proizvod }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [noveSlike, setNoveSlike] = useState([]);
  const [form, setForm] = useState({
    sifra: proizvod?.sifra || '',
    naziv: proizvod?.naziv || '',
    opis: proizvod?.opis || '',
    kategorija: proizvod?.kategorija || '',
    cena: proizvod?.cena || '',
    stanje: proizvod?.stanje || '',
    tezina: proizvod?.tezina || 0,
    slike: proizvod?.slike || []
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let savedProizvod = proizvod;
      if (proizvod?.id) {
        await axios.put(`https://alatinidza.rs/api/proizvod/${proizvod.id}`, form);
      } else {
        const res = await axios.post('https://alatinidza.rs/api/proizvod', form);
        savedProizvod = res.data;
      }

      if (noveSlike.length > 0 && savedProizvod?.id) {
        const uploadedPaths = [];

        for (const slika of noveSlike) {
          const formData = new FormData();
          formData.append('image', slika.file);
          const res = await axios.post('https://alatinidza.rs/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          uploadedPaths.push(res.data.path);
          await axios.post(`https://alatinidza.rs/api/proizvodSlike/${savedProizvod.id}`, {
            urlSlike: res.data.path
          });
        }
      }

      router.push("/admin/page/proizvodi");
      router.refresh();
      setLoading(false);
    } catch (err) {
      console.error('Greška pri čuvanju:', err);
    }
  };

  const handleRemoveStara = async (slikaId) => {
    if (!confirm("Da li si siguran da želiš da obrišeš ovu sliku?")) return;

    try {
      setLoading(true);
      await axios.delete(`https://alatinidza.rs/api/proizvodSlike/${slikaId}`);
      const updatedSlike = proizvod.slike.filter((s) => s.id !== slikaId);
      proizvod.slike = updatedSlike;
      setLoading(false);
      setForm({ ...form });
    } catch (err) {
      
      alert("Došlo je do greške prilikom brisanja slike.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="relative w-full w-fit min-w-[300px] mt-10">
      <button
        onClick={() => redirect('/admin/page/proizvodi')}
        className="text-white font-semibold bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 mb-4"
      >
        ← Nazad
      </button>

      <h1 className="mb-3 font-bold text-3xl font-mono text-gray-800">
        Proizvod{' '}
        {proizvod?.id && (
          <span className="text-sm text-orange-500">ID: {proizvod.id}</span>
        )}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid  gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-orange-400 shadow"
      >
        <input
          type="text"
          name="sifra"
          placeholder="Šifra"
          value={form.sifra}
          onChange={handleChange}
          className="h-[50px] px-5 border rounded"
          required
        />
        <input
          type="text"
          name="naziv"
          placeholder="Naziv"
          value={form.naziv}
          onChange={handleChange}
          className="h-[50px] px-5 border rounded"
          required
        />
        <textarea
          name="opis"
          placeholder="Opis"
          value={form.opis}
          onChange={handleChange}
          className="px-5 py-3 border rounded sm:col-span-2 resize-none h-28"
        />
        <select
          name="kategorija"
          value={form.kategorija}
          onChange={handleChange}
          className="max-w-[250px]  h-[50px] px-5 border rounded"
          required
        >
          <option value="">-- Izaberite kategoriju --</option>
          {kategorije.map((kat, index) =>
            kat.podKategorija.map((pod, ind) => (
              <option key={`${index}-${ind}`} value={`${kat.naziv}/${pod}`}>
                {`${kat.naziv}/${pod}`}
              </option>
            ))
          )}
        </select>
        <input
          type="number"
          name="cena"
          placeholder="Cena"
          value={form.cena}
          onChange={handleChange}
          className="h-[50px] px-5 border rounded"
        />
        <input
          type="number"
          name="stanje"
          placeholder="Stanje"
          value={form.stanje}
          onChange={handleChange}
          className="h-[50px] px-5 border rounded"
        />
        <input
          type="number"
          name="tezina"
          placeholder="Težina"
          value={form.tezina}
          onChange={handleChange}
          className="h-[50px] px-5 border rounded"
        />
        {proizvod?.slike.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {proizvod.slike.map((slika, index) => (
              <div key={index} className="relative">
                <img
                  src={`/${slika.urlSlika}`}
                  alt={`slika-${index}`}
                  className="h-32 w-32 rounded-lg object-cover object-center border-2 border-orange-500"
                />
                <button
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 hover:bg-red-800"
                  onClick={() => handleRemoveStara(slika.id)}
                  type="button"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="sm:col-span-2">
          <FileUpload proizvod={proizvod} onFilesReady={(files) => setNoveSlike(files)} />
        </div>

        <button
          type="submit"
          className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-700 sm:col-span-2"
        >
          Sačuvaj
        </button>
      </form>
    </div>
  );
}
