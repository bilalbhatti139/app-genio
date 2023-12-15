import React from "react";
import { usePresssedButtonsText } from "../Context/buttonForwordContext";
import RandomFarewellMessage from "./Random";

const Informations = ({ json }) => {
  const { buttonsText } = usePresssedButtonsText();
  // const buttonsData = [
  //   { text: "Libros", borderRadius: 5, Color: "#5082c8", internal: "libros" },
  //   {
  //     text: "Películas",
  //     borderRadius: 5,
  //     Color: "#9E49C4",
  //     internal: "coleccionismo-cine",
  //   },
  //   {
  //     text: "Música",
  //     borderRadius: 5,
  //     Color: "#FFBD59",
  //     internal: "musica-discos-vinilos",
  //   },
  //   {
  //     text: "Juegos y Juguetes",
  //     borderRadius: 5,
  //     Color: "#D0A3CF",
  //     internal: "juguetes",
  //   },
  //   {
  //     text: "Cómics",
  //     borderRadius: 5,
  //     Color: "#7600A9",
  //     internal: "tebeos-comics",
  //   },

  // ];
  // let text='';
  // const isButtonValid = buttonsData.some((button) => button.internal === buttonsText);
  // {isButtonValid ? (
  //   text='descripcion'
  // ) : (
  //   text='descripcion'
  //   )}
  return (
    <div>
      {/* Render the poem at the beginning */}
      <p>{json["poema"]}</p>
      <br />

      {/* Render product recommendations and links separately for each product */}
      {Array.from({ length: 5 }, (_, i) => {
        const productKey = `titulo${i + 1}`;
        const descriptionKey = `descripcion${i + 1}`;
        const encodedProduct = json[productKey].replace(/ /g, "+");

        return (
          <div key={productKey} className="mt-4">
            <p>
              <span className="font-bold">{`${json[productKey]}: `}</span>
              {json[descriptionKey]}
            </p>

            <a
              style={{ wordBreak: "break-word" }}
              href={`https://www.todocoleccion.net/buscador?bu=${encodedProduct}&sec=${buttonsText}&O=menos`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver más
            </a>
          </div>
        );
      })}
      <RandomFarewellMessage />
    </div>
  );
};

export default Informations;
