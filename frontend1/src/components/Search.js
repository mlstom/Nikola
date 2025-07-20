"use client"
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import QuickSearch from './QuickSearch'

export default function Search() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [products, setProducts] = useState([])      // svi proizvodi, učitani jednom
  const [filtered, setFiltered] = useState([])      // do 10 proizvoda za quick search
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // učitaj sve proizvode sa backend-a jednom kad je potrebno
  const fetchAll = useCallback(async () => {
    if (products.length > 0) return
    setLoading(true)
    try {
      const res = await fetch('https://alatinidza.rs/api/proizvod')     // ili tvoja ruta za sve proizvode
      const data = await res.json()
      setProducts(data)                             // niz { id, naziv, sifra, kategorija, opis, cena, slike }
    } finally {
      setLoading(false)
    }
  }, [products])

  // svaki put kad query promeni:
  useEffect(() => {
    if (query.length < 3) {
      setFiltered([])
      return
    }
    // prvo window.fetch svih proizvoda ako nismo do sada
    fetchAll().then(() => {
      const rez = products
        .filter(p =>
          p.naziv.toLowerCase().includes(query.toLowerCase()) ||
          p.sifra.toLowerCase().includes(query.toLowerCase()) ||
          p.kategorija.toLowerCase().includes(query.toLowerCase()) ||
          p.opis.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 10)
      setFiltered(rez)
    })
  }, [query, products, fetchAll])

  const handleNavigate = (searchTerm) => {
    router.push(`/home/proizvodi/?searchquery=${searchTerm}`)
    setIsFocused(false)
  }

  return (
    <div className="relative lg:w-[300px] min-w-md mx-auto">
      <input
        type="text"
        placeholder="Pretraži..."
        className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 sm:text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value.trimStart())}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleNavigate(query)
        }}
      />

      {isFocused && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
          {loading && <p className="p-4 text-center">Učitavanje…</p>}
          {!loading && filtered.length > 0 && (
            <QuickSearch products={filtered} onSelect={handleNavigate} setQuery={setQuery} />
          )}
          {!loading && filtered.length === 0 && query.length >= 3 && (
            <>
              <p className="p-4 text-center text-gray-500">Nema rezultata</p>
              <button
                onMouseDown={() => router.push('/home/proizvodi')}
                className="text-sm text-center w-full text-orange-500 hover:underline"
              >
                Vidi sve proizvode
              </button>
            </>
          )}
          {filtered.length > 0 && <div className="p-2 text-center">
            <button
              onMouseDown={() => handleNavigate(query)}
              className="text-sm text-orange-500 hover:underline"
            >
              Vidi više…
            </button>
          </div>}
        </div>
      )}
    </div>
  )
}
