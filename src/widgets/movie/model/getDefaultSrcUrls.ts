import { convertImgPathToUrl } from "@/shared";

interface Paths {
  backdrop: string;
  poster: string;
}

export function getDefaultSrcUrls(paths: Paths) {
  const backdropSrc = convertImgPathToUrl({
    path: paths.backdrop,
    size: "l",
    type: "backdrop",
  });
  const posterSrc = convertImgPathToUrl({
    path: paths.poster,
    size: "m",
    type: "poster",
  });

  return { backdropSrc, posterSrc };
}
