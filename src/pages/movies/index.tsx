import { Twitter, LinkedIn, GitHub } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Link from "next/link";

import MoviesList from "components/MoviesList/MoviesList";
import Layout from "components/Layout/BaseLayout";

import classes from "./MoviesPage.module.css";

const MoviesPage = () => {
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
            <Link href={"https://twitter.com/CharisisSam"} target="_blank">
              <Twitter
                style={{ color: "#1DA1F2", cursor: "pointer", paddingRight: 1 }}
              />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/charisiss/"}
              target="_blank"
            >
              <LinkedIn
                style={{ color: "#0A66C2", cursor: "pointer", paddingRight: 1 }}
              />
            </Link>
            <Link href={"https://github.com/charisiss"} target="_blank">
              <GitHub
                style={{ color: "black", cursor: "pointer", paddingRight: 1 }}
              />
            </Link>
          </div>
        </div>

        {/* {isLoading && (
          <div className={classes.loading}>
            <CircularProgress color="inherit" />
          </div>
        )} */}

        {<MoviesList size={20} sort={true} />}
      </div>
    </Layout>
  );
};

export default MoviesPage;
