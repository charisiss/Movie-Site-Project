import { useState, useEffect } from "react";
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

const SingleMoviePage = () => {
  const [displayVideo, setDisplayVideo] = useState(false);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMovieLoaded, setIsMovieLoaded] = useState(false); // state variable to track if movie is loaded

  const router = useRouter();
  const { subId } = router.query;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const cachedMovies = cache.get(subId as string);
        if (cachedMovies) {
          setMovies(cachedMovies as MovieType[]); // Type assertion
          setIsLoading(false);
          setIsMovieLoaded(true); // set isMovieLoaded to true when the movie details are loaded
        } else {
          const res = await fetch(
            `https://owen-wilson-wow-api.onrender.com/wows/random?movie=${subId}`
          );

          if (!res.ok) {
            setIsLoading(false);
            return;
          }

          const response = await res.json();

          if (Array.isArray(response)) {
            cache.set(subId as string, response, 600); // Cache the response for 10 minutes
            setMovies(response);
            setIsLoading(false);
            setIsMovieLoaded(true); // set isMovieLoaded to true when the movie details are loaded
          } else {
            console.error("Response is not an array of MovieType");
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    if (subId) {
      fetchMovies();
    }
  }, [subId]);

  // render the skeleton loading until the movie details are loaded
  if (isLoading || !isMovieLoaded) {
    return (
      <div className={classes.skeletonLoading}>
        <div className={classes.skeletonImage}></div>
        <div className={classes.skeletonDetails}>
          <div className={classes.skeletonTitle}></div>
          <div className={classes.skeletonRating}></div>
          <div className={classes.skeletonDesc}></div>
        </div>
      </div>
    );
  }

  if (!movies.length) {
    return <div>Movie not found</div>;
  }

  const item = movies[0];

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

export default SingleMoviePage;
