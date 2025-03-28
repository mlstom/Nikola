import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";

const CartModal = () => {
  const{newOrder,setNewOrder,backURL} = useStateContext()

  return (
    <div
      className="relative w-screen max-w-sm border  border-gray-600 bg-white px-4 py-8 sm:px-4  lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <h1>Proizvodi u korpi</h1>
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {newOrder.proizvodi.map((item, index) => (
            <li key={index} className="flex items-center gap-4">
              <img
                src={`${backURL}${item.slike[0]?.urlSlika}`}
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
            <dd>{newOrder.cena-newOrder.postarina}RSD</dd>
          </div>
          <div className="flex justify-between">
            <dt>Poštarina:</dt>
            <dd>{newOrder.postarina}RSD</dd>
          </div>
          <div className="flex justify-between text-base font-medium">
            <dt>Ukupno:</dt>
            <dd>{newOrder.cena}RSD</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default CartModal;
