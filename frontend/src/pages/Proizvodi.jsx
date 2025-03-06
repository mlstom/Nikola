import React, { useState } from 'react'
import ProizvodCard from '../components/ProizvodCard'
import Search from "../components/Search"
import { useStateContext } from '../context/StateContext'
const Proizvodi = () => {
  const { proizvodi } = useStateContext()
  const [showMobileSort, setShowMobileSort] = useState(false);
  const [selectedSort, setSelectedSort] = useState(""); // Držimo sort opciju
  const [selectedCategories, setSelectedCategories] = useState([]); // Filter kategorije
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const kategorije = [
    { id: "Traktori", naziv: "Traktori" },
    { id: "Trimeri", naziv: "Trimeri" },
    { id: "Rasveta", naziv: "Rasveta" },
    { id: "Alati", naziv: "Alati" },
    { id: "Stolice", naziv: "Stolice" },
    { id: "Ostalo", naziv: "Ostalo" },
  ];

  const sortirajProizvode = (proizvodi) => {
    if (selectedSort === "priceAsc") {
      return [...proizvodi].sort((a, b) => a.cena - b.cena);
    } else if (selectedSort === "priceDesc") {
      return [...proizvodi].sort((a, b) => b.cena - a.cena);
    } else if (selectedSort === "latest") {
      return proizvodi;
    }
    return proizvodi;
  };

  // Funkcija za filtriranje proizvoda
  const filtrirajProizvode = (proizvodi) => {
    return proizvodi.filter((proizvod) => {
      const isInCategory =
        selectedCategories.length === 0 || selectedCategories.includes(proizvod.kategorija);
      const isInPriceRange =
        (!priceRange.min || proizvod.cena >= parseInt(priceRange.min)) &&
        (!priceRange.max || proizvod.cena <= parseInt(priceRange.max));

      return isInCategory && isInPriceRange;
    });
  };

  // Ažuriraj listu proizvoda posle filtriranja i sortiranja
  const prikazaniProizvodi = sortirajProizvode(filtrirajProizvode(proizvodi));

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Proizvodi</h2>

          <p className="mt-4 max-w-md text-gray-500">
            Svi nasi proizvodi na jednom mestu
          </p>
        </header>

        <div className="mt-8 block lg:hidden">
          <button
            onClick={() => setShowMobileSort(!showMobileSort)}
            className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
          >
            <span className="text-sm font-medium">Filteri i sortiranje</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`size-4 transition ${showMobileSort ? "rotate-90" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Mobilni dropdown sortiranja */}
          {showMobileSort && (
            <div className="mt-4 bg-white p-4 shadow-md rounded-md">
              <label htmlFor="SortByMobile" className="block text-xs font-medium text-gray-700">
                Sortiraj
              </label>
              <select
                id="SortByMobile"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="mt-1 w-full border rounded-sm border-gray-300 text-sm"
              >
                <option>Izaberi raspored</option>
                <option value="latest">Najnovije prvo</option>
                <option value="priceDesc">Cena opadajuća</option>
                <option value="priceAsc">Cena rastuća</option>
              </select>
              <details
                className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden mt-2"
              >
                <summary
                  className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                >
                  <span className="text-sm font-medium"> Cena </span>

                  <span className="transition group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">

                    <button onClick={()=>setPriceRange({ min: "", max: "" })} type="button" className="text-sm text-gray-900 underline underline-offset-4">
                      Reset
                    </button>
                  </header>

                  <div className="border-t border-gray-200 p-4">
                    <div className="flex justify-between gap-4">
                      <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                        <input
                          type="number"
                          id="FilterPriceFrom"
                          placeholder="Od"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                          className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                        />
                        <span className="text-sm text-gray-600">RSD</span>
                      </label>

                      <label htmlFor="FilterPriceTo" className="flex items-center gap-2">


                        <input
                          type="number"
                          id="FilterPriceTo"
                          placeholder="Do"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                          className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                        />
                        <span className="text-sm text-gray-600">RSD</span>
                      </label>
                    </div>
                  </div>
                </div>

              </details>

              <details
                className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden mt-2"
              >
                <summary
                  className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                >
                  <span className="text-sm font-medium"> Kategorija </span>

                  <span className="transition group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-gray-200 bg-white">
                  <header className="flex items-center justify-between p-4">
                    

                    <button onClick={()=>setSelectedCategories([])} type="button" className="text-sm text-gray-900 underline underline-offset-4">
                      Reset
                    </button>
                  </header>

                  <ul className="space-y-1 border-t border-gray-200 p-4">
                    {kategorije.map((kategorija) => (
                      <li key={kategorija.id}>
                        <label htmlFor={kategorija.id} className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={kategorija.id}
                            checked={selectedCategories.includes(kategorija.id)}
                            onChange={() => {
                              if (selectedCategories.includes(kategorija.id)) {
                                setSelectedCategories(selectedCategories.filter((id) => id !== kategorija.id));
                              } else {
                                setSelectedCategories([...selectedCategories, kategorija.id]);
                              }
                            }}
                            className="size-5 rounded-sm border-gray-300"
                          />
                          <span className="text-sm font-medium text-gray-700">{kategorija.naziv}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>

          )}
        </div>
        <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="hidden space-y-4 lg:block">
            <div>
              <label htmlFor="SortBy" className="block text-xs font-medium text-gray-700"> Sortiraj </label>

              <select id="SortBy" className="mt-1 border-1 rounded-sm border-gray-300 text-sm"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option>Izaberi raspored</option>
                <option value="Title, DESC">Najnovije prvo</option>
                <option value="Title, ASC">Cena opadajuća</option>
                <option value="Price, DESC">Cena rastuća</option>
                <option value="Price, ASC">Preporučeno prvo</option>
              </select>
            </div>

            <div>
              <p className="block text-xs font-medium text-gray-700">Filteri</p>

              <div className="mt-1 space-y-2">
                
                <details
                  className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                  >
                    <span className="text-sm font-medium"> Cena </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">

                      <button onClick={()=>setPriceRange({min:'',max:''})} type="button" className="text-sm text-gray-900 underline underline-offset-4">
                        Reset
                      </button>
                    </header>

                    <div className="border-t border-gray-200 p-4">
                      <div className="flex justify-between gap-4">
                        <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">


                          <input
                            type="number"
                            id="FilterPriceFrom"
                            placeholder="Od"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                            className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                          />
                          <span className="text-sm text-gray-600">RSD</span>
                        </label>

                        <label htmlFor="FilterPriceTo" className="flex items-center gap-2">


                          <input
                            type="number"
                            id="FilterPriceTo"
                            placeholder="Do"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                            className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                          />
                          <span className="text-sm text-gray-600">RSD</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </details>

                <details
                  className="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                  >
                    <span className="text-sm font-medium"> Kategorija </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div className="border-t border-gray-200 bg-white">
                    <header className="flex items-center justify-between p-4">

                      <button onClick={()=>setSelectedCategories([])} type="button" className="text-sm text-gray-900 underline underline-offset-4">
                        Reset
                      </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      {kategorije.map((kategorija) => (
                        <li key={kategorija.id}>
                          <label htmlFor={kategorija.id} className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={kategorija.id}
                              checked={selectedCategories.includes(kategorija.id)}
                              onChange={() => {
                                if (selectedCategories.includes(kategorija.id)) {
                                  setSelectedCategories(selectedCategories.filter((id) => id !== kategorija.id));
                                } else {
                                  setSelectedCategories([...selectedCategories, kategorija.id]);
                                }
                              }}
                              className="size-5 rounded-sm border-gray-300"
                            />
                            <span className="text-sm font-medium text-gray-700">{kategorija.naziv}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {prikazaniProizvodi.length > 0 ? (
                prikazaniProizvodi.map((proizvod) => <ProizvodCard key={proizvod.id} proizvod={proizvod} />)
              ) : (
                <p className="text-gray-500">Nema proizvoda koji odgovaraju filterima.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Proizvodi