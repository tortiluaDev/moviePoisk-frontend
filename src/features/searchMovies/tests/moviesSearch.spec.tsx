import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestMoviesSearch } from "@/features/searchMovies/tests/TestMoviesSearch";
import * as getAllMoviesQuery from "@/shared/api/hooks/general/useMoviesQuery";
import * as searchMovies from "@/features/searchMovies/model/hooks/useSearchMovies";
import { rawData } from "../../../../mocks/handlers";

describe("feature/searchMovies", () => {
  test("При вводе названия рендерится список фильмов с похожими названиями", async () => {
    vi.spyOn(getAllMoviesQuery, "useMoviesQuery").mockReturnValue({
      data: {
        data: { data: rawData },
        error: undefined,
        response: {} as Response,
      },
    } as unknown as ReturnType<typeof getAllMoviesQuery.useMoviesQuery>);

    const userInput = "our";
    vi.spyOn(searchMovies, "useSearchMovies").mockReturnValue(
      rawData.filter((movie) => movie.title.toLowerCase().includes(userInput)),
    );

    const user = userEvent.setup();
    render(<TestMoviesSearch />);

    await user.type(screen.getByPlaceholderText("Search"), userInput);

    expect(screen.getByTestId("listOfSearchedMovies")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link").textContent.toLowerCase()).toContain(
      (
        screen.getByPlaceholderText("Search") as HTMLInputElement
      ).value.toLowerCase(),
    );
  });

  test("При вводе некорректных данных список фильмов не появляется", async () => {
    vi.spyOn(getAllMoviesQuery, "useMoviesQuery").mockReturnValue({
      data: {
        data: {
          data: rawData,
        },
        error: undefined,
        response: {} as Response,
      },
    } as unknown as ReturnType<typeof getAllMoviesQuery.useMoviesQuery>);

    const userInput = "3#2!_@81A";
    vi.spyOn(searchMovies, "useSearchMovies").mockReturnValue(
      rawData.filter((movie) => movie.title.toLowerCase().includes(userInput)),
    );

    const user = userEvent.setup();
    render(<TestMoviesSearch />);

    await user.type(screen.getByPlaceholderText("Search"), userInput);

    expect(
      screen.queryByTestId("listOfSearchedMovies"),
    ).not.toBeInTheDocument();
  });
});
