import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CartModal from '../components/CartModal';

const Narudzbina = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    address2: "",
    city: "",
    country: "",
    post_code: "",
    save_info: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className='m-auto max-w-screen-xl px-6 py-8  sm:py-12 lg:px-8 flex flex-wrap items-center justify-center gap-10'>
      <CartModal />
      <div className="pt-4 pb-10 pl-8">
        <h4 className="text-center font-hk text-xl font-medium text-secondary sm:text-left md:text-2xl">
          Shipping address
        </h4>
        <div className="pt-4 md:pt-5">
          <div className="flex justify-between">
            <input type="text" placeholder="First Name" className="form-input mb-4  sm:mb-5" id="first_name" value={formData.first_name} onChange={handleChange} />
            <input type="text" placeholder="Last Name" className="form-input mb-4  sm:mb-5" id="last_name" value={formData.last_name} onChange={handleChange} />
          </div>
          <input type="text" placeholder="Your address" className="form-input mb-4 sm:mb-5" id="address" value={formData.address} onChange={handleChange} />
          <input type="text" placeholder="Apartment, Suite, etc" className="form-input mb-4 sm:mb-5" id="address2" value={formData.address2} onChange={handleChange} />
          <input type="text" placeholder="City" className="form-input mb-4 sm:mb-5" id="city" value={formData.city} onChange={handleChange} />
          <div className="flex justify-between">
            <input type="text" placeholder="Country/Region" className="form-input mb-4  sm:mb-5" id="country" value={formData.country} onChange={handleChange} />
            <input type="number" placeholder="Post code" className="form-input mb-4  sm:mb-5" id="post_code" value={formData.post_code} onChange={handleChange} />
          </div>
          <div className="flex items-center pt-2">
            <p className="pl-3 font-hk text-sm text-secondary">Prihvatamo plaćanje samo pouzećom</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-8 sm:flex-row sm:pt-12">
          <Link to="/korpa" className="group mb-3 flex items-center font-hk text-sm text-secondary transition-all hover:text-primary group-hover:font-bold sm:mb-0">   
            Return to Cart
          </Link>
          <a href="/cart/shipping-method" className="block  rounded-sm bg-orange-500 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:ring-3 focus:outline-hidden sm:w-auto"
          >Zavsi kupovinu</a>
        </div>
      </div>
      
    </div>
  );
}

export default Narudzbina