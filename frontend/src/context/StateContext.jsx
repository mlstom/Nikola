import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'
const Context = createContext();

export const StateContext = ({ children }) => {
  
  const [proizvodi, setProizvodi] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPodCategories, setSelectedPodCategories] = useState([]);
  const [newOrder, setNewOrder] = useState({
    ime: "",
    prezime: "",
    email: "",
    telefon: "",
    adresa: "",
    postanskiBroj: "",
    mesto: "",
    cena:"",
    postarina:"",
    cenaProizvoda:"",
    popust:"",
    proizvodi: []
  })
  const backURL = 'https://backend.srv758372.hstgr.cloud'
  const fetchSlike = async (id) => {
    const { data } = await axios.get(`${backURL}/api/proizvodSlika/proizvod/${id}`);
    setImages(data);
  };

  async function fetchProizvodi() {
    let { data: proizvodi } = await axios.get(`${backURL}/api/proizvod`);

    // Dohvati slike za svaki proizvod
    let proizvodiSaSlikama = await Promise.all(proizvodi.map(async (proizvod) => {
      let { data: slike } = await axios.get(`${backURL}/api/proizvodSlika/proizvod/${proizvod.id}`);
      return { ...proizvod, slike }; // Dodaj slike u objekat proizvoda
    }));

    setProizvodi(proizvodiSaSlikama);
  }
  return (
    <Context.Provider
      value={{
        fetchProizvodi,fetchSlike,
        backURL,
        proizvodi, setProizvodi,
        newOrder, setNewOrder,
        selectedCategories,setSelectedCategories,
        selectedPodCategories,setSelectedPodCategories
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);
