import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import Najnoviji from '../components/Najnoviji'
import ShopBaner from "../components/ShopBaner"
import { useStateContext } from '../context/StateContext'
const Home = () => {
  const {selectedCategories,setSelectedCategories} = useStateContext()
  useEffect(() => {
    setSelectedCategories([])
  }, [])
  
  return (
    <div>
      <Hero />
      <ShopBaner/>
      <Najnoviji />
    </div>
  )
}

export default Home