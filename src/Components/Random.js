import React ,{useEffect, useState} from "react";
import { usePresssedButtonsText } from "../Context/buttonForwordContext";

const FarewellMessages = [
  "¡Nos vemos en el reino de las genialidades! Me retiro elegantemente.",
  "¡Hasta la próxima aparición mágica! Voy a practicar mis trucos.",
  "¡Nos vemos en la próxima llamarada de genialidad! Me despido con estilo.",
  "¡Que la magia te acompañe hasta nuestro próximo encuentro! Me esfumo por ahora.",
  "¡Hasta la próxima, explorador de deseos! Me retiro a mi guarida mágica.",
  "¡Que tus días estén llenos de risas y genialidad! Nos encontraremos pronto.",
  "¡Adiós por ahora, pero recuerda que la magia siempre vuelve!"
];

const buttonsData = [
  { text: "Libros", borderRadius: 5, Color: "#5082c8", internal: "libros" },
  {
    text: "Películas",
    borderRadius: 5,
    Color: "#9E49C4",
    internal: "coleccionismo-cine",
  },
  {
    text: "Música",
    borderRadius: 5,
    Color: "#FFBD59",
    internal: "musica-discos-vinilos",
  },
  {
    text: "Juegos y Juguetes",
    borderRadius: 5,
    Color: "#D0A3CF",
    internal: "juguetes",
  },
  {
    text: "Cómics",
    borderRadius: 5,
    Color: "#7600A9",
    internal: "tebeos-comics",
  },
 
];

const RandomFarewellMessage = () => {
    const { buttonsText } = usePresssedButtonsText();
    const [randomMessage, setRandomMessage] = useState("");

    // Function to pick a random message
    const getRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * FarewellMessages.length);
      setRandomMessage(FarewellMessages[randomIndex]);
    };
  
    // Call this function to get a random message
useEffect(() => {
 getRandomMessage()
}, [])

  // Check if buttonText matches any internal value
  const isButtonValid = buttonsData.some((button) => button.internal === buttonsText);

  return (
    <div>
      {isButtonValid ? (
        null
      ) : (
        <p>{randomMessage}</p>
        )}
    </div>
  );
};

export default RandomFarewellMessage;
