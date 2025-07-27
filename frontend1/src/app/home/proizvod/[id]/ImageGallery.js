"use client";
import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ slike }) {
  const [aktivnaSlika, setAktivnaSlika] = useState(slike?.[0]?.urlSlika || "");

  if (!slike || slike.length === 0) {
    return (
      <div className="flex items-center justify-center mb-4 w-full max-w-xs md:max-w-md lg:max-w-lg h-[300px] bg-gray-800 text-gray-400 text-center text-sm rounded">
        Nema slike
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 w-full max-w-xs md:max-w-md lg:max-w-lg h-[300px]">
        <Image
          src={`https://alatinidza.rs/${aktivnaSlika}`} // npr: "/slike/proizvod1.jpg"
          alt="Glavna slika"
          fill
          className="object-contain rounded"
          sizes="(max-width: 768px) 100vw, 600px"
          priority
        />
      </div>

      <div className="flex overflow-x-scroll space-x-2 justify-center">
        {slike.map((img, index) => (
          <div
            key={index}
            className={`relative w-12 h-12 sm:w-16 sm:h-16 cursor-pointer rounded-lg border-2 ${
              aktivnaSlika === img.urlSlika
                ? "border-orange-500"
                : "border-gray-300"
            }`}
            onClick={() => setAktivnaSlika(img.urlSlika)}
          >
            <Image
              src={`https://alatinidza.rs/${img.urlSlika}`}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-contain rounded-lg"
              sizes="64px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
