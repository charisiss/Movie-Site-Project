import React from "react";
import type { NextPage } from "next";
import { GitHub, Twitter, LinkedIn } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import Layout from "components/Layout/BaseLayout";
import SearchForm from "components/SearchForm/SearchForm";
import MoviesList from "components/MoviesList/MoviesList/MoviesList";
import Divider from "components/Divider/Divider";
import { useGetMovieContext } from "store/MoviesContext";

import classes from "./Home.module.css";
import Link from "next/link";

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
              <Link href={"https://twitter.com/CharisisSam"} target="_blank">
                <Twitter
                  style={{
                    color: "#1DA1F2",
                    cursor: "pointer",
                    paddingRight: 1,
                  }}
                />
              </Link>
              <Link
                href={"https://www.linkedin.com/in/charisiss/"}
                target="_blank"
              >
                <LinkedIn
                  style={{
                    color: "#0A66C2",
                    cursor: "pointer",
                    paddingRight: 1,
                  }}
                />
              </Link>
              <Link href={"https://github.com/charisiss"} target="_blank">
                <GitHub
                  style={{ color: "black", cursor: "pointer", paddingRight: 1 }}
                />
              </Link>
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
