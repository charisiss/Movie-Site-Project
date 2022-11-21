import React, { useEffect } from "react";

import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import Divider from "../../Divider/Divider";
import { useGetCommentContext } from "../../../store/CommentsContext";

const CommentsList = ({ subId }: { subId: string }) => {
  const { comments, getComments } = useGetCommentContext();

  useEffect(() => {
    getComments(subId);
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
