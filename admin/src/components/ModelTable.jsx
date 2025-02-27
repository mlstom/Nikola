import React,{useState} from 'react'
import { useStateContext } from '../context/StateContext';
import Alert from './Alert';
import FileUpload from './FileUpload';

const ModelTable = () => {
    const { openProizvod,setIsOpenModel } = useStateContext()
    const [openAlert, setOpenAlert] = useState(false)
    const [openALertBrisanjeSlika, setopenALertBrisanjeSlika] = useState(false)
    return (
        <div className="top-0 right-0 left-0 absolute h-dvh w-dvw flex items-center justify-center bg-black/50">
            {openAlert && <Alert text={"Da li si siguran da zelis da sacuvas promene?"} ugasi={()=>setOpenAlert(false)} />}
            {openALertBrisanjeSlika && <Alert text={"Da li si siguran da zelis da obrises datu sliku?"} ugasi={setopenALertBrisanjeSlika} />}
            <div className='relative'>
                <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono text-white">
                    Proizvod<span className="text-sm text-orange-500"> i njeog id: {openProizvod.id}</span>
                </h1>
                <div className='absolute right-6 top-12 cursor-pointer' onClick={()=>setIsOpenModel(false)}>
                    X
                </div>
                <form
                    className="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-orange-400"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setOpenAlert(true)
                    }}
                >
                    <div className="grid">
                        <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                                placeholder="Sifra"
                            />

                        </div>
                    </div>

                    <div className="grid">
                        <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                                placeholder="Naziv"
                            />

                        </div>
                    </div>

                    <div className="grid">
                        <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                            <input
                                type="text"
                                name="company"
                                id="company"
                                className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                                placeholder="Cena"
                            />

                        </div>
                    </div>

                    <div className="grid">
                        <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0"
                                placeholder="Stanje"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center m-auto flex-wrap">
                        {openProizvod.slike.map((url, index) => (
                            <div key={index} className='min-w-[50px] relative ' >
                                <img
                                    className="relative mr-4 inline-block h-16 w-16 rounded-lg object-cover object-center"
                                    alt="Image placeholder"
                                    src={url}
                                />
                                <div className='cursor-pointer w-[20px] px-2' onClick={()=>setopenALertBrisanjeSlika(true)}>
                                    X
                                </div>
                            </div>
                        ))}
                        
                    </div>
                    <div>
                            <FileUpload />
                        </div>
                    <button
                        type="submit"
                        className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-700 sm:col-span-2"
                    >
                        Promeni
                    </button>
                </form>
            </div>
        </div>

    )
}

export default ModelTable