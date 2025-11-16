import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestFilterMovies } from "@/features/filterMovies/tests/TestFilterMovies";
import * as allGenresQuery from "@/shared/api/hooks/general/useGenresQuery";
import userEvent from "@testing-library/user-event";

const rawData = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 35, name: "Comedy" },
];

describe("feature/filterMovies", () => {
  test("Фильтры отображаются на странице", async () => {
    vi.spyOn(allGenresQuery, "useGenresQuery").mockReturnValue({
      data: {
        data: rawData,
      },
    } as unknown as ReturnType<typeof allGenresQuery.useGenresQuery>);

    render(<TestFilterMovies />);

    expect(screen.getAllByRole("button")).not.toHaveLength(1);
  });

  test("Фильтры переключаются по нажатию", async () => {
    const user = userEvent.setup();

    vi.spyOn(allGenresQuery, "useGenresQuery").mockReturnValue({
      data: {
        data: rawData,
      },
    } as unknown as ReturnType<typeof allGenresQuery.useGenresQuery>);

    render(<TestFilterMovies />);

    await user.click(screen.getByText("Action"));
    expect(screen.getByText("Action")).toHaveFocus();
    await user.click(screen.getByText("All"));
    expect(screen.getByText("All")).toHaveFocus();
  });
});
