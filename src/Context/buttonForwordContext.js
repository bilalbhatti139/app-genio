// buttonContext.js
import React, { createContext, useContext, useState } from "react";

const ButtonTextForwardContext = createContext();

export const ButtonTextForwardProvider = ({ children }) => {
  const [buttonsText, setButtonsText] = useState("");
  const [pressedButtonText, setPressedButtonText] = useState("");

  const updateButtonsText = (text) => {
    setButtonsText(text);
  };

  const savePressedButtonText = () => {
    setPressedButtonText(buttonsText);
  };

  return (
    <ButtonTextForwardContext.Provider
      value={{ buttonsText, updateButtonsText, pressedButtonText, savePressedButtonText }}
    >
      {children}
    </ButtonTextForwardContext.Provider>
  );
};

export const usePresssedButtonsText = () => {
  return useContext(ButtonTextForwardContext);
};
