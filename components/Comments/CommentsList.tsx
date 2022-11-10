import React, { useContext, useEffect, useState } from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";
import CommentContext from "../../store/Comments-Context";
import { useRouter } from "next/router";
import Divider from "../Divider/Divider";
import { commentType } from "../../types/CommentType";

const CommentsList = () => {
  const router = useRouter();
  const ctx = useContext(CommentContext);
  const [comments, setComments] = useState<commentType[]>();

  const subId = router.query.subId as string;

  useEffect(() => {
    ctx.updateComments(subId);
    console.log(ctx.comments);
    setComments(ctx.comments);
  }, []);

  return (
    <div>
      <Divider
        size="50"
        title={`${
          comments == undefined || comments.length != 0 ? "0" : comments!.length
        }  Comments`}
      />
      <br />
      <AddComment />
      {comments &&
        comments.map((comment) => (
          <Comment
            key={comment.id}
            text={comment.comment}
            user={comment.name}
          />
        ))}
    </div>
  );
};

export default CommentsList;
