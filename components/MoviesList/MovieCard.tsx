import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrow from "@mui/icons-material/PlayArrow";

import classes from "./MovieCard.module.css";
import { Popover, Popper } from "@mui/material";

type MovieType = {
  movie: {
    key: string;
    movie: string;
    actors: string;
    poster: string;
    movie_duration: string;
    year: number;
  };
  position: number;
};

const MovieCard: React.FC<MovieType> = (props) => {
  const [anchor, setAnchor] = useState(null);
  const openPopover = (event: any) => {
    setAnchor(event.currentTarget);
  };

  return (
    <React.Fragment>
      <div className={classes.card}>
        <div className={classes.cardImage}>
          <img src={props.movie.poster}></img>
          <div className={classes.ImageBackdrop}>
            <IconButton
              className={classes.IconButton}
              aria-label="play-arrow"
              size="large"
              onClick={openPopover}
            >
              <PlayArrow fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <h4 className={classes.cardTitle}> {props.movie.movie}</h4>
        <p className={classes.cardDescription}>
          {props.movie.year} · {props.movie.movie_duration.slice(0, -3)}h
        </p>
      </div>

      <Popper
        placement="right"
        open={Boolean(anchor)}
        anchorEl={anchor}
        disablePortal={false}
        className={classes.popper}
        onMouseLeave={() => {
          setAnchor(null);
        }}
      >
        <h5>{props.movie.movie}</h5>
      </Popper>
    </React.Fragment>
  );
};

export default MovieCard;
