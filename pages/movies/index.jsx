import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestInIcon from "@mui/icons-material/Pinterest";
import MoviesList from "../../components/MoviesList/MoviesList";
import { CircularProgress } from "@mui/material";
import MovieContext from "../../store/Movies-Context";

import classes from "./MoviesPage.module.css";

const HelloPage = () => {
  var ctx = useContext(MovieContext);

  return (
    <Layout pageId="Movies">
      <div className={classes.main}>
        <div className={classes.subtitle}>
          <p>
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
        {ctx.isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {<MoviesList movies={ctx.Movies} width={ctx.width} sort={true} />}
      </div>
    </Layout>
  );
};

export default HelloPage;
