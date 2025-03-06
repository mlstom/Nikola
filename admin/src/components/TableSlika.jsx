import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useStateContext } from '../context/StateContext';



const TableSlika = ({ item }) => {
    const [slikeProizvoda, setSlikeProizvoda] = useState([])
    const { isOpenModel, fetchProizvodi,backURL } = useStateContext()

    async function getSlikeProizvoda(id) {
        try {
            const response = await axios.get(`${backURL}/api/proizvodSlika/proizvod/${id}`)
            setSlikeProizvoda(response.data)
            
        } catch (error) {
            console.error("Greška pri dobijanju slika:", error);
        }
    }

    useEffect(() => {
        getSlikeProizvoda(item.id)
        
    }, [isOpenModel, item,slikeProizvoda]) 

    const handleDelete = async (slika) => {
        try {
            await axios.delete(`${backURL}/api/proizvodSlika/delete/${slika.id}`);
            setSlikeProizvoda(prevSlike => prevSlike.filter(s => s.id !== slika.id));
            fetchProizvodi();
        } catch (error) {
            console.error("Greška pri brisanju slike:", error.response?.data || error.message);
        }
    }

    return (
        <>
            {slikeProizvoda.map((slika, index) => (
                slika && (
                    <div key={index} className='min-w-[100px] relative'>
                        {isOpenModel &&  (
                            <button
                                className=" cursor-pointer hover:bg-red-700      bg-red-500 text-white rounded-full px-2"
                                onClick={() => handleDelete(slika)}
                            >
                                X
                            </button>
                        )}
                        <img
                            className="relative mr-4 inline-block h-16 w-16 rounded-lg object-cover object-center"
                            alt="Image placeholder"
                            src={`${backURL}${slika.urlSlika}`}
                        />
                    </div>
                )
            ))}
        </>
    )
}

export default TableSlika;
