import { fireEvent, waitFor, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { mount } from "enzyme";

import MovieCard from "./MovieCard";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("<MovieCard>", () => {
  const demoProps = {
    movie: {
      character: "Lighting McQueen",
      director: "Brian Fee",
      key: "Cars30.9583982701228162",
      movie: "Cars 3",
      movie_duration: "01:42:25",
      poster:
        "https://images.ctfassets.net/bs8ntwkklfua/43fOBsgY8iOJL0dijvFnfl/ea361efc5131a859c173ab5dd3fdfe1e/Cars_3_Poster.jpg",
      release_date: "2017-05-23",
      video: {
        "1080p":
          "https://videos.ctfassets.net/bs8ntwkklfua/1xpGU65B…66f22c976b7a345ba7a2d931ce/Cars_3_Wow_2_1080p.mp4",
        "720p":
          "https://videos.ctfassets.net/bs8ntwkklfua/NXF2Haue…d80d211f6f93062b4f35c6d68ba/Cars_3_Wow_2_720p.mp4",
      },
      year: 2017,
    },
  };

  test("Checks if the basic layout called", () => {
    render(<MovieCard {...demoProps} />);

    expect(screen.getByTestId("iconButton")).toBeInTheDocument();
    expect(screen.getByTestId("playArrow")).toBeInTheDocument();
    expect(screen.getByAltText("movieCardImage")).toBeInTheDocument();
  });

  test("Checks if the card title and description is visible", () => {
    render(<MovieCard {...demoProps} />);

    expect(screen.getByText("Cars 3")).toBeVisible();
    expect(screen.getByText("2017 · 01:42h")).toBeVisible();
  });

  // test("Checks if the button is redirecting", async () => {
  //   render(<MovieCard {...demoProps} />);

  //   // jest.spyOn(router, "push").mockImplementation(mockPush);
  //   const router = { push: jest.fn() };

  //   fireEvent.click(screen.getByTestId("iconButton"));
  //   expect(router.push).toHaveBeenCalledWith("/movies/Cars%203");
  //   // expect(mockPush).toHaveBeenCalledWith("/movies/Cars%203")
  //   // await waitFor(() =>
  //   //   expect(window.location.pathname).toBe("/movies/Cars%203")
  //   // );
  // });

  it("should call router.push when the button is clicked", () => {
    const router = { push: jest.fn() };
    useRouter.mockImplementation(() => router);

    const wrapper = mount(
      <Router>
        <MovieCard {...demoProps} />
      </Router>
    );

    wrapper.find("button").simulate("click");

    expect(router.push).toHaveBeenCalledWith("/my-page");
  });
});
