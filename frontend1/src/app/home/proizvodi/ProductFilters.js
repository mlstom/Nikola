'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import kategorije from '@/data/kategorije';

import { Range } from 'react-range';

const MIN = 0;
const MAX = 100000;

export default function ProductFilters({ initialFilters }) {

    const router = useRouter();
    // Parse initial filters: comma-separated strings into arrays
    const parseParam = (val) => (val ? val.split(',') : []);
    const [selectedCats, setSelectedCats] = useState(parseParam(initialFilters.kategorija));
    const [selectedSubCats, setSelectedSubCats] = useState(parseParam(initialFilters.podkategorija));
    const [sort, setSort] = useState(initialFilters.sort || '');
    const [priceod, setPriceod] = useState(initialFilters.priceod || 0);
    const [pricedo, setPricedo] = useState(100000);

    const applyFilters = () => {
        const qp = new URLSearchParams();
        if (sort) qp.set('sort', sort);
        if (priceod) qp.set('priceod', priceod);
        if (pricedo) qp.set('pricedo', pricedo);
        if (selectedCats.length) qp.set('kategorija', selectedCats.join(','));
        if (selectedSubCats.length) qp.set('podkategorija', selectedSubCats.join(','));
        router.push(`/home/proizvodi?${qp.toString()}`);
    };

    const toggleItem = (list, setList, value) => {
        setList(prev => prev.includes(value)
            ? prev.filter(v => v !== value)
            : [...prev, value]
        );
    };

    useEffect(() => {
        const kategorijaParam = parseParam(initialFilters.kategorija);
        console.log("Kategorije iz URL-a:", kategorijaParam);

        if (kategorijaParam && kategorijaParam.length > 0) {
            for (const kat of kategorije) {
                if (kategorijaParam.includes(kat.naziv)) {
                    setSelectedSubCats(prev => [...new Set([...prev, ...kat.podKategorija])]);
                }
            }
        }
    }, [initialFilters, kategorije]);

    

    return (
        <aside className="w-[275px] lg:w-1/5  h-fit  mb-8 lg:mb-0 space-y-6 p-4 bg-white rounded-xl shadow border border-gray-200">
            {/* Sort */}
            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1 tracking-wide">Sortiraj</label>
                <select
                    className="w-full border  border-gray-300 outline-none rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 max-w-[180px]"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                >
                    <option value="">Izaberi</option>
                    <option value="latest">Najnovije prvo</option>
                    <option value="oldest">Najstarije prvo</option>
                    <option value="priceDesc">Cena opadajuća</option>
                    <option value="priceAsc">Cena rastuća</option>
                </select>
            </div>

            {/* Price Range */}
            <div>
                <p className="text-sm font-semibold text-gray-800 mb-2 tracking-wide">Cena (RSD)</p>
                {/* Price Range Slider */}
                <div className="mt-4">

                    <Range
                        step={100}
                        min={MIN}
                        max={MAX}
                        values={[Number(priceod), Number(pricedo)]}
                        onChange={([min, max]) => {
                            setPriceod(min.toString());
                            setPricedo(max.toString());
                        }}

                        renderTrack={({ props, children }) => {
                            const { key, style, ...restProps } = props;
                            const [minVal, maxVal] = [Number(priceod), Number(pricedo)];
                            const left = `${((minVal - MIN) / (MAX - MIN)) * 100}%`;
                            const width = `${((maxVal - minVal) / (MAX - MIN)) * 100}%`;

                            return (
                                <div
                                    key={key}
                                    {...restProps}
                                    className="w-full h-2 bg-gray-200 rounded-full mb-4 relative"
                                    style={style}
                                >
                                    {/* Orange selected range */}
                                    <div
                                        className="absolute h-2 bg-orange-500 rounded-full"
                                        style={{ left, width }}
                                    />
                                    {children}
                                </div>
                            );
                        }}
                        renderThumb={({ props, index }) => {
                            const { key, ...restProps } = props;
                            return (
                                <div
                                    key={index}
                                    {...restProps}
                                    className="w-4 h-4 bg-orange-500 rounded-full shadow-md"
                                    style={{ ...restProps.style }}
                                />
                            );
                        }}
                    />



                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Od"
                            value={priceod}
                            onChange={e => setPriceod(e.target.value)}
                            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 max-w-[80px]"
                        />
                        <input
                            type="number"
                            placeholder="Do"
                            value={pricedo}
                            onChange={e => setPricedo(e.target.value)}
                            className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 max-w-[80px]"
                        />
                    </div>
                </div>


            </div>

            {/* Categories */}
            <div>
                <p className="text-sm font-semibold text-gray-800 mb-2 tracking-wide">Kategorije</p>
                <ul className="space-y-2">
                    {kategorije.map(cat => {
                        const allSubSelected = cat.podKategorija.every(sub => selectedSubCats.includes(sub));
                        return (
                            <li key={cat.id}>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <span className="relative">
                                        <input
                                            type="checkbox"
                                            checked={allSubSelected}
                                            onChange={() => {
                                                if (allSubSelected) {
                                                    // Ukloni sve podkategorije ove kategorije
                                                    setSelectedSubCats(prev => prev.filter(sub => !cat.podKategorija.includes(sub)));
                                                } else {
                                                    // Dodaj sve koje nisu već dodate
                                                    setSelectedSubCats(prev => [...new Set([...prev, ...cat.podKategorija])]);
                                                }
                                            }}
                                            className="peer hidden"
                                        />
                                        <span className="w-4 h-4 inline-block border-2 border-orange-500 rounded-md peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-all duration-150"></span>
                                    </span>
                                    {cat.naziv}
                                </label>

                                {/* Podkategorije */}
                                <ul className="pl-5 mt-1 space-y-1">
                                    {cat.podKategorija.map(sub => (
                                        <li key={sub}>
                                            <label className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="relative">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSubCats.includes(sub)}
                                                        onChange={() => toggleItem(selectedSubCats, setSelectedSubCats, sub)}
                                                        className="peer hidden"
                                                    />
                                                    <span className="w-4 h-4 inline-block border-2 border-orange-400 rounded-md peer-checked:bg-orange-400 peer-checked:border-orange-400 transition-all duration-150"></span>
                                                </span>
                                                {sub}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
                <button
                    onClick={applyFilters}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded"
                >
                    Primeni filtere
                </button>
            </div>
        </aside>

    );
}