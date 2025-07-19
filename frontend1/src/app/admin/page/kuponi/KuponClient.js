'use client';

import React, { useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";

export default function KuponClient({ kuponi: initialKuponi }) {
  const [kuponi, setKuponi] = useState(initialKuponi);
  const [newKupon, setNewKupon] = useState({ kod: "", popust: "" });
  const [editKupon, setEditKupon] = useState(null);
    const [loading, setLoading] = useState(false)  

  const handleAddKupon = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/kupon", newKupon);
      setKuponi([...kuponi, response.data.kupon]);
      setNewKupon({ kod: "", popust: "" });
    } catch (err) {
      console.error("Greška pri dodavanju kupona:", err);
    }
    setLoading(false)
  };

  const handleEditKupon = async () => {
    setLoading(true)
    if (editKupon) {
      try {
        const response = await axios.put(`/api/kupon/${editKupon.id}`, editKupon);
        setKuponi(kuponi.map(k => (k.id === editKupon.id ? response.data.kupon : k)));
        setEditKupon(null);
      } catch (err) {
        console.error("Greška pri izmeni kupona:", err);
      }
    }
    setLoading(false)
  };

  const handleDeleteKupon = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`/api/kupon/${id}`);
      setKuponi(kuponi.filter(k => k.id !== id));
    } catch (err) {
      console.error("Greška pri brisanju kupona:", err);
    }
    setLoading(false)
  };

  
if(loading) return <Loader />
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Kuponi</h1>

      {/* Tabela */}
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
            {kuponi.map((kupon,index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
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

      {/* Forma za dodavanje ili izmenu */}
      <div className="mt-6 bg-white p-4 shadow-md rounded-lg max-w-md">
        <h2 className="text-xl font-medium mb-4">{editKupon ? "Izmeni Kupon" : "Dodaj Novi Kupon"}</h2>
        {editKupon && (
          <p className="text-sm text-gray-500 mb-4">ID Kupona: {editKupon.id}</p>
        )}
        <div className="space-y-4">
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
          <button
            onClick={editKupon ? handleEditKupon : handleAddKupon}
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700"
          >
            {editKupon ? "Potvrdi Izmenu" : "Dodaj Kupon"}
          </button>
          {editKupon && (
            <button
              onClick={() => setEditKupon(null)}
              className="w-full mt-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Otkaži Izmenu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
