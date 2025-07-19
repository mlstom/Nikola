// components/Loader.js
'use client';

import Image from 'next/image';
import logo from '../../public/logo.svg'; // prilagodi ako je .png, .webp, itd.

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800">
      <div className="flex flex-col items-center gap-4 animate-fadeIn">
        <Image
          src={logo}
          alt="Logo"
          width={100}
          height={100}
          className="animate-spin-slow"
        />
        <p className="text-orange-500 font-semibold">Učitavanje...</p>
      </div>
    </div>
  );
}
