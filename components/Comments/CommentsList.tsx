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
  const [comments, setComments] = useState<commentType[]>();

  const subId = router.query.subId as string;
  var movieComments: commentType[] = [];

  useEffect(() => {
    const test = ctx.getComments(subId);
    console.log(test);
    setComments(test);
  }, []);

  return (
    <div>
      <Divider
        size="50"
        title={`${
          movieComments.length != 0 ? movieComments.length : 0
        }  Comments`}
      />
      <br />
      <AddComment />
      {movieComments.map((comment) => (
        <Comment
          key={comment.name + Math.random()}
          text={comment.comment}
          user={comment.name}
        />
      ))}
    </div>
  );
};

export default CommentsList;
