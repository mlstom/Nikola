// components/QuickSearch.jsx
"use client"
import { useStateContext } from '@/app/context/StateContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function QuickSearch({ products, setQuery }) {
  const router = useRouter()
  const { addToCart } = useStateContext()
  function handleAdd(e, p) {
    e.stopPropagation()
    addToCart(p)
    toast.success(<div>{proizvod.naziv} je dodat u korpu!{' '}
      <Link href="/home/korpa" className="underline text-green-400 hover:text-green-600">
        Pogledaj korpu →
      </Link>
    </div>, {
      position: "top-right",
      autoClose: 3000, // zatvara se posle 3s
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  return (
    <ul>
      {products.map((p) => (
        <li
          key={p.id}
          onMouseDown={() => { router.push(`/home/proizvod/${p.id}`); setQuery("") }}
          className="flex items-center justify-between border-b last:border-none px-3 py-1.5 hover:bg-gray-100 cursor-pointer"
        >
          <div className="flex items-center gap-2 w-full">
            <div className="relative min-w-[40px] min-h-[40px] bg-gray-100 rounded overflow-hidden">
              {p.slike?.[0] ? (
                <Image
                  src={`/${p.slike[p.slike.lenght - 1]}`}
                  alt={p.naziv}
                  fill
                  className="object-contain"
                />
              ) : (
                <span className="text-[10px] text-gray-500 flex justify-center items-center w-full h-full">Nema slike</span>
              )}
            </div>

            <div className="flex flex-col flex-grow overflow-hidden">
              <span className="text-sm font-medium text-gray-900 truncate">{p.naziv}</span>
              <span className="text-xs text-gray-500">{p.sifra}</span>
            </div>

            <div className="flex flex-col items-end gap-1 ml-2">
              <span className="text-sm font-bold text-orange-600 whitespace-nowrap">{p.cena} RSD</span>
              <button
                type="button"
                onMouseDown={(e) => handleAdd(e, p)}
                className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-2 py-0.5 rounded"
              >
                Dodaj
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
