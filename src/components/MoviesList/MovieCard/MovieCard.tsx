import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import PlayArrow from "@mui/icons-material/PlayArrow";

import MovieInfo from "../MovieInfo";
import { MovieType } from "types/MovieType";

import classes from "./MovieCard.module.css";

type Props = {
  movie: MovieType;
};

const MovieCard: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <React.Fragment>
      <MovieInfo movie={props.movie}>
        <div
          className={classes.card}
          onClick={() => {
            router.push(`/movies/${props.movie.movie}`);
          }}
        >
          <div className={classes.cardImage}>
            <Image
              src={props.movie.poster}
              height="290"
              width={200}
              className={classes.img}
              alt="movieImage"
            />
            <div className={classes.ImageBackdrop}>
              <IconButton
                className={classes.IconButton}
                aria-label="play-arrow"
                size="large"
                data-testid="button"
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
      </MovieInfo>
    </React.Fragment>
  );
};

export default MovieCard;
