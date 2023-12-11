
import React from "react";

const Informations = ({ json }) => {
  return (
    <div>
      {/* Render the poem at the beginning */}
      <div>
        <p>
          <em>{json?.poema}</em>
        </p>
      </div>

      {/* Render each book information only once */}
      <div>
        <p className="font-bold">{json?.titulo1}</p>
        <p>{json?.descr1}</p>
        <p>
          <a
            href={json?.enlace1}
            target="_blank"
            rel="noopener noreferrer"
          >
            {json?.enlace1}
          </a>
        </p>
        <br />
      </div>

      <div>
        <p className="font-bold">{json?.titulo2}</p>
        <p>{json?.descr2}</p>
        <p>
          <a
            href={json?.enlace2}
            target="_blank"
            rel="noopener noreferrer"
          >
            {json?.enlace2}
          </a>
        </p>
        <br />
      </div>

      <div>
        <p className="font-bold">{json?.titulo3}</p>
        <p>{json?.descr3}</p>
        <p>
          <a
            href={json?.enlace3}
            target="_blank"
            rel="noopener noreferrer"
          >
            {json?.enlace3}
          </a>
        </p>
        <br />
      </div>

      <div>
        <p className="font-bold">{json?.titulo4}</p>
        <p>{json?.descr4}</p>
        <p>
          <a
            href={json?.enlace4}
            target="_blank"
            rel="noopener noreferrer"
          >
            {json?.enlace4}
          </a>
        </p>
        <br />
      </div>

      <div>
        <p className="font-bold">{json?.titulo5}</p>
        <p>{json?.descr5}</p>
        <p>
          <a
            href={json?.enlace5}
            target="_blank"
            rel="noopener noreferrer"
          >
            {json?.enlace5}
          </a>
        </p>
        <br />
      </div>
    </div>
  );
};

export default Informations;
