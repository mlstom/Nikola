import React, { useState } from "react";

const CartModal = () => {
  const [items, setItems] = useState([
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
  return (
    <div
      className="relative w-screen max-w-sm border  border-gray-600 bg-white px-4 py-8 sm:px-4 flex flex-wrap items-center lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <h1>Proizvodi u korpi</h1>
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-4">
              <img
                src={item.slika}
                alt={item.naziv}
                className="size-16 rounded-sm object-cover"
              />
              <div>
                <h3 className="text-sm text-gray-900">{item.naziv}</h3>
                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Kategorija:</dt>
                    <dd className="inline">{item.kategorija}</dd>
                  </div>
                </dl>
                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Količina:</dt>
                    <dd className="inline">{item.kolicina}</dd>
                  </div>
                </dl>
              </div>

            </li>
          ))}
        </ul>
        <dl className="text-sm text-gray-700">
          <div className="flex justify-between">
            <dt>Cena:</dt>
            <dd>£123</dd>
          </div>
          <div className="flex justify-between">
            <dt>Poštarina</dt>
            <dd>£123</dd>
          </div>
          <div className="flex justify-between">
            <dt>Popust</dt>
            <dd>-£123</dd>
          </div>
          <div className="flex justify-between text-base font-medium">
            <dt>Ukupno</dt>
            <dd>£123</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default CartModal;
