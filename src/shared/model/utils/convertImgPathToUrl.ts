import { TMDB_IMG } from "@/shared";

interface ImgParameters {
  path: string;
  size: "s" | "m" | "l";
  type: "poster" | "backdrop";
}

export function convertImgPathToUrl({ path, size, type }: ImgParameters) {
  let imgSrc = `${TMDB_IMG.baseUrl}/`;

  if (type === "poster") {
    imgSrc += TMDB_IMG.posterSizes[size];
  } else {
    imgSrc += TMDB_IMG.backdropSizes[size];
  }

  imgSrc += path;

  return imgSrc;
}
