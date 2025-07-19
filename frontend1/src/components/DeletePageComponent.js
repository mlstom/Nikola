'use client';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function DeletePageComponent({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const ranOnce = useRef(false); // dodajemo zaštitu

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    const obrisi = async () => {
      const potvrda = confirm("Da li si siguran da želiš da obrišeš proizvod?");
      if (!potvrda) {
        router.push("/admin/page/proizvodi");
        return;
      }

      try {
        const res = await fetch(`https://alatinidza.rs/api/proizvod/${id}`, {
          cache: "no-store",
        });
        const proizvod = await res.json();

        await Promise.all(
          proizvod.slike.map((slika) =>
            axios.delete(`https://alatinidza.rs/api/proizvodSlike/${slika.id}`)
          )
        );

        await fetch(`https://alatinidza.rs/api/proizvod/${id}`, {
          method: "DELETE",
        });

        router.push("/admin/page/proizvodi");
      } catch (err) {
        console.error("Greška:", err);
        alert("Greška prilikom brisanja.");
      } finally {
        setLoading(false);
      }
    };

    obrisi();
  }, [id, router]);

  if (loading) return <Loader />;
  return null;
}
