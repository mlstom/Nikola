'use client'

import { useState } from 'react'

const faqs = [
  {
    question: "Koliko dugo se čeka dostava?",
    answer: "Dostava se čeka od 2 do 5 radnih dana na teritoriji Srbije."
  },
  {
    question: "Koliko košta poštarina?",
    answer:
      "Cena poštarine zavisi od težine proizvoda koji ste poručili, kada dodate proizod u korpu cena će biti automatski obračunata"
  },
  {
    question: "Da li dajete popuste na veće količine?",
    answer:
      "Na sve artikle se moze dobiti popust na veću količinu kupljenih artikla"
  }
];

const KontaktPitanja = () => {
  const [faqIndex, setFaqIndex] = useState(null);

  return (
    <div id="faqs" className="mx-auto text-center lg:max-w-[50%] w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Često postavljena pitanja (FAQs)
      </h2>
      <p className="pt-2 text-lg text-gray-600 md:text-xl">
        Za odgovore na vaša pitanja javite se putem mejla.
      </p>
      <div className="pt-12">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-orange-500 mb-2 cursor-pointer"
          >
            <div
              className="flex items-center text-white justify-between bg-orange-500 px-5 py-5 cursor-pointer"
              onClick={() => setFaqIndex(faqIndex === index ? null : index)}
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="text-2xl">
                {faqIndex === index ? '-' : '+'}
              </span>
            </div>
            {faqIndex === index && (
              <div className="px-5 py-5 text-left text-sm text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KontaktPitanja;
