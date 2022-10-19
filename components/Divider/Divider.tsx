import React from "react";
import classes from "./Divider.module.css";

type DividerType = {
  size: string;
  title?: string;
};

const Divider: React.FC<DividerType> = (props) => {
  return (
    <React.Fragment>
      {props.title && <h3 className={classes.title}>{props.title}</h3>}
      <div
        className={classes.divider}
        style={{ width: `${props.size}vw` }}
      ></div>
    </React.Fragment>
  );
};

export default Divider;
