import axios from "axios";
import PlacanjeClient from "./PlacanjeClient";

export const metadata = {
    title: 'Plaćanje | Alati Nidža - Završetak Kupovine',
    description:
        'Unesite podatke za isporuku i završite svoju narudžbinu brzo i sigurno. Alati Nidža vam omogućava jednostavno i bezbedno online plaćanje.',
    keywords: [
        'plaćanje', 'kupovina alata', 'alat online', 'online plaćanje', 'alat Nidža', 'završetak kupovine',
        'alat za domaćinstvo', 'narudžbina alata', 'dostava alata', 'alati online shop'
    ].join(', '),

    openGraph: {
        title: 'Plaćanje | Alati Nidža',
        description: 'Unesite podatke i završite svoju narudžbinu. Sigurna i brza kupovina alata online.',
        url: process.env.SITE_URL + '/placanje' || 'https://www.alatinidza.rs/placanje',
        siteName: 'Alati Nidža',
        locale: 'sr_RS',
        type: 'website',
        images: [
            {
                url: 'https://plus.unsplash.com/premium_photo-1681487516403-773ca29231e0',
                width: 1200,
                height: 630,
                alt: 'Završetak kupovine - Alati Nidža',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        site: '@alatinidza',
        creator: '@AlatiNidza',
        title: 'Plaćanje | Alati Nidža',
        description: 'Završite kupovinu brzo i bezbedno putem naše platforme.',
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


export default async function Placanje({ searchParams }) {
    const sP = await searchParams;
    const {
        popust
    } = sP
    const res = await axios.get('/api/kupon')
    const postojiPopust = res.data.find(k => k.kod == popust)
    return (
        <div>
            <PlacanjeClient popust={postojiPopust} />
        </div>
    )
}

