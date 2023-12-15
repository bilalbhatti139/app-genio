import React, { useState, useEffect } from "react";
import { CircleLoader } from "react-spinners";
import genieImage from "../assets/pic3.jpg";
import { useOpenAI } from "../Context/apiContext";
import Informations from "../Components/Informations";
import RandomFarewellMessage from "../Components/Random";

const Step3 = ({ onMoveBackward }) => {
  const { openaiResponse, setResponse } = useOpenAI();
  const [responseReceived, setResponseReceived] = useState(false);
  useEffect(() => {
    return () => {
      setResponse(null);
    };
  }, []);
  useEffect(() => {
    if (openaiResponse) {
      // If openaiResponse is truthy, set responseReceived to true
      setResponseReceived(true);
    }
  }, [openaiResponse]);

  return (
    <div>
      <div className="flex md:flex-row sm:flex-col flex-col gap-[30px] custom-box-shadow  p-10">
        <div className="md:w-1/2 sm:w-[100%] w-[100%]">
          <img src={genieImage} alt="Your Alt Text" />
        </div>

        <div className="md:w-1/2 sm:w-[100%] w-[100%] whitespace-normal text-[16px] font-[500] text-[#696969] leading-[36px]">
          {responseReceived ? (
            <>
              <p>{openaiResponse?.descr1}</p>
              <Informations json={openaiResponse} />
            </>
          ) : (
            <div className="flex flex-col justify-center h-full items-center">
              <p className="mb-4 text-[#696969]">
                ¡Maravilloso! Utilizaré mi encanto para encontrar la solución
                que buscas.
              </p>

              <div className="loader-container">
                <CircleLoader
                  height="80"
                  width="80"
                  color="#9c69ae"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
              <span className="ml-2">Cargando</span>
            </div>
          )}
        </div>
      </div>
      <div className=" flex mt-3 justify-center ">
        <RandomFarewellMessage />
      </div>

      <div className=" flex flex-col mt-10 justify-center">
        <button
          className="bg-white text-[22px] hover:border-[#696969] text-[#696969] font-[700] border-2 font-bold py-2 px-3 rounded-[5px] focus:outline-none focus:shadow-outline"
          onClick={onMoveBackward}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default Step3;
