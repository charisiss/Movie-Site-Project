import React, { useState } from "react";
import { Button, Popper } from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";

import classes from "./MovieInfo.module.css";

const MovieInfo = (props: any) => {
  return (
    <Popper
      placement="right"
      open={Boolean(props.anchor)}
      anchorEl={props.anchor}
      disablePortal={false}
      className={classes.popper}
      onMouseEnter={() => {
        props.setKeepOpen(true);
      }}
      onMouseOut={() => {
        props.setKeepOpen(false);
      }}
    >
      <h4>{props.movie.movie}</h4>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <p>{props.movie.actors}</p>
      <p>{props.movie.year}</p>
      <Button
        variant="contained"
        startIcon={<PlayArrow />}
        className={classes.popperButton}
      >
        Watch Now
      </Button>
    </Popper>
  );
};

export default MovieInfo;
