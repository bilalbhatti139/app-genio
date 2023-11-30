import React from "react";
import { useState } from "react";

const Button = ({ onClick, text, borderRadius, Color }) => {
  const buttonClasses = `py-5 border-2 flex-grow md:w-[150px] lg:w-[200px] xl:w-[250px] sm:w-[120px] w-[100px] box-shadow-custom2 text-white hover:outline-none hover-border-2`;


  const buttonStyle = {
    borderRadius: `${borderRadius}px`,
    backgroundColor: Color,
    
   
  };

  const hoverStyles = {
    backgroundColor: "white",
    color: Color,
    border: `2px solid ${Color}`, // Set the border color to the value of Color
    // boxShadow: "0px 7px 4px 0px #00000029 inset, 0px 6px 8px 0px #00000038",
  };

  const [hover, setHover] = useState(false);

  return (
    <button
      className={buttonClasses}
      style={{ ...buttonStyle, ...(hover ? hoverStyles : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

// Update the ButtonList component
const ButtonList = ({ onMoveForward }) => {
  const buttonsData = [
    { text: "Libros", borderRadius: 5, Color: "#5082c8" },
    { text: "Películas", borderRadius: 5, Color: "#9E49C4" },
    { text: "Música", borderRadius: 5, Color: "#FFBD59" },
    { text: "Juguetes", borderRadius: 5, Color: "#D0A3CF" },
    { text: "Cómics", borderRadius: 5, Color: "#7600A9" },
    { text: "No lo tengo claro", borderRadius: 5, Color: "#C38E19" },
  ];

  // Split the buttonsData array into chunks of size 2
  const buttonRows = buttonsData.reduce(
    (rows, key, index) =>
      (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows,
    []
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center">
        {buttonRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-row justify-between gap-[30px] items-center mb-3"
          >
            {row.map((button, index) => (
              <Button
                key={index}
                text={button.text}
                borderRadius={button.borderRadius}
                Color={button.Color}
                onClick={() => {
                  console.log(`Button ${index + 1} clicked`);
                  if (onMoveForward) {
                    onMoveForward();
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};


export default ButtonList;
