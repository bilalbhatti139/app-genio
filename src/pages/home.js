import Button from "../Components/button";
import genieImage from "../assets/1.png";
import genieImage2 from "../assets/logo2.png";
import Step1 from "../pages/step1";
import Step2 from "../pages/step2";
import Step3 from "../pages/step3";
import CustomStepper from "../Components/stepper";
import ButtonList from "../Components/button";
import { useState } from "react";
import CookieConsent from "react-cookie-consent";

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [{ title: "" }, { title: "" }, { title: "" }];
  const handleFunc = () => {
    setActiveStep(0);
  };
  const getSectionComponent = () => {
    switch (activeStep) {
      case 0:
        return <ButtonList onMoveForward={handleMoveForward} />;

      case 1:
        return (
          <Step2
            onSubmit={handleMoveForward}
            onMoveBackward={handleMoveBackward}
          />
        );
      case 2:
        return <Step3 onMoveBackward={handleMoveBackward} />;
      default:
        return null;
    }
  };

  const handleMoveForward = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };
  const handleMoveBackward = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="flex justify-between min-h-screen flex-col h-[100%]">
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="Genie"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "10px" }}
        expires={150}
        containerClasses="my-custom-cookie-consent"

      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <div
        className="relative h-[200px] bg-cover bg-center  flex items-center justify-center"
        style={{ backgroundImage: `url(${genieImage})` }}
      >
        <img
          src={genieImage2}
          alt="Genie Logo"
          className="absolute top-0 left-0 cursor-pointer  h-[150px]
       "
          onClick={handleFunc}
        />
        <div className="text-white text-2xl font-bold">
          <h1 className="text-[#ffffff] font-normal text-[42px] font">
            Regalos del Genio
          </h1>{" "}
        </div>
      </div>
      <div className="container  mx-auto my-[4.5rem]">
        <div className="flex justify-center items-center flex-col">
          {activeStep == 0 ? (
            <h1 className="text-[#5082C8] font-normal font-jella-demo  text-center text-4xl">
              Pon a prueba al Genio, ¿Encontrará lo que buscas?
            </h1>
          ) : (
            ""
          )}
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
