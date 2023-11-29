// FormComponent.jsx
import React, { useState } from "react";

const FormComponent = ({ onSubmit }) => {
  const fieldNames = ["01", "02", "03", "04", "05"];

  const [formData, setFormData] = useState(
    fieldNames.reduce((acc, fieldName) => {
      acc[fieldName] = "";
      return acc;
    }, {})
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <form className=" mt-8" onSubmit={handleSubmit}>
      <h1 className="font-[600] text-[32px] text-[#5082C8]">
        ¡GENIAL! VAMOS A BUSCAR LIBROS
      </h1>
      {fieldNames.map((fieldName) => (
        <div key={fieldName} className="mb-4">
          <label
            className="block text-[#000000] text-[24px] font-[500] mb-2"
            htmlFor={fieldName}
          >
            {`${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`}
            <span className="text-[#696969]">
              ¿ Cuál es tu género literario favorito?{" "}
            </span>
          </label>
          <input
            className="shadow text-[#696969] appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={fieldName}
            type="text"
            placeholder={"Escribe aquí tu respuesta . . ."}
            name={fieldName}
            value={formData[fieldName]}
            onChange={handleInputChange}
          />
        </div>
      ))}

      <div className="mb-6 flex justify-center">
        <button
          className="bg-[#696969] text-[32px] hover:bg-white text-[#F5F5F5] font-[700] hover:text-[#696969] border-2 font-bold py-2 px-4 rounded-[5px] focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
