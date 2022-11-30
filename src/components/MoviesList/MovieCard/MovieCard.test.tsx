import { render, screen } from "@testing-library/react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import PlayArrow from "@mui/icons-material/PlayArrow";

import MovieCard from "./MovieCard";

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

    expect(screen.getByAltText("movieCardImage")).toBeInTheDocument();
    expect(screen.getByTestId("iconButton")).toBeInTheDocument();
    expect(screen.getByTestId("playArrow")).toBeInTheDocument();
  });

  test("Checks if the card title and description is visible", () => {
    render(<MovieCard {...demoProps} />);

    expect(screen.getByText("Cars 3")).toBeVisible();
    expect(screen.getByText("2017 · 01:42h")).toBeVisible();
  });
});
