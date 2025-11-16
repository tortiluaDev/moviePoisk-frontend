"use client";

import { UserInfo } from "@/entities";
import { ManagePreferences } from "@/features";
import { useMeQuery } from "@/shared";

export function User() {
  const { data, isLoading } = useMeQuery();

  // вынести в loading компонент
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <UserInfo
        name={data?.data?.name || "Anonymous"}
        email={data?.data?.email as string}
      />
      <ManagePreferences
        preferences={
          data?.data?.preferences.map((preference) => ({
            id: preference.id || 0,
            name: preference.name || "",
          })) || []
        }
      />
    </>
  );
}
