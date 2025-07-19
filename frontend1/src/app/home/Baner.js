import React from 'react';
import Link from 'next/link';

const ShopBaner = () => {
    const items = [
        {
            title: "Kompletna ponuda alata i opreme",
            description:
                "Veliki izbor profesionalnih i hobi alata, auto opreme i pribora za domaćinstvo — sve na jednom mestu po odličnim cenama.",
            image: "/alatiset.jpg",
            link: "/home/proizvodi"
        },
        {
            title: "Auto oprema i dodaci",
            description:
                "Pronađite lance za sneg, kablove za paljenje, patosnice, držače za telefon i još mnogo toga za vaš automobil.",
            image: "/lanci.jpg",
            link: "/home/proizvodi?kategorija=Auto+oprema"
        },
        {
            title: "Kvalitetni ručni i električni alati",
            description:
                "Bušilice, odvijači, setovi alata i sve što vam treba za popravke i radove kod kuće ili na poslu.",
            image: "/alat.jpg",
            link: "/home/proizvodi?kategorija=Kucni+aparati"
        }
    ];


    return (
        <div className="container mx-auto px-6 mt-5">
            <div
                style={{ backgroundImage: `url(${items[0].image})` }}
                className="h-64 rounded-md overflow-hidden bg-cover bg-center"
            >
                <div className="bg-black/70 flex items-center h-full">
                    <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-semibold">{items[0].title}</h2>
                        <p className="mt-2 text-gray-400">{items[0].description}</p>
                        <Link
                            href={items[0].link}
                            className="inline-flex items-center mt-4 px-3 py-2 bg-orange-500 text-white text-sm uppercase font-medium rounded hover:bg-orange-700"
                        >
                            <span>Vidi</span>
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
                        </Link>
                    </div>
                </div>
            </div>

            <div className="md:flex mt-8 md:-mx-4">
                {items.slice(1).map((item, index) => (
                    <div
                        key={index}
                        className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2 mt-8 md:mt-0"
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        <div className="bg-gray-900/70 flex items-center h-full">
                            <div className="px-10 max-w-xl">
                                <h2 className="text-2xl text-white font-semibold">{item.title}</h2>
                                <p className="mt-2 text-gray-400">{item.description}</p>
                                <Link
                                    href={item.link}
                                    className="inline-flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline"
                                >
                                    <span>Vidi</span>
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
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopBaner;
