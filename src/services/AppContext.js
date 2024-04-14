import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [bloodType, setBloodType] = useState(null);

  return (
    <AppContext.Provider value={{ bloodType, setBloodType }}>
      {children}
    </AppContext.Provider>
  );
};
