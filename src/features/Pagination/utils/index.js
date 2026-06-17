export function getPageRange(currentPage, pagesCount) {
  if (currentPage <= 4) return { startPage: 1, endPage: 5 };
  if (currentPage >= pagesCount - 3) return { startPage: pagesCount - 4, endPage: pagesCount };
  return { startPage: currentPage - 1, endPage: currentPage + 1 };
}