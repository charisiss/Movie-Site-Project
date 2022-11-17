import React, { useState } from "react";
import { Button, Rating } from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Tooltip from "@mui/material/Tooltip";

import classes from "./MovieInfo.module.css";
import { useRouter } from "next/router";
import { MovieType } from "../../types/MovieType";

const MovieInfo = (props: MovieType) => {
  const router = useRouter();

  return (
    <Tooltip
      placement="right"
      PopperProps={{
        sx: {
          "& .MuiTooltip-tooltip": {
            backgroundColor: "white",
            width: "200px",
            padding: "0px 10px 0px 10px",
            color: "black",
            boxShadow: "0px 0px 25px 10px #00000078",
            zIndex: "5",
            borderRadius: "10px",
          },
        },
      }}
      title={
        <div className={classes.popper}>
          <h4>{props.movie.movie}</h4>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <Rating name="simple-controlled" value={4} readOnly />
          <p>Actors: {props.movie.cast}</p>
          <p>Year: {props.movie.year}</p>
          <br />
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            className={classes.popperButton}
            onClick={() => {
              router.push(`/movies/${props.movie.movie}`);
            }}
          >
            Watch Now
          </Button>
        </div>
      }
    >
      {props.children}
    </Tooltip>
  );
};

export default MovieInfo;
