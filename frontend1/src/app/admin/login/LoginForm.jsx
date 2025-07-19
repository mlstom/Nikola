'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: '', lozinka: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/api/login', formData);
      if (res.status === 200) {
        router.push('/admin');
      }
    } catch (err) {
      setError('Neispravno korisničko ime ili lozinka.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-y-4">
        <div>
          <label className="text-white text-sm font-semibold">Korisničko ime</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="block w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
            required
          />

          <label className="text-white mt-4 text-sm font-semibold">Lozinka</label>
          <input
            type="password"
            name="lozinka"
            value={formData.lozinka}
            onChange={handleChange}
            className="block w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded">
          Prijavi se
        </button>
      </div>
    </form>
  );
}
