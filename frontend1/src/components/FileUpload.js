'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FileUpload({ proizvod,onFilesReady }) {
  const [slike, setSlike] = useState(proizvod?.slike || []);
  const [noveSlike, setNoveSlike] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setSlike(proizvod?.slike || []);
  }, [proizvod]);

  // Brisanje slike iz baze (postojeće slike)
  const handleRemoveStara = async (idSlike) => {
    try {
      await axios.delete(`https://www.alatinidza.rs/api/proizvodSlike/${idSlike}`);
      setSlike((prev) => prev.filter((slika) => slika.id !== idSlike));
    } catch (err) {
      console.error('Greška pri brisanju slike:', err);
    }
  };

  // Brisanje nove slike (lokalni preview)
  const handleRemoveNova = (index) => {
    setNoveSlike((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const validFiles = selectedFiles.filter((file) => {
      const ext = file.name.split('.').pop().toLowerCase();
      return ['jpg', 'jpeg', 'png'].includes(ext);
    });

    if (validFiles.length !== selectedFiles.length) {
      setError('Samo JPG, JPEG i PNG su dozvoljeni.');
      return;
    }

    setError('');

    const previewi = validFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setNoveSlike((prev) => [...prev, ...previewi]);
    onFilesReady((prev)=>[...prev,...previewi])
    event.target.value = '';
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      <label className="w-[120px] h-[88px] flex flex-col items-center px-4 py-6 bg-white text-orange-500 rounded-lg shadow-lg tracking-wide uppercase border border-orange-700 cursor-pointer hover:bg-orange-700 hover:text-white">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Dodaj slike</span>
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleFileChange}
        />
      </label>

      {noveSlike.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {noveSlike.map((slikaObj, index) => (
            <div key={index} className="relative">
              <img
                src={slikaObj.previewUrl}
                alt={`nova-slika-${index}`}
                className="h-16 w-16 rounded-md object-cover border"
              />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 hover:bg-red-700"
                onClick={() => handleRemoveNova(index)}
                type="button"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
