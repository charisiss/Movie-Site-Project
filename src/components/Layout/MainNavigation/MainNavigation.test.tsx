import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import MainNaviation from "./MainNavigation";

describe("<LoginForm>", () => {
  const demoProps = {
    openLogin: jest.fn(),
  };

  test("Checks if the header elements are visible", () => {
    render(<MainNaviation {...demoProps} />);

    expect(screen.getByAltText("Logo-Image")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("idk", () => {
    render(<MainNaviation {...demoProps} />);
  });
});
