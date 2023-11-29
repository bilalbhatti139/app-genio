import React from "react";
import genieImage from "../assets/pic3.jpg";
const Step3 = ({onMoveBackward}) => {
  return (
    // ImageWithParagraph.js
    <div>
      <div className="flex md:flex-row sm:flex-col flex-col gap-[30px] custom-box-shadow  p-10">
        {/* Left side (image) */}
        <div className="md:w-1/2 sm:w-[100%] w-[100%]">
          <img
            src={genieImage} // Replace with the actual image source
            alt="Your Alt Text"
          />
        </div>

        {/* Right side (paragraph) */}
        <div className="md:w-1/2 sm:w-[100%] w-[100%]  text-[16px] font-[500] text-[#696969] leading-[36px]">
          <p className=" mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni
          </p>
          <p className=" mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            eniLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni
            Lorem
          </p>{" "}
          <p className=" mb-4">
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut eniLorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut eni
          </p>
        </div>
      </div>
      <div className=" flex mt-10 justify-center">
        <button className="bg-white text-[32px] hover:border-[#696969] text-[#696969] font-[700] border-2 font-bold py-2 px-6 rounded-[5px] focus:outline-none focus:shadow-outline"
        onClick={onMoveBackward}>
          
          Back
        </button>
      </div>
    </div>
  );
};

export default Step3;
