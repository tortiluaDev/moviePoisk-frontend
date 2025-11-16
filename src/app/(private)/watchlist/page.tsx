"use client";

import { useWatchlistQuery } from "@/shared";

export default function Watchlist() {
  const { data, isLoading, isError } = useWatchlistQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error(</p>;

  console.log(data);
  return (
    <div>
      {data?.data?.map((watchlist) => (
        <li key={watchlist.id}>{watchlist.title}</li>
      ))}
    </div>
  );
}
