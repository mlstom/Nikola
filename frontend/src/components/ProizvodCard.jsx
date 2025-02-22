import React from 'react'
import { Link } from "react-router-dom";
const ProizvodCard = () => {
    return (
        <Link to={`/proizvod/1`} className="group relative block overflow-hidden scale-75">
            

            <img
                src="https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=80&w=2574&auto=format&fit=crop"
                alt=""
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
                <p className="text-gray-700">
                    $49.99
                </p>

                <h3 className="mt-1.5 text-lg font-medium text-gray-900">Wireless Headphones</h3>

                <p className="mt-1.5 line-clamp-3 text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                </p>

                <form className="mt-4 flex gap-4">
                    <button
                        className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-orange-500 transition hover:scale-105"
                    >
                        Vidi više
                    </button>

                    <button
                        type="button"
                        className="block w-full rounded-sm bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                        Kupi
                    </button>
                </form>
            </div>
        </Link>
    )
}

export default ProizvodCard