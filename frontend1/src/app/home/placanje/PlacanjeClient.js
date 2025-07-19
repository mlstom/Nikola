'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useStateContext } from '@/app/context/StateContext';
import Loader from '@/components/Loader';
import axios from 'axios';

const PlacanjeClient = ({ popust }) => {
  const { cart, setCart } = useStateContext();
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const [kupac, setKupac] = useState({
    ime: '',
    prezime: '',
    email: '',
    telefon: '',
    adresa: '',
    postanskiBroj: '',
    mesto: '',
  });
  useEffect(() => {
    setLoading(true)
    if (cart.proizvodi.length == 0) {
      router.push('/')
    }
    setLoading(false)
  }, [])


  const ukupno = cart.proizvodi.reduce(
    (suma, p) => suma + p.kolicina * p.cena,
    0
  );

  const cenaSaPopustom = popust
    ? Math.round(ukupno * (1 - popust / 100))
    : ukupno;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKupac(prev => ({ ...prev, [name]: value }));
  };

  async function napraviNarudzbinu() {
    if (!kupac.ime || !kupac.prezime || !kupac.telefon || !kupac.adresa || !kupac.mesto || !kupac.postanskiBroj) {
      toast.error("Molimo popunite sva obavezna polja.");
      return;
    }
    console.log('usao')

    try {
      setLoading(true)

      const resKupac = await axios.post('http://localhost:3000/api/kupac', kupac)
      console.log('usao ovde')
      const idKupac = resKupac.data.id
      console.log(idKupac)
      for (const proizvod of cart.proizvodi) {
        await axios.post('/api/korpa', {
          brojKorpe: cart.brojKorpe,
          idProizvod: proizvod.id,
          kolicina: proizvod.kolicina
        })
      }
      const ukupnaPrePopusta = cart.proizvodi.reduce(
        (sum, proizvod) => sum + proizvod.cena * proizvod.kolicina,
        0
      );
      const timestamp = Date.now()
      await axios.post('http://localhost:3000/api/narudzbina', {
        brojKorpe: cart.brojKorpe,
        idKupac: idKupac,
        brojPosiljke: `POSILJKA-${timestamp}`,
        poslato: 0,
        cena: ukupnaPrePopusta,
        postarina: 500,
        popust: popust?popust.popust:0,
      })

      toast.success('Uspešno ste završili kupovinu!');
      router.push('/');
      const novaKorpa = {
        brojKorpe: `KORPA-${Date.now()}`,
        proizvodi: [],
      };
      localStorage.setItem('korpa', JSON.stringify(novaKorpa));
      setCart(novaKorpa);
      setLoading(false)
    } catch (e) {
      toast.error('Greška pri kreiranju narudžbine.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('usao')
    napraviNarudzbinu();
  };
  if (loading) return <Loader />

  return (
    <div className="grid mt-10 grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-xl mx-auto py-6 px-4">
      {/* Leva strana - pregled korpe */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Tvoja narudžbina</h2>
        {cart.proizvodi.map(p => (
          <div key={p.id} className="flex justify-between py-2 border-b">
            <span>{p.naziv} x {p.kolicina}</span>
            <span>{(p.kolicina * p.cena).toLocaleString("sr-RS")} RSD</span>
          </div>
        ))}

        <div className="mt-4 pt-4  text-lg">

          <div className="flex justify-between text-green-600 font-semibold">
            <span>Popust</span>
            <span>- {Math.round(ukupno * ((popust || 0) / 100))} RSD</span>
          </div>


          <div className="flex justify-between">
            <span>Poštarina</span>
            <span>500 RSD</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-2 border-t pt-2">
            <span>Ukupno</span>
            <span>{cenaSaPopustom + 500} RSD</span>
          </div>
        </div>
      </div>

      {/* Desna strana - forma kupca */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Podaci o kupcu</h2>
        <form id="forma-kupac" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="ime" placeholder="Ime*" value={kupac.ime} onChange={handleChange} required className="border p-2 rounded w-full" />
            <input name="prezime" placeholder="Prezime*" value={kupac.prezime} onChange={handleChange} required className="border p-2 rounded w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="email" type="email" placeholder="Email" value={kupac.email} onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="telefon" placeholder="Telefon*" value={kupac.telefon} onChange={handleChange} required className="border p-2 rounded w-full" />
          </div>
          <input name="adresa" placeholder="Adresa*" value={kupac.adresa} onChange={handleChange} required className="border p-2 rounded w-full" />
          <div className="grid grid-cols-2 gap-4">
            <input name="postanskiBroj" placeholder="Poštanski broj*" value={kupac.postanskiBroj} onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="mesto" placeholder="Mesto*" value={kupac.mesto} onChange={handleChange} required className="border p-2 rounded w-full" />
          </div>
        </form>

        {/* Dugmad */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => router.push('/korpa')}
          >
            Nazad na korpu
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            form="forma-kupac"
            type="submit"
          >
            Završi plaćanje
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacanjeClient;
