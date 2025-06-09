import React, { createContext, useContext } from 'react';

const AcceloContext = createContext({
  apiKey: '',
  setApiKey: () => {},
});

export const useAccelo = () => {
  const context = useContext(AcceloContext);
  if (!context) {
    throw new Error('useAccelo must be used within AcceloProvider');
  }
  return context;
};

export const AcceloProvider = ({ children, value }) => {
  return (
    <AcceloContext.Provider value={value}>
      {children}
    </AcceloContext.Provider>
  );
};

export default AcceloContext;