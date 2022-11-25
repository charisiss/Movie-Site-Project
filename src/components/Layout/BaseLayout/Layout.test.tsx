import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Layout from "./Layout";
import MainNavigation from "../MainNavigation";
import LoginForm from "../LoginForm";

jest.mock("../MainNavigation");
jest.mock("../LoginForm");

describe("<Layout>", () => {
  test("Checks if the header components are visible", () => {
    // eslint-disable-next-line react/no-children-prop
    render(<Layout children={undefined} />);

    expect(LoginForm).not.toHaveBeenCalled();
    expect(MainNavigation).toHaveBeenCalled();
  });
});
