import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ButtonTextProvider } from "../src/Context/buttonContext";
import { OpenAIProvider } from "../src/Context/apiContext";
// index.js or where you import the context
import { ButtonTextForwardProvider } from "./Context/buttonForwordContext";

// ... (rest of your code)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ButtonTextForwardProvider>
      <ButtonTextProvider>
        <OpenAIProvider>
          <App />
        </OpenAIProvider>
      </ButtonTextProvider>
    </ButtonTextForwardProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
