import React, { useEffect, useState } from 'react'
import ProizvodCard from './ProizvodCard'
import { useStateContext } from '../context/StateContext'

const Najnoviji = () => {
    const {proizvodi} = useStateContext()
    const [najnovijiProizvodi, setNajnovijiProizvodi] = useState([])
    useEffect(() => {
        const pom = proizvodi.slice(-8).reverse();
        console.log("Privremeni niz:", pom); 
    
        setNajnovijiProizvodi(pom);
    }, [proizvodi]);
    
    return (
        <div>
            <span className="flex items-center mt-2 font-[700]">
                <span className="h-px flex-1 bg-black"></span>
                <span className="shrink-0 px-6 text-2xl text-orange-500">Najnoviji</span>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 px-8 py-2">
                {najnovijiProizvodi? najnovijiProizvodi.map((item,index) => (
                    <div key={index}><ProizvodCard proizvod={item} />
                    </div>
                )):<p className='text-black'>Učitavanje proizvoda</p>}
            </div>
        </div>
    )
}

export default Najnoviji