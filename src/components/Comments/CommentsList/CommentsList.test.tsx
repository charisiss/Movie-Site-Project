import { render } from "@testing-library/react";

import CommentList from "./CommentsList";
import { useGetCommentContext } from "../../../store/CommentsContext";
import AddComment from "../AddComment";
import Comment from "../Comment";

jest.mock("../../../store/CommentsContext");
jest.mock("../AddComment");
jest.mock("../Comment");

const mockUseGetCommentContext = useGetCommentContext as jest.Mock;

describe("<CommentsList>", () => {
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

  test("Testing a standar Comment List to check if it has comments, also if components are", () => {
    const screen = render(<CommentList subId="The Haunting" />);

    expect(screen.getByText("1 Comments")).toBeVisible();
    expect(AddComment).toHaveBeenCalled();
    expect(Comment).toHaveBeenCalled();
  });
});
