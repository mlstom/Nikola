import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../context/StateContext';

const Kupon = () => {
  const [kuponi, setKuponi] = useState([]);
  const [newKupon, setNewKupon] = useState({ kod: '', popust: '' });
  const [editKupon, setEditKupon] = useState(null);
  const { backURL } = useStateContext();

  // Dohvati sve kuponima sa servera
  useEffect(() => {
    const fetchKuponi = async () => {
      try {
        const response = await axios.get(`${backURL}/api/kupon`); // Tvoja ruta za GET kupone
        setKuponi(response.data);
      } catch (error) {
        console.error('Greška pri dohvatanju kupona:', error);
      }
    };

    fetchKuponi();
  }, []);

  // Funkcija za dodavanje novog kupona
  const handleAddKupon = async () => {
    try {
      const response = await axios.post(`${backURL}/api/kupon`, newKupon); // Tvoja ruta za POST kupon
      setKuponi([...kuponi, response.data]); // Dodaj novi kupon u listu
      setNewKupon({ kod: '', popust: '' }); // Resetuj inpute
    } catch (error) {
      console.error('Greška pri dodavanju kupona:', error);
    }
  };

  // Funkcija za izmenu postojećeg kupona
  const handleEditKupon = async () => {
    if (editKupon) {
      try {
        const response = await axios.put(`${backURL}/api/kupon/${editKupon.id}`, editKupon); // Tvoja ruta za PUT kupon
        setKuponi(kuponi.map(k => (k.id === editKupon.id ? response.data : k))); // Ažuriraj kupon u listi
        setEditKupon(null); // Resetuj edit mode
      } catch (error) {
        console.error('Greška pri izmeni kupona:', error);
      }
    }
  };

  // Funkcija za brisanje kupona
  const handleDeleteKupon = async (id) => {
    try {
      await axios.delete(`${backURL}/api/kupon/${id}`); // Tvoja ruta za DELETE kupon
      setKuponi(kuponi.filter(k => k.id !== id)); // Ukloni kupon iz liste
    } catch (error) {
      console.error('Greška pri brisanju kupona:', error);
    }
  };

  // Funkcija za otkazivanje editovanja
  const handleCancelEdit = () => {
    setEditKupon(null); // Resetuj stanje za editovanje
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Kuponi</h1>

      {/* Tabela sa postojećim kuponima */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="py-3 px-4">Kod</th>
              <th className="py-3 px-4">Popust</th>
              <th className="py-3 px-4">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {kuponi.map((kupon) => (
              <tr key={kupon.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{kupon.kod}</td>
                <td className="py-3 px-4">{kupon.popust}%</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setEditKupon(kupon)}
                    className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm rounded"
                  >
                    Izmeni
                  </button>
                  <button
                    onClick={() => handleDeleteKupon(kupon.id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 text-sm rounded ml-2"
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Forme za dodavanje novog ili izmenu postojećeg kupona */}
      <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-medium mb-4">{editKupon ? 'Izmeni Kupon' : 'Dodaj Novi Kupon'}</h2>
        {editKupon && (
          <p className="text-sm text-gray-500 mb-4">ID Kupona: {editKupon.id}</p>
        )}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={editKupon ? editKupon.kod : newKupon.kod}
              onChange={(e) =>
                editKupon
                  ? setEditKupon({ ...editKupon, kod: e.target.value })
                  : setNewKupon({ ...newKupon, kod: e.target.value })
              }
              placeholder="Kod kupona"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              type="number"
              value={editKupon ? editKupon.popust : newKupon.popust}
              onChange={(e) =>
                editKupon
                  ? setEditKupon({ ...editKupon, popust: e.target.value })
                  : setNewKupon({ ...newKupon, popust: e.target.value })
              }
              placeholder="Popust u %"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={editKupon ? handleEditKupon : handleAddKupon}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {editKupon ? 'Potvrdi Izmenu' : 'Dodaj Kupon'}
          </button>
          {editKupon && (
            <button
              onClick={handleCancelEdit}
              className="w-full mt-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Otkaži Izmenu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kupon;
