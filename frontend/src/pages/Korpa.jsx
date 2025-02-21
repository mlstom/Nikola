import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Korpa = () => {
  const [proizvodi, setProizvodi] = useState([
    {
      id: 1,
      naziv: 'Basic Tee 6-Pack',
      slika: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
      kategorija: 'XXS',
      kolicina: 1,
      cena: 50,
    },
    {
      id: 2,
      naziv: 'Premium Hoodie',
      slika: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
      kategorija: 'M',
      kolicina: 1,
      cena: 80,
    },
  ]);

  const handleRemove = (id) => {
    setProizvodi(proizvodi.filter((proizvod) => proizvod.id !== id));
  };

  const handleQuantityChange = (id, novaKolicina) => {
    setProizvodi(
      proizvodi.map((proizvod) =>
        proizvod.id === id ? { ...proizvod, kolicina: novaKolicina } : proizvod
      )
    );
  };

  const subtotal = proizvodi.reduce((sum, p) => sum + p.kolicina * p.cena, 0);
  const vat = subtotal * 0.1;
  const discount = 20;
  const total = subtotal + vat - discount;

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Tvoja korpa</h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {proizvodi.map((proizvod) => (
                <li key={proizvod.id} className="flex items-center gap-4">
                  <img
                    src={proizvod.slika}
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
                      min="1"
                      value={proizvod.kolicina}
                      onChange={(e) => handleQuantityChange(proizvod.id, parseInt(e.target.value))}
                      className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
                    />
                    <button
                      onClick={() => handleRemove(proizvod.id)}
                      className="text-gray-600 transition hover:text-red-600 hover:scale-90"
                    >
                      <span className="sr-only">Remove item</span>
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Cena:</dt>
                    <dd>£{subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Poštarina</dt>
                    <dd>£{vat.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Popust</dt>
                    <dd>-£{discount.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between text-base font-medium">
                    <dt>Ukupno</dt>
                    <dd>£{total.toFixed(2)}</dd>
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
                  >
                    Plaćanje
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Korpa;
