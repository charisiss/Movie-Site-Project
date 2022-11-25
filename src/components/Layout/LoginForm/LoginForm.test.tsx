import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";

describe("<LoginForm>", () => {
  const demoProps = {
    setOpenLogin: jest.fn(),
  };

  test("Checks if the login elements are visible", () => {
    render(<LoginForm {...demoProps} />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
  });

  test("Checks if the close button is working", () => {
    render(<LoginForm {...demoProps} />);

    screen.getByText("CLOSE").click();
    expect(demoProps.setOpenLogin).toHaveBeenCalled();
  });
});
