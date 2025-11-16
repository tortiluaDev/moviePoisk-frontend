"use client";
import styles from "./trends.module.scss";
import { useRef } from "react";
import {
  convertImgPathToUrl,
  ImageSkeletonLoader,
  useHorizontallyScroll,
} from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/shared/api/client";
import { Movie } from "@/entities";

export function TrendsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  useHorizontallyScroll(sliderRef);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["movies", "top"],
    queryFn: () => client.GET("/movies/top"),
  });

  if (isError) return <p>Error!</p>;

  return (
    <div className={styles.sliderWrapper} ref={sliderRef}>
      <div>
        <div className={styles.slider}>
          {isLoading
            ? Array.from({ length: 10 }).map((_, idx) => (
                <div key={idx}>
                  <ImageSkeletonLoader />
                </div>
              ))
            : data?.data?.slice(0, 10).map((movie, idx) => (
                <div key={movie.id}>
                  <Movie
                    imgUrl={convertImgPathToUrl({
                      path: movie?.poster_path as string,
                      size: "m",
                      type: "poster",
                    })}
                    title={movie.title}
                    withIcons={false}
                  />
                  <p>{idx + 1}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
