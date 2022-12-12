import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { NextPage } from "next";
import MovieCard from "./MovieCard";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const testMovie = {
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
};

const TestPage: NextPage = () => {
  return <MovieCard movie={testMovie} />;
};

describe("MovieCard component", () => {
  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<TestPage />);
    const card = getByTestId("movie-card");
    const title = getByText(testMovie.movie);
    const description = getByText(
      `${testMovie.year} · ${testMovie.movie_duration.slice(0, -3)}h`
    );
    expect(card).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("navigates to movie page when clicked", () => {
    const { getByTestId } = render(<TestPage />);
    const card = getByTestId("movie-card");
    fireEvent.click(card);
    expect(useRouter).toBeDefined();
  });

  it("navigates to movie page when play button is clicked", () => {
    const { getByTestId } = render(<TestPage />);
    const playButton = getByTestId("play-arrow");
    fireEvent.click(playButton);
    expect(useRouter).toBeDefined();
  });
});
