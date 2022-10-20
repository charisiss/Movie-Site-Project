import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrow from "@mui/icons-material/PlayArrow";

import classes from "./MovieCard.module.css";
import { Button, Popper } from "@mui/material";

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
  const [keepOpen, setKeepOpen] = useState(false);

  const openPopover = (event: any) => {
    setAnchor(event.currentTarget);
  };
  const closePopover = () => {
    setTimeout(() => {
      if (keepOpen) return;
      setAnchor(null);
    }, 2000);
  };

  return (
    <React.Fragment>
      <div
        className={classes.card}
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
      >
        <div className={classes.cardImage}>
          <img src={props.movie.poster}></img>
          <div className={classes.ImageBackdrop}>
            <IconButton
              className={classes.IconButton}
              aria-label="play-arrow"
              size="large"
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
        onMouseEnter={() => {
          setKeepOpen(true);
          console.log(keepOpen);
        }}
        onMouseOut={() => {
          setKeepOpen(false);
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
    </React.Fragment>
  );
};

export default MovieCard;
