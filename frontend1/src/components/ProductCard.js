'use client'

import { useStateContext } from "@/app/context/StateContext";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const ProizvodCard = ({ proizvod }) => {

  const {addToCart}= useStateContext()
  const dodajUKorpu = () => {
 
    addToCart(proizvod);
    
    toast.success(`${proizvod.naziv} je dodat u korpu!`, {
      position: "top-right",
      autoClose: 3000, // zatvara se posle 3s
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm ">
      {/* Slika */}
      {proizvod.slike?.length > 0 ? (
        <Image
          src={`/${proizvod.slike[proizvod.slike.length-1].urlSlika}`}
          width={200}
          height={200}
          alt={proizvod.naziv}
          unoptimized
          className="h-64 w-full object-contain bg-white p-2"
        />
      ) : (
        <div className="h-64 w-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Nema slike</span>
        </div>
      )}

      {/* Sadržaj */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <p className="text-gray-700 font-semibold">{proizvod.cena} RSD</p>

          <h3 className="mt-1 text-lg font-medium text-gray-900">
            {proizvod.naziv}
          </h3>

          <p className="text-sm text-gray-600 mt-1">{proizvod.kategorija}</p>

          <p className="mt-2 text-gray-700 text-sm line-clamp-3">
            {proizvod.opis.length > 30
              ? `${proizvod.opis.substring(0, 30)}...`
              : proizvod.opis}
          </p>
        </div>

        {/* Dugmad */}
        <div className="mt-4 flex gap-2">
          <Link
            href={`/home/proizvod/${proizvod.id}`}
            className="w-1/2 rounded bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-orange-500 hover:bg-gray-200"
          >
            Vidi više
          </Link>

          <button
            type="button"
            onClick={dodajUKorpu}
            className="w-1/2 rounded bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Kupi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProizvodCard;
