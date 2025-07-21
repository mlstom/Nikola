import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
    url: 'https://alatinidza.rs/',
    siteName: 'Alati Nidža',
    locale: 'sr_RS',
    type: 'website',
    images: [
      {
        url: '/logo.svg',
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


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <head>
        <link rel='icon' href="/logo.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-681PZN1DMX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-681PZN1DMX');
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
