import React, { useState } from "react";
import axios from "axios";
import { useOpenAI } from "../Context/apiContext";

const FormComponent = ({ onSubmit, onMoveBackward }) => {
  const fieldNames = ["01", "02", "03", "04", "05"];
  const { setResponse } = useOpenAI();

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

  // Replace 'YOUR_API_KEY' with your actual OpenAI API key
  const apiKey = "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";
  const engine = "text-davinci-003"; // GPT-3.5-turbo

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit();
    console.log("form", formData);

    // Prepare the prompt for OpenAI
    const prompt = Object.values(formData).join("\n");

    try {
      // Make a request to the OpenAI API
      const response = await axios.post(
        `https://api.openai.com/v1/engines/${engine}/completions`,
        {
          prompt,
          max_tokens: 400,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the OpenAI response (you may need to customize this part)
      const openaiResponse = response.data.choices[0].text.trim();
      console.log("OpenAI response:", openaiResponse);
      setResponse(openaiResponse);

      // Continue with the rest of your form submission logic
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
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

      <div className="mb-6 gap-[10px] flex justify-center">
        <button
          className="bg-white text-[32px] hover:border-[#696969] text-[#696969] font-[700] border-2 font-bold py-2 px-6 rounded-[5px] focus:outline-none focus:shadow-outline"
          onClick={onMoveBackward}
        >
          Atrás
        </button>
        <button
          className="bg-[#696969] text-[32px] hover:bg-white text-[#F5F5F5] font-[700] hover:text-[#696969] border-2 font-bold py-2 px-4 rounded-[5px] focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
