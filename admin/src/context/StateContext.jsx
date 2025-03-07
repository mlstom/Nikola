import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';



const Context = createContext();

export const StateContext = ({ children }) => {
  const [admin, setAdmin] = useState()
  const [isOpenModel, setIsOpenModel] = useState(false)
  const [openProizvod, setOpenProizvod] = useState(false)
  const [proizvodi, setProizvodi] = useState([])
  const [narudzbine, setNarudzbine] = useState([])
  const [filteredNarudzbine, setFilteredNarudzbine] = useState([]);
  const [kupci, setKupci] = useState([])
  const [files, setFiles] = useState([])
  const [isCreateModel, setIsCreateModel] = useState(false)
  const [akcija, setakcija] = useState('')
  const [trKorpa, settrKorpa] = useState()
  const [trIdProizvoda, settrIdProizvoda] = useState()
  const [filteredProizvodi, setFilteredProizvodi] = useState(proizvodi);
  const [searchQuery, setsearchQuery] = useState()
  const backURL = 'https://nikola-1.onrender.com'


  async function fetchProizvodi() {
    const data = await axios.get(`${backURL}/api/proizvod`)
   
    setProizvodi(data.data)
  }
  async function fetchKupci() {
    const data = await axios.get(`${backURL}/api/kupac`)
    setKupci(data.data)
  }
  async function deleteProizvod(id) {
    await axios.delete(`${backURL}/api/proizvod/${id}`)
    fetchProizvodi()
  }
  async function deleteSlikaPoProizvodu(idProizvod) {
    await axios.delete(`${backURL}/api/proizvodSlika/brisanjePoProizvodu/${idProizvod}`)
  }
  const fetchNarudzbine = async () => {
    try {
      const { data } = await axios.get(`${backURL}/api/narudzbina/konacnaNarudzbina`);
      setNarudzbine(data.narudzbine);
      setFilteredNarudzbine(data.narudzbine);
    } catch (error) {
      console.error("Greška pri učitavanju narudžbina:", error);
    }
  };
  const handleSearchProizvoda = async () => {
      if (!searchQuery?.trim()) {
        setFilteredProizvodi(proizvodi);
        return;
      }
      try {
        const response = await axios.get(`${backURL}/api/proizvod/search/${searchQuery}`);
        console.log(response.data);
        setFilteredProizvodi(response.data);
      } catch (error) {
        console.error("Greška pri pretrazi:", error);
      }
    };

  
  
  return (
    <Context.Provider
      value={{
        fetchKupci,  fetchProizvodi, deleteProizvod,deleteSlikaPoProizvodu,fetchNarudzbine,handleSearchProizvoda,
        admin, setAdmin,
        isOpenModel, setIsOpenModel,
        openProizvod, setOpenProizvod,
        proizvodi, setProizvodi,
        narudzbine, setNarudzbine,
        kupci, setKupci,
        files,setFiles,
        isCreateModel,setIsCreateModel,
        akcija,setakcija,
        trKorpa,settrKorpa,
        trIdProizvoda,settrIdProizvoda,
        filteredNarudzbine,setFilteredNarudzbine,
        filteredProizvodi,setFilteredProizvodi,
        searchQuery,setsearchQuery,
        backURL
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);