import React from 'react'
import { useStateContext } from '../context/StateContext'



const TableProduct = ({ proizvodi, kolone, onDelete }) => {
    const {setIsOpenModel,setOpenProizvod} = useStateContext()
    const handleEdit = (item) => {
       setOpenProizvod(item)
       setIsOpenModel(true)
    }
    const handleDelete =(id)=>{
        onDelete(id)
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        {kolone.map((ime, index) => (
                            <th key={index} className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">{ime}</th>
                        ))}
                        <th className="px-4 py-2"></th>
                        <th className="px-4 py-2"></th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {proizvodi.map((item,index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">{item.id}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700">{item.sifra}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700">{item.naziv}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700">{item.cena}</td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700">{item.stanje}</td>
                            <td className="px-4 py-2 whitespace-nowrap  text-gray-700 flex">
                                {
                                    item.slike.map((url, index) => (
                                        <div key={index} className='min-w-[100px]' >
                                            <img
                                                className="relative mr-4 inline-block h-16 w-16 rounded-lg object-cover object-center"
                                                alt="Image placeholder"
                                                src={url}
                                            />
                                        </div>
                                    ))
                                }
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <div
                                    className="inline-block rounded-sm cursor-pointer bg-orange-500 px-4 py-2 text-xs font-medium text-white hover:bg-orange-700"
                                    onClick={()=>handleEdit(item)}
                                >
                                    Edit
                                </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <div
                                    className="inline-block cursor-pointer rounded-sm bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                    onClick={()=>handleDelete(item.id)}
                                >
                                    Delete
                                </div>
                            </td>
                        </tr>
                    ))}



                </tbody>
            </table>
            
        </div>
    )
}

export default TableProduct