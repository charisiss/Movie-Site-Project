import React, { useEffect } from "react";
import { useRouter } from "next/router";

import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import Divider from "../../Divider/Divider";
import { useGetCommentContext } from "../../../store/CommentsContext";

const CommentsList = () => {
  const router = useRouter();

  const subId = router.query.subId as string;

  const { comments, updateComments } = useGetCommentContext();

  useEffect(() => {
    updateComments(subId);
  }, [subId, comments]);

  return (
    <div>
      <Divider
        size="50"
        title={`${
          comments == undefined || comments.length == 0 ? "0" : comments.length
        }  Comments`}
      />
      <br />

      <AddComment />

      {comments &&
        comments.map((comment) => (
          <Comment
            id={comment.id}
            comment={comment.comment}
            name={comment.name}
            key={comment.id}
          />
        ))}
    </div>
  );
};

export default CommentsList;
