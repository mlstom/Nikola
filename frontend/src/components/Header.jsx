import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart,Menu } from 'lucide-react';
import Search from "./Search";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItemCount = 3;
  return (
    <header className="w-full">
      <nav className="border-gray-200 bg-black py-2.5">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Nikola
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none"
          >
            <Menu />
          </button>
          <div className="flex mt-1 items-center lg:order-2 gap-3 justify-between">
            <Search />
            <Link
              className="relative rounded-lg border-2 border-white px-4 py-2 text-sm leading-[24px] font-medium text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none sm:mr-2 lg:px-5 lg:py-2.5 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              to="/korpa"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
          </div>
          
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full items-center justify-between lg:order-1 lg:flex lg:w-auto`}
          >
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              {[
                { name: "Home", href: "/" },
                { name: "Proizvodi", href: "/proizvodi" },
                { name: "Kontakt", href: "/kontakt" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    className="block border-b border-gray-700 py-2 pr-4 pl-3 text-gray-400 hover:bg-gray-700 hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:hover:text-white"
                    to={item.href}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
