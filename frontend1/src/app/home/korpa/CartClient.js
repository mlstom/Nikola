"use client";
import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "@/app/context/StateContext";
import { useState, useEffect } from "react";

export default function CartClient({ kuponi }) {
  const [kupon, setKupon] = useState("");
  const [kuponValidan, setKuponValidan] = useState(false);
  const [procenatPopusta, setProcenatPopusta] = useState(0);
  const [zakljucanInput, setZakljucanInput] = useState(false);
  const { cart, addToCart, decreaseFromCart, removeFromCart , izracunajPostarinu} = useStateContext();

  const proveriKupon = () => {
    const nadjen = kuponi.find(k => k.kod.toLowerCase() === kupon.toLowerCase().trim());
    if (nadjen) {
      setProcenatPopusta(nadjen.popust);
      setKuponValidan(true);
      setZakljucanInput(true);
    } else {
      setProcenatPopusta(0);
      setKuponValidan(false);
      setZakljucanInput(false);
    }
  };



  if (!cart || cart.proizvodi.length === 0) {
    return (<div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4">
      <p className="text-gray-600 text-lg font-medium text-center">
        Korpa je prazna.
      </p>
      <Link
        href="/"
        className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition"
      >
        Vrati se na početnu
      </Link>
    </div>
    );
  }

  const ukupno = cart.proizvodi.reduce(
    (sum, p) => sum + p.cena * p.kolicina,
    0
  );

  const iznosPopusta = ukupno * (procenatPopusta / 100);
  const ukupnoSaPopustom = ukupno - iznosPopusta;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Korpa #{cart.brojKorpe}</h2>
      <ul className="divide-y divide-gray-200">
        {cart.proizvodi.map((p, index) => (
          <li key={index} className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4 py-6 border-b border-gray-200">
            {/* Leva strana: Slika + Naziv */}
            <div className="flex gap-4 w-full md:w-2/3">

              {p.slike[0] ? (
                <div className="relative w-20 h-20 rounded border border-gray-300 p-1 bg-white shrink-0">

                  <Image
                    src={`https://alatinidza.rs/${p.slike[p.slike.length - 1].urlSlika}`}
                    alt={p.naziv}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center text-gray-400">
                  Nema slike
                </div>
              )}
              <div className="flex flex-col justify-between">
                <p className="font-medium text-gray-900 break-words">{p.naziv}</p>
                <p className="text-sm text-gray-600">
                  {p.cena.toLocaleString("sr-RS")} RSD × {p.kolicina}
                </p>
              </div>
            </div>

            {/* Sredina: Brojač */}
            <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseFromCart(p)}
                  className="rounded hover:cursor-pointer border border-gray-300 px-3 py-1 hover:bg-gray-100 transition"
                >
                  −
                </button>
                <p className="min-w-[24px] text-center">{p.kolicina}</p>
                <button
                  onClick={() => addToCart(p)}
                  className="rounded hover:cursor-pointer border border-gray-300 px-3 py-1 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Desna strana: Cena + kanta */}
            <div className="flex flex-col justify-between items-end w-full md:w-auto">
              <span className="font-semibold text-gray-900 text-right">
                {(p.cena * p.kolicina).toLocaleString("sr-RS")} RSD
              </span>
              <button
                onClick={() => removeFromCart(p.id)}
                className="mt-2 text-red-600 hover:text-red-800 transition text-2xl cursor-pointer"
                title="Ukloni iz korpe"
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-gray-300 pt-4 space-y-4">
        <div className="flex justify-between items-center font-semibold text-lg">
          <span>Cena Korpe:</span>
          <span>{ukupno.toLocaleString("sr-RS")} RSD</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unesi kupon za popust:</label>
          <input
            type="text"
            value={kupon}
            onChange={(e) => setKupon(e.target.value)}
            onBlur={proveriKupon}
            onKeyDown={(e) => {
              if (e.key === "Enter") proveriKupon();
            }}
            disabled={zakljucanInput}
            className={`w-full p-2 border rounded transition ${zakljucanInput
              ? "bg-green-100 border-green-500 text-green-700"
              : kupon
                ? "border-gray-400 bg-white"
                : "bg-gray-100 text-gray-500"
              }`}
            placeholder="Unesi kupon (ENTER za potrvdu)"
          />
          {kuponValidan && (
            <p className="text-green-600 text-sm mt-1">
              ✅ Kupon primenjen! Popust {procenatPopusta}%.
            </p>
          )}
          {!kuponValidan && kupon && !zakljucanInput && (
            <p className="text-red-500 text-sm mt-1">❌ Kupon nije validan.</p>
          )}
        </div>

        {kuponValidan && (
          <div className="flex justify-between items-center text-lg font-semibold text-green-700">
            <span>Ukupno sa popustom:</span>
            <span>{ukupnoSaPopustom.toLocaleString("sr-RS")} RSD</span>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between items-center text-lg font-semibold">
        <span>Postarina: </span>
        <span>{izracunajPostarinu()} RSD</span>
      </div>

      <div className="flex justify-between items-center text-xl font-bold border-t border-gray-300 pt-4 mt-4">
        <span>Ukupno za uplatu:</span>
        <span>
          {(kuponValidan ? ukupnoSaPopustom : ukupno + 0).toLocaleString("sr-RS", {
            minimumFractionDigits: 0,
          })} + {izracunajPostarinu()} = {((kuponValidan ? ukupnoSaPopustom : ukupno) + izracunajPostarinu()).toLocaleString("sr-RS")} RSD
        </span>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          href="/home/proizvodi"
          className="flex-grow items-center text-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Nazad
        </Link>
        <Link
          href={kuponValidan ? `/home/placanje?popust=${kupon}` : "/home/placanje"}
          className="flex-grow items-center text-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Plaćanje
        </Link>
      </div>
    </div>
  );
}
