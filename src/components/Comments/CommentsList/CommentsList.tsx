import React, { useEffect } from "react";

import AddComment from "../AddComment";
import Comment from "../Comment";
import Divider from "components/Divider";
import { useGetCommentContext } from "../../../store/CommentsContext";

const CommentsList: React.FC<{ subId: string }> = ({ subId }) => {
  const { comments, getComments } = useGetCommentContext();

  useEffect(() => {
    getComments(subId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subId]);

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
