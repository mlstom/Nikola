import Link from 'next/link'
import kategorije from '@/data/kategorije'
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
          <div className="mx-auto max-w-sm lg:max-w-none">
            <p className="mt-4 text-center text-gray-500 lg:text-left lg:text-lg">
              Pratite nas za najnovije ponude i proizvode iz kategorija alata, auto opreme i baštenske tehnike.
              <br />
              <strong>Alati Nidža</strong> - vodeći online prodavac alata i opreme u Srbiji.
            </p>

            <div className="mt-6 flex justify-center gap-4 lg:justify-start">
              <a
                href="https://www.facebook.com/alatidinidza"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook stranica Alati Nidža"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <Facebook className="w-6 h-6" />
              </a>

              <a
                href="https://www.instagram.com/alatidinidza"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram profil Alati Nidža"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
            <div>
              <strong className="font-medium text-gray-900"> Proizvodi </strong>
              <ul className="mt-6 space-y-1">
                {kategorije.map((kat) => (
                  <li key={kat.id}>
                    <Link
                      href={`/home/proizvodi?kategorija=${encodeURIComponent(kat.naziv)}`}
                      className="text-gray-700 hover:text-orange-500"
                      aria-label={`Proizvodi iz kategorije ${kat.naziv}`}
                    >
                      {kat.naziv}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <strong className="font-medium text-gray-900"> Kontakt </strong>
              <ul className="mt-6 space-y-1">
                <li>
                  <Link className="text-gray-700 hover:text-gray-700/75" href="/home/kontakt/#faqs">
                    Najčešća pitanja
                  </Link>
                  <p className="text-gray-700 text-sm mt-1">
                    Imate pitanja? Pišite nam:
                    <br />
                    <a href="mailto:nikola@alatinidza.rs" className="text-orange-600">nikola@alatinidza.rs</a>
                    <br />
                    <a href="mailto:info@alatinidza.rs" className="text-orange-600">info@alatinidza.rs</a>
                  </p>
                </li>
                <li>
                  <Link className="text-gray-700 hover:text-gray-700/75" href="/home/kontakt/#kont">
                    Kontakt forma
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8 text-center text-xs text-gray-500">
          <p>
            © 2025 Alati Nidža. Sva prava zadržana.
            <br />
            Nikola Mihajlović PR Alati Nidža – prodaja alata online
            <br />
            Kneza Mihaila Bb, 19300 Negotin, Srbija – PIB: 112505047
            <br />
            <a
              href="https://github.com/mlstomic"
              className="text-orange-500"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profil autora"
            >
              Izrada sajta: mlstomic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
