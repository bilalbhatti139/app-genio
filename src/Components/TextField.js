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

    getRandomQuestions();
  }, [questions]);
  // formatted
  const formatResponse = (response) => {
    const maxWordsPerLine = 7;

    let formattedResponse = response.replace(/^(\d+)/gm, "\n$1");

    formattedResponse = formattedResponse.replace(/{|}/g, "");

    formattedResponse = formattedResponse.replace(
      /(http[s]?:\/\/[^\s]+)/g,
      (_, url) => `<a href="${url}" target="_blank">${url}</a>`
    );

    // Split the response into lines
    const lines = formattedResponse.split("\n");

    // Ensure each line has a maximum of maxWordsPerLine words
    const formattedLines = lines.map((line, index) => {
      const words = line.split(" ");
      const formattedLine =
        words.length > maxWordsPerLine
          ? words.slice(0, maxWordsPerLine).join(" ") +
            "\n" +
            words.slice(maxWordsPerLine).join(" ")
          : line;

      return (
        <p key={index} dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });

    return formattedLines;
  };

  // Example usage

  // Render the formattedResponse in your component

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
  const engine = "gpt-3.5-turbo";
  function convertStringToJson(apiResponse) {
    try {
      // Try parsing the JSON directly
      // const cleanedJsonString = apiResponse.replace(/[\x00-\x1F\x7F]/g, "");

      const jsonObject = JSON.parse(apiResponse);

      return jsonObject;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Input JSON substring:", apiResponse.substring(1350, 1370));
      processChatGPTRequest();

      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit();
    const systemContent =
      selectedQuestions.length !== 0
        ? `Eres un asesor con mucho sentido del humor y debes proporcionar recomendaciones basadas en las respuestas del usuario. El usuario es un coleccionista al que le gustan las bromas. A continuación, se presentan preguntas con sus respectivas respuestas. Con base en esta información, crea un pequeño poema, chiste o acertijo (máximo 8 líneas) y recomienda 5 productos concretos de la categoría {{category}}, que se puedan encontrar en todocoleccion. Recuerda que si estamos en  ${buttonsText} SOLO QUIERO LOS TÍTULOS, el autor y una descripción con sentido del humor de al menos 50 palabras. Ni colecciones, ni posters, ni me digas el formato del producto. NO QUIERO NADA QUE NO SEA EL TÍTULO.  Vas a darme las respuesta en formato JSON. La estructura de tu respuesta tiene que ser un JSON  SIEMPRE. No incluyas nada extra que no esté en esta estructura que te proporciono. Devuelve solo este JSON con los valores correspondientes:
        "poema"
        "titulo1"
        "autor1"
        "descripcion1"
        "titulo2"
        "autor2"
        "descripcion2"
        "titulo3"
        "autor3"
        "descripcion3"
        "titulo4"
        "autor4"
        "descripcion4"
        "titulo5"
        "autor5"
        "descripcion5"
        Cuando termines de generar el JSON para, no hagas una nueva iteración
        Preguntas y respuestas:
        {question-1}:{answer-1}
        {question-2}:{answer-2}
        {question-3}:{answer-3}
        {question-4}:{answer-4}
        {question-5}:{answer-5}`
        : `Eres un asesor con mucho sentido del humor y debes proporcionar recomendaciones basadas en las respuestas del usuario. El usuario es un coleccionista al que le gustan las bromas. Genera un JSON con títulos cortos y precisos, de máximo dos palabras, junto con descripciones desenfadadas de por lo menos 50 palabras, para 5 objetos que podría encontrar en todocoleccion, (tienen que ser productos relacionados con arte, antigüedades, coleccionismo, libros,... y cosas que puedan comprarse en todocoleccion,) atendiendo a la descripción proporcionada. Con base en esta información, crea también un pequeño poema, chiste o acertijo (máximo 8 líneas) La estructura de tu respuesta tiene que ser un JSON SIEMPRE. No incluyas nada extra que no esté en esta estructura que te proporciono. Cuando termines de generar el JSON para, no hagas una nueva iteración. NO ME RESPONDAS MÁS DE UNA VEZ. SOLO UN JSON Devuelve solo este JSON con los valores correspondientes:
"poema"
"titulo1"
"descripcion1"
"titulo2"
"descripcion2"
"titulo3"
"descripcion3"
"titulo4"
"descripcion4"
"titulo5"
"descripcion5"
Descripción:
{answer-1}`;

    const prompt =
      selectedQuestions.length !== 0
        ? `
        Eres un asesor con mucho sentido del humor y debes proporcionar recomendaciones basadas en las respuestas del usuario. El usuario es un coleccionista al que le gustan las bromas. A continuación, se presentan preguntas con sus respectivas respuestas. Con base en esta información, crea un pequeño poema, chiste o acertijo (máximo 8 líneas) y recomienda 5 productos concretos de la categoría ${buttonsText}, que se puedan encontrar en todocoleccion. Recuerda que si estamos en  {{category}} SOLO QUIERO LOS TÍTULOS, el autor y una descripción con sentido del humor de al menos 50 palabras. Ni colecciones, ni posters, ni me digas el formato del producto. NO QUIERO NADA QUE NO SEA EL TÍTULO.  Vas a darme las respuesta en formato JSON. La estructura de tu respuesta tiene que ser un JSON  SIEMPRE. No incluyas nada extra que no esté en esta estructura que te proporciono. Devuelve solo este JSON con los valores correspondientes:
        "poema"
        "titulo1"
        "autor1"
        "descripcion1"
        "titulo2"
        "autor2"
        "descripcion2"
        "titulo3"
        "autor3"
        "descripcion3"
        "titulo4"
        "autor4"
        "descripcion4"
        "titulo5"
        "autor5"
        "descripcion5"
        Cuando termines de generar el JSON para, no hagas una nueva iteración
        Preguntas y respuestas:
        {question-1}:{answer-1}
        {question-2}:{answer-2}
        {question-3}:{answer-3}
        {question-4}:{answer-4}
        {question-5}:{answer-5}
  
    ${questions
      .map(
        (question, index) => `${question}:${formData[`question-${index + 1}`]}`
      )
      .join("\n")}
  `
        : `Eres un asesor con mucho sentido del humor y debes proporcionar recomendaciones basadas en las respuestas del usuario. El usuario es un coleccionista al que le gustan las bromas. Genera un JSON con títulos cortos y precisos, de máximo dos palabras, junto con descripciones desenfadadas de por lo menos 50 palabras, para 5 objetos que podría encontrar en todocoleccion, (tienen que ser productos relacionados con arte, antigüedades, coleccionismo, libros,... y cosas que puedan comprarse en todocoleccion,) atendiendo a la descripción proporcionada. Con base en esta información, crea también un pequeño poema, chiste o acertijo (máximo 8 líneas) La estructura de tu respuesta tiene que ser un JSON SIEMPRE. No incluyas nada extra que no esté en esta estructura que te proporciono. Cuando termines de generar el JSON para, no hagas una nueva iteración. NO ME RESPONDAS MÁS DE UNA VEZ. SOLO UN JSON Devuelve solo este JSON con los valores correspondientes:
        "poema"
        "titulo1"
        "descripcion1"
        "titulo2"
        "descripcion2"
        "titulo3"
        "descripcion3"
        "titulo4"
        "descripcion4"
        "titulo5"
        "descripcion5"
        Descripción:
        {answer-1}
        ${questions
          .map((index) => `${formData[`question-${index + 1}`]}`)
          .join("\n")}`;
    try {
      // Make a request to the OpenAI API
      const response = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: systemContent,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 1200,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the OpenAI response

      // Log the full OpenAI response for debugging or saving purposes

      // Access and set the assistant's response content if needed
      const openaiResponse = response.data.choices[0].message.content.trim();
      // console.log("tv", openaiResponse);
      const formattedResponse = formatResponse(openaiResponse);

      // Set the formatted response
      setResponse(formattedResponse);
      const jsonObject = convertStringToJson(openaiResponse)
      // const jsonObject = JSON.parse(openaiResponse);
      console.log("jj", jsonObject);
      setResponse(jsonObject);

      // Convert the string response to JSON
      // const jsonobj = convertStringToJson(formattedResponse);

      // // Set the JSON response
      // setResponse(jsonobj);

      // Log the response
      console.log("Response", openaiResponse);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
    }
  };
  const processChatGPTRequest = async () => {
    const apiKey = "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";
    const engine = "gpt-3.5-turbo";
    try {
      // Make the initial request to OpenAI API
      const systemContent =
      selectedQuestions.length !== 0
        ? `Eres un asesor con mucho sentido del humor y debes proporcionar recomendaciones basadas en las respuestas del usuario. El usuario es un coleccionista al que le gustan las bromas. A continuación, se presentan preguntas con sus respectivas respuestas. Con base en esta información, crea un pequeño poema, chiste o acertijo (máximo 8 líneas) y recomienda 5 productos concretos de la categoría {{category}}, que se puedan encontrar en todocoleccion. Recuerda que si estamos en  ${buttonsText} SOLO QUIERO LOS TÍTULOS, el autor y una descripción con sentido del humor de al menos 50 palabras. Ni colecciones, ni posters, ni me digas el formato del producto. NO QUIERO NADA QUE NO SEA EL TÍTULO.  Vas a darme las respuesta en formato JSON. La estructura de tu respuesta tiene que ser un JSON  SIEMPRE. No incluyas nada extra que no esté en esta estructura que te proporciono. Devuelve solo este JSON con los valores correspondientes:
        "poema"
        "titulo1"
        "autor1"
        "descripcion1"
        "titulo2"
        "autor2"
        "descripcion2"
        "titulo3"
        "autor3"
        "descripcion3"
        "titulo4"
        "autor4"
        "descripcion4"
        "titulo5"
        "autor5"
        "descripcion5"
        Cuando termines de generar el JSON para, no hagas una nueva iteración
        Preguntas y respuestas:
        {question-1}:{answer-1}
        {question-2}:{answer-2}
        {question-3}:{answer-3}
        {question-4}:{answer-4}
        {question-5}:{answer-5}`
        : `Eres un asesor con mucho sentido del humor y debes proporcionar recomendaciones basadas en las respuestas del usuario. El usuario es un coleccionista al que le gustan las bromas. Genera un JSON con títulos cortos y precisos, de máximo dos palabras, junto con descripciones desenfadadas de por lo menos 50 palabras, para 5 objetos que podría encontrar en todocoleccion, (tienen que ser productos relacionados con arte, antigüedades, coleccionismo, libros,... y cosas que puedan comprarse en todocoleccion,) atendiendo a la descripción proporcionada. Con base en esta información, crea también un pequeño poema, chiste o acertijo (máximo 8 líneas) La estructura de tu respuesta tiene que ser un JSON SIEMPRE. No incluyas nada extra que no esté en esta estructura que te proporciono. Cuando termines de generar el JSON para, no hagas una nueva iteración. NO ME RESPONDAS MÁS DE UNA VEZ. SOLO UN JSON Devuelve solo este JSON con los valores correspondientes:
"poema"
"titulo1"
"descripcion1"
"titulo2"
"descripcion2"
"titulo3"
"descripcion3"
"titulo4"
"descripcion4"
"titulo5"
"descripcion5"
Descripción:
{answer-1}`;
      const prompt =
      selectedQuestions.length !== 0
        ? 
        `Eres un asesor con mucho sentido del humor y debes proporcionar recomendaciones basadas en las respuestas del usuario. El usuario es un coleccionista al que le gustan las bromas. A continuación, se presentan preguntas con sus respectivas respuestas. Con base en esta información, crea un pequeño poema, chiste o acertijo (máximo 8 líneas) y recomienda 5 productos concretos de la categoría ${buttonsText}, que se puedan encontrar en todocoleccion. Recuerda que si estamos en  {{category}} SOLO QUIERO LOS TÍTULOS, el autor y una descripción con sentido del humor de al menos 50 palabras. Ni colecciones, ni posters, ni me digas el formato del producto. NO QUIERO NADA QUE NO SEA EL TÍTULO.  Vas a darme las respuesta en formato JSON. La estructura de tu respuesta tiene que ser un JSON  SIEMPRE. No incluyas nada extra que no esté en esta estructura que te proporciono. Devuelve solo este JSON con los valores correspondientes:
        "poema"
        "titulo1"
        "autor1"
        "descripcion1"
        "titulo2"
        "autor2"
        "descripcion2"
        "titulo3"
        "autor3"
        "descripcion3"
        "titulo4"
        "autor4"
        "descripcion4"
        "titulo5"
        "autor5"
        "descripcion5"
        Cuando termines de generar el JSON para, no hagas una nueva iteración
        Preguntas y respuestas:
        {question-1}:{answer-1}
        {question-2}:{answer-2}
        {question-3}:{answer-3}
        {question-4}:{answer-4}
        {question-5}:{answer-5}
  
    ${questions
      .map(
        (question, index) => `${question}:${formData[`question-${index + 1}`]}`
      )
      .join("\n")}
  `
        : `Eres un asesor con mucho sentido del humor y debes proporcionar recomendaciones basadas en las respuestas del usuario. El usuario es un coleccionista al que le gustan las bromas. Genera un JSON con títulos cortos y precisos, de máximo dos palabras, junto con descripciones desenfadadas de por lo menos 50 palabras, para 5 objetos que podría encontrar en todocoleccion, (tienen que ser productos relacionados con arte, antigüedades, coleccionismo, libros,... y cosas que puedan comprarse en todocoleccion,) atendiendo a la descripción proporcionada. Con base en esta información, crea también un pequeño poema, chiste o acertijo (máximo 8 líneas) La estructura de tu respuesta tiene que ser un JSON SIEMPRE. No incluyas nada extra que no esté en esta estructura que te proporciono. Cuando termines de generar el JSON para, no hagas una nueva iteración. NO ME RESPONDAS MÁS DE UNA VEZ. SOLO UN JSON Devuelve solo este JSON con los valores correspondientes:
        "poema"
        "titulo1"
        "descripcion1"
        "titulo2"
        "descripcion2"
        "titulo3"
        "descripcion3"
        "titulo4"
        "descripcion4"
        "titulo5"
        "descripcion5"
        Descripción:
        {answer-1}
        ${questions
          .map((index) => `${formData[`question-${index + 1}`]}`)
          .join("\n")}`
     ;

      try {
        // Make a request to the OpenAI API
        const response = await axios.post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:systemContent,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 1200,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Handle the OpenAI response

        // Log the full OpenAI response for debugging or saving purposes

        // Access and set the assistant's response content if needed
        const openaiResponse = response.data.choices[0].message.content.trim();
        // console.log("tv", openaiResponse);
        const formattedResponse = formatResponse(openaiResponse);

        // Set the formatted response
        setResponse(formattedResponse);
        const jsonObject=convertStringToJson(openaiResponse);
        // const jsonObject = JSON.parse(openaiResponse);
        console.log("jj", jsonObject);
        setResponse(jsonObject);

        // Convert the string response to JSON
        // const jsonobj = convertStringToJson(formattedResponse);

        // // Set the JSON response
        // setResponse(jsonobj);

        // Log the response
        console.log("Response", openaiResponse);
      } catch (error) {
        console.error("Error processing chat request:", error);

        // If an error occurs, you may choose to retry or handle it accordingly
        // Here, we'll retry the entire process by calling processChatGPTRequest again
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  // console.log("formdata", formData);
  return (
    <form className=" mt-8" onSubmit={handleSubmit}>
      <h1 className="font-[600] text-[24px] text-[#5082C8]">
        ¡GENIAL! VAMOS A BUSCAR {buttonsText.toUpperCase()}
      </h1>
      {selectedQuestions.length === 0
        ? Array.from({ length: 1 }, (_, index) => (
            <div key={index} className="mb-8">
              <input
                className="shadow text-[#696969] appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={`question-${index + 1}`}
                type="text"
                placeholder={`Escribe aquí tu respuesta`}
                name={`question-${index + 1}`}
                value={formData[`question-${index + 1}`] || ""}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </div>
          ))
        : // ... (remaining code)

          selectedQuestions.map((question, index) => (
            <div key={index} className="mb-4">
              {/* Render your questions and inputs here */}
              <label
                className="block text-[#000000] text-[20px] font-[500] mb-2"
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
                value={formData[`question-${index + 1}`] || ""}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </div>
          ))}

      <div className="mb-6 gap-[10px] flex justify-center">
        <button
          className="bg-white text-[20px] hover:border-[#696969] text-[#696969] font-[700] border-2 font-bold py-2 px-3 rounded-[5px] focus:outline-none focus:shadow-outline"
          onClick={onMoveBackward}
        >
          Volver al inicio
        </button>
        <button
          className="bg-[#009F3C] text-[20px] hover:bg-white text-[#F5F5F5] font-[700] hover:text-[#696969] border-2 font-bold py-2 px-3 rounded-[5px] focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Invocar al genio
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
