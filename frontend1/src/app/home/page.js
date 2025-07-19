/** @type {import('next').Metadata} */
export const dynamic = 'force-dynamic';
import Hero from "./Hero";
import ShopBaner from "./Baner";
import axios from "axios";
import ProizvodCard from "@/components/ProductCard";

export const metadata = {
  title: 'Alati Nidza – Najbrza prodavnica alata, delova i trimera',
  description: 'Najširi asortiman alata, trimera, delova brzo pretraživanje i sigurna kupovina – za zaposlene u servisu ili DIY entuzijaste.',
  keywords: 'alati, delovi, trimeri',
  alternates: {
    canonical: '/',              // canonical URL
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Alati Nidza',
    description: 'Interna platforma za brzu i sigurnu porudžbinu alata',
    url: process.env.SITE_URL || 'https://alatinidza.rs',
    siteName: 'Alati Nidza',
    locale: 'sr_RS',
    type: 'website',
    images: [
      {
        url: 'https://plus.unsplash.com/premium_photo-1681487516403-773ca29231e0',
        width: 1200,
        height: 630,
        alt: 'Alati Nidza - baner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@alatinidza',
    creator: '@AlatiNidza',            // autor ili brend
    title: 'Alati Nidza',
    description: 'Najbrža interna platforma za kupovinu alata',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default async function Home() {
  const resProizvodi = await axios.get('https://alatinidza.rs/api/proizvod')
  
  const proizvodi = resProizvodi.data.sort((a, b) => b.id - a.id).slice(0, 10);
  return (
    <div className="min-h-screen">
      <Hero />
      <ShopBaner />
      <span className="mt-10  flex w-[90%] mx-auto items-center  font-[700]">
        <span className="h-px flex-1 bg-black"></span>
        <span className="shrink-0 px-6 text-2xl text-orange-500">Najnoviji</span>
        <span className="h-px flex-1 bg-black"></span>
      </span>
      <div className="mt-8 px-10  lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {proizvodi.map((p) => (<ProizvodCard key={p.id} proizvod={p} />))}
      </div>
    </div>
  );
}
