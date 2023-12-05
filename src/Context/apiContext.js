import React, { createContext, useContext, useState } from 'react';

const OpenAIContext = createContext();

export const OpenAIProvider = ({ children }) => {
  const [openaiResponse, setOpenaiResponse] = useState('');

  const setResponse = (response) => {
    setOpenaiResponse(response);
  };

  return (
    <OpenAIContext.Provider value={{ openaiResponse, setResponse }}>
      {children}
    </OpenAIContext.Provider>
  );
};

export const useOpenAI = () => {
  const context = useContext(OpenAIContext);
  if (!context) {
    throw new Error('useOpenAI must be used within an OpenAIProvider');
  }
  return context;
};
