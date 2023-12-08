import React from "react";

const Informations = ({ json }) => {
  return (
    <div>
        <p>{json.poema}</p>
      {Object.keys(json).map((key) => (
        <div key={key}>
          {key === "poema" && (
            <div>
              <p>
                <em>{json[key]}</em>
              </p>
              <br />
            </div>
          )}
          {key !== "poema" && (
            <div>
              <p>{json[`titulo${key.charAt(key.length - 1)}`]}</p>
              <br />
              <p>{json[key]}</p>
              <br />
              <p>
                <a
                  href={json[`enlace${key.charAt(key.length - 1)}`]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {json[`enlace${key.charAt(key.length - 1)}`]}
                </a>
              </p>
              <br />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Informations;
