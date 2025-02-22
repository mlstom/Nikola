import React,{useState} from 'react'
import { Facebook , Instagram} from 'lucide-react';

const Kontakt = () => {
  const socialLinks = [
    { href: "/", icon:  <Facebook />},
    { href: "/", icon: <Instagram /> },
  ];
  const [faqIndex, setFaqIndex] = useState(null);
  const faqs = [
    {
      question: "Koliko dugo se čeka poštarina?",
      answer: "Pa maksimum je 5 dana na teritoriji Srbije.",
    },
    {
      question: "Koliko košta poštarina?",
      answer:
        "Fiksna cena na teriotirji Srbije je 350 dinara i uvek se uračuna u cenu.",
    },
  ];
  return (
    <div className='flex flex-col items-center space-y-12 md:flex-row md:space-y-0 md:space-x-12 px-8 py-4 gap-4'>
      <div className="mx-auto w-full border border-grey-darker px-6 py-10 text-center shadow lg:mx-0 lg:w-3/8 lg:py-8 lg:text-left xl:w-1/3 xl:px-8">
        <h2 className="border-b border-grey-dark pb-6 font-butler text-2xl text-secondary sm:text-3xl md:text-4xl">
          Kontakt
        </h2>

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Email</h4>
        <p className="font-hk text-secondary">nikola@gmail.com</p>

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Telefon</h4>
        <p className="font-hk text-secondary">+381 61 208 27 78</p>

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Radno vreme</h4>

        <p className="font-hk text-secondary">
          <span className="text-primary"></span> Pon - Sub: 9.00 - 18.00
        </p>

        <div className="pt-8">
          <h4 className="font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Follow Us</h4>
          <div className="flex justify-center pt-3 lg:justify-start">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="mr-2 flex items-center rounded-full bg-secondary-lighter p-3 text-xl transition-colors hover:bg-primary hover:scale-95"
              >
               {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto text-center sm:w-5/6 md:w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Često postavljena pitanja (FAQs)</h2>
        <p className="pt-2 text-lg text-gray-600 md:text-xl">
          Za odgvoro na vaša pitanja javite se putem mejla.
        </p>
        <div className="pt-12">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-orange-500 mb-2 cursor-pointer">
              <div
                className="flex items-center text-white justify-between bg-orange-500 px-5 py-5 cursor-pointer"
                onClick={() => setFaqIndex(faqIndex === index ? null : index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <i className={`bx text-2xl ${faqIndex === index ? "bx-minus" : "bx-plus"}`}></i>
              </div>
              {faqIndex === index && (
                <div className="px-5 py-5 text-left text-sm text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Kontakt