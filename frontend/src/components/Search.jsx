import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import { toast } from "react-toastify";

const Search = () => {
  const { proizvodi, backURL } = useStateContext()
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (query.length > 0) {
      navigate(`/proizvodi?query=${encodeURIComponent(query)}`);
    }
  };
  const promeniSearch = (e) => {
    setQuery(e.target.value)
    console.log(filteredProducts)
  }

  const dodajUKorpu = (proizvod) => {
    if (proizvod.kolicina + 1 <= proizvod.stanje) {
      setNewOrder((prevOrder) => {
        const existingProductIndex = prevOrder.proizvodi.findIndex((p) => p.id === proizvod.id);

        let updatedProizvodi;
        if (existingProductIndex !== -1) {
          // Proizvod već postoji, povećaj količinu
          updatedProizvodi = [...prevOrder.proizvodi];
          updatedProizvodi[existingProductIndex].kolicina += 1;
        } else {
          // Proizvod ne postoji, dodaj ga sa kolicinom 1
          updatedProizvodi = [...prevOrder.proizvodi, { ...proizvod, kolicina: 1 }];

        }
        toast.success("Proizvod dodat u korpu!");
        return { ...prevOrder, proizvodi: updatedProizvodi };
      })
    }else{
      toast.warning("Moras da dodas proizvod kog ima dovoljno na stanju")
    }
  }


  const filteredProducts =
    query.length >= 3
      ? proizvodi.filter((product) =>
        // Filtriranje po nazivima, kategoriji i opisu
        product.naziv.toLowerCase().startsWith(query.toLowerCase()) ||
        product.kategorija.toLowerCase().includes(query.toLowerCase()) ||
        product.opis.toLowerCase().includes(query.toLowerCase())
      )
      : [];

  return (
    <div className="relative lg:w-[300px] max-w-md mx-auto">
      <input
        type="text"
        id="Search"
        placeholder="Pretraži..."
        className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
        value={query}
        onChange={(e) => promeniSearch(e)}
        onSubmit={handleSearch}
      />
      <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
        <button type="button" className="text-white" onClick={handleSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>

      {filteredProducts.length > 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center p-3 hover:bg-gray-100"
            >
              {/* Popravka za prikaz slike */}
              <img
                src={product.slike[0]?.urlSlika ? `${backURL}${product.slike[0].urlSlika}` : '/path/to/default-image.jpg'} // Podrazumevana slika ako nema slike
                alt={product.naziv}
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{product.naziv}</p>
                <p className="text-xs text-gray-500">{product.kategorija}</p>
              </div>
              <div className="ml-auto space-x-2">
                <Link to={`/proizvod/${product.id}`} className="rounded px-3 py-1 text-xs text-black hover:text-gray-600">
                  Još...
                </Link>
                <button onClick={() => dodajUKorpu(product)} className="rounded bg-orange-500 px-3 py-1 text-xs text-white hover:bg-orange-700">
                  Dodaj u korpu
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
