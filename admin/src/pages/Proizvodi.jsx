import React, { useState } from 'react'
import TableProduct from '../components/TableProduct'
import ModelTable from '../components/ModelTable'
import { useStateContext } from '../context/StateContext'
import Alert from '../components/Alert'

const Proizvodi = () => {
  const [oepnAlert, setoepnAlert] = useState(false)
  const [proizvodi, setproizvodi] = useState([{
    id: 1,
    sifra: '1234',
    naziv: 'Traktor',
    cena: 990,
    stanje: 10,
    slike: [
      "https://plus.unsplash.com/premium_photo-1690406382383-3827c1397c48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1739382120576-b1434e8bc4d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
    ]
  },
  {
    id: 2,
    sifra: '1234',
    naziv: 'Traktor',
    cena: 990,
    stanje: 10,
    slike: [
      "https://plus.unsplash.com/premium_photo-1690406382383-3827c1397c48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1739382120576-b1434e8bc4d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
    ]
  },
  {
    id: 3,
    sifra: '1234',
    naziv: 'Traktor',
    cena: 990,
    stanje: 10,
    slike: [
      "https://plus.unsplash.com/premium_photo-1690406382383-3827c1397c48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1739382120576-b1434e8bc4d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
    ]
  },
  {
    id: 4,
    sifra: '1234',
    naziv: 'Traktor',
    cena: 990,
    stanje: 10,
    slike: [
      "https://plus.unsplash.com/premium_photo-1690406382383-3827c1397c48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1739382120576-b1434e8bc4d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
      "https://plus.unsplash.com/premium_photo-1690406382383-3827c1397c48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
      "https://images.unsplash.com/photo-1739382120576-b1434e8bc4d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
    ]
  },
  ])

  const kolone = ["id", "sifra", "naziv", "cena", "stanje", "slike"]
  let list = []
  const onDelete = (id) => {

    proizvodi.map((item) => {
      if (item.id != id) list.push(item)
    })
    setoepnAlert(true)
    setproizvodi(list)
  }
  const { isOpenModel } = useStateContext();
  const handleUgasi = () => {
    list = []
    setoepnAlert(false)
  }
  const handleAdd = ()=>{

  }
  return (
    <div className=' flex flex-col justify-center items-center px-8 overflow-y-hidden'>
      {oepnAlert && <Alert text={"Da li ste sigurni da zelite da obrisete datu poruku"} ugasi={handleUgasi} />}
      <div
        className="inline-block cursor-pointer rounded-sm bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
        onClick={() => handleAdd()}
      >
        Dodaj Proizvod
      </div>
      <TableProduct proizvodi={proizvodi} kolone={kolone} onDelete={onDelete} />
      {isOpenModel && <ModelTable />}
    </div>
  )
}

export default Proizvodi