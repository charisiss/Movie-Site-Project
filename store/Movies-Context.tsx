import React, { ReactNode, useState, useEffect } from "react";

import { MovieType } from "../types/MovieType";

type contextMovieType = {
  Movies: MovieType[];
  isLoading: boolean;
  width: number;
};

type propsType = {
  children: React.ReactNode;
};

const MovieContext = React.createContext<contextMovieType>({
  Movies: [],
  isLoading: true,
  width: 1080,
});

export const MovieContextProvider: React.FC<propsType> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [windowWidth, setWidth] = useState<number>(1080);
  const [moviesList, setMoviesList] = useState<MovieType[]>([]);

  if (typeof window !== "undefined") {
    const handleResize = () => {
      if (windowWidth != window.innerWidth) return setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }

  useEffect(() => {
    const loadedMovies: MovieType[] = [];
    const fetchMovies = async () => {
      const response = await fetch(
        `https://owen-wilson-wow-api.herokuapp.com/wows/random?results=${
          Math.floor((windowWidth - 100) / 150) * 2
        }`
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
        width: windowWidth,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
