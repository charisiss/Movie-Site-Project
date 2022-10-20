import React from "react";
import Transition from "react-transition-group/Transition";

import classes from "./MovieInfo.module.css";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const MovieInfo = (props: { show: boolean; closed: any }) => {
  return (
    <Transition
      mountOnEnter
      unmountOnExit
      onEnter={() => {
        console.log("enter");
      }}
      in={props.show}
      timeout={animationTiming}
    >
      {(state) => {
        const cssClasses = [
          "Modal",
          state === "entering"
            ? "ModalOpen"
            : state === "exiting"
            ? "ModalClosed"
            : null,
        ];
        return (
          <div className={classes.Modal}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>
              Dismiss
            </button>
          </div>
        );
      }}
    </Transition>
  );
};

export default MovieInfo;
