"use client";

import { useEffect } from "react";
import { client } from "@/shared";

export function useTokenRefresh() {
  useEffect(() => {
    const refreshInterval = setInterval(
      async () => {
        try {
          await client.POST("/auth/refresh");
        } catch (err) {
          console.error("Token refresh failed", err);
        }
      },
      1000 * 60 * 60,
    );

    return () => clearInterval(refreshInterval);
  }, []);
}
