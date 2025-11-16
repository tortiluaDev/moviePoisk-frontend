export function transformPageNumber(page: number, lastPage: number) {
  if (page === 0) return 1;
  if (page + 1 > lastPage || page === lastPage - 2) return --page;
  if (page + 1 >= lastPage - 1) return page - 2;

  return page;
}
