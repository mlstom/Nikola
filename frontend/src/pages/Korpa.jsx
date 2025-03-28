import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/StateContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Korpa = () => {
  const { newOrder, setNewOrder, backURL } = useStateContext();
  const [modelKupon, setmodelKupon] = useState(false);
  const [inputData, setinputData] = useState('');
  const [kupons, setKupons] = useState([]);
  const [postarina, setPostarina] = useState(450);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [kuponIskoristen, setKuponIskoristen] = useState(false);
  const [popust, setPopust] = useState(0); // Popust u procentima

  // Brisanje proizvoda iz korpe
  const handleRemove = (id) => {
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      proizvodi: prevOrder.proizvodi.filter((p) => p.id !== id),
    }));
  };

  // Dohvatanje kupona sa servera
  async function getKupons() {
    const { data } = await axios.get(`${backURL}/api/kupon`);
    setKupons(data);
  }

  // Dohvatanje slika proizvoda i dodavanje u state
  const fetchSlike = async (id) => {
    try {
      const { data } = await axios.get(`${backURL}/api/proizvodSlika/proizvod/${id}`);
      setNewOrder((prevOrder) => ({
        ...prevOrder,
        proizvodi: prevOrder.proizvodi.map((p) =>
          p.id === id ? { ...p, slike: data } : p
        ),
      }));
    } catch (error) {
      console.error('Greška prilikom dohvatanja slika:', error);
    }
  };

  // Izračunavanje poštarine u zavisnosti od težine proizvoda
  useEffect(() => {
    let ukupnaTezina = 0;
    newOrder.proizvodi.forEach((proizvod) => {
      ukupnaTezina += proizvod.tezina;
    });

    if (ukupnaTezina >= 0.25 && ukupnaTezina < 2) setPostarina(450);
    else if (ukupnaTezina >= 2 && ukupnaTezina < 5) setPostarina(600);
    else if (ukupnaTezina >= 5 && ukupnaTezina < 10) setPostarina(720);
    else if (ukupnaTezina >= 10 && ukupnaTezina < 15) setPostarina(850);
    else if (ukupnaTezina >= 15 && ukupnaTezina < 20) setPostarina(980);
    else if (ukupnaTezina >= 20 && ukupnaTezina < 30) setPostarina(1350);
    else if (ukupnaTezina >= 30 && ukupnaTezina < 50) setPostarina(1780);
  }, [newOrder]);

  // Izračunavanje ukupne cene
  useEffect(() => {
    const pomSubtotal = newOrder.proizvodi.reduce((sum, p) => sum + p.kolicina * p.cena, 0);
    setSubtotal(pomSubtotal);
    setTotal(pomSubtotal + postarina);
    newOrder.proizvodi.forEach((p) => {
      if (!p.slike || p.slike.length === 0) {
        fetchSlike(p.id);
      }
    });
    getKupons();
  }, [newOrder, postarina]);

  // Promena količine proizvoda
  const handleQuantityChange = (id, novaKolicina) => {
    const proizvodStanje = newOrder.proizvodi.find((prev) => prev.id === id).stanje;
    if (novaKolicina <= proizvodStanje) {
      setNewOrder((prevOrder) => ({
        ...prevOrder,
        proizvodi: prevOrder.proizvodi.map((p) =>
          p.id === id ? { ...p, kolicina: novaKolicina } : p
        ),
      }));
    } else {
      toast.warning("Ne mozes dodati vise od stanja proizvoda");
    }
  };

  // Potvrda kupona
  const handleKuponPotvrda = () => {
    let validKupon = false;
    kupons.forEach((kupon) => {
      if (kupon.kod === inputData) {
        validKupon = true;
        setPopust(kupon.popust);
      }
    });

    if (validKupon) {
      toast.success("Uspešno ste iskoristili kupon!");
      setKuponIskoristen(true);
    } else {
      toast.warning("Kupon je nepostojeći!");
    }
    setmodelKupon(false);
  };

  // Ažuriranje ukupne cene sa popustom
  useEffect(() => {
    if (kuponIskoristen) {
      const noviTotal = total * (100 - popust) / 100;
      setTotal(noviTotal);
    }
  }, [kuponIskoristen]);

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Tvoja korpa</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {newOrder.proizvodi.map((proizvod) => (
                <li key={proizvod.id} className="flex items-center gap-4">
                  <img
                    src={proizvod.slike?.[0]?.urlSlika ? `${backURL}${proizvod.slike[0].urlSlika}` : '/placeholder.jpg'}
                    alt={proizvod.naziv}
                    className="size-16 rounded-sm object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">{proizvod.naziv}</h3>
                    <dl className="mt-0.5 text-xs text-gray-600">
                      <div>
                        <dt className="inline">Kategorija:</dt>
                        <dd className="inline">{proizvod.kategorija}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <input
                      type="number"
                      min="0"
                      value={isNaN(proizvod.kolicina) || proizvod.kolicina < 1 ? 0 : proizvod.kolicina}
                      onChange={(e) => {
                        let novaKolicina = parseInt(e.target.value);
                        if (isNaN(novaKolicina)) novaKolicina = 0; // Sprečavamo NaN i negativne vrednosti
                        handleQuantityChange(proizvod.id, novaKolicina);
                      }}
                      className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
                    />
                    <button
                      onClick={() => handleRemove(proizvod.id)}
                      className="text-gray-600 transition hover:text-red-600 hover:scale-90"
                    >
                      <span className="sr-only">Remove item</span>
                      ❌
                    </button>
                    <p>Cena: {proizvod.cena * proizvod.kolicina}</p>
                  </div>
                </li>
              ))}
            </ul>

            {newOrder.proizvodi.length > 0 ? (
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Cena:</dt>
                      <dd>{subtotal.toFixed(2)} RSD</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Poštarina:</dt>
                      <dd>{postarina.toFixed(2)} RSD</dd>
                    </div>
                    <button
                      onClick={() => setmodelKupon(!modelKupon)}
                      className="flex items-center mt-4 px-3 py-2 bg-orange-500 text-white text-sm uppercase font-medium rounded hover:bg-orange-700"
                    >
                      <span>Dodatni popust?</span>
                      <svg
                        className="h-5 w-5 mx-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    {modelKupon && !kuponIskoristen && (
                      <div>
                        <input
                          type="text"
                          className="h-[50px] px-5"
                          name="kupon"
                          value={inputData}
                          onChange={(e) => setinputData(e.target.value)}
                          placeholder="Kupon"
                        />
                        <button
                          onClick={handleKuponPotvrda}
                          className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-700"
                        >
                          Potvrdi
                        </button>
                      </div>
                    )}

                    {kuponIskoristen && (
                      <div className="text-green-600">
                        <p>Kod: {inputData}, Popust: {popust} %, Samo jedan kod za popust može biti iskorišćen</p>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-medium">
                      <dt>Ukupno:</dt>
                      <dd>{total.toFixed(2)} RSD</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end gap-4">
                    <Link
                      to={-1}
                      className="block rounded-sm bg-black px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-700"
                      
                    >
                      Nazad
                    </Link>
                    <Link
                      to="/narudzbina"
                      className="block rounded-sm bg-orange-500 px-5 py-3 text-sm text-gray-100 transition hover:bg-orange-700"
                      onClick={()=>setNewOrder({...newOrder,cena:total,postarina:postarina})}
                    >
                      Plaćanje
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center">Vaša korpa je prazna.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Korpa;
