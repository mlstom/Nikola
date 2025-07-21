import ProizvodCard from "@/components/ProductCard";
import axios from "axios";
import { notFound, redirect } from "next/navigation";
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

  const title = proizvod?.naziv
    ? `${proizvod.naziv} | Alati Nidža`
    : 'Proizvod | Alati Nidža';

  // Ako postoji opis – trimujemo ga, inače fallback
  const description = proizvod?.opis
    ? truncate(proizvod.opis, 155)
    : `Mi smo mesto koje nudi najbolje cene za proizvod poput ${proizvod?.naziv ?? 'nepoznatog proizvoda'}`;

  // Dinamički keywords: naziv + osnovne
  const keywords = [
    proizvod?.naziv,
    'Bušilice',
    'Pumpe',
    'Lampe',
    'Auto delovi',
    'Automobili',
    'Sijalice',
    'Trimeri'
  ].filter(Boolean);
  const alternates= {
        canonical:`https://alatinidza.rs/home/proizvod/${id}`,              // canonical URL
    }
  // Slike proizvoda ili banner
  const productImages = Array.isArray(proizvod.slike) ? proizvod.slike : [];
  const ogImages = productImages.length > 0
    ? productImages.map((slika) => ({url: `/${slika.urlSlika}`, width: 1200, height: 630, alt: proizvod.naziv }))
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
    alternates,
    openGraph: {
      title,
      description,
      url: `${'https://alatinidza.rs'}/home/proizvod/${id}`,
      siteName: 'Alati Nidža',
      locale: 'sr_RS',
      type: 'website',
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
      shortcut: '/logo.svg',
      apple: '/logo.svg'
    }
  };
}


export default async function ProizvodPage({ params }) {
    const { id } = await params
    const proizvodRes = await axios.get(`https://alatinidza.rs/api/proizvod/${id}`);
    const sviRes = await axios.get(`https://alatinidza.rs/api/proizvod`);


    const proizvod = proizvodRes.data
    const proizvodi = sviRes.data
    if (!proizvod) return notFound();

    const poslednjihDeset = proizvodi.filter((pr)=>pr.kategorija.split("/")[0] == proizvod.kategorija.split("/")[0])
         // možeš i random ako hoćeš

    const najnovijiProizvodi = [...poslednjihDeset].sort(() => 0.5 - Math.random()).slice(0, 10);
    return (
        <div className="bg-black pt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8  overflow-scroll ">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <ImageGallery slike={proizvod.slike} />
                    </div>

                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-white mb-2">{proizvod?.naziv}</h2>
                        <p className="text-gray-300 text-sm mb-4 max-w-[300px]">{proizvod?.opis}</p>
                        <p className="text-gray-300 text-sm mb-4">{proizvod?.tezina}Kg</p>

                        <div className="flex flex-wrap mb-4 gap-4 text-gray-300">
                            <span>
                                <strong className="text-lg text-white">Cena:</strong>{" "}
                                <span className="font-bold text-orange-500 text-lg">{proizvod?.cena} RSD</span>
                            </span>
                            <span><strong>Kategorija:</strong> {proizvod?.kategorija}</span>
                        </div>

                        {/* Količina + dugmići (SSR-friendly – kasnije možemo vezati za server action) */}
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
                <div className="mt-8 px-10  lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {najnovijiProizvodi.map((p) => (<ProizvodCard key={p.id} proizvod={p} />))}
                </div>
            </div>
        </div>
    );
}
