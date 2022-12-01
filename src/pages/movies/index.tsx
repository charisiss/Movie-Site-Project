import { Facebook, Pinterest, Twitter, LinkedIn } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import MoviesList from "components/MoviesList/MoviesList";
import Layout from "components/Layout/BaseLayout";
import MovieContext, { useGetMovieContext } from "store/MoviesContext";

import classes from "./MoviesPage.module.css";

const MoviesPage = () => {
  const { movies, isLoading } = useGetMovieContext();

  return (
    <Layout pageId={"Movies"}>
      <div className={classes.main}>
        <div className={classes.subtitle}>
          <p>
            <b>CSMovies, Watch Movie Trailers </b>
            <br /> <b>This is a demo</b> of a movies website, builded from{" "}
            <b>Charisis Samaras</b>, <br />
            in purpose to learn about react apps
          </p>
          <div>
            <Facebook style={{ color: "#1877F2", cursor: "pointer" }} />
            <Twitter style={{ color: "#1DA1F2", cursor: "pointer" }} />
            <LinkedIn style={{ color: "#0A66C2", cursor: "pointer" }} />
            <Pinterest style={{ color: "#BD081C", cursor: "pointer" }} />
          </div>
        </div>

        {isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        )}

        {<MoviesList movies={movies} size={20} sort={true} />}
      </div>
    </Layout>
  );
};

export default MoviesPage;
