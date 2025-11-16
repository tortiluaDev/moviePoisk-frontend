"use client";

import { useFavoritesQuery } from "@/shared";

export default function Favorites() {
  const { data, isLoading, isError } = useFavoritesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error(</p>;

  console.log(data);
  return (
    <div>
      {data?.data?.map((favorite) => (
        <li key={favorite.id}>{favorite.title}</li>
      ))}
    </div>
  );
}
