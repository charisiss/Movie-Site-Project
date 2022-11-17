import React, { useState, useEffect, useContext } from "react";

import { commentType } from "../types/CommentType";

const URL = "https://totemic-chalice-352009-default-rtdb.europe-west1.firebasedatabase.app"

type contextCommentType = {
  comments: commentType[];
  addComment: (props: { movie: string; comment: commentType }) => {};
  getComments: (props: string) => Promise<commentType[]>;
  updateComments: (props: string) => {};
};


const CommentContext = React.createContext<contextCommentType | undefined>(undefined);

export const getComments = async (movieName: string) => {
  const loadedComments: Array<commentType> = [];

  return fetch(
    `${URL}/comments/${movieName}.json`
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
  return await fetch(
    `${URL}/comments/${props.movie}.json`,
    {
      method: "POST",
      body: JSON.stringify(props.comment),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const CommentContextProvider: React.FC<{children: JSX.Element | JSX.Element[]}> = (props) => {
  const [commentsList, setCommentsList] = useState<commentType[]>([]);

  const updateComments = (movieName: string) => {
    getComments(movieName).then((value) => {
      setCommentsList(value.map((item) => item));
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

export const useGetCommentContext = () => {
  const ctx = useContext(CommentContext)
  if (!ctx) throw new Error("Comment Context not undefined");

  return ctx;
}

export default CommentContextProvider;
