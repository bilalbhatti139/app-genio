import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOpenAI } from "../Context/apiContext";
import { usePresssedButtonsText } from "../Context/buttonForwordContext";
import jsondata from "../Json/data.json";
const FormComponent = ({ onSubmit, onMoveBackward }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [formData, setFormData] = useState("");
  const { buttonsText } = usePresssedButtonsText();

  const { setResponse } = useOpenAI();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from the JSON file based on the category prop
    const fetchQuestions = async () => {
      try {
        const categoryQuestions = jsondata.data[buttonsText] || [];
        setQuestions(categoryQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [buttonsText]); // Update questions when the category changes

  useEffect(() => {
    // Function to randomly select 5 questions
    const getRandomQuestions = () => {
      const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffledQuestions.slice(0, 5);
      setSelectedQuestions(selectedQuestions);
    };

    // Call the function when the component mounts or when questions are updated
    getRandomQuestions();
  }, [questions]);

  // Handle form submission logic
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Assuming each question has a unique name
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Replace 'YOUR_API_KEY' with your actual OpenAI API key
  const apiKey = "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";
  const engine = "text-davinci-003"; // GPT-3.5-turbo

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit();

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
      setResponse(openaiResponse);

      setResponse(openaiResponse);

      // Continue with the rest of your form submission logic
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
  };

  return (
    <form className=" mt-8" onSubmit={handleSubmit}>
      <h1 className="font-[600] text-[32px] text-[#5082C8]">
        ¡GENIAL! VAMOS A BUSCAR {buttonsText}
      </h1>
      {selectedQuestions.map((question, index) => (
        <div key={index} className="mb-4">
          {/* Render your questions and inputs here */}
          <label
            className="block text-[#000000] text-[24px] font-[500] mb-2"
            htmlFor={`question-${index + 1}`}
          >
            {question}
          </label>
          <input
            className="shadow text-[#696969] appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={`question-${index + 1}`}
            type="text"
            placeholder={"Escribe aquí tu respuesta . . ."}
            name={`question-${index + 1}`}
            value={formData[`question-${index + 1}`] || ""} // Use the corresponding value from formData
            onChange={(e) => {
              handleInputChange(e);
            }} // You can update this if you want to capture user input
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
