
import React from "react";

const Informations = ({ json }) => {
  return (
    <div>
      {/* Render the poem at the beginning */}
      <div>
        <p>
          <em>{json?.poema}</em>
        </p>
        <br />
      </div>

      {/* Render each book information only once */}
      <div>
        <p>{json?.titulo1}</p>
        <br />
        <p>{json?.descr1}</p>
        <br />
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
        <p>{json?.titulo2}</p>
        <br />
        <p>{json?.descr2}</p>
        <br />
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
        <p>{json?.titulo3}</p>
        <br />
        <p>{json?.descr3}</p>
        <br />
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
        <p>{json?.titulo4}</p>
        <br />
        <p>{json?.descr4}</p>
        <br />
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
        <p>{json?.titulo5}</p>
        <br />
        <p>{json?.descr5}</p>
        <br />
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
