import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import MovieContext from "../../store/Movies-Context";
import CommentsList from "../../components/Comments/CommentsList";
import Divider from "../../components/Divider/Divider";
import { Button, CircularProgress, Grid, Rating } from "@mui/material";
import MoviesList from "../../components/MoviesList/MoviesList";

import classes from "./SingleMoviePage.module.css";
import { CommentContextProvider } from "../../store/Comments-Context";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Image from "next/image";

export async function getServerSideProps(context: any) {
  const test = context.params.subId;
  const response = await fetch(
    `https://owen-wilson-wow-api.onrender.com/wows/random?movie=${test}`
  );
  const res = await response.json();
  return {
    props: { item: res },
  };
}

const SingleMoviePage = (props: any) => {
  const [displayVideo, setDisplayVideo] = useState(false);

  const ctx = useContext(MovieContext);
  const item = props.item[0];

  useEffect(() => {
    console.log("sad");
    // console.log(typeof ctx.getMovie(props.item));
    // const f1 = async () => {
    //   let test = await ctx.getMovie(props.item);
    // };
    // f1();
  }, []);

  return (
    <Layout pageId={item.movie}>
      <main className={classes.main}>
        <div className={`${classes.row} ${classes.card}`}>
          <div className={classes.col}>
            <Image src={`${item?.poster}`} height={1400} width={900} />
          </div>
          <div className={`${classes.descCol} ${classes.colPad}`}>
            <h1>{item?.movie}</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
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
              <CommentsList />
            </CommentContextProvider>
          </Grid>
          <Grid item xs>
            <Divider size="10" title="You may also like"></Divider>
            {ctx.isLoading && (
              <div className={classes.loading}>
                <CircularProgress color="inherit" />
              </div>
            )}
            {<MoviesList movies={ctx.Movies} size={6} />}
          </Grid>
        </Grid>
      </main>
    </Layout>
  );
};

export default SingleMoviePage;
