import React from 'react'
import Hero from '../components/Hero'
import Najnoviji from '../components/Najnoviji'
import ShopBaner from "../components/ShopBaner"
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Početna stranica | Alati Nidža</title>
        <meta name="description" content="Dobrodošli na našu početnu stranicu." />
        <meta name="keywords" content="proizvodi, početna, online kupovina,Prodnadji sve na jednom mestu, Alati Nidža, Dizalice, Lanci, Svi proizovdi" />
      </Helmet>
      <Hero />
      <ShopBaner/>
      <Najnoviji />
    </div>
  )
}

export default Home