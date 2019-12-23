import React from "react";
import ReactDom from "react-dom";
import Spinner from "../styleGlobal/Spinner";

const SpinnerGlobal = props => {
  if (props.mostrar === true) {
    return (
      <div>
        {ReactDom.createPortal(
          <div className="row d-flex text-center justify-content-center">
            <Spinner />
          </div>,
          document.getElementById("spinner-portal")
        )}
      </div>
    );
  }
  return <div></div>;
};

export default SpinnerGlobal;
