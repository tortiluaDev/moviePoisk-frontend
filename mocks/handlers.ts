import { http, HttpResponse } from "msw";

export const BASE_URL = "http://localhost:3002";
export const rawData = [
  {
    adult: false,
    backdrop_path: "/7QirCB1o80NEFpQGlQRZerZbQEp.jpg",
    genre_ids: [10749, 18],
    id: 1156594,
    original_language: "es",
    original_title: "Culpa nuestra",
    overview:
      "Jenna and Lion's wedding brings about the long-awaited reunion between Noah and Nick after their breakup. Nick's inability to forgive Noah stands as an insurmountable barrier...",
    popularity: 532.1524,
    poster_path: "/yzqHt4m1SeY9FbPrfZ0C2Hi9x1s.jpg",
    release_date: "2025-10-15",
    title: "Our Fault",
    video: false,
    vote_average: 7.689,
    vote_count: 375,
  },
  {
    adult: false,
    backdrop_path: "/ygOR390GzOX5Quv0kAAcUNDG7fp.jpg",
    genre_ids: [12, 28, 27],
    id: 1511789,
    original_language: "en",
    original_title: "Captain Hook - The Cursed Tides",
    overview:
      "After defeat by Admiral Smee, Captain Hook allies with a blacksmith to seek revenge amidst ancient curses and sword fights.",
    popularity: 340.5134,
    poster_path: "/bcP7FtskwsNp1ikpMQJzDPjofP5.jpg",
    release_date: "2025-07-11",
    title: "Captain Hook - The Cursed Tides",
    video: false,
    vote_average: 4.8,
    vote_count: 25,
  },
  {
    adult: false,
    backdrop_path: "/iZLqwEwUViJdSkGVjePGhxYzbDb.jpg",
    genre_ids: [878, 53],
    id: 755898,
    original_language: "en",
    original_title: "War of the Worlds",
    overview:
      "Homeland Security analyst uncovers a terrifying alien invasion hidden by the government.",
    popularity: 317.3022,
    poster_path: "/yvirUYrva23IudARHn3mMGVxWqM.jpg",
    release_date: "2025-07-29",
    title: "War of the Worlds",
    video: false,
    vote_average: 4.375,
    vote_count: 651,
  },
];

export const handlers = [
  http.get(`${BASE_URL}/movies/:page`, () => {
    return HttpResponse.json(rawData, { status: 200 });
  }),
];
