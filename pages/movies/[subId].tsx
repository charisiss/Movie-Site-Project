import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import MovieContext from "../../store/Movies-Context";
import CommentsList from "../../components/Comments/CommentsList";
import Divider from "../../components/Divider/Divider";
import { CircularProgress } from "@mui/material";
import MoviesList from "../../components/MoviesList/MoviesList";

import classes from "./SingleMoviePage.module.css";
import { CommentContextProvider } from "../../store/Comments-Context";

const HelloPage = () => {
  const router = useRouter();
  const recommendsRef = useRef<HTMLHeadingElement>(null);
  const [recommendsWidth, setRecommendsWidth] = useState<number>();
  const ctx = useContext(MovieContext);
  const item = ctx.Movies.find(
    (element) => element.movie == router.query.subId
  );

  useEffect(() => {
    if (recommendsRef) {
      setRecommendsWidth(recommendsRef.current?.offsetWidth);
    }
  }, []);

  return (
    <Layout pageId={item?.movie}>
      <main className={classes.main}>
        <div className={`${classes.row} ${classes.card}`}>
          <div className={classes.col}>
            <img src={item?.poster} height="500"></img>
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
            <div className={classes.row}>
              <div className={`${classes.col} ${classes.textBold}`}>
                <p>Release:</p>
                <p>Director:</p>
                <p>Cast:</p>
              </div>
              <div className={`${classes.col} ${classes.colPad}`}>
                <p>{item?.releaseDate}</p>
                <p>{item?.director}</p>
                <p>{item?.cast}</p>
              </div>
            </div>
          </div>
        </div>
        <br />
        {item?.video != undefined && (
          <div
            className={`${classes.row} ${classes.card} ${classes.videoCard}`}
          >
            <iframe
              width="1250px"
              height="720px"
              src={`${item.video["720p"]}`}
            ></iframe>
          </div>
        )}

        <br />
        <div className={`${classes.row} ${classes.comRow}`}>
          <div className={`${classes.col}`}>
            <Divider size="10" title="Comments"></Divider>
            <CommentContextProvider>
              <CommentsList />
            </CommentContextProvider>
          </div>
          <div className={`${classes.col}`} ref={recommendsRef}>
            <Divider size="10" title="You may also like"></Divider>
            {ctx.isLoading && (
              <div className={classes.loading}>
                <CircularProgress color="inherit" />
              </div>
            )}
            {
              <MoviesList
                movies={ctx.Movies}
                width={650}
                size={2}
              /> /*recommendsWidth != undefined ? recommendsWidth : */
            }
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default HelloPage;
