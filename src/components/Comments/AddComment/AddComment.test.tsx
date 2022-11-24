import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { addComment, useGetCommentContext } from "store/CommentsContext";

import AddComment from "./AddComment";

jest.mock("store/CommentsContext");

const mockUseGetCommentContext = useGetCommentContext as jest.Mock;

describe("<AddComment>", () => {
  beforeEach(() => {
    mockUseGetCommentContext.mockImplementation(() => ({
      comments: [
        {
          comment: "mockComment",
          name: "mockName",
          id: "mockCommentId",
        },
      ],
      getComments: jest.fn(),
      addComment: jest.fn(),
    }));
  });

  test("Allows user to add a comment", () => {
    render(<AddComment />);

    expect(screen.getByText("Add a comment")).toBeVisible();
    fireEvent.keyDown(screen.getByText("Add a comment"), {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(addComment).toHaveBeenCalled();
  });
});
