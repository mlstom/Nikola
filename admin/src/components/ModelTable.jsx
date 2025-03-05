import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";
import Alert from "./Alert";
import FileUpload from "./FileUpload";
import TableSlika from "./TableSlika";
import axios from "axios";

const ModelTable = () => {
    const { openProizvod, setIsOpenModel, files, setFiles, fetchProizvodi } = useStateContext();
    const [openAlert, setOpenAlert] = useState(false);
    const [openALertBrisanjeSlika, setopenALertBrisanjeSlika] = useState(false);
    const [formData, setFormData] = useState({
        sifra: openProizvod.sifra,
        naziv: openProizvod.naziv,
        opis: openProizvod.opis,
        kategorija:openProizvod.kategorija,
        cena: openProizvod.cena,
        stanje: openProizvod.stanje,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function postSlike(urlSlika, idProizvod) {
        try {
            const { data } = await axios.post(`http://localhost:5000/api/proizvodSlika/${idProizvod}`, { urlSlika: `${urlSlika}` });
            console.log("Slika sačuvana u bazi:", data);
        } catch (error) {
            console.error("Greška pri čuvanju slike u bazi:", error.response?.data?.message || error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpenAlert(true);

        try {
            await axios.put(`http://localhost:5000/api/proizvod/${openProizvod.id}`, formData);

            if (files.length > 0) {


                for (const file of files) {
                    const formData1 = new FormData();
                    formData1.append('image', file.file);

                    const { data } = await axios.post('http://localhost:5000/api/uploads/upload', formData1, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    await postSlike(data.filePath, openProizvod.id);
                }

            }

            setFiles([]);
            //setIsOpenModel(false);
            fetchProizvodi(); // Osveži proizvode da bi se nove slike videle odmah

        } catch (error) {
            console.error("Greška pri ažuriranju proizvoda:", error);
        }
    };



    return (
        <div className="top-0 right-0 left-0 absolute h-dvh w-dvw flex items-center justify-center bg-black/50">
            
            {openALertBrisanjeSlika && <Alert text={"Da li si siguran da želiš da obrišeš datu sliku?"} ugasi={setopenALertBrisanjeSlika} />}
            <div className="relative">
                <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono text-white">
                    Proizvod<span className="text-sm text-orange-500"> i njegov id: {openProizvod.id}</span>
                </h1>
                <div className="absolute right-6 top-12 cursor-pointer" onClick={() => setIsOpenModel(false)}>
                    X
                </div>
                <form
                    className="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-orange-400"
                    onSubmit={handleSubmit}
                >
                    <input type="text" className="h-[50px] px-5" name="sifra" value={formData.sifra} onChange={handleInputChange} placeholder="Šifra" />
                    <input type="text" className="h-[50px] px-5" name="naziv" value={formData.naziv} onChange={handleInputChange} placeholder="Naziv" />
                    <input type="text" className="h-[50px] px-5" name="opis" value={formData.opis} onChange={handleInputChange} placeholder="Opis" />
                    <input type="text" className="h-[50px] px-5" name="kategorija" value={formData.kategorija} onChange={handleInputChange} placeholder="Kategorija" />
                    <input type="text" className="h-[50px] px-5" name="cena" value={formData.cena} onChange={handleInputChange} placeholder="Cena" />
                    <input type="text" className="h-[50px] px-5" name="stanje" value={formData.stanje} onChange={handleInputChange} placeholder="Stanje" />

                    <div className="flex justify-center items-center m-auto flex-wrap">
                        <TableSlika item={openProizvod} />
                    </div>

                    <div>
                        <FileUpload />
                    </div>

                    <button type="submit" className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-700 sm:col-span-2">
                        Promeni
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModelTable;
