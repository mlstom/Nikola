import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1726064855955-5fe51cd6993c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  },
  {
    id: 2,
    name: "Nike Ultraboost",
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1726064855955-5fe51cd6993c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  },
  {
    id: 3,
    name: "Puma RS-X",
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1726064855955-5fe51cd6993c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  },
  {
    id: 4,
    name: "Apple iPhone 13",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1726064855955-5fe51cd6993c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  },
  {
    id: 5,
    name: "Samsung Galaxy S22",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1726064855955-5fe51cd6993c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  },
];

const Search = () => {
  const [query, setQuery] = useState("");
  const filteredProducts =
    query.length >= 3
      ? products.filter((product) =>
          product.name.toLowerCase().startsWith(query.toLowerCase())
        )
      : [];

  return (
    <div className="relative lg:w-[300px] max-w-md mx-auto">
      <input
        type="text"
        id="Search"
        placeholder="Pretraži..."
        className="w-full rounded-md border  border-gray-300 py-2.5 px-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <span className="absolute inset-y-0 right-3 flex items-center">
        <button type="button" className="text-gray-600">
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
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <div className="ml-auto space-x-2">
                <button className="rounded px-3 py-1 text-xs text-black hover:text-gray-600 ">
                  Vidi više
                </button>
                <button className="rounded bg-orange-500  px-3 py-1 text-xs text-white hover:bg-orange-700">
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
