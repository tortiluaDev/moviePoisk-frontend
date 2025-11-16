import { render, screen, waitFor } from "@testing-library/react";
import { rawData } from "../../../../mocks/handlers";
import { describe, expect, test, vi } from "vitest";
import { TestMovies } from "@/widgets/movies/tests/TestMovies";
import * as moviesQuery from "@/widgets/movies/model/useMoviesQuery";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === "page" ? "1" : null),
  }),
}));
vi.mock("@/widget/movies/model/useMoviesQuery");

describe("widget/Movies", () => {
  test("При монтировании компонента должны загружаться фильмы", async () => {
    vi.spyOn(moviesQuery, "useMoviesByPageQuery").mockReturnValue({
      data: {
        data: rawData,
        error: undefined,
        response: {} as Response,
      },
      isLoading: false,
      isError: false,
      isSuccess: true,
    } as ReturnType<typeof moviesQuery.useMoviesByPageQuery>);

    render(<TestMovies />);

    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
    });

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(rawData.length);

    images.forEach((img) => {
      expect(img).toHaveAttribute("src");
      expect(img).toHaveAttribute("alt");
    });
  });

  test("Компонент отрисовывает только сообщение об ошибке при неудачном запросе", async () => {
    vi.spyOn(moviesQuery, "useMoviesByPageQuery").mockReturnValue({
      data: {
        data: undefined,
        error: {
          message: "API error",
        },
        response: {} as Response,
      },
      isLoading: false,
      isError: true,
      isSuccess: false,
    } as unknown as ReturnType<typeof moviesQuery.useMoviesByPageQuery>);

    render(<TestMovies />);

    await waitFor(() => {
      const images = screen.queryAllByRole("img");
      expect(images).toHaveLength(0);
    });

    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });

  test("Компонент показывает состояние загрузки при выполняющемся запросе", async () => {
    vi.spyOn(moviesQuery, "useMoviesByPageQuery").mockReturnValue({
      data: {
        data: undefined,
        error: undefined,
        response: {} as Response,
      },
      isLoading: true,
      isError: false,
      isSuccess: false,
    } as unknown as ReturnType<typeof moviesQuery.useMoviesByPageQuery>);

    render(<TestMovies />);

    await waitFor(() => {
      expect(screen.queryAllByRole("img")).toHaveLength(0);
    });

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
