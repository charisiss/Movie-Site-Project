import React, { useContext } from "react";
import type { NextPage } from "next";
import { Facebook, Pinterest, Twitter, LinkedIn } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import Layout from "../components/Layout";
import classes from "./Home.module.css";
import SearchForm from "../components/SearchForm/SearchForm";
import MoviesList from "../components/MoviesList/MoviesList/MoviesList";
import Divider from "../components/Divider/Divider";
import MovieContext from "../store/MoviesContext";

const Home: NextPage = () => {
  const ctx = useContext(MovieContext);

  return (
    <Layout>
      <div className={classes.pageTitleContainer}>
        <h1>Find Movies, TV shows and more</h1>
        <SearchForm movies={ctx.Movies} />
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
        {ctx.isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        )}

        {<MoviesList movies={ctx.Movies} size={-1} sort={true} />}
        <Divider size="15" title="Latest MoviesView" />
        {ctx.isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        )}

        {<MoviesList movies={ctx.Movies} size={-1} sort={true} />}
      </div>
    </Layout>
  );
};

export default Home;
