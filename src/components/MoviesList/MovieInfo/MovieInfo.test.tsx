import { fireEvent, render, screen } from "@testing-library/react";

import MovieInfo from "./MovieInfo";

describe("<MovieInfo>", () => {
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

  test("Checks if the tooltip component is called", () => {
    // eslint-disable-next-line react/no-children-prop
    render(<MovieInfo children={<div></div>} {...demoProps} />);

    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });
  test("Hovers tooltip and checks the content", async () => {
    // eslint-disable-next-line react/no-children-prop
    render(<MovieInfo children={<div></div>} {...demoProps} />);

    fireEvent.mouseOver(await screen.getByTestId("tooltip"));
    expect(await screen.findByText("Cars 3")).toBeVisible();
    expect(
      await screen.findByText("Lorem Ipsum", { exact: false })
    ).toBeVisible();
    expect(await screen.findByText("Actors: Lighting McQueen")).toBeVisible();
    expect(await screen.findByText("Year: 2017")).toBeVisible();

    expect(await screen.findByText("Watch Now")).toBeVisible();
  });
});
