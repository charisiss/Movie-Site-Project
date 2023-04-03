import React, { useState, useEffect, useContext } from "react";

import { MovieType } from "types/MovieType";

type contextMovieType = {
  movies: MovieType[];
  isLoading: boolean;
  getMovie: (props: string) => {};
};

const MovieContext = React.createContext<contextMovieType | undefined>(
  undefined
);

export const getMovie = async (movieName: string) => {
  const response = await fetch(
    `https://owen-wilson-wow-api.onrender.com/wows/random?movie=${movieName}`
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
      return movie;
    });
};

export const MovieContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [moviesList, setMoviesList] = useState<MovieType[]>([]);

  useEffect(() => {
    const loadedMovies: MovieType[] = [];
    const fetchMovies = async () => {
      const response = await fetch(
        `https://owen-wilson-wow-api.onrender.com/wows/random?results=40`
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
              character: responseData[key].character,
              director: responseData[key].director,
              release_date: responseData[key].release_date,
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
        movies: moviesList,
        isLoading: isLoading,
        getMovie: getMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export const useGetMovieContext = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error("Movie Context not undefined");

  return ctx;
};

export default MovieContextProvider;
