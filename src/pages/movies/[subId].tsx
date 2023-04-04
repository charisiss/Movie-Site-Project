import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import PlayArrow from "@mui/icons-material/PlayArrow";
import { Button, CircularProgress, Grid, Rating } from "@mui/material";
import NodeCache from "node-cache";

import Layout from "components/Layout/BaseLayout";
import Divider from "components/Divider/Divider";
import MoviesList from "components/MoviesList/MoviesList";
import CommentsList from "components/Comments/CommentsList";
import { CommentContextProvider } from "store/CommentsContext";
import { MovieType } from "types/MovieType";

import classes from "./SingleMoviePage.module.css";

const cache = new NodeCache();

const SingleMoviePage = (props: { response: MovieType[] }) => {
  const [displayVideo, setDisplayVideo] = useState(false);
  const movies = props.response;
  const isLoading = false;

  const router = useRouter();

  if (router.isFallback) {
    return <CircularProgress />;
  }

  const item = props.response[0];

  return (
    <Layout pageId={item.movie}>
      <main className={classes.main}>
        <div className={`${classes.row} ${classes.card}`}>
          <div className={`${classes.col} ${classes.image}`}>
            <Image
              src={`${item?.poster}`}
              layout="responsive"
              alt="movieImage"
              width={200}
              height={290}
            />
          </div>

          <div className={`${classes.descCol} ${classes.colPad}`}>
            <h1>{item?.movie}</h1>
            <p>Lorem Ipsum</p>

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
            {<MoviesList size={4} sort={false} />}
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const subId = context.params.subId;

    if (!subId) {
      return { notFound: true };
    }

    const res = await fetch(
      `https://owen-wilson-wow-api.onrender.com/wows/random?movie=${subId}`
    );

    if (!res.ok) {
      return { notFound: true };
    }

    const response = await res.json();

    return {
      props: {
        response,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}

export default SingleMoviePage;
