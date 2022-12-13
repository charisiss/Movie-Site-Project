import { render, screen } from "@testing-library/react";

import { useGetMovieContext } from "store/MoviesContext";
import MoviesList from "components/MoviesList/MoviesList";
import Divider from "components/Divider";
import Home from "pages";
import SearchForm from "components/SearchForm";

jest.mock("store/MoviesContext");
jest.mock("components/MoviesList/MoviesList");
jest.mock("components/SearchForm");
jest.mock("components/Divider");

const mockUseGetMovieContext = useGetMovieContext as jest.Mock;

describe("Index Page", () => {
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
  });

  test("Checks if elements are render at the screen", () => {
    render(<Home />);

    expect(
      screen.getByText("Find Movies, TV shows and more")
    ).toBeInTheDocument();
    expect(
      screen.getByText("CSMovies, Watch Movie Trailers", { exact: false })
    ).toBeInTheDocument();

    expect(SearchForm).toBeDefined();
    expect(Divider).toBeDefined();
    expect(MoviesList).toBeDefined();
  });
});
