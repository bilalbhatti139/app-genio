import React from "react";
import genieImage from "../assets/pic3.jpg";
import { useOpenAI } from "../Context/apiContext";
const Step3 = ({ onMoveBackward }) => {
  const { openaiResponse } = useOpenAI();

  return (
    <div>
      <div className="flex md:flex-row sm:flex-col flex-col gap-[30px] custom-box-shadow  p-10">
        <div className="md:w-1/2 sm:w-[100%] w-[100%]">
          <img src={genieImage} alt="Your Alt Text" />
        </div>

        <div className="md:w-1/2 sm:w-[100%] w-[100%]  text-[16px] font-[500] text-[#696969] leading-[36px]">
          <p>{openaiResponse}</p>
        </div>
      </div>
      <div className=" flex mt-10 justify-center">
        <button
          className="bg-white text-[32px] hover:border-[#696969] text-[#696969] font-[700] border-2 font-bold py-2 px-6 rounded-[5px] focus:outline-none focus:shadow-outline"
          onClick={onMoveBackward}
        >
          Atrás

        </button>
      </div>
    </div>
  );
};

export default Step3;
