import React from "react";

const Informations = ({ json }) => {
  return (
    <div>
      {/* Render the poem at the beginning */}
      <p>{json["poema"]}</p>
      <br />

      {/* Render product recommendations and links separately for each product */}
      {Array.from({ length: 5 }, (_, i) => {
        const productKey = `titulo${i + 1}`;
        const descriptionKey = `producto${i + 1}`;
        return (
          <div key={productKey} className="mt-4">
             <p>
              <span className="font-bold">{json[productKey]}</span>: {json[descriptionKey]}
            </p>
            <a
              style={{ wordBreak: "break-word" }}
              href={`https://www.todocoleccion.net/buscador?bu=%7B${json[productKey]}%7D&sec=%7B%7B{{category}}%7D%7D&O=menos`}
              target="_blank"
              rel="noopener noreferrer"
            >
             Vermas
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default Informations;
