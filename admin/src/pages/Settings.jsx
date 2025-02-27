import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import Alert from "../components/Alert";
import {   useNavigate } from "react-router-dom";
const Settings = () => {
  const { admin, setAdmin } = useStateContext();
  let navigate = useNavigate();
 
  useEffect(() => {
    if(!admin){
      navigate('/login')
    }
  }, [])
  
  const [editingField, setEditingField] = useState(null);
  const [openAlert, setopenAlert] = useState(false)
  const [formData, setFormData] = useState({
    userName: admin&&  admin.userName,
    password: admin && admin.lozinka ,
  });

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [editingField]: e.target.value });
  };

  const handleBlur = () => {
    if(formData.userName !=admin.userName || formData.password!=admin.password) setopenAlert(true)
    setEditingField(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };
  const ugasi = ()=>{
    setEditingField(null)
    setFormData({
      userName:admin && admin.userName,
    password:admin && admin.lozinka,
    })
    setopenAlert(false)
  }
  return (
    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
      {openAlert && <Alert text={'Da li ste sigurni da zelite da sacuvate promene'} ugasi={ugasi} />}
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        {/* Username */}
        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Username:</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {editingField === "userName" ? (
              <input
                type="text"
                value={formData.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 p-1 rounded"
                autoFocus
              />
            ) : (
              <span onClick={() => handleEdit("userName")} className="cursor-pointer">
                {admin && admin.userName}
              </span>
            )}
          </dd>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Password:</dt>
          <dd className="text-gray-700 sm:col-span-2">
            {editingField === "password" ? (
              <input
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="border border-gray-300 p-1 rounded"
                autoFocus
              />
            ) : (
              <span onClick={() => handleEdit("password")} className="cursor-pointer">
                {admin && admin.lozinka}
              </span>
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default Settings;
