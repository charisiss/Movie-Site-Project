import React from "react";
import MovieCard from "./MovieCard";
import classes from "./MoviesList.module.css";
import { MovieType } from "../../types/MovieType";
import { Grid } from "@mui/material";

type moviesType = {
  movies: MovieType[];
  size: number;
};

const MovieList: React.FC<moviesType> = (props) => {
  function sliceIntoChunks(arr: moviesType, chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.movies.length; i += chunkSize) {
      const chunk = arr.movies.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }
  const movieSeparatedLists = sliceIntoChunks(
    props,
    Math.floor((1080 - 100) / 150)
  );

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 5, sm: 8, md: 12 }}
      >
        {props.movies.map((list, index) => {
          if (props.size !== -1 && props.size <= index) return;
          return (
            <Grid item key={Math.random() * 1}>
              <MovieCard movie={list} key={Math.random() * 1} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default MovieList;
