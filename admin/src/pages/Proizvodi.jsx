import React, { useState, useEffect } from "react";
import TableProduct from "../components/TableProduct";
import ModelTable from "../components/ModelTable";
import { useStateContext } from "../context/StateContext";
import Alert from "../components/Alert";
import ModelCreateaTable from "../components/ModelCreateaTable";

const Proizvodi = () => {
  const {
    proizvodi,
    deleteProizvod,
    deleteSlikaPoProizvodu,
    isCreateModel,
    setIsCreateModel,
    isOpenModel,
    handleSearchProizvoda,
    filteredProizvodi,
    setFilteredProizvodi
  } = useStateContext();

  const [openAlert, setopenAlert] = useState(false);
  const [idBrisanje, setIdBrisanje] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  

  const kolone = ["id", "sifra", "naziv", "opis", "kategorija", "cena", "stanje", "slike"];

  const onDelete = (id) => {
    setopenAlert(true);
    setIdBrisanje(id);
  };

  const handleUgasi = () => {
    setopenAlert(false);
  };

  const handleOkej = () => {
    deleteSlikaPoProizvodu(idBrisanje);
    deleteProizvod(idBrisanje);
    setopenAlert(false);
  };

  

  // Resetuje filtrirane proizvode kada je searchQuery prazan
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProizvodi(proizvodi);
    }
  }, [searchQuery, proizvodi]);

  return (
    <div className="flex flex-col justify-center items-center overflow-x-scroll overflow-y-hidden">
      {openAlert && (
        <Alert
          text={"Da li ste sigurni da želite da obrišete ovaj proizvod?"}
          ugasi={handleUgasi}
          potvrdi={handleOkej}
        />
      )}

      {/* Input za pretragu */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pretraži proizvode..."
          className="border px-2 py-1 rounded-md"
        />
        <button
          onClick={handleSearchProizvoda}
          className="bg-orange-500 text-white px-4 py-1 rounded-md hover:bg-orange-700"
        >
          Pretraži
        </button>
      </div>

      {/* Dugme za dodavanje proizvoda */}
      <div
        className="inline-block cursor-pointer rounded-sm bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
        onClick={() => setIsCreateModel(true)}
      >
        Dodaj Proizvod
      </div>

      {/* Prikaz tabele sa filtriranim proizvodima */}
      <TableProduct kolone={kolone} proizvodi={filteredProizvodi} onDelete={onDelete} edit={true} />
      {isOpenModel && <ModelTable />}
      {isCreateModel && <ModelCreateaTable />}
    </div>
  );
};

export default Proizvodi;
