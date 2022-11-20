import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentList from "./CommentsList";

describe("<CommentsList>", () => {
  test("Testing a standar Comment List to check if it has comments", async () => {
    render(<CommentList subId="The Haunting" />);

    expect(
      await screen.findByText("This is a great movie!")
    ).toBeInTheDocument();

    expect(await screen.findByText("Anonymous User 26")).toBeInTheDocument();
  });
});
