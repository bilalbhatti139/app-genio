import React, { createContext, useContext, useState } from "react";

const ButtonTextContext = createContext();

export const ButtonTextProvider = ({ children }) => {
  const [buttonText, setButtonText] = useState("Otro");

  const updateButtonText = (newText) => {
    setButtonText(newText.toUpperCase());
  };

  return (
    <ButtonTextContext.Provider value={{ buttonText, updateButtonText }}>
      {children}
    </ButtonTextContext.Provider>
  );
};

export const useButtonText = () => {
  const context = useContext(ButtonTextContext);
  if (!context) {
    throw new Error("useButtonText must be used within a ButtonTextProvider");
  }
  return context;
};
