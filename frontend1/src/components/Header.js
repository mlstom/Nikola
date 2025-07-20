"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu } from 'lucide-react'
import Search from './Search'
import { useStateContext } from '@/app/context/StateContext'


// Accept cartCount as a prop for better performance
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const { brojProizvodaUKorpi } = useStateContext()
  useEffect(() => {
    setCartCount(brojProizvodaUKorpi)
  }, [brojProizvodaUKorpi])
  return (
    <header className="w-full bg-black">
      <nav className="border-gray-200 py-2.5">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Alati Nidža Logo"
              width={52}
              height={52}
              priority
              className="mr-2 rounded-full"
            />
            <span className="text-xl font-semibold whitespace-nowrap text-white">
              Alati Nidža
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu />
          </button>

          {/* Desktop links */}
          <div className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto">
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              {[
                { name: 'Home', href: '/' },
                { name: 'Proizvodi', href: '/home/proizvodi' },
                { name: 'Kontakt', href: '/home/kontakt' },
              ].map(item => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block border-b font-bold border-gray-700 py-2 pr-4 pl-3 text-gray-400  hover:text-white lg:border-0 lg:p-0"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search and cart */}
          <div className="flex w-full items-center lg:order-2 lg:w-auto mt-2 lg:mt-0 justify-between  gap-4">
            <div className="flex-1 lg:flex-none">
              <Search className="w-full" />
            </div>
            <Link
              href="/home/korpa"
              className="relative rounded-lg border-2 border-white px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-black"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Mobile menu links */}
          {isOpen && (
            <div className="w-full items-center justify-between lg:hidden">
              <ul className="mt-4 flex flex-col font-medium space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Proizvodi', href: '/home/proizvodi' },
                  { name: 'Kontakt', href: '/home/kontakt' },
                ].map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block border-b border-gray-700 py-2 pr-4 pl-3 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
