import React from 'react'
import { Link } from "react-router-dom";
import background from "../assets/hero.png";
const Hero = () => {
    return (
        <section
            className={`relative  bg-cover bg-center bg-no-repeat`}
            style={{ backgroundImage: `url(${background})`}}
        >
            <div
                className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                        Prodnadji sve na jednom mestu

                        <strong className="block font-extrabold text-orange-500"> Alati Nidža trgovinska radnja </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        Uvek možeš da pogledaš sve naše proizvode.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <Link
                            to="/proizvodi"
                            className="block w-full rounded-sm bg-orange-500 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:ring-3 focus:outline-hidden sm:w-auto"
                        >
                            Proizvodi
                        </Link>

                        <Link
                            to="/kontakt"
                            className="block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-orange-500 shadow-sm hover:text-orange-700 focus:ring-3 focus:outline-hidden sm:w-auto"
                        >
                            Kontakt
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero