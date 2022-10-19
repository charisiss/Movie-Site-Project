import React, { ReactNode } from "react";
import classes from "./MovieInfo.module.css";

type MovieInfoType = {
  title: string;
  text: string;
};

const MovieInfo: React.FC<MovieInfoType> = (props) => {
  return (
    <div className={classes.infoCard} style={{ left: 100 }}>
      <h4 className={classes.infoTitle}>{props.title}</h4> {props.text}
    </div>
  );
};

export default MovieInfo;
