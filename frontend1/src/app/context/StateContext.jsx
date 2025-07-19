'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cart, setCart] = useState({ brojKorpe: null, proizvodi: [] });

  // Učitaj iz localStorage jednom na klijentu
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('korpa');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (!parsed.brojKorpe) {
            parsed.brojKorpe = `KORPA-${Date.now()}`;
          }
          setCart(parsed);
          localStorage.setItem('korpa', JSON.stringify(parsed));
        } else {
          const newCart = { brojKorpe: `KORPA-${Date.now()}`, proizvodi: [] };
          localStorage.setItem('korpa', JSON.stringify(newCart));
          setCart(newCart);
        }
      } catch (e) {
        console.error('Neispravan JSON u korpi, resetujem.', e);
        const newCart = { brojKorpe: `KORPA-${Date.now()}`, proizvodi: [] };
        localStorage.setItem('korpa', JSON.stringify(newCart));
        setCart(newCart);
      }
    }
  }, []);

  // Sinhronizuj localStorage svaki put kad se `cart` menja
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('korpa', JSON.stringify(cart));
    }
  }, [cart]);

  // ✅ Normalizuj slike u niz stringova (URL-ova)
  const normalizeSlike = (slike) => {
    if (!Array.isArray(slike)) return [];
    return slike
      .map(s => {
        if (typeof s === 'string') return s;
        if (typeof s === 'object' && s !== null) return s.urlSlika || '';
        return '';
      })
      .filter(Boolean);
  };

  // ✅ Dodaj proizvod u korpu
  const addToCart = (proizvod) => {
    let pomProizvodi = []
    const idx = cart.proizvodi.findIndex(p => p.id === proizvod.id);
    if (idx >= 0) {
      const noviProizvodi = cart.proizvodi.map((p, i) =>
        i === idx ? { ...p, kolicina: p.kolicina + 1 } : p
      );
      setCart({ brojKorpe: cart.brojKorpe, proizvodi: noviProizvodi });
    } else {
      const noviProizvodi = [...cart.proizvodi, { ...proizvod, kolicina: 1 }];
      setCart({ brojKorpe: cart.brojKorpe, proizvodi: noviProizvodi });
    }
  };

  // ✅ Smanji količinu proizvoda
  const decreaseFromCart = (proizvod) => {
    setCart(prev => {
      const noviProizvodi = prev.proizvodi
        .map(p => {
          if (p.id === proizvod.id) {
            return { ...p, kolicina: p.kolicina - 1 };
          }
          return p;
        })
        .filter(p => p.kolicina > 0);
      return { ...prev, proizvodi: noviProizvodi };
    });
  };

  // ✅ Ukloni proizvod iz korpe
  const removeFromCart = (id) => {
    setCart(prev => ({
      ...prev,
      proizvodi: prev.proizvodi.filter(p => p.id !== id),
    }));
  };

  // ✅ Ukupan broj proizvoda u korpi
  const brojProizvodaUKorpi = cart.proizvodi.reduce((suma, p) => suma + p.kolicina, 0);

  return (
    <Context.Provider
      value={{
        cart,
        addToCart,
        decreaseFromCart,
        removeFromCart,
        brojProizvodaUKorpi,
        setCart
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
