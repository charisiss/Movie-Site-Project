import React, { useEffect, useState } from "react";
import { Star, SortByAlpha } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";

import MovieCard from "../MovieCard";
import { MovieType } from "types/MovieType";
import classes from "./MoviesList.module.css";

type moviesType = {
  size: number;
  sort: boolean;
};

const MoviesList: React.FC<moviesType> = (props) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [sort, setSort] = useState<string>("asc");

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://owen-wilson-wow-api.onrender.com/wows/random?results=${props.size}`
      );
      const data = await response.json();
      setMovies(data);
    }
    fetchMovies();
  }, [props.size]);

  const HandleSort = (type: string) => {
    if (type === "pop") {
      // console.log(movies);
      setMovies(
        movies.sort(function () {
          return 0.5 - Math.random();
        })
      );
    } else if (type === "asc") {
      setSort("dsc");
      setMovies(movies.sort((a, b) => (a.movie > b.movie ? 1 : -1)));
    } else {
      setSort("asc");
      setMovies(movies.sort((a, b) => (a.movie > b.movie ? 1 : -1)).reverse());
    }
  };

  return (
    <div>
      <br />
      {props.sort && (
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              className={classes.btn}
              startIcon={<SortByAlpha />}
              onClick={() => HandleSort(sort)}
            >
              Sort ASC
            </Button>
          </Grid>
          {/* <Grid item>
            <Button
              variant="contained"
              className={classes.btn}
              startIcon={<Star />}
              onClick={() => HandleSort("pop")}
            >
              Popular
            </Button>
          </Grid> */}
        </Grid>
      )}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 5, sm: 8, md: 12 }}
        alignItems="center"
        justifyContent="center"
      >
        {movies &&
          movies
            .reduce((uniqueMovies: MovieType[], currentMovie: MovieType) => {
              const existingMovie = uniqueMovies.find(
                (movie: MovieType) => movie.movie === currentMovie.movie
              );
              if (!existingMovie) {
                uniqueMovies.push(currentMovie);
              }
              return uniqueMovies;
            }, [])
            .map((list: MovieType, index: number) => {
              if (index >= props.size) return;
              return (
                <Grid item key={Math.random() * 1}>
                  <MovieCard
                    data-testid="movie-card"
                    movie={list}
                    key={Math.random() * 1}
                  />
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
};

export default MoviesList;
