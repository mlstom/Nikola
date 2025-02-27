import React, { createContext, useContext,  useState } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [admin,setAdmin ] = useState({id:1,userName:'Milos',password:'12345'})
  const [isOpenModel, setIsOpenModel] = useState(false)
  const [openProizvod, setOpenProizvod] = useState()
  return (
    <Context.Provider
      value={{
        admin,setAdmin,
        isOpenModel,setIsOpenModel,
        openProizvod,setOpenProizvod
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);