import React, { ReactNode, useState, useEffect } from "react";

import { MovieType } from "../types/MovieType";

type contextMovieType = {
  Movies: MovieType[];
  isLoading: boolean;
  getMovie: (props: string) => {};
};

type propsType = {
  children: React.ReactNode;
};

const MovieContext = React.createContext<contextMovieType>({
  Movies: [],
  isLoading: true,
  getMovie: (props: string) => {
    return 0;
  },
});

export const getMovie = async (props: string) => {
  const response = await fetch(
    `https://owen-wilson-wow-api.onrender.com/wows/random?movie=${props}`
  )
    .then((res) => res.json())
    .then((responseData) => {
      const movie = {
        key: responseData[0].movie.split(" ").join("") + Math.random(),
        movie: responseData[0].movie,
        poster: responseData[0].poster,
        movie_duration: responseData[0].movie_duration,
        year: responseData[0].year,
        cast: responseData[0].character,
        director: responseData[0].director,
        releaseDate: responseData[0].release_date,
        video: responseData[0].video,
      };
      console.log(movie);
      return movie;
    });
};

export const MovieContextProvider: React.FC<propsType> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [moviesList, setMoviesList] = useState<MovieType[]>([]);

  useEffect(() => {
    const loadedMovies: MovieType[] = [];
    const fetchMovies = async () => {
      const response = await fetch(
        `https://owen-wilson-wow-api.onrender.com/wows/random?results=20`
      )
        .then((res) => res.json())
        .then((responseData) => {
          for (const key in responseData) {
            loadedMovies.push({
              key: responseData[key].movie.split(" ").join("") + Math.random(),
              movie: responseData[key].movie,
              poster: responseData[key].poster,
              movie_duration: responseData[key].movie_duration,
              year: responseData[key].year,
              cast: responseData[key].character,
              director: responseData[key].director,
              releaseDate: responseData[key].release_date,
              video: responseData[key].video,
            });
          }
        });
      setMoviesList(loadedMovies);
      setIsLoading(false);
    };
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        Movies: moviesList,
        isLoading: isLoading,
        getMovie: getMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
