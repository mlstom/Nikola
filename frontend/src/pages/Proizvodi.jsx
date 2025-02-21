import React, { useState } from 'react'
import ProizvodCard from '../components/ProizvodCard'
import Search from "../components/Search"
const Proizvodi = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [showMobileSort, setShowMobileSort] = useState(false);
  const kategorije = [
    { id: "FilterTraktori", naziv: "Traktori" },
    { id: "FilterTrimeri", naziv: "Trimeri" },
    { id: "FilterRasveta", naziv: "Rasveta" },
    { id: "FilterAlati", naziv: "Alati" },
    { id: "FilterStolice", naziv: "Stolice" },
    { id: "FilterTestere", naziv: "Testere" },
  ];
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
                className="mt-1 w-full border rounded-sm border-gray-300 text-sm"
              >
                <option>Izaberi raspored</option>
                <option value="Title, DESC">Najnovije prvo</option>
                <option value="Title, ASC">Cena opadajuća</option>
                <option value="Price, DESC">Cena rastuća</option>
                <option value="Price, ASC">Preporučeno prvo</option>
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

                    <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
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
                          className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                        />
                        <span className="text-sm text-gray-600">RSD</span>
                      </label>

                      <label htmlFor="FilterPriceTo" className="flex items-center gap-2">


                        <input
                          type="number"
                          id="FilterPriceTo"
                          placeholder="Do"
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
                      <span className="text-sm text-gray-700"> 0 Selektovano </span>

                      <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
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

              <select id="SortBy" className="mt-1 border-1 rounded-sm border-gray-300 text-sm">
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
                    <span className="text-sm font-medium"> Dostupnost </span>

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
                      <span className="text-sm text-gray-700"> 0 Seletkovano </span>

                      <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                        Reset
                      </button>
                    </header>

                    <ul className="space-y-1 border-t border-gray-200 p-4">
                      <li>
                        <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="FilterInStock"
                            className="size-5 rounded-sm border-gray-300"
                          />

                          <span className="text-sm font-medium text-gray-700"> Na stanju (5+) </span>
                        </label>
                      </li>


                      <li>
                        <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="FilterOutOfStock"
                            className="size-5 rounded-sm border-gray-300"
                          />

                          <span className="text-sm font-medium text-gray-700"> Van stanja(10+) </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </details>

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

                      <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
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
                            className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                          />
                          <span className="text-sm text-gray-600">RSD</span>
                        </label>

                        <label htmlFor="FilterPriceTo" className="flex items-center gap-2">


                          <input
                            type="number"
                            id="FilterPriceTo"
                            placeholder="Do"
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
                      <span className="text-sm text-gray-700"> 0 Selektovano </span>

                      <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
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
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <div className=''>
                  <ProizvodCard />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Proizvodi