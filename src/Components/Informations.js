import React from "react";
import { usePresssedButtonsText } from "../Context/buttonForwordContext";

const Informations = ({ json }) => {
  const { buttonsText } = usePresssedButtonsText();

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
              <span className="font-bold">{`${json[productKey]}:`}</span>
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
    </div>
  );
};

export default Informations;
