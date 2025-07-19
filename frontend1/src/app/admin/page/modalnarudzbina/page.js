// app/narudzbina/modal/page.js
import NarudzbinaForm from "./NarudzbinaForm";

export default async function ModalNarudzbina({ searchParams }) {
    const { id } = await searchParams;     // uzimamo id iz query-ja

    // 1️⃣ Fetch narudžbinu po id-u
    let narudzbina
    if (id) {
        const res = await fetch(
            `https://www.alatinidza.rs/api/narudzbina/${id}`,
            { cache: "no-store" }
        );

        narudzbina = await res.json();
        narudzbina = {...narudzbina,id}
    } else {
        narudzbina = null;
    }
    
    // 2️⃣ Prosledi je klijentu
    return (
        <div className="p-6 max-w-2xl overflow-x-scroll">
            <NarudzbinaForm narudzbina={narudzbina} />
        </div>
    );
}
