import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestMoviesPagination } from "@/features/moviesPagination/tests/TestMoviesPagination";
import userEvent from "@testing-library/user-event";
import { transformPageNumber } from "@/features/moviesPagination/model/transformPageNumber";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: vi.fn(() => new URLSearchParams("page=1")),
}));

describe("feature/moviesPagination", () => {
  test("При клике на кнопку с номером страницы происходит редирект", async () => {
    const user = userEvent.setup();
    render(<TestMoviesPagination />);

    await user.click(screen.getByText("2"));
    expect(pushMock).toHaveBeenCalledWith("/?page=2");

    await user.click(screen.getByText("49"));
    expect(pushMock).toHaveBeenCalledWith("/?page=49");

    await user.click(screen.getByText("1"));
    expect(pushMock).toHaveBeenCalledWith("/?page=1");
  });

  test("При клике на кнопку 'вперед' произойдет редирект на следующую страницу", async () => {
    const user = userEvent.setup();
    render(<TestMoviesPagination />);

    await user.click(screen.getByTestId("forwardBtn"));
    expect(pushMock).toHaveBeenCalledWith("/?page=2");
  });

  test("При клике на кнопку 'назад' произойдет редирект на прошлую страницу", async () => {
    const user = userEvent.setup();
    render(<TestMoviesPagination />);

    await user.click(screen.getByTestId("forwardBtn"));
    await user.click(screen.getByTestId("backBtn"));
    expect(pushMock).toHaveBeenCalledWith("/?page=1");
  });

  test("Функция transformPageNumber корректно считает номер страницы для отображения в меню пагинации", () => {
    expect(transformPageNumber(0, 50)).toBe(1);

    expect(transformPageNumber(51, 50)).toBe(50);
    expect(transformPageNumber(50, 50)).toBe(49);
    expect(transformPageNumber(49, 50)).toBe(47);
    expect(transformPageNumber(48, 50)).toBe(47);
    expect(transformPageNumber(47, 50)).toBe(47);

    expect(transformPageNumber(17, 50)).toBe(17);
  });
});
