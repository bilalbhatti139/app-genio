// buttonContext.js
import React, { createContext, useContext, useState } from "react";

const ButtonTextForwardContext = createContext();

export const ButtonTextForwardProvider = ({ children }) => {
  const [buttonsText, setButtonsText] = useState("");
  const [buttonsText2, setButtonsText2] = useState("");

  const [pressedButtonText, setPressedButtonText] = useState("");
  const [pressedButtonText2, setPressedButtonText2] = useState("");


  const updateButtonsText = (text) => {
    setButtonsText(text);
  };
  const updateButtonsText2 = (text) => {
    setButtonsText2(text);
  };
  const savePressedButtonText = () => {
    setPressedButtonText(buttonsText);
  };
  const savePressedButtonText2 = () => {
    setPressedButtonText2(buttonsText2);
  };

  return (
    <ButtonTextForwardContext.Provider
      value={{ buttonsText2,buttonsText, updateButtonsText, updateButtonsText2, pressedButtonText,
        pressedButtonText2,savePressedButtonText,savePressedButtonText2 }}
    >
      {children}
    </ButtonTextForwardContext.Provider>
  );
};

export const usePresssedButtonsText = () => {
  return useContext(ButtonTextForwardContext);
};
export const usePresssedButtonsText2 = () => {
  return useContext(ButtonTextForwardContext);
};