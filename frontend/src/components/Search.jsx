import React from 'react'

const Search = () => {
    return (
        <div className="relative">
            <label for="Search" className="sr-only"> Search </label>

            <input
                type="text"
                id="Search"
                placeholder="Pretrazi..."
                className="w-full rounded-md border-1 text-gray-200 border-gray-200  py-2.5 px-3 shadow-xs sm:text-sm "
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-white ">
                    <span class="sr-only">Search</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </span>
        </div>
    )
}

export default Search