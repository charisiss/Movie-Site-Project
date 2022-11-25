import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Divider from "./Divider";

describe("<Divider>", () => {
  test("Adding a divider with a title", () => {
    render(<Divider size="30" title="Test Divider" />);

    expect(screen.getByText("Test Divider")).toBeInTheDocument();
  });

  test("Adding a divider without a title", () => {
    render(<Divider size="30" />);
  });
});
