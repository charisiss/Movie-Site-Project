import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Comment from "./Comment";

describe("<Comment>", () => {
  test("Adding a test Comment and testing visibility", () => {
    render(
      <Comment
        comment="test #uniqueID"
        name="Anonymous user #uniqueID"
        id="test #uniqueID"
      />
    );

    expect(screen.getByText("test #uniqueID")).toBeInTheDocument();

    expect(screen.getByText("Anonymous user #uniqueID")).toBeInTheDocument();
  });
});
