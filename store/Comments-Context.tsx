import { stringify } from "querystring";
import React, { ReactNode, useState, useEffect } from "react";

type commentType = {
  comment: string;
  name: string;
};

type movieListType = {
  movieName: string;
  comments: commentType[];
};

type contextCommentType = {
  comments: movieListType[];
  isLoading: boolean;
  addComment: (props: { movie: string; comment: commentType }) => {};
};

type propsType = {
  children: JSX.Element | JSX.Element[];
};

const CommentContext = React.createContext<contextCommentType>({
  comments: [],
  isLoading: true,
  addComment: (props: { movie: string; comment: commentType }) => {
    return 0;
  },
});

export const addComment = async (props: {
  movie: string;
  comment: commentType;
}) => {
  const response = await fetch(
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [commentsList, setCommentsList] = useState<movieListType[]>([]);

  useEffect(() => {
    var loadedComments: commentType[] = [];
    const loadedMovies: movieListType[] = [];
    fetch(
      "https://totemic-chalice-352009-default-rtdb.europe-west1.firebasedatabase.app/comments.json"
    )
      .then((res) => res.json())
      .then((responseData) => {
        for (const key in responseData) {
          for (const i in responseData[key]) {
            loadedComments.push({
              name: responseData[key][i].name,
              comment: responseData[key][i].comment,
            });
          }
          loadedMovies.push({
            movieName: key,
            comments: loadedComments,
          });
          loadedComments = [];
        }
      });
    setCommentsList(loadedMovies);
    setIsLoading(false);
  }, []);

  return (
    <CommentContext.Provider
      value={{
        comments: commentsList,
        isLoading: isLoading,
        addComment: addComment,
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
