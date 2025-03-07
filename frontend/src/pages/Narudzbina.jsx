import React from 'react';
import { Link } from 'react-router-dom';
import CartModal from '../components/CartModal';
import { toast } from 'react-toastify';
import { useStateContext } from '../context/StateContext';
import axios from 'axios';

const Narudzbina = () => {
  const notify = () => toast.success("Kupovina je uspešno izvršena");
  const { newOrder, setNewOrder, backURL } = useStateContext();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [id]: value, // Direktno ažuriranje kupca unutar newOrder
    }));
  };
  const zavrsiKupovinu = async () => {
    try {
      console.log(newOrder)
      const kupacResponse = await axios.post(`${backURL}/api/kupac`, {
        ime: newOrder.ime,
        prezime: newOrder.prezime,
        email: newOrder.email,
        telefon: newOrder.telefon,
        adresa: newOrder.adresa,
        postanskiBroj: newOrder.postanskiBroj,
        mesto: newOrder.mesto,
      });

      const idKupca = kupacResponse.data.id;

      const brojKorpe = "KORPA" + Math.floor(100000 + Math.random() * 900000);

      await Promise.all(newOrder.proizvodi.map(async (proizvod) => {
        await axios.post(`${backURL}/api/narudzbina/korpa`, {
          brojKorpe: brojKorpe,
          idProizvod: proizvod.id,
          kolicina: proizvod.kolicina
        });
      }));

      const brojPosiljke = "Posiljka" + Math.floor(100000 + Math.random() * 900000); // Šestocifren broj pošiljke

      await axios.post(`${backURL}/api/narudzbina`, {
        brojKorpe: brojKorpe,
        idPodaciKupca: idKupca,
        brojPosiljke: brojPosiljke,
        poslato: 0
      });

      setNewOrder({
        ime: "",
        prezime: "",
        email: "",
        telefon: "",
        adresa: "",
        postanskiBroj: "",
        mesto: "",
        proizvodi: []
      })

    } catch (error) {
      toast.error(`Greška: ${error.message}`);
    }
  }

  return (
    <div className="m-auto max-w-screen-xl px-6 py-8 sm:py-12 lg:px-8 flex flex-wrap items-center justify-center gap-10">
      <CartModal />
      <div className="pt-4 pb-10 pl-8 overflow-x-scroll">
        <h4 className="text-center font-hk text-xl font-medium text-secondary sm:text-left md:text-2xl">
          Shipping Address
        </h4>
        <div className="pt-4 md:pt-5 ">
          <div className="flex justify-between ">
            <input
              type="text"
              placeholder="Ime"
              className="form-input mb-4 sm:mb-5"
              id="ime"
              value={newOrder.ime}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Prezime"
              className="form-input mb-4 sm:mb-5"
              id="prezime"
              value={newOrder.prezime }
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="form-input mb-4 sm:mb-5"
            id="email"
            value={newOrder.email }
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Telefon"
            className="form-input mb-4 sm:mb-5"
            id="telefon"
            value={newOrder.telefon }
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Adresa"
            className="form-input mb-4 sm:mb-5"
            id="adresa"
            value={newOrder.adresa }
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Mesto"
              className="form-input mb-4 sm:mb-5"
              id="mesto"
              value={newOrder.mesto }
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Poštanski broj"
              className="form-input mb-4 sm:mb-5"
              id="postanskiBroj"
              value={newOrder.postanskiBroj }
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center pt-2">
            <p className="pl-3 font-hk text-sm text-secondary">
              Prihvatamo plaćanje samo pouzećem
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-8 sm:flex-row sm:pt-12">
          <Link
            to="/korpa"
            className="group mb-3 flex items-center font-hk text-sm text-secondary transition-all hover:text-primary group-hover:font-bold sm:mb-0"
          >
            Return to Cart
          </Link>
          <Link
            onClick={zavrsiKupovinu}
            to="/"
            className="block rounded-sm bg-orange-500 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:ring-3 focus:outline-hidden sm:w-auto"
          >
            Završi kupovinu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Narudzbina;
