import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import MainNaviation from "./MainNavigation";

describe("<MainNavigation>", () => {
  const demoProps = {
    openLogin: jest.fn(),
  };

  test("Checks if the header elements are visible, also check the redirection links", () => {
    render(<MainNaviation {...demoProps} />);

    expect(screen.getByAltText("Logo-Image")).toBeInTheDocument();

    const homeBtn = screen.getByText("Home");
    expect(homeBtn).toBeInTheDocument();
    expect(homeBtn).toHaveAttribute("href", "/");

    const moviesBtn = screen.getByText("Movies");
    expect(moviesBtn).toBeInTheDocument();
    expect(moviesBtn).toHaveAttribute("href", "/movies");

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
