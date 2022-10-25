import React, { useContext, useEffect, useState } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import CommentContext from "../../store/Comments-Context";
import { useRouter } from "next/router";
import Divider from "../Divider/Divider";

type commentType = {
  comment: string;
  name: string;
};

type movieListType = {
  movieName: string;
  comments: commentType[];
};

const CommentsList = () => {
  const router = useRouter();
  const ctx = useContext(CommentContext);
  const [moviesList, setMoviesList] = useState<movieListType[]>([]);

  useEffect(() => {
    console.log("Comments updated");
    setMoviesList(ctx.comments);
  }, [ctx]);

  const movieComments = moviesList.filter(
    (movie) => movie.movieName == router.query.subId
  );

  return (
    <div>
      <Divider
        size="50"
        title={`${
          movieComments[0] != undefined ? movieComments[0].comments.length : 0
        }  Comments`}
      />
      <br />
      <AddComment />
      {movieComments.map((comment) =>
        comment.comments.map((comment) => {
          return (
            <Comment
              key={comment.name + Math.random()}
              text={comment.comment}
              user={comment.name}
            />
          );
        })
      )}
    </div>
  );
};

export default CommentsList;
