import React from 'react';
import ProizvodCard from '@/components/ProductCard';

export default function ProductGrid({ proizvodi }) {
  if (!proizvodi.length) {
    return <p className="text-gray-500">Nema proizvoda koji odgovaraju filterima.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 ">
      {proizvodi.map(p => (
        <ProizvodCard key={p.id} proizvod={p} />
      ))}
    </div>
  );
}