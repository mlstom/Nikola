import React from 'react'
import { Link } from "react-router-dom";
import { useStateContext } from '../context/StateContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ProizvodCard = ({ proizvod }) => {
    const navigate = useNavigate();
    const { backURL, newOrder, setNewOrder } = useStateContext()
    const [slike, setSlike] = useState([])
    const fetchSlike = async () => {
        const { data } = await axios.get(`${backURL}/api/proizvodSlika/proizvod/${proizvod.id}`)
        console.log(data[0].urlSlika)
        setSlike(data)
    }
    const dodajUKorpu = () => {

        setNewOrder((prevOrder) => {
            const existingProductIndex = prevOrder.proizvodi.findIndex((p) => p.id === proizvod.id);

            let updatedProizvodi;
            if (existingProductIndex !== -1) {
                if (proizvod.kolicina + 1 <= proizvod.stanje) {
                    updatedProizvodi = [...prevOrder.proizvodi];
                    updatedProizvodi[existingProductIndex].kolicina += 1;
                } else {
                    toast.warning("Moras dodati proizvod kojeg imamo dovoljno na stanju")
                }
            } else {
                // Proizvod ne postoji, dodaj ga sa kolicinom 1
                if (proizvod.stanje > 0) {
                    updatedProizvodi = [...prevOrder.proizvodi, { ...proizvod, kolicina: 1 }];
                    toast.success("Proizvod dodat u korpu!");
                } else {
                    toast.warning("Proizvoda nema na stanju")
                }
            }

            return { ...prevOrder, proizvodi: updatedProizvodi };
        })
    }

    useEffect(() => {
        fetchSlike()
    }, [proizvod])

    return (
        <div className="group relative block overflow-hidden scale-75">
            <img
                src={`${backURL}${slike[0]?.urlSlika}`}
                alt=""
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                onClick={()=>navigate(`/proizvod/${proizvod.id}`)}
            />

            <div className="relative border border-gray-100 bg-white p-6">
                <p className="text-gray-700">
                    {proizvod.cena} RSD
                </p>

                <h3 className="mt-1.5 text-lg font-medium text-gray-900">{proizvod.naziv}</h3>


                <p className="mt-1.5 line-clamp-3 text-gray-700">
                    {proizvod.kategorija}
                </p>

                <p className="mt-1.5 line-clamp-3 text-gray-700">
                    {proizvod.opis.length > 30 ? `${proizvod.opis.substring(0, 30)}...` : proizvod.opis}
                </p>



                <div className="mt-4 flex gap-4">
                    <Link to={`/proizvod/${proizvod.id}`}
                        className=" w-full rounded-sm bg-gray-100 px-4 py-3 flex justify-center  text-sm font-[20px] text-orange-500 transition hover:scale-105"
                    >
                        Vidi više
                    </Link>

                    <button
                        type="button"
                        className="block cursor-pointer w-full rounded-sm bg-orange-500 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                        onClick={dodajUKorpu}
                    >
                        Kupi
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProizvodCard