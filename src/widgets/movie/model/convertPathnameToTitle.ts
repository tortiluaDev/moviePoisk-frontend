export function convertPathnameToTitle(path: string) {
  return path.replace("/movies/", "").split("%20").join(" ");
}
