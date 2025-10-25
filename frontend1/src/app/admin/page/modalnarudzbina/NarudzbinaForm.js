'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '@/components/Loader';
import { Plus, X } from 'lucide-react';

export default function NarudzbinaForm({ narudzbina }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [proizvodi, setProizvodi] = useState([]);

  function generateUniqueCode(prefix) {
    const timestamp = Date.now();
    return `${prefix}-${timestamp}`;
  }
  // Fetch all proizvodi for search
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://alatinidza.rs/api/proizvod', { cache: 'no-store' });
        const data = await res.json();
        setProizvodi(data);
      } catch (err) {

      }
    })();
    const randomKorpa = generateUniqueCode("KORPA")
    const randomPosiljka = generateUniqueCode("POSILJKA")
    setForm((f) => ({ ...f, brojKorpe: randomKorpa }))
    setForm((f) => ({ ...f, brojPosiljke: randomPosiljka }))
  }, []);

  const [form, setForm] = useState({
    brojKorpe: narudzbina?.brojKorpe || '',
    brojPosiljke: narudzbina?.brojPosiljke || '',
    poslato: narudzbina?.poslato || false,
    postarina: narudzbina?.postarina || 0,
    popust: narudzbina?.popust || 0,
    korpa: narudzbina?.proizvodi.map(p => ({ proizvod: { id: p.id, sifra: p.sifra, naziv: p.naziv, cena: p.cena, kolicina: p.kolicina }, kolicina: p.kolicina })) || [],
    kupac: narudzbina?.kupac || { ime: '', prezime: '', email: '', telefon: '', adresa: '', mesto: '', postanskiBroj: '' },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleKupacChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, kupac: { ...f.kupac, [name]: value } }));
  };

  const handleAddStavka = (art) => {
    setForm((f) => {
      const exists = f.korpa.find(i => i.proizvod.id === art.id);
      if (exists) return f;
      return { ...f, korpa: [...f.korpa, { proizvod: { id: art.id, sifra: art.sifra, naziv: art.naziv, cena: art.cena }, kolicina: 1 }] };
    });
  };

  const handleKolicina = (idx, delta) => {
    setForm((f) => {
      const k = [...f.korpa];
      k[idx].kolicina = Math.min(20, Math.max(1, k[idx].kolicina + delta));
      return { ...f, korpa: k };
    });
  };

  const handleRemove = (idx, delta) => {
    setForm((f) => {
      const k = [...f.korpa];
      k[idx].kolicina = k[idx].kolicina - delta;
      if (k[idx].kolicina <= 0) k.splice(idx, 1);
      return { ...f, korpa: k };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (narudzbina?.id) {
        console.log("➡️ PUT kupac");
    await axios.put(`https://alatinidza.rs/api/kupac/${narudzbina.kupac.id}`, form.kupac);
    console.log("✅ PUT kupac OK");

    console.log("➡️ DELETE korpa");
    await axios.delete(`https://alatinidza.rs/api/korpa?brojKorpe=${form.brojKorpe}`);
    console.log("✅ DELETE korpa OK");

    for (const { proizvod, kolicina } of form.korpa) {
      console.log("➡️ POST korpa za", proizvod.id);
      await axios.post('https://alatinidza.rs/api/korpa', {
        brojKorpe: form.brojKorpe,
        idProizvod: proizvod.id,
        kolicina,
      });
      console.log("✅ POST korpa OK za", proizvod.id);
    }

    console.log("➡️ PUT narudzbina");
    await axios.put(`https://alatinidza.rs/api/narudzbina/${narudzbina.id}`, {
      brojKorpe: form.brojKorpe,
      brojPosiljke: form.brojPosiljke,
      poslato: form.poslato ? 1 : 0,
      cena: form.korpa.reduce((s, { proizvod, kolicina }) => s + proizvod.cena * kolicina, 0),
      postarina: form.postarina,
      popust: form.popust,
    });
    console.log("✅ PUT narudzbina OK");

    console.log("🎉 STIGAO SI DO KRAJA");
      }
      else {
        const resKupac = await axios.post('https://alatinidza.rs/api/kupac', form.kupac)
        const idKupac = resKupac.data.id
        for (const { proizvod, kolicina } of form.korpa) {
          await axios.post('https://alatinidza.rs/api/korpa', { brojKorpe: form.brojKorpe, idProizvod: proizvod.id, kolicina })
        }
        const ukupnaPrePopusta = form.korpa.reduce(
          (sum, { proizvod, kolicina }) => sum + proizvod.cena * kolicina,
          0
        );


        await axios.post('https://alatinidza.rs/api/narudzbina', {
          brojKorpe: form.brojKorpe,
          idKupac: idKupac,
          brojPosiljke: form.brojPosiljke,
          poslato: form.poslato ? 1 : 0,
          cena: ukupnaPrePopusta,
          postarina: form.postarina,
          popust: form.popust,
        })
      };

      const orderForEmail = {
        id: form.brojPosiljke,                 // ili pravi ID narudžbine iz baze
        date: new Date().toISOString(),
        customer: {
          name: `${form.kupac.ime} ${form.kupac.prezime}`,
          email: form.kupac.email,
        },
        items: form.korpa.proizvodi.map(p => ({
          name: p.naziv,
          quantity: p.kolicina,
          price: p.cena,
        })),
        cartTotal: ukupnaPrePopusta,
        shipping: narudzbina?.postarina || 500,
        discount: popust ? popust.popust : 0,
        amountDue: (ukupnaPrePopusta + narudzbina?.postarina || 500) - (popust ? Math.round(ukupnaPrePopusta * (popust.popust / 100)) : 0),
      };


      await axios.post('https://alatinidza.rs/api/send-email', {
        to: kupac.email,
        subject: `Potvrda narudžbine #${orderForEmail.id}`,
        html: generateOrderEmail(orderForEmail),
      });

      router.push('/admin/page/narudzbine');
      router.refresh();
    } catch (err) {
      console.error(" Detalji greške:", err);
      console.error(" Odgovor servera:", err.response?.data);
      console.error(" Status:", err.response?.status);
    } finally { setLoading(false); }
  };

  if (loading) return <Loader />;

  const filtered = proizvodi.filter(a =>
    a.sifra.includes(searchTerm) || a.naziv.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const originalTotal = form.korpa.reduce(
    (sum, { proizvod, kolicina }) => sum + proizvod.cena * kolicina,
    0
  );
  const discountAmount = Math.round(originalTotal * (form.popust / 100));
  const finalTotal = originalTotal - discountAmount + Number(form.postarina);


  return (
    <div className="max-w-3xl min-w-[250px] overflow-x-scroll p-6 bg-white rounded shadow">
      <button
        type="button"
        onClick={() => router.push('/admin/page/narudzbine')}
        className="mb-4 text-4xl text-orange-600 hover:text-orange-700 hover:cursor-pointer "
      >
        ←
      </button>
      <h1 className="text-2xl font-bold mb-4">
        {narudzbina ? `Uredi narudžbinu ${narudzbina.id}` : 'Nova narudžbina'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="text-orange-600">Broj pošiljke
            <input name="brojPosiljke" value={form.brojPosiljke} onChange={handleChange}
              className="border px-3 py-2 rounded w-full" required />
          </label>
        </div>
        <label className="flex items-center gap-2 text-orange-600">
          <input type="checkbox" name="poslato" checked={form.poslato} onChange={handleChange} className="h-4 w-4" /> Poslato
        </label>
        <fieldset className="border p-4 rounded">
          <legend className="text-orange-600 font-semibold">Podaci kupca</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {['ime', 'prezime', 'email', 'telefon', 'adresa', 'postanskiBroj', 'mesto'].map(field => (
              <label key={field} className="block">
                <span className="text-orange-600 capitalize">{field === 'postanskiBroj' ? 'Poštanski broj' : field}</span>
                <input name={field} value={form.kupac[field]} onChange={handleKupacChange}
                  className="border px-3 py-2 rounded w-full mt-1" />
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-orange-600">Popust %
            <input name="popust" type="number" value={form.popust} onChange={handleChange}
              className="border px-3 py-2 rounded w-full" />
          </label>
          <label className="text-orange-600">Poštarina
            <input name="postarina" type="number" value={form.postarina} onChange={handleChange}
              className="border px-3 py-2 rounded w-full" />
          </label>
        </div>
        <div className="border-t pt-4 space-y-1 text-right">
          <p>Ukupna cena artikala: <strong>{originalTotal} RSD</strong></p>
          <p>Vrednost popusta: <strong>-{discountAmount} RSD</strong></p>
          <p>Poštarina: <strong>+{form.postarina} RSD</strong></p>
          <p className="text-lg font-semibold">Za uplatu: {finalTotal} RSD</p>
        </div>
        <fieldset className="border p-4 rounded min-h-[200px]">
          <legend className="text-orange-600 font-semibold">Stavke u korpi</legend>
          <div className="space-y-2 mt-2">
            {form.korpa.map(({ proizvod, kolicina }, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{proizvod.naziv}</p>
                  <p className="text-sm text-gray-600">{proizvod.sifra} × {kolicina} × {proizvod.cena} RSD</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button type="button" onClick={() => handleRemove(idx, 1)} className="p-1 bg-red-200 rounded"><X size={16} /></button>
                  <span className="px-2">{kolicina}</span>
                  <button type="button" onClick={() => handleKolicina(idx, 1)} className="p-1 bg-green-200 rounded"><Plus size={16} /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setShowSearch(s => !s)} className="mt-2 flex items-center gap-1 text-blue-600 hover:underline">
              <Plus size={16} /> Dodaj stavku
            </button>
            {showSearch && (
              <div className="mt-2">
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Pretraži artikle..." className="border px-3 py-2 rounded w-full" />
                <div className="mt-2 max-h-40 overflow-y-auto border rounded">
                  {filtered.map(a => (
                    <div key={a.id} className="flex justify-between p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAddStavka(a)}>
                      <div>{a.sifra} - {a.naziv}</div>
                      <Plus size={16} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </fieldset>
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-700">
          Sačuvaj narudžbinu
        </button>
      </form>
    </div>
  );
}
