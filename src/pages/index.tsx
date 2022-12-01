import React from "react";
import type { NextPage } from "next";
import { Facebook, Pinterest, Twitter, LinkedIn } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import Layout from "components/Layout/BaseLayout";
import SearchForm from "components/SearchForm/SearchForm";
import MoviesList from "components/MoviesList/MoviesList/MoviesList";
import Divider from "components/Divider/Divider";
import { useGetMovieContext } from "store/MoviesContext";

import classes from "./Home.module.css";

const Home: NextPage = () => {
  const { movies, isLoading } = useGetMovieContext();

  return (
    <Layout pageId="Movies">
      <>
        <div className={classes.pageTitleContainer}>
          <h1>Find Movies, TV shows and more</h1>
          <SearchForm movies={movies} />
        </div>

        <div className={classes.textBox}>
          <div className={classes.textBoxElements}>
            <p className={classes.textBoxText}>
              <b>CSMovies, Watch Movie Trailers </b>
              <br /> <b>This is a demo</b> of a movies website, builded by
              <b> Charisis Samaras</b>, <br />
              in purpose to learn about react apps
            </p>
            <div>
              <Facebook style={{ color: "#1877F2", cursor: "pointer" }} />
              <Twitter style={{ color: "#1DA1F2", cursor: "pointer" }} />
              <LinkedIn style={{ color: "#0A66C2", cursor: "pointer" }} />
              <Pinterest style={{ color: "#BD081C", cursor: "pointer" }} />
            </div>
          </div>

          <Divider size="15" title="Recomended" />
          {isLoading && (
            <div className={classes.loading}>
              <CircularProgress color="inherit" />
            </div>
          )}

          <MoviesList movies={movies} size={20} sort={true} />
        </div>
      </>
    </Layout>
  );
};

export default Home;
