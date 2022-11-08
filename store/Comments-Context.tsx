import React, { useState, useEffect } from "react";

type commentType = {
  comment: string;
  id: string;
};

type contextCommentType = {
  comments: commentType[];
  addComment: (props: { comment: string }) => {};
  getComments: (props: string) => Promise<commentType[]>;
  updateComments: (props: string) => {};
};

type propsType = {
  children: JSX.Element | JSX.Element[];
};

const CommentContext = React.createContext<contextCommentType>({
  comments: [],
  addComment: (props: { comment: string }) => {
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
    `https://totemic-chalice-352009-default-rtdb.europe-west1.firebasedatabase.app/redComments/${props}.json`
  )
    .then((res) => res.json())
    .then((responseData) => {
      for (const key in responseData) {
        loadedComments.push({ comment: responseData[key].comment, id: key });
      }
      return loadedComments;
    });
};

export const addComment = async (props: { comment: string }) => {
  await fetch(
    `https://totemic-chalice-352009-default-rtdb.europe-west1.firebasedatabase.app/redComments/onWait.json`,
    {
      method: "POST",
      body: JSON.stringify(props),
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
