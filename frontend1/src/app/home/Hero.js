import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      aria-label="Hero sekcija sajta Alati Nidža"
    >
      <picture>
        <source srcSet="/hero.webp" type="image/webp" />
        <img
          src="/hero.jpg"
          alt="Hero sekcija sajta Alati Nidža"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>

      {/* Mračna maska za kontrast */}
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      {/* Sadržaj */}
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Pronađi sve na jednom mestu
            <strong className="block font-extrabold text-orange-500">
              {" "}
              Alati Nidža
            </strong>
          </h1>

          <h2 className="sr-only">Kupovina alata i auto opreme online</h2>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            Pogledaj širok asortiman alata, auto opreme i pribora za domaćinstvo
            — kvalitetno i povoljno.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/home/proizvodi"
              className="block w-full rounded-sm bg-orange-500 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:ring-3 focus:outline-hidden sm:w-auto"
            >
              Proizvodi
            </Link>

            <Link
              href="/home/kontakt"
              className="block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-orange-500 shadow-sm hover:text-orange-700 focus:ring-3 focus:outline-hidden sm:w-auto"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
