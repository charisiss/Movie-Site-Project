import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import PlayArrow from "@mui/icons-material/PlayArrow";

import MovieInfo from "../MovieInfo";
import { MovieType } from "types/MovieType";

import classes from "./MovieCard.module.css";

const MovieCard = ({ movie }: { movie: MovieType }) => {
  const router = useRouter();

  return (
    <MovieInfo movie={movie}>
      <div className={classes.card} data-testid="movie-card">
        <div className={classes.cardImage}>
          <Image
            src={movie.poster}
            height="290"
            width={200}
            className={classes.img}
            alt="movieCardImage"
          />
          <div className={classes.ImageBackdrop}>
            <IconButton
              className={classes.IconButton}
              aria-label="play-arrow"
              size="large"
              data-testid="play-arrow"
              onClick={() => {
                router.push(`/movies/${movie.movie}`);
              }}
            >
              <PlayArrow fontSize="inherit" data-testid="playArrow" />
            </IconButton>
          </div>
        </div>

        <h4 className={classes.cardTitle}>{movie.movie}</h4>
        <p className={classes.cardDescription}>
          {movie.year} · {movie.movie_duration.slice(0, -3)}h
        </p>
      </div>
    </MovieInfo>
  );
};

export default MovieCard;
