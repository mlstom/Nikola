
import axios from 'axios';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';


export const metadata = {
  title: 'Proizvodi | Alati Nidža - Profesionalni i Amaterski Alati za Sve Namene',
  description:
    'Najveći izbor alata i opreme: trimere, kompresore, dizalice, bušilice, brusilice, agregate, aparate za zavarivanje, aku alate, ručne alate, setove gedora, lampe, pumpe za vodu, motorne testere, baštenske alate, auto opremu i još mnogo više. Sve za radionicu, kuću, baštu i garažu na jednom mestu.',
  keywords: [
    'trimere', 'bušilice', 'kompresori', 'dizalice', 'agregati', 'aparati za zavarivanje', 'aku alati',
    'ručni alati', 'set gedora', 'specijalni setovi', 'lampe', 'pumpe za navodnjavanje', 'motorne testere',
    'baštenski alati', 'makaze za orezivanje', 'auto oprema', 'audio oprema', 'halogene sijalice',
    'led svetla za vozila', 'punjači akumulatora', 'alati za radionicu', 'baštenski alati', 'električni alati',
    'alat za kućnu upotrebu', 'radionički alati', 'auto delovi', 'pribor za zavarivanje', 'baštenska creva',
    'motorni bušači rupa', 'presvlake za vozila', 'pumpa za vodu', 'alat za auto popravku', 'alati za orezivanje'
  ].join(', '),
  alternates: {
    canonical: '/home/proizvodi',              // canonical URL
  },

  openGraph: {
    title: 'Alati Nidža - Najveći izbor alata i opreme',
    description:
      'Kupujte profesionalne i amaterske alate brzo i sigurno. Trimere, bušilice, auto oprema i još mnogo više.',
    url: 'https://alatinidza.rs/home/proizvodi',
    siteName: 'Alati Nidža',
    locale: 'sr_RS',
    type: 'website',
    images: [
      {
        url: 'https://plus.unsplash.com/premium_photo-1681487516403-773ca29231e0',
        width: 1200,
        height: 630,
        alt: 'Alati Nidža - Baner sa alatima',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@alatinidza',
    creator: '@AlatiNidza',
    title: 'Alati Nidža - Profesionalni alati za svaki dom i radionicu',
    description:
      'Najbrža i najpouzdanija interna platforma za kupovinu alata i opreme.',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};




export default async function ProductsPage({ searchParams }) {
  const sP = await searchParams;
  const {
    searchquery,
    kategorija,
    podkategorija,
    sort,
    priceod,
    pricedo
  } = sP

  const res = await axios.get('https://alatinidza.rs/api/proizvod')
  let proizvodi = res.data
  proizvodi = [...proizvodi]
  let sviProizvodi = proizvodi


  if (podkategorija) {
    let svePodKategorije = []
    const podkategorijeNiz = podkategorija.split(',');
    for (const kat of podkategorijeNiz) {
      let pom = sviProizvodi.filter(p => p.kategorija.includes(kat))
      svePodKategorije = [...svePodKategorije, ...pom]
    }
    proizvodi = svePodKategorije
  }



  if (kategorija) {
    let sveKategorije = []

    const kategorijeNiz = kategorija.split(',');
    for (const kat of kategorijeNiz) {
      let pom = sviProizvodi.filter(p => p.kategorija.includes(kat))
      sveKategorije = [...sveKategorije, ...pom]
    }
    proizvodi = sveKategorije
  }


  if (pricedo) {
    proizvodi = proizvodi.filter(p =>
      p.cena >= Number((priceod || 0)) && p.cena <= Number(pricedo)
    );
  }

  if (searchquery) {
    const query = searchquery.toLowerCase();
    proizvodi = proizvodi.filter(p =>
      p.naziv?.toLowerCase().includes(query) ||
      p.opis?.toLowerCase().includes(query) ||
      p.sifra?.toLowerCase().includes(query)
    );
  }


  if (proizvodi.length == 0) proizvodi = sviProizvodi



  // Sortiranje
  if (sort === 'latest') {
    proizvodi.sort((a, b) => b.id - a.id);
  } else if (sort === 'oldest') {
    proizvodi.sort((a, b) => a.id - b.id);
  } else if (sort === 'priceAsc') {
    proizvodi.sort((a, b) => a.cena - b.cena);
  } else if (sort === 'priceDesc') {
    proizvodi.sort((a, b) => b.cena - a.cena);
  }



  return (
    <section className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Proizvodi</h1>
        <p className="text-gray-600">Pronađite alat po vašoj meri</p>
      </header>
      <div className="md:flex md:space-x-2 lg:space-x-8 overflow-x-scroll  items-start">
        {/* Client Component for filters and sorting */}
        <ProductFilters initialFilters={
          {
            searchquery,
            kategorija,
            podkategorija,
            sort,
            priceod,
            pricedo
          }
        } />
        {/* Server Component for product grid */}
        <div className="flex-1">
          <ProductGrid proizvodi={proizvodi} />
        </div>
      </div>
    </section>
  )
}