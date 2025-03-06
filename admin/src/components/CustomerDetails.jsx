import React, { useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/StateContext";

const CustomerDetails = ({ kupac }) => {
  const [editMode, setEditMode] = useState({});
  const [customerData, setCustomerData] = useState(kupac);
  const {backURL}= useStateContext()
  const handleEdit = (field, subField = null) => {
    setEditMode({ ...editMode, [field]: subField || true });
  };

  const handleChange = (e, field, subField = null) => {
    if (subField) {
      setCustomerData({
        ...customerData,
        [field]: { ...customerData[field], [subField]: e.target.value },
      });
    } else {
      setCustomerData({ ...customerData, [field]: e.target.value });
    }
  };

  const handleBlur = async (field, subField = null) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: subField ? { ...prev[field], [subField]: false } : false,
    }));
  
    try {
      const updatedData = subField
        ? { [subField]: customerData[field][subField] }
        : { [field]: customerData[field] };
  
      const { ime, prezime, email, telefon, adresa, postanskiBroj, mesto } = customerData;
      const dataToSend = { ime, prezime, email, telefon, adresa, postanskiBroj, mesto, ...updatedData };
  
      const response = await axios.put(`${backURL}/api/kupac/${customerData.id}`, dataToSend);
  
      // Osveži customerData sa podacima iz odgovora servera
      setCustomerData(response.data); 
    } catch (error) {
      console.error("Greška pri ažuriranju kupca:", error);
    }
  };
  
  return (
    <div className="border p-4 rounded-md shadow-md mb-4">
      <h2 className="text-lg font-bold mb-2">Podaci o kupcu</h2>
      {Object.entries(customerData).map(([key, value]) => (
        typeof value === "object" ? (
          <div key={key} className="mb-2">
            <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey} className="ml-4">
                <span className="font-semibold capitalize">{subKey.replace(/([A-Z])/g, ' $1')}:</span>
                {editMode[key]?.[subKey] ? (
                  <input
                    type="text"
                    value={subValue}
                    onChange={(e) => handleChange(e, key, subKey)}
                    onBlur={() => handleBlur(key, subKey)}
                    autoFocus
                    className="border px-2 py-1 ml-2 rounded-md"
                  />
                ) : (
                  <span onClick={() => handleEdit(key, subKey)} className="ml-2 cursor-pointer text-blue-500">
                    {subValue}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div key={key} className="mb-2">
            <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
            {editMode[key] ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(e, key)}
                onBlur={() => handleBlur(key)}
                autoFocus
                className="border px-2 py-1 ml-2 rounded-md"
              />
            ) : (
              <span onClick={() => handleEdit(key)} className="ml-2 cursor-pointer text-blue-500">
                {value}
              </span>
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default CustomerDetails;
