import React from "react";
import Button from "../Components/button";
import genieImage from "../assets/1.png";
import genieImage2 from "../assets/2.png";
import Step1 from "../pages/step1";
import Step2 from "../pages/step2";
import Step3 from "../pages/step3";
import CustomStepper from "../Components/stepper";
import ButtonList from "../Components/button";
import { useState } from "react";
const Home = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [{ title: "" }, { title: "" }, { title: "" }];

  const getSectionComponent = () => {
    switch (activeStep) {
      case 0:
        return <ButtonList onMoveForward={handleMoveForward} />;

      case 1:
        return <Step2 onSubmit={handleMoveForward} />;
      case 2:
        return <Step3 />;
      default:
        return null;
    }
  };

  const handleMoveForward = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="flex justify-between flex-col h-[100%]">
      <img src={genieImage} alt="Genie" className="mb-3 h-[200px] w-[100%]" />

      <div className="container mx-auto my-4">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-[#7600A9] font-normal text-[42px] font">
            Regalos del Genio
          </h1>
          {activeStep == 0 ? (
            <h1 className="text-[#5082C8] font-normal font-jella-demo  text-center text-4xl">
              Pon a prueba al Genio, ¿Encontrará lo que buscas?
            </h1>
          ) : null}

          <img src={genieImage2} alt="Genie" className="h-[250px]" />
        </div>

        <CustomStepper steps={steps} activeStep={activeStep} />
        <div className="flex my-[20px] items-center justify-center ">
          <div className="w-[75%]">{getSectionComponent()}</div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-[#9E49C4] via-[#5082c8]   to-[#FFBD59] h-[7px] w-full"></div>
    </div>
  );
};

export default Home;
