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
    izracunajPostarinu
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
  const addToCart = (proizvod, qty = 1) => {
    let pomProizvodi = []
    const idx = cart.proizvodi.findIndex(p => p.id === proizvod.id);
    if (idx >= 0) {
      const noviProizvodi = cart.proizvodi.map((p, i) =>
        i === idx ? { ...p, kolicina: p.kolicina + qty } : p
      );
      setCart({ brojKorpe: cart.brojKorpe, proizvodi: noviProizvodi });
    } else {
      const noviProizvodi = [...cart.proizvodi, { ...proizvod, kolicina: qty }];
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


  const ukupnaTezinaKorpe = () => {
    return cart.proizvodi.reduce((suma, p) => suma + (p.tezina || 0) * p.kolicina, 0);
  };

  // ✅ Izračunaj cenu poštarine na osnovu ukupne težine (kg)
  const izracunajPostarinu = () => {
    const tezina = ukupnaTezinaKorpe();
    if (tezina < 2) return 450;
    if (tezina < 5) return 600;
    if (tezina < 10) return 720;
    if (tezina < 15) return 850;
    if (tezina < 20) return 980;
    if (tezina < 30) return 1350;
    if (tezina < 50) return 1780;
    // Za težine preko 50kg zahtev za posebnu ponudu
    return (1780 + 43*(tezina-50));
  };

  return (
    <Context.Provider
      value={{
        cart,
        addToCart,
        decreaseFromCart,
        removeFromCart,
        brojProizvodaUKorpi,
        setCart,
        izracunajPostarinu
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
