import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import PlayArrow from "@mui/icons-material/PlayArrow";
import { Button, CircularProgress, Grid, Rating } from "@mui/material";

import Layout from "components/Layout/BaseLayout";
import Divider from "components/Divider/Divider";
import MoviesList from "components/MoviesList/MoviesList";
import CommentsList from "components/Comments/CommentsList";
import { CommentContextProvider } from "store/CommentsContext";
import { useGetMovieContext } from "store/MoviesContext";
import { MovieType } from "types/MovieType";

import classes from "./SingleMoviePage.module.css";

export async function getServerSideProps(context: any) {
  const subID = context.params.subId;

  if (!subID) {
    return { notFound: true };
  }

  const res = await fetch(
    `https://owen-wilson-wow-api.onrender.com/wows/random?movie=${subID}`
  );
  const response = await res.json();

  return {
    props: {
      response,
    },
  };
}

const SingleMoviePage = (props: { response: MovieType[] }) => {
  const [displayVideo, setDisplayVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // add new state variable
  const { movies } = useGetMovieContext();
  const router = useRouter();

  if (router.isFallback) {
    console.log("test");
    return <CircularProgress />;
  }

  const item = props.response[0];

  return (
    <Layout pageId={item.movie}>
      {isLoading && (
        <div className={classes.loading}>
          <CircularProgress color="inherit" />
        </div>
      )}
      <main className={classes.main}>
        <div className={`${classes.row} ${classes.card}`}>
          <div className={classes.col}>
            <Image
              src={`${item?.poster}`}
              height={1400}
              width={900}
              alt="movieImage"
            />
          </div>

          <div className={`${classes.descCol} ${classes.colPad}`}>
            <h1>{item?.movie}</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            <Rating name="simple-controlled" value={3} readOnly />

            <div className={classes.row}>
              <div className={`${classes.col} ${classes.textBold}`}>
                <p>Release:</p>
                <p>Director:</p>
                <p>Cast:</p>
              </div>
              <div className={`${classes.col} ${classes.colPad}`}>
                <p>{item.release_date}</p>
                <p>{item.director}</p>
                <p>{item.character}</p>
              </div>
            </div>
            <br />
            <Button
              variant="outlined"
              startIcon={<PlayArrow />}
              onClick={() => {
                setDisplayVideo(!displayVideo);
              }}
            >
              Watch Trailer
            </Button>
          </div>
        </div>
        <br />

        {item?.video != undefined && displayVideo && (
          <div
            className={`${classes.row} ${classes.card} ${classes.videoCard}`}
          >
            <iframe
              width="1250px"
              height="720px"
              src={`${item.video["1080p"]}`}
            ></iframe>
          </div>
        )}

        <br />
        <Grid container spacing={1}>
          <Grid item xs>
            <Divider size="10" title="Comments"></Divider>
            <CommentContextProvider>
              <CommentsList subId={item.movie} />
            </CommentContextProvider>
          </Grid>
          <Grid item xs>
            <Divider size="10" title="You may also like"></Divider>
            {isLoading && (
              <div className={classes.loading}>
                <CircularProgress color="inherit" />
              </div>
            )}
            {<MoviesList movies={movies} size={6} sort={false} />}
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
};

export default SingleMoviePage;
