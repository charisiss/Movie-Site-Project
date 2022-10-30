import React from "react";
import MovieCard from "./MovieCard";
import classes from "./MoviesList.module.css";
import { MovieType } from "../../types/MovieType";

type moviesType = {
  movies: MovieType[];
  width: number; // Width of the screen to calculate the movies per row
  size: number; // Declare rows size
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
    Math.floor((props.width - 100) / 150)
  );

  return (
    <div
      style={{
        margin: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {movieSeparatedLists.map((list, index) => {
        if (props.size !== -1 && props.size <= index) return;
        return (
          <div className={classes.row} key={Math.random()}>
            {list.map((movie, index) => {
              return (
                <React.Fragment key={movie.key}>
                  <MovieCard movie={movie} />
                </React.Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
