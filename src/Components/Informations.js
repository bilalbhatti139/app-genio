import React from "react";

const Informations = ({ json }) => {
  return (
    <div>
      {/* Render the poem at the beginning */}
      <div>
        <p>{json["poema"]}</p>
        <br />
      </div>

      {/* Render product recommendations and links separately for each product */}
      <div>
        <p>
          {json["producto1"]}: {json["recomendacion1"]}
        </p>
        <p>
          <a
            href={`https://www.todocoleccion.net/buscador?bu=%7B${json["producto1"]}%7D&sec=%7B%7B${json["recomendacion1"]}%7D%7D&O=menos`}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </p>
      </div>

      <div>
        <p>
          {json["producto2"]}: {json["recomendacion2"]}
        </p>
        <p>
          <a
            href={`https://www.todocoleccion.net/buscador?bu=%7B${json["producto2"]}%7D&sec=%7B%7B${json["recomendacion2"]}%7D%7D&O=menos`}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </p>
      </div>

      <div>
        <p>
          {json["producto3"]}: {json["recomendacion3"]}
        </p>
        <p>
          <a
            href={`https://www.todocoleccion.net/buscador?bu=%7B${json["producto3"]}%7D&sec=%7B%7B${json["recomendacion3"]}%7D%7D&O=menos`}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </p>
      </div>

      <div>
        <p>
          {json["producto4"]}: {json["recomendacion4"]}
        </p>
        <p>
          <a
            href={`https://www.todocoleccion.net/buscador?bu=%7B${json["producto4"]}%7D&sec=%7B%7B${json["recomendacion4"]}%7D%7D&O=menos`}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </p>
      </div>

      <div>
        <p>
          {json["producto5"]}: {json["recomendacion5"]}
        </p>
        <p>
          <a
            href={`https://www.todocoleccion.net/buscador?bu=%7B${json["producto5"]}%7D&sec=%7B%7B${json["recomendacion5"]}%7D%7D&O=menos`}
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </p>
      </div>
    </div>
  );
};

export default Informations;
