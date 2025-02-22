import React,{useState} from 'react'

const Kontakt = () => {
  const socialLinks = [
    { href: "/", icon: "bxl-facebook" },
    { href: "/", icon: "bxl-twitter" },
    { href: "/", icon: "bxl-google" },
    { href: "/", icon: "bxl-linkedin" },
  ];
  const [faqIndex, setFaqIndex] = useState(null);
  const faqs = [
    {
      question: "How many days does the product take to arrive?",
      answer: "It depends on the product, but it can take 3-5 days max.",
    },
    {
      question: "How much is shipping?",
      answer:
        "It depends on a lot of factors like where you're located and how many things you buy. We do have a free shipping special if you buy more than $50.",
    },
  ];
  return (
    <div className='flex flex-col items-center space-y-12 md:flex-row md:space-y-0 md:space-x-12 px-8 py-4 gap-4'>
      <div className="mx-auto w-full border border-grey-darker px-6 py-10 text-center shadow lg:mx-0 lg:w-3/8 lg:py-8 lg:text-left xl:w-1/3 xl:px-8">
        <h2 className="border-b border-grey-dark pb-6 font-butler text-2xl text-secondary sm:text-3xl md:text-4xl">
          Quick contact
        </h2>

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Email</h4>
        <p className="font-hk text-secondary">information@elyssi.com</p>

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Phone</h4>
        <p className="font-hk text-secondary">+0 321-654-0987</p>

        <h4 className="pt-8 font-hk text-lg font-bold uppercase text-secondary sm:text-xl">WORKING HOURS</h4>

        <p className="pt-3 font-hk text-lg font-bold text-secondary">Summer</p>
        <p className="font-hk text-secondary">
          <span className="text-primary">(May to Nov) :</span> Mon - Sat: 9.00 to 18.00
        </p>

        <p className="pt-3 font-hk text-lg font-bold text-secondary">Winter</p>
        <p className="font-hk text-secondary">
          <span className="text-primary">(Dec to Apr) :</span> Mon - Sat: 9.00 to 17.00
        </p>

        <div className="pt-8">
          <h4 className="font-hk text-lg font-bold uppercase text-secondary sm:text-xl">Follow Us</h4>
          <div className="flex justify-center pt-3 lg:justify-start">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="mr-2 flex items-center rounded-full bg-secondary-lighter p-3 text-xl transition-colors hover:bg-primary"
              >
                <i className={`bx ${link.icon} text-white`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto text-center sm:w-5/6 md:w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
        <p className="pt-2 text-lg text-gray-600 md:text-xl">
          Get the latest news & updates from Elyssi
        </p>
        <div className="pt-12">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-orange-500 mb-2 cursor-pointer">
              <div
                className="flex items-center text-white justify-between bg-orange-400 px-5 py-5 cursor-pointer"
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