'use client';
import { useStateContext } from '@/app/context/StateContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
export default function DodajProizvod({ proizvod }) {
    const [kolicina, setKolicina] = useState(1);
    const { addToCart } = useStateContext();

    const handleAdd = () => {
        for (let i = 0; i < kolicina; i++) {
            addToCart(proizvod);
            
        }
        toast.success(`${proizvod.naziv} je dodat u korpu!`, {
                position: "top-right",
                autoClose: 3000, // zatvara se posle 3s
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    };

    return (
        <div className="mt-6">
            <div className="space-y-4">
                <label className="block text-white font-semibold">Količina:</label>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setKolicina(prev => Math.max(1, prev - 1))}
                        className="px-3 hover:cursor-pointer py-1 bg-gray-700 text-white rounded text-lg"
                    >
                        −
                    </button>
                    <input
                        type="number"
                        value={kolicina}
                        onChange={e => setKolicina(Math.max(1, Number(e.target.value)))}
                        min={1}
                        className="w-16 text-white text-center py-1 rounded border border-gray-500"
                    />
                    <button
                        type="button"
                        onClick={() => setKolicina(prev => prev + 1)}
                        className="hover:cursor-pointer px-3 py-1 bg-gray-700 text-white rounded text-lg"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleAdd}
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Dodaj u korpu
                </button>
            </div>
        </div>
    );
}
