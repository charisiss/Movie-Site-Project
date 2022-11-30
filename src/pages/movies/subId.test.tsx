import { render, screen } from "@testing-library/react";

import { useGetMovieContext } from "store/MoviesContext";
import { useGetCommentContext } from "store/CommentsContext";
import SingleMoviePage from "./[subId]";

const demoProps = {
  item: [
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

jest.mock("store/MoviesContext");
jest.mock("store/CommentsContext");

const mockUseGetMovieContext = useGetMovieContext as jest.Mock;
const mockUseGetCommentsContext = useGetCommentContext as jest.Mock;

describe("Single Movie Page", () => {
  beforeEach(() => {
    mockUseGetMovieContext.mockImplementation(() => ({
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
      ],
      isLoading: false,
    }));
    mockUseGetCommentsContext.mockImplementation(() => {
      comments: [];
    });
  });

  test("Checks if movie details are visible at screen", async () => {
    render(<SingleMoviePage {...demoProps} />);

    expect(screen.getByAltText("movieImage")).toBeInTheDocument();
    expect(screen.getByText("Brian Fee")).toBeInTheDocument();
    expect(screen.getByText("Lighting McQueen")).toBeInTheDocument();
    expect(screen.getByText("2017-05-23")).toBeInTheDocument();
  });
  test("Checks if other elements are visible at screen", () => {
    render(<SingleMoviePage {...demoProps} />);

    expect(screen.getByText("Watch Trailer")).toBeInTheDocument();
  });
});
