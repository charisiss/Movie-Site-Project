import React, { useContext, useEffect, useState } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import CommentContext from "../../store/Comments-Context";
import { useRouter } from "next/router";

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
  var ctx = useContext(CommentContext);
  const [moviesList, setMoviesList] = useState<movieListType[]>([]);

  useEffect(() => {
    setMoviesList(ctx.comments);
  }, [ctx.comments]);

  return (
    <div>
      <AddComment />
      {moviesList
        .filter((movie) => movie.movieName == router.query.subId)
        .map((comment) =>
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
