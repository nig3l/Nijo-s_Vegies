import React, { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(0);

  const depositMoney = (amount) => {
    setWalletBalance(prev => prev + amount);
  };

  const deductMoney = (amount) => {
    if (walletBalance >= amount) {
      setWalletBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{
      walletBalance,
      depositMoney,
      deductMoney
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
