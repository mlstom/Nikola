import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../context/StateContext';
import { useNavigate , useLocation} from "react-router-dom";


const Login = () => {
  const { setAdmin,backURL } = useStateContext();
  const [formData, setFormData] = useState({ userName: '', lozinka: '' });
  const [nepostojeci, setnepostojeci] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Stanje za vidljivost lozinke
  let navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
      if(admin){
        navigate('/proizvodi')
      }
      
      
      fetchProizvodi()
      fetchKupci()
    }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Menja vidljivost lozinke
  };

  const loginAdmin = async (e) => {
    e.preventDefault(); // Sprečava refresh stranice pri submit-u
    try {
      const response = await axios.post(`${backURL}/api/admin/login`,formData);
      setAdmin(response.data.admin)
      console.log("Login uspeo");
      navigate("/proizvodi");
    } catch (error) {
      console.log('Login failed:', error);
      setnepostojeci(true);
      setTimeout(() => {
        setnepostojeci(false);
      }, 3000);
    }
  };

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 rounded-xl shadow-lg bg-gray-800 border-[#d39430] border-2 ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold  text-white">Prijava</h1>
          </div>

          <div className="mt-5">
            <form onSubmit={loginAdmin}>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="userName" className="block text-sm font-bold ml-1 mb-2 text-white">
                    Korisničko ime
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    className="py-3 px-4 text-white block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#d39430] focus:ring-[#d39430] shadow-sm"
                    required
                  />

                  <label htmlFor="lozinka" className="block text-sm font-bold ml-1 mb-2 text-white">
                    Lozinka
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"} // Menja tip inputa u zavisnosti od stanja
                      id="lozinka"
                      name="lozinka"
                      value={formData.lozinka}
                      onChange={handleInputChange}
                      className="py-3 px-4 block w-full text-white border-2 border-gray-200 rounded-md text-sm focus:border-[#d39430] focus:ring-[#d39430] shadow-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {passwordVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" color='white' strokeLinejoin="round" strokeWidth="2" d="M15 12h.01M12 4a9.98 9.98 0 0 1 6.73 2.73l1.73-1.73A12 12 0 0 0 12 2c-3.33 0-6.33 1.35-8.48 3.52l1.73 1.73A9.98 9.98 0 0 1 12 4zm0 16a9.98 9.98 0 0 1-6.73-2.73l-1.73 1.73A12 12 0 0 0 12 22c3.33 0 6.33-1.35 8.48-3.52l-1.73-1.73A9.98 9.98 0 0 1 12 20z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h.01M12 4a9.98 9.98 0 0 1 6.73 2.73l1.73-1.73A12 12 0 0 0 12 2c-3.33 0-6.33 1.35-8.48 3.52l1.73 1.73A9.98 9.98 0 0 1 12 4zm0 16a9.98 9.98 0 0 1-6.73-2.73l-1.73 1.73A12 12 0 0 0 12 22c3.33 0 6.33-1.35 8.48-3.52l-1.73-1.73A9.98 9.98 0 0 1 12 20z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {nepostojeci && (
                  <p className="text-xs text-red-600 mt-2" id="email-error">
                    Neispravno korisničko ime ili lozinka
                  </p>
                )}

                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-700 focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                >
                  Prijavi se
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
