import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProizvodCard from "../components/ProizvodCard";
import { useStateContext } from "../context/StateContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Proizvod = () => {
    const { id } = useParams();
    const [activeImage, setActiveImage] = useState(0);
    const [proizvod, setProizvod] = useState({});
    const [kolicina, setKolicina] = useState(0)
    const [najnovijiProizvodi, setNajnovijiProizvodi] = useState([])
    const { proizvodi, backURL, newOrder, setNewOrder } = useStateContext();


    useEffect(() => {
        const pom = proizvodi.find((pr) => pr.id == id);
        console.log(pom)
        setProizvod(pom);
        const pom1 = proizvodi.slice(-5).reverse();
        setNajnovijiProizvodi(pom1);
        setActiveImage(0)
    }, [proizvodi, id]);


    // Povećavanje količine ili dodavanje proizvoda
    const handleIncreaseQuantity = () => {
        setKolicina((prev) => (prev + 1))

    };

    // Smanjivanje količine proizvoda (ali ne ispod 1)
    const handleDecreaseQuantity = () => {
        if (kolicina > 0) setKolicina((prev) => (prev - 1))
        else {
            toast.warning("Minimalna količina je 0");
        }

    };
    const dodajUKorpu = () => {
        if (kolicina > 0 && kolicina<= proizvod.stanje) {
            setNewOrder((prevOrder) => {
                const existingProductIndex = prevOrder.proizvodi.findIndex((p) => p.id === proizvod.id);

                let updatedProizvodi;
                if (existingProductIndex !== -1) {
                    // Proizvod već postoji, povećaj količinu
                    updatedProizvodi = [...prevOrder.proizvodi];
                    updatedProizvodi[existingProductIndex].kolicina += kolicina;
                } else {
                    // Proizvod ne postoji, dodaj ga sa kolicinom 1
                    updatedProizvodi = [...prevOrder.proizvodi, { ...proizvod, kolicina: kolicina }];

                }
                toast.success("Proizvod dodat u korpu!");
                return { ...prevOrder, proizvodi: updatedProizvodi };
            })
        } else {
            toast.warning(`Minimalna količina je 1. i Maksimalna kolicina je stanje proizvoda: ${proizvod.stanje} `);
        }
    }

    return (
        <div className="bg-black pt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    {/* Slika proizvoda */}
                    <div className="md:flex-1 px-4">
                        {proizvod?.slike?.length > 0 && (
                            <img className=" object-cover mb-4 w-[500px] h-[500px]"
                                src={`${backURL}${proizvod.slike[activeImage]?.urlSlika}`}
                                alt="Product Image" />
                        )}

                        <div className="flex space-x-2 justify-center">
                            {proizvod?.slike?.map((img, index) => (
                                <button key={index} onClick={() => setActiveImage(index)}>
                                    <img
                                        src={`${backURL}${img?.urlSlika}`}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-16 h-16 object-cover rounded-lg border-2 transition ${activeImage === index ? "border-orange-500 scale-105" : "border-transparent"
                                            } hover:border-gray-500`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Informacije o proizvodu */}
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{proizvod?.naziv}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{proizvod?.opis}</p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Cena:</span>
                                <span className="text-gray-600 dark:text-gray-300"> {proizvod?.cena}RSD</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Kategorija:</span>
                                <span className="text-gray-600 dark:text-gray-300"> {proizvod?.kategorija}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Dostupnost:</span>
                                <span className="text-gray-600 dark:text-gray-300"> {proizvod?.stanje}</span>
                            </div>
                        </div>

                        {/* Odabir količine */}
                        <div className="mb-4">
                            <span className="font-bold text-gray-700 dark:text-gray-300">Količina:</span>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={handleDecreaseQuantity}
                                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
                                    >
                                        -
                                    </button>

                                    <input
                                        type="number"
                                        value={kolicina}
                                        readOnly
                                        className="h-10 w-16 rounded-sm border-gray-200 text-center sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleIncreaseQuantity}
                                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Dugme za dodavanje u korpu */}
                        <div className="flex mx-2 mt-4">
                            <div className="w-1/2 px-2">
                                <button
                                    onClick={dodajUKorpu}
                                    className="w-full bg-gray-900 dark:bg-orange-500 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-orange-700"
                                >
                                    Dodaj u korpu
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className='bg-white    mt-4 pt-10'>
                <span className="flex items-center  ">
                    <span className="h-px flex-1 bg-black"></span>
                    <span className="shrink-0 px-6 text-black font-bold ">Izdvajamo</span>
                    <span className="h-px flex-1 bg-black"></span>
                </span>
                <div className="mt-8  justify-center grid sm:grid-cols-4 lg:grid-cols-5">
                    {najnovijiProizvodi?.map((item, index) => (
                        <div key={index}><ProizvodCard proizvod={item} /> </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Proizvod;
