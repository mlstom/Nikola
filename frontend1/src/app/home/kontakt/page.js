/** @type {import('next').Metadata} */
import KontaktPitanja from "./KontaktPitanja";
import { Facebook, Instagram } from "lucide-react";

export const metadata = {
  title: "Kontakt | Alati Nidža",
  description: "Saznajte sve o nama na jednom mestu, za osnovna pitanja javite se putem mejla.",
  keywords: ["Kontakt", "Email", "Telefon", "Radno vreme"],
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
  }
};

const Kontakt = () => {
  const socialLinks = [
    { href: "https://www.facebook.com/alatidinidza", icon: <Facebook /> },
    { href: "https://www.instagram.com/alatidinidza", icon: <Instagram /> },
  ];

  return (
    <div className='flex flex-col items-center space-y-12 md:flex-row md:space-y-0 md:space-x-12 px-8 py-4 gap-4'>
      <div id='kont' className="mx-auto w-full border border-grey-darker px-6 py-10 text-center shadow lg:mx-0 lg:w-3/8 lg:py-8 lg:text-left xl:w-1/3 xl:px-8">
        <h2 className="border-b border-grey-dark pb-6 font-butler text-2xl text-secondary sm:text-3xl md:text-4xl">
          Kontakt
        </h2>

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Email</h4>
        <p className="font-hk text-secondary">nikola@alatinidza.rs</p>
        <p className="font-hk text-secondary">info@alatinidza.rs</p>

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Telefon</h4>
        <p className="font-hk text-secondary">+381 61 208 27 78</p>

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Radno vreme</h4>
        <p className="font-hk text-secondary">Pon - Sub: 9.00 - 18.00</p>

        <div className="pt-8">
          <h4 className="font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Zaprati nas</h4>
          <div className="flex justify-center pt-3 lg:justify-start">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="mr-2 flex items-center rounded-full bg-secondary-lighter p-3 text-xl transition-colors hover:bg-primary hover:scale-95"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <KontaktPitanja />
    </div>
  );
};

export default Kontakt;
