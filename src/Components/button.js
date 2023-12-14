import React, { useState } from "react";
import { useButtonText } from "../Context/buttonContext";
import { usePresssedButtonsText } from "../Context/buttonForwordContext";
const Button = ({
  onClick,
  text,
  borderRadius,
  Color,
  isEditable,
  onChange,
}) => {
  const buttonClasses = `py-5 border-2 flex-grow md:w-[150px] lg:w-[200px] xl:w-[250px] sm:w-[120px] w-[100px] box-shadow-custom2 text-white hover:outline-none hover-border-2`;

  const buttonStyle = {
    borderRadius: `${borderRadius}px`,
    backgroundColor: Color,
  };

  const hoverStyles = {
    backgroundColor: "white",
    color: Color,
    border: `2px solid ${Color}`,
  };

  const [buttonHover, setButtonHover] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  const handleTextChange = (e) => {
    onChange(e);
    setButtonHover(true); // Show the checkmark when text is being edited
  };

  const handleBlur = () => {
    setButtonHover(false); // Hide the checkmark when input loses focus
    if (onClick) {
      onClick(); // Trigger move forward functionality
    }
  };

  if (isEditable) {
    return (
      <div className="flex-grow md:w-[150px] lg:w-[200px] xl:w-[250px] sm:w-[120px] w-[100px] box-shadow-custom2 relative">
        <input
          type="text"
          className={`py-5 border-2 flex-grow w-full hover:outline-none hover-border-2 text-white ${
            inputHover ? "bg-white text-" + Color + " border-" + Color : ""
          }`}
          style={{
            ...buttonStyle,
            ...(inputHover ? hoverStyles : {}),
            textAlign: "center",
          }}
          onMouseEnter={() => setInputHover(true)}
          onMouseLeave={() => setInputHover(false)}
          value={text}
          onChange={handleTextChange}
          onBlur={handleBlur}
        />
        {buttonHover && (
          <span
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            style={{ position: "absolute", right: "10px" }}
            onClick={() => {
              if (onClick) {
                onClick();
              }
            }}
          >
            ✔️
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      className={buttonClasses}
      style={{ ...buttonStyle, ...(buttonHover ? hoverStyles : {}) }}
      onMouseEnter={() => setButtonHover(true)}
      onMouseLeave={() => setButtonHover(false)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const ButtonList = ({ onMoveForward }) => {
  const { buttonText, updateButtonText } = useButtonText();
  const { updateButtonsText, savePressedButtonText } = usePresssedButtonsText();
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
    {
      text: buttonText,
      borderRadius: 5,
      Color: "#C38E19",
      isEditable: true,
      internal: buttonText,
    },
  ];

  const handleEditableTextChange = (event) => {
    updateButtonText(event.target.value);
  };

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
                isEditable={button.isEditable}
                onChange={handleEditableTextChange}
                onClick={(e) => {
                  updateButtonsText(button.internal);
                  savePressedButtonText();
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
