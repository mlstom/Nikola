import React from 'react'
import Hero from '../components/Hero'
import Najnoviji from '../components/Najnoviji'
import ShopBaner from "../components/ShopBaner"
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <div>
      
      <Hero />
      <ShopBaner/>
      <Najnoviji />
    </div>
  )
}

export default Home