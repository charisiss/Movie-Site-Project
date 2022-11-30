import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import MovieList from "./MoviesList";

describe("<MovieList>", () => {
  const demoProps = {
    movies: [
      {
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
      {
        character: "Lighting McQueen",
        director: "Brian Fee",
        key: "Cars20.9583482701228162",
        movie: "Cars 2",
        movie_duration: "01:41:25",
        poster:
          "https://images.ctfassets.net/bs8ntwkklfua/43fOBsgY8iOJL0dijvFnfl/ea361efc5131a859c173ab5dd3fdfe1e/Cars_3_Poster.jpg",
        release_date: "2018-05-23",
        video: {
          "1080p":
            "https://videos.ctfassets.net/bs8ntwkklfua/1xpGU65B…66f22c976b7a345ba7a2d931ce/Cars_3_Wow_2_1080p.mp4",
          "720p":
            "https://videos.ctfassets.net/bs8ntwkklfua/NXF2Haue…d80d211f6f93062b4f35c6d68ba/Cars_3_Wow_2_720p.mp4",
        },
        year: 2017,
      },
    ],
  };

  test("Checks if movies cards are displaying, checks the buttons also", () => {
    render(<MovieList size={2} sort={true} {...demoProps} />);

    expect(screen.getByText("Sort ASC")).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("Cars 3")).toBeInTheDocument();
    expect(screen.getByText("Cars 2")).toBeInTheDocument();
  });
  test("Checks if the elements are not visible, because of props", () => {
    render(<MovieList size={1} sort={false} {...demoProps} />);

    expect(screen.queryByText("Sort ASC")).not.toBeInTheDocument();
    expect(screen.queryByText("Popular")).not.toBeInTheDocument();
    expect(screen.queryByText("Cars 2")).not.toBeInTheDocument();

    expect(screen.getByText("Cars 3")).toBeInTheDocument();
  });
  // test("Checks sort button", async () => {
  //   render(<MovieList size={2} sort={true} {...demoProps} />);

  //   act(() => screen.getByText("Sort ASC").click());
  //   expect(screen.getByTestId("movie-card")).toBeInTheDocument();

  //   // const stories = await screen.queryAllByTestId("movie-card");
  //   // expect(stories).toHaveLength(2);
  // });
});
