import React, { useState } from "react";
import { useStateContext } from "../context/StateContext";
import TableSlika from "./TableSlika";
import axios from "axios";

const TableProduct = ({ kolone, onDelete, proizvodi = [], edit,brojKorpe }) => {
  const { setIsOpenModel, setOpenProizvod,fetchNarudzbine,backURL } = useStateContext();
  const [loadingId, setLoadingId] = useState(null);

  const handleEdit = (item) => {
    setOpenProizvod(item);
    setIsOpenModel(true);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const updateKolicina = async (brojKorpe, idProizvoda, akcija) => {
    setLoadingId(idProizvoda);
    try {
      const response = await axios.put(`${backURL}/api/narudzbina/korpa/${brojKorpe}/${idProizvoda}`, { akcija });
      console.log(response.data.message)
      fetchNarudzbine()
    } catch (error) {
      console.error("Greška pri ažuriranju količine:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            {proizvodi[0]?.kolicina && <th className="px-4 py-2 font-medium text-gray-900">Količina</th>}
            {kolone.map((ime, index) => (
              <th key={index} className="px-4 py-2 font-medium text-gray-900">{ime}</th>
            ))}
            {edit && <th className="px-4 py-2"></th>}
            {edit && <th className="px-4 py-2"></th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {proizvodi?.length > 0 ? (
            proizvodi.map((item, index) => (
              <tr key={index}>
                {item.kolicina && (
                  <td className="px-4 py-2 font-medium text-gray-900 flex items-center gap-2">
                    <button
                      className="text-red-500 text-lg font-bold px-2 py-1 cursor-pointer "
                      onClick={() => updateKolicina(brojKorpe, item.id, "minus")}
                      disabled={loadingId === item.id}
                    >
                      -
                    </button>
                    <span>{item.kolicina}</span>
                    <button
                      className="text-green-500 text-lg font-bold px-2 py-1 cursor-pointer"
                      onClick={() => updateKolicina(brojKorpe, item.id, "plus")}
                      disabled={loadingId === item.id}
                    >
                      +
                    </button>
                  </td>
                )}
                <td className="px-4 py-2 font-medium text-gray-900">{item.id}</td>
                <td className="px-4 py-2 text-gray-700">{item.sifra}</td>
                <td className="px-4 py-2 text-gray-700">{item.naziv}</td>
                <td className="px-4 py-2 text-gray-700">{item.opis}</td>
                <td className="px-4 py-2 text-gray-700">{item.kategorija}</td>
                <td className="px-4 py-2 text-gray-700">{item.cena}</td>
                <td className="px-4 py-2 text-gray-700">{item.stanje}</td>
                <td className="px-4 py-2 text-gray-700">{item.tezina}</td>

                <td className="px-4 py-2 text-gray-700 flex">
                  <TableSlika item={item} />
                </td>
                {edit && <td className="px-4 py-2 ">
                  <div
                    className="inline-block rounded-sm cursor-pointer bg-orange-500 px-4 py-2 text-xs font-medium text-white hover:bg-orange-700"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </div>
                </td>}
                {edit && <td className="px-4 py-2 ">
                  <div
                    className="inline-block cursor-pointer rounded-sm bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </div>
                </td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={kolone.length + 2} className="px-4 py-2 text-gray-500 text-center">
                Nema proizvoda za prikaz.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
