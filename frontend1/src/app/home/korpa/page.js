import axios from "axios";
import CartClient from "./CartClient";

export const revalidate = 0; // potpuno statično, ili po želji revalidate

export const metadata = {
  title: 'Korpa | Alati Nidža - Vaši Izabrani Proizvodi za Kupovinu',
  description:
    'Pregledajte proizvode koje ste dodali u svoju korpu na Alati Nidža. Iskoristite kupon za popust i završite svoju narudžbinu brzo i sigurno.',
  keywords: [
    'korpa', 'proizvodi', 'alat', 'online kupovina', 'kupon za popust',
    'narudžbina', 'trimere', 'bušilice', 'kompresori', 'dizalice',
    'agregati', 'aku alati', 'motorne testere', 'baštenski alati',
    'auto oprema', 'alata nidža', 'kupovina alata', 'plaćanje', 'popust'
  ].join(', '),
  alternates: {
        canonical: 'https://alatinidza.rs/korpa',              // canonical URL
    },

  openGraph: {
    title: 'Korpa | Alati Nidža - Spremni za Plaćanje',
    description:
      'Ovo su proizvodi koje ste dodali u svoju korpu. Završite porudžbinu brzo i jednostavno uz mogućnost unosa kupona za popust.',
    url: 'https://alatinidza.rs/home/korpa',
    siteName: 'Alati Nidža',
    locale: 'sr_RS',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1581093588401-12c643fb89ab?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Vaša korpa - Alati Nidža',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@alatinidza',
    creator: '@AlatiNidza',
    title: 'Korpa | Alati Nidža - Vaši Izabrani Alati',
    description:
      'Pregledaj proizvode koje si izabrao i završi kupovinu brzo, uz mogućnost korišćenja kupona za popust.',
    images: [
      'https://images.unsplash.com/photo-1616628182506-45f7dbccc344?auto=format&fit=crop&w=1200&q=80',
    ],
  },

  icons: {
    icon: '/logo.svg',
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
};


export default async function KorpaPage() {
  const res = await axios.get('https://alatinidza.rs/api/kupon')
  const kuponi = res.data
  return (
    <section className="mx-auto max-w-screen-md px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tvoja korpa</h1>
      <CartClient kuponi ={kuponi}  />
    </section>
  );
}
