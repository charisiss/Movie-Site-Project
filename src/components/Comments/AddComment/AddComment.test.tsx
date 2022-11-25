import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { addComment, useGetCommentContext } from "store/CommentsContext";
import userEvent from "@testing-library/user-event";

import AddComment from "./AddComment";

jest.mock("store/CommentsContext");

const mockUseGetCommentContext = useGetCommentContext as jest.Mock;

describe("<AddComment>", () => {
  beforeEach(() => {
    mockUseGetCommentContext.mockImplementation(() => ({
      getComments: jest.fn(),
    }));
  });

  test("Allows user to add a comment", () => {
    render(<AddComment />);

    expect(screen.getByText("Add a comment")).toBeVisible();
    const test = screen.getByRole("textbox");

    const field = screen.getByTestId("comment-input").querySelector("input");
    expect(field).toBeInTheDocument();

    fireEvent.change(field as Node, { target: { value: "google it" } });
    expect(field!.value).toBe("google it");

    // const input = screen.getByTestId("button");
    // userEvent.click(input);

    //expect(field!.value).toBe("");
    // expect(submitHandler).toHaveBeenCalled();
  });
});
