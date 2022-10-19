import React from "react";
import MovieCard from "./MovieCard";
import MovieInfo from "./MovieInfo";
import classes from "./MoviesList.module.css";

type moviesType = {
  movies: {
    key: string;
    movie: string;
    actors: string;
    poster: string;
    movie_duration: string;
    year: number;
  }[];
  width: number;
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
      {movieSeparatedLists.map((list) => {
        return (
          <div className={classes.row} key={Math.random()}>
            {list.map((movie, index) => {
              return (
                <React.Fragment key={movie.key}>
                  <MovieCard movie={movie} position={index} />
                  <MovieInfo
                    key={movie.key + Math.random()}
                    title={movie.movie}
                    text="sadasdasdasdasfasdfasdf"
                  ></MovieInfo>
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
