import React from 'react'

const ShopBaner = () => {
  const items = [
    {
      title: "Svi proizvodi",
      description:
        "Nimalo se nećete pokajati ako pogledate naše proizode",
      image:
        "https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Usisivači",
      description:
        "Svi najnoviji usisivači na jednom mestu.",
      image:
        "https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=2135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Rasveta",
      description:
        "Bezbroj kvalitetne rasvete na jednom mestu.",
      image:
        "https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=2135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="container mx-auto px-6 mt-5">
      <div
        style={{'--image-url': `url(${items[0].image})`}}
        className=" h-64 rela rounded-md overflow-hidden bg-[image:var(--image-url)] bg-cover bg-center "       
      >
        <div className=" bg-black/70  flex items-center h-full">
          <div className="px-10 max-w-xl">
            <h2 className="text-2xl text-white font-semibold">{items[0].title}</h2>
            <p className="mt-2 text-gray-400">{items[0].description}</p>
            <button className="flex items-center mt-4 px-3 py-2 bg-orange-500 text-white text-sm uppercase font-medium rounded hover:bg-orange-700">
              <span>Shop Now</span>
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
            </button>
          </div>
        </div>
      </div>
      <div className="md:flex mt-8 md:-mx-4">
        {items.slice(1).map((item, index) => (
          <div
            key={index}
            className="w-full  h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2 mt-8 md:mt-0"
            style={{ backgroundImage: `url('${item.image}')` }}
          >
            <div className=" bg-gray-900/70 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">{item.title}</h2>
                <p className="mt-2 text-gray-400">{item.description}</p>
                <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline">
                  <span>Shop Now</span>
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
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopBaner