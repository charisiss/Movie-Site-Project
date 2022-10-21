import React, { useContext, useEffect, useState } from "react";
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
import MovieContext, { MovieContextProvider } from "../store/Movies";

type movieType = {
  key: string;
  movie: string;
  actors: string;
  poster: string;
  movie_duration: string;
  year: number;
};

const Home: NextPage = () => {
  var ctx = useContext(MovieContext);

  return (
    <Layout>
      <div className={classes.pageTitleContainer}>
        <h1>Find Movies, TV shows and more</h1>
        <SearchForm movies={ctx.Movies} />
      </div>

      <div
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
        {ctx.isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {<MoviesList movies={ctx.Movies} width={ctx.width} />}
        <Divider size="15" title="Latest MoviesView" />
        {ctx.isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {<MoviesList movies={ctx.Movies} width={ctx.width} />}
      </div>
    </Layout>
  );
};

export default Home;
