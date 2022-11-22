import { render } from "@testing-library/react";
import { useGetCommentContext } from "../../../store/CommentsContext";
import AddComment from "../AddComment";

jest.mock("../../../store/CommentsContext");
jest.mock("../AddComment");

const mockUseGetCommentContext = useGetCommentContext as jest.Mock;

import CommentList from "./CommentsList";

describe("<CommentsList>", () => {
  beforeEach(() => {
    mockUseGetCommentContext.mockImplementation(() => ({
      comments: [{
        comment: "mockComment",
        name: "mockName",
        id: "mockCommentId",
      }],
      getComments: jest.fn(),
    }));
  });

  test("Testing a standar Comment List to check if it has comments", () => {
    const screen = render(<CommentList subId="The Haunting" />);

    expect(screen.getByText("1 Comments")).toBeVisible();
    expect(AddComment).toHaveBeenCalled();
  });
});