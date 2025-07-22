import ProizvodCard from "@/components/ProductCard";
import axios from "axios";
import { notFound } from "next/navigation";
import ImageGallery from "./ImageGallery";
import DodajProizvod from "./DodajProizvod";

function truncate(text = '', maxLength = 155) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trimEnd() + '...';
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const res = await fetch(`https://alatinidza.rs/api/proizvod/${id}`, { cache: 'no-store' });
  const proizvod = await res.json();

  if (!proizvod) {
    return {
      title: 'Proizvod nije pronađen | Alati Nidža',
      description: 'Traženi proizvod nije dostupan.',
      robots: { index: false, follow: false }
    };
  }

  // Dinamički title i description
  const title = `${proizvod.naziv} | Alati Nidža`;
  const description = proizvod.opis
    ? truncate(proizvod.opis, 155)
    : `Pogledajte proizvod ${proizvod.naziv} na Alati Nidža`;

  // Dinamički keywords na osnovu naziva i kategorije
  const keywords = [
    proizvod.naziv,
    ...proizvod.kategorija.split('/'),
    'alati', 'delovi', 'trimeri', 'prodavnica'
  ].filter(Boolean);

  // Canonical URL i OpenGraph URL
  const canonicalUrl = `https://alatinidza.rs/home/proizvod/${id}`;

  // Open Graph slike
  const productImages = Array.isArray(proizvod.slike) ? proizvod.slike : [];
  const ogImages = productImages.length
    ? productImages.map(slika => ({
        url: `https://alatinidza.rs/${slika.urlSlika}`,
        width: 1200,
        height: 630,
        alt: proizvod.naziv
      }))
    : [{
        url: 'https://plus.unsplash.com/premium_photo-1681487516403-773ca29231e0',
        width: 1200,
        height: 630,
        alt: 'Alati Nidža – baner'
      }];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Alati Nidža',
      locale: 'sr_RS',
      type: 'product',
      images: ogImages
    },
    twitter: {
      card: 'summary_large_image',
      site: '@alatinidza',
      creator: '@AlatiNidza',
      title,
      description,
      images: ogImages.map(img => img.url)
    },
    icons: {
      icon: '/logo.svg',
      shortcut: '/favicon.ico',
      apple: '/logo.svg'
    }
  };
}

export default async function ProizvodPage({ params }) {
  const { id } = params;
  const [proizvodRes, sviRes] = await Promise.all([
    axios.get(`https://alatinidza.rs/api/proizvod/${id}`),
    axios.get(`https://alatinidza.rs/api/proizvod`)
  ]);

  const proizvod = proizvodRes.data;
  const proizvodi = sviRes.data;

  if (!proizvod) return notFound();

  // Preporuka: isti segment kategorije
  const related = proizvodi.filter(pr => pr.kategorija.split("/")[0] === proizvod.kategorija.split("/")[0]);
  const istaknuti = related.sort(() => 0.5 - Math.random()).slice(0, 10);

  return (
    <div className="bg-black pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-scroll">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <ImageGallery slike={proizvod.slike} />
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-white mb-2">{proizvod.naziv}</h2>
            <p className="text-gray-300 text-sm mb-4 max-w-[300px]">{proizvod.opis}</p>
            <p className="text-gray-300 text-sm mb-4">{proizvod.tezina} Kg</p>
            <div className="flex flex-wrap mb-4 gap-4 text-gray-300">
              <span>
                <strong className="text-lg text-white">Cena:</strong>{' '}
                <span className="font-bold text-orange-500 text-lg">{proizvod.cena} RSD</span>
              </span>
              <span><strong>Kategorija:</strong> {proizvod.kategorija}</span>
            </div>
            <DodajProizvod proizvod={proizvod} />
          </div>
        </div>
      </div>

      <div className="bg-white mt-4 pt-10">
        <span className="w-[90%] mx-auto flex items-center">
          <span className="h-px flex-1 bg-black"></span>
          <span className="shrink-0 px-6 text-orange-500 font-bold">Izdvajamo</span>
          <span className="h-px flex-1 bg-black"></span>
        </span>
        <div className="mt-8 px-10 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {istaknuti.map(p => <ProizvodCard key={p.id} proizvod={p} />)}
        </div>
      </div>
    </div>
  );
}
