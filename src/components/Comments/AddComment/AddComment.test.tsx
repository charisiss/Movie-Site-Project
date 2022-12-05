import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { addComment, useGetCommentContext } from "store/CommentsContext";

import AddComment from "./AddComment";

jest.mock("store/CommentsContext");

const mockUseGetCommentContext = useGetCommentContext as jest.Mock;

describe("<AddComment>", () => {
  beforeEach(() => {
    mockUseGetCommentContext.mockImplementation(() => ({
      getComments: jest.fn(),
      AddComment: jest.fn(),
    }));
  });

  test("Allows user to add a comment", async () => {
    render(<AddComment />);

    expect(screen.getByText("Add a comment")).toBeVisible();
    const field = screen.getByTestId("comment-input").querySelector("input");
    expect(field).toBeInTheDocument();

    fireEvent.change(field as Node, { target: { value: "google it" } });
    expect(field!.value).toBe("google it");

    const form = screen.getByTestId("comment-input-form");
    const submitHandler = jest.fn();

    fireEvent.submit(form);

    expect(submitHandler).toHaveBeenCalled();

    // expect(await field!.value).toBe("");
    // expect(submitHandler).toHaveBeenCalled();
  });
});
