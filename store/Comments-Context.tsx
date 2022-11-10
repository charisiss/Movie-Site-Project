import React, { useState, useEffect } from "react";

import { commentType } from "../types/CommentType";

type contextCommentType = {
  comments: commentType[];
  addComment: (props: { movie: string; comment: commentType }) => {};
  getComments: (props: string) => Promise<commentType[]>;
  updateComments: (props: string) => {};
};

type propsType = {
  children: JSX.Element | JSX.Element[];
};

const CommentContext = React.createContext<contextCommentType>({
  comments: [],
  addComment: (props: { movie: string; comment: commentType }) => {
    return {};
  },
  getComments: (props: string) => {
    return Promise.resolve([]);
  },
  updateComments: (props: string) => {
    return {};
  },
});

export const getComments = async (props: string) => {
  const loadedComments: Array<commentType> = [];

  return fetch(
    `https://totemic-chalice-352009-default-rtdb.europe-west1.firebasedatabase.app/comments/${props}.json`
  )
    .then((res) => res.json())
    .then((responseData) => {
      for (const key in responseData) {
        loadedComments.push({
          comment: responseData[key].comment,
          name: responseData[key].name,
          id: key,
        });
      }
      return loadedComments;
    });
};

export const addComment = async (props: {
  movie: string;
  comment: commentType;
}) => {
  await fetch(
    `https://totemic-chalice-352009-default-rtdb.europe-west1.firebasedatabase.app/comments/${props.movie}.json`,
    {
      method: "POST",
      body: JSON.stringify(props.comment),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const CommentContextProvider: React.FC<propsType> = (props) => {
  const [commentsList, setCommentsList] = useState<commentType[]>([]);

  const updateComments = (props: string) => {
    getComments(props).then((value) => {
      setCommentsList([]);
      value.map((item) => setCommentsList((prev) => [item, ...prev]));
    });
    return {};
  };

  return (
    <CommentContext.Provider
      value={{
        comments: commentsList,
        addComment: addComment,
        getComments: getComments,
        updateComments: updateComments,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
