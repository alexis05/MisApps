import React from "react";
import MultiStep from "./react-multistep";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";
import { ContextProductCreationProvider } from "../context/product";

const prevStyle = {
  background: "#33c3f0",
  borderWidth: "0px",
  marginTop: "10px",
  marginRight: "2px",
};
const nextStyle = {
  background: "#33c3f0",
  borderWidth: "0px",
  marginTop: "10px",
  marginLeft: "2px",
};

const steps = [
  { component: <StepOne />, label: "Crear Producto" },
  { component: <StepTwo />, label: "Organizar Producto" },
  { component: <StepThree />, label: "Variantes del Producto" },
  { component: <StepFour />, label: "Resumen" },
];

const index = () => {
  return (
    <div className="col">
      <ContextProductCreationProvider>
        <MultiStep steps={steps} prevStyle={prevStyle} nextStyle={nextStyle} />
      </ContextProductCreationProvider>
    </div>
  );
};

export default index;
