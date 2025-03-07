import React, { useState, useEffect } from "react";
import axios from "axios";
import TableProduct from "../components/TableProduct";
import CustomerDetails from "../components/CustomerDetails";
import { useStateContext } from "../context/StateContext";

const Narudzbine = () => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("")
  const [showProductList, setShowProductList] = useState(false)
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [editState, setEditState] = useState({}); // Track the edit state per order
  const [noviBroj, setnoviBroj] = useState("");

  const{backURL} = useStateContext()

  const kolone = ["id", "sifra", "naziv", "opis", "kategorija", "cena", "stanje", "slike"];

  const { akcija, trIdProizvoda, trKorpa, settrKorpa, fetchNarudzbine, filteredNarudzbine, setFilteredNarudzbine,proizvodi,fetchProizvodi,handleSearchProizvoda,filteredProizvodi,setFilteredProizvodi,narudzbine,setNarudzbine} = useStateContext()

  const [newOrder, setNewOrder] = useState({
    ime: "",
    prezime: "",
    email: "",
    telefon: "",
    adresa: "",
    postanskiBroj: "",
    mesto: "",
    korpa: `KORPA${Math.floor(100000 + Math.random() * 900000)}`, // Generiše broj korpe
    proizvodi: [], // Lista proizvoda u korpi
  });
  

  const handleAddOrder = async () => {
    try {
      // 1. Kreiranje kupca
      const kupacResponse = await axios.post(`${backURL}/api/kupac`, {
        ime: newOrder.ime,
        prezime: newOrder.prezime,
        email: newOrder.email,
        telefon: newOrder.telefon,
        adresa: newOrder.adresa,
        postanskiBroj: newOrder.postanskiBroj,
        mesto: newOrder.mesto,
      });
  
      const idKupca = kupacResponse.data.id; // ID kupca iz odgovora
  
      // 2. Kreiranje broja korpe (generisanje nasumičnog broja)
      const brojKorpe ="KORPA"+Math.floor(100000 + Math.random() * 900000); 
      
      // 3. Dodavanje proizvoda u korpu
      await Promise.allSettled(newOrder.proizvodi.map(async (proizvod) => {
        
        return axios.post(`${backURL}/api/narudzbina/korpa`, {
          brojKorpe: brojKorpe,
          idProizvod: proizvod.id,
          kolicina: proizvod.kolicina
        });
      })).then(results => console.log(results));
  
      // 4. Kreiranje narudžbine
      const brojPosiljke ="Posiljka"+Math.floor(100000 + Math.random() * 900000); // Šestocifren broj pošiljke
  
      await axios.post(`${backURL}/api/narudzbina`, {
        brojKorpe: brojKorpe,
        idPodaciKupca: idKupca,
        brojPosiljke: brojPosiljke,
        poslato: 0
      });
  
      // Osveži podatke i zatvori modal
      fetchNarudzbine();
      setIsAddOrderOpen(false);
      setNewOrder({
        ime: "",
        prezime: "",
        email: "",
        telefon: "",
        adresa: "",
        postanskiBroj: "",
        mesto: "",
        proizvodi: []
      });
  
    } catch (error) {
      console.error("Greška pri dodavanju narudžbine:", error);
    }
  };
  

  useEffect(() => {
    fetchNarudzbine();
    fetchProizvodi()
  }, []);

  const handlePretrazivanjeProizvoda = async(e) =>{
    setSearchTerm(e.target.value)
    if(!searchTerm.trim()){
      setFilteredProizvodi(proizvodi)
      return
    }
    handleSearchProizvoda()
  }

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value == "") {
      setFilteredNarudzbine(narudzbine)
      return
    }
    const { data } = await axios.get(`${backURL}/api/narudzbina/search/${e.target.value}`)
    console.log(data)
    setFilteredNarudzbine(data.narudzbine)
  };

  const handleDeleteOrder = async (brojPosiljke) => {
    try {
      await axios.delete(`${backURL}/api/narudzbina/${brojPosiljke}`);
      setNarudzbine(narudzbine.filter(n => n.brojPosiljke !== brojPosiljke));
    } catch (error) {
      console.error("Greška pri brisanju narudžbine:", error);
    }
  };

  const handleStatusChange = async (brojPosiljke, poslato) => {
    try {
      await axios.put(`${backURL}/api/narudzbina/poslato/${brojPosiljke}`, { poslato });

      setFilteredNarudzbine(narudzbine.map(n => n.brojPosiljke === brojPosiljke ? { ...n, poslato } : n))
    } catch (error) {
      console.error("Greška pri ažuriranju statusa narudžbine:", error);
    }
  };

  const handlePromeniBroj = async (stariBroj, noviBroj) => {
    try {
      await axios.put(`${backURL}/api/narudzbina/broj/${stariBroj}`, { noviBroj });
      const { data } = await axios.get(`${backURL}/api/narudzbina/konacnaNarudzbina`);
      setNarudzbine(data.narudzbine);
      setFilteredNarudzbine(data.narudzbine);
      setEditState((prevState) => ({ ...prevState, [stariBroj]: false })); // Reset the edit state
    } catch (error) {
      console.error("Greška pri ažuriranju broja pošiljke:", error);
    }
  };

  const toggleEditBroj = (brojPosiljke) => {
    setEditState((prevState) => ({
      ...prevState,
      [brojPosiljke]: !prevState[brojPosiljke],
    }));
  };
  const handlePromenaProizvoda = () => {
    axios
      .post(`${backURL}/api/narudzbina/korpa/${trKorpa}/${trIdProizvoda}`, { akcija })

      .catch(error => {
        console.error('Greška:', error);
      });
  }
  const handleAddProductToCart = (product) => {
    setNewOrder((prev) => {
      let proizvodi = prev.proizvodi || []; // Osiguravamo da postoji niz
      let existingProduct = proizvodi.find(p => p.id === product.id);
  
      if (existingProduct) {
        // Ako proizvod već postoji, povećaj mu količinu
        return {
          ...prev,
          proizvodi: proizvodi.map(p => 
            p.id === product.id ? { ...p, kolicina: p.kolicina + 1 } : p
          ),
        };
      } else {
        // Ako proizvod ne postoji, dodaj ga sa količinom 1
        return {
          ...prev,
          proizvodi: [...proizvodi, { ...product, kolicina: 1 }],
        };
      }
    });
  };
  
  const handleRemoveProduct =(id)=>{


    let lista = []
    const proizvodi = newOrder.proizvodi

    const tr = proizvodi.find(proizvod => proizvod.id == id)
    const kolicina = tr.kolicina

    proizvodi.map((proizvod)=>{
      if(proizvod.id!=id) lista.push(proizvod)
      else{
        if(proizvod.kolicina>1){
          proizvod.kolicina--
          lista.push(proizvod)
        }
      }
    })
    setNewOrder((prev)=>(
      {
        ...prev,
        proizvodi:lista
      }
    ))
  }
  const handleAddProduct = (id)=>{
    let lista = []
    const proizvodi = newOrder.proizvodi
    proizvodi.map((proizvod)=>{
      if(proizvod.id != id) lista.push(proizvod)
      else{
        proizvod.kolicina++
        lista.push(proizvod)
      }
    })
    setNewOrder((prev)=>(
      {
        ...prev,
        proizvodi:lista
      }
    ))
  }

  return (
    <div className="p-4 h-dvh overflow-y-scroll">
      {/* Search Bar & Add Order Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Pretraga po broju pošiljke"
          value={searchQuery}
          onChange={(e) => handleSearch(e)}
          className="border px-3 py-2 rounded-md w-1/2"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsAddOrderOpen(true)}
        >
          Dodaj Narudžbinu
        </button>
      </div>

      {isAddOrderOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/2 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Dodaj novu narudžbinu</h2>

            {/* Podaci o kupcu */}
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Ime" value={newOrder.ime} onChange={(e) => setNewOrder({ ...newOrder, ime: e.target.value })} className="border px-3 py-2 rounded-md" />
              <input type="text" placeholder="Prezime" value={newOrder.prezime} onChange={(e) => setNewOrder({ ...newOrder, prezime: e.target.value })} className="border px-3 py-2 rounded-md" />
              <input type="email" placeholder="Email" value={newOrder.email} onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })} className="border px-3 py-2 rounded-md" />
              <input type="text" placeholder="Telefon" value={newOrder.telefon} onChange={(e) => setNewOrder({ ...newOrder, telefon: e.target.value })} className="border px-3 py-2 rounded-md" />
              <input type="text" placeholder="Adresa" value={newOrder.adresa} onChange={(e) => setNewOrder({ ...newOrder, adresa: e.target.value })} className="border px-3 py-2 rounded-md" />
              <input type="text" placeholder="Poštanski broj" value={newOrder.postanskiBroj} onChange={(e) => setNewOrder({ ...newOrder, postanskiBroj: e.target.value })} className="border px-3 py-2 rounded-md" />
              <input type="text" placeholder="Mesto" value={newOrder.mesto} onChange={(e) => setNewOrder({ ...newOrder, mesto: e.target.value })} className="border px-3 py-2 rounded-md" />
            </div>

            {/* Korpa */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Korpa: {newOrder.korpa}</h3>
            </div>

            {/* Pretraga proizvoda */}
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder="Dodaj proizvod..."
                value={searchTerm}
                onChange={(e) => {handlePretrazivanjeProizvoda(e)}}
                onFocus={() => setShowProductList(true)}
                className="border px-3 py-2 rounded-md w-full"
              />
              {/* Lista proizvoda */}
              {showProductList && (
                <div className="absolute bg-white border rounded-md w-full mt-1 max-h-40 overflow-y-auto shadow-md pt-8">
                  <div className="absolute top-1 right-1 text-red-500 px-2 py-2 cursor-pointer text-[20px]" onClick={()=>setShowProductList(false)}>x</div>
                  {filteredProizvodi.map((product) => (
                    <div
                      key={product.id}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleAddProductToCart(product)}
                    >
                      {product.naziv} - {product.cena} RSD 
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Prikaz odabranih proizvoda */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Proizvodi u korpi:</h3>
              <ul>
                {newOrder.proizvodi?.map((proizvod) => (
                  <li key={proizvod.id} className="flex justify-between items-center border p-2 rounded-md mb-1">
                    {proizvod.naziv} - {proizvod.cena} RSD kolicina: {proizvod.kolicina}
                    <button className="bg-green-500 text-white px-2 py-1 rounded-md" onClick={() => handleAddProduct(proizvod.id)}>
                      Dodaj
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => handleRemoveProduct(proizvod.id)}>
                      Ukloni
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dugmad */}
            <div className="flex justify-end mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2" onClick={() => setIsAddOrderOpen(false)}>
                Otkaži
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={handleAddOrder}>
                Dodaj
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista narudžbina */}
      {filteredNarudzbine?.map((narudzbina) => (
        <div key={narudzbina.brojPosiljke} className="border p-4 mb-4 rounded-md shadow">
          <h2 className="text-lg font-bold">
            {!editState[narudzbina.brojPosiljke] ? (
              <span className="cursor-pointer" onClick={() => toggleEditBroj(narudzbina.brojPosiljke)}>
                Broj pošiljke: {narudzbina.brojPosiljke}
              </span>
            ) : (
              <input
                type="text"
                value={noviBroj}
                onChange={(e) => setnoviBroj(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePromeniBroj(narudzbina.brojPosiljke, noviBroj);
                  }
                }}
                className="border border-gray-300 p-1 rounded"
                autoFocus
              />
            )}
            - Ukupna cena: {narudzbina.ukupnaCena} RSD
          </h2>
          <div className="flex items-center mb-2">
            <label className="flex items-center mr-4">
              <input
                type="checkbox"
                checked={narudzbina.poslato}
                onChange={() => handleStatusChange(narudzbina.brojPosiljke, !narudzbina.poslato)}
                className="mr-2"
              />
              <span>Poslato</span>
            </label>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
              onClick={() => handleDeleteOrder(narudzbina.brojPosiljke)}
            >
              Obriši Narudžbinu
            </button>
          </div>

          {/* Podaci kupca */}
          Kupac:
          <CustomerDetails kupac={narudzbina.kupac} />

          {/* Tabela proizvoda */}
          <h2>Korpa:{narudzbina.brojKorpe}</h2>
          <TableProduct kolone={kolone} proizvodi={narudzbina.proizvodi} edit={false} onDelete={handlePromenaProizvoda} brojKorpe={narudzbina.brojKorpe} />
        </div>
      ))}
    </div>
  );
};

export default Narudzbine;
