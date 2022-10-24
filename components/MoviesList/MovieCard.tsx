import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrow from "@mui/icons-material/PlayArrow";

import classes from "./MovieCard.module.css";
import MovieInfo from "./MovieInfo";
import { useRouter } from "next/router";

type MovieType = {
  movie: {
    key: string;
    movie: string;
    poster: string;
    movie_duration: string;
    year: number;
    cast: string;
    director: string;
    releaseDate: string;
    video: {};
  };
};

const MovieCard: React.FC<MovieType> = (props) => {
  const [anchor, setAnchor] = useState(null);
  const [keepOpen, setKeepOpen] = useState(false);

  const router = useRouter();

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
              onClick={() => {
                router.push(`/movies/${props.movie.movie}`);
              }}
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
      <MovieInfo
        anchor={anchor}
        setAnchor={setAnchor}
        keepOpen={keepOpen}
        open={openPopover}
        setKeepOpen={setKeepOpen}
        close={closePopover}
        movie={props.movie}
      ></MovieInfo>
    </React.Fragment>
  );
};

export default MovieCard;
