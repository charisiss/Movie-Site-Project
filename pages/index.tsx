import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import classes from "./Home.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestInIcon from "@mui/icons-material/Pinterest";
import SearchForm from "../components/SearchForm/SearchForm";
import MoviesList from "../components/MoviesList/MoviesList";
import Divider from "../components/Divider/Divider";
import { CircularProgress } from "@mui/material";

type moviesType = {
  key: string;
  movie: string;
  actors: string;
  poster: string;
  movie_duration: string;
  year: number;
};

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(1080);

  if (typeof window !== "undefined") {
    const handleResize = () => {
      if (width != window.innerWidth) return setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }

  const [moviesList, setMoviesList] = useState<moviesType[]>([]);
  useEffect(() => {
    const loadedMovies: moviesType[] = [];
    const fetchMovies = async () => {
      const response = await fetch(
        `https://owen-wilson-wow-api.herokuapp.com/wows/random?results=${
          Math.floor((width - 100) / 150) * 2
        }`
      )
        .then((res) => res.json())
        .then((responseData) => {
          for (const key in responseData) {
            loadedMovies.push({
              key: responseData[key].movie.split(" ").join("") + Math.random(),
              movie: responseData[key].movie,
              actors: responseData[key].actors,
              poster: responseData[key].poster,
              movie_duration: responseData[key].movie_duration,
              year: responseData[key].year,
            });
          }
        });
      setMoviesList(loadedMovies);
      setIsLoading(false);
    };
    fetchMovies();
  }, []);

  return (
    <Layout>
      <div className={classes.pageTitleContainer}>
        <h1>Find Movies, TV shows and more</h1>
        <SearchForm movies={moviesList} />
      </div>

      <main
        style={{
          margin: "2em 5vw 0px 5vw",
          color: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            <b>CSMovies, Watch Movie Trailers </b>
            <br /> <b>This is a demo</b> of a movies website, builded from{" "}
            <b>Charisis Samaras</b>, <br />
            in purpose to learn about react apps
          </p>
          <div>
            <FacebookIcon style={{ color: "#1877F2", cursor: "pointer" }} />
            <TwitterIcon style={{ color: "#1DA1F2", cursor: "pointer" }} />
            <LinkedInIcon style={{ color: "#0A66C2", cursor: "pointer" }} />
            <PinterestInIcon style={{ color: "#BD081C", cursor: "pointer" }} />
          </div>
        </div>
        <Divider size="15" title="Recomended" />
        {isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {<MoviesList movies={moviesList} width={width} />}
        <Divider size="15" title="Latest MoviesView" />
        {isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {<MoviesList movies={moviesList} width={width} />}
      </main>
    </Layout>
  );
};

export default Home;
