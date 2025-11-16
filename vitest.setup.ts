import { beforeAll, afterEach, afterAll, vi, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./mocks/node.js";
import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

afterEach(() => {
  cleanup();
});
