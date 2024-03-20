"use client";

import { useMemo, useState } from "react";

function usePagination<T>(page: number, items: T[], page_size: number) {
  const [currentPage, setCurrentPage] = useState(page);
  const setPage = (page: number) => setCurrentPage(page);
  const totalPages = Math.ceil(items.length / page_size);

  const paginatedItems = useMemo(() => {
    return items.filter((item, index) => {
      if (
        index >= page_size * (currentPage - 1) &&
        index < page_size * currentPage
      )
        return item;
    });
  }, [items, currentPage, page_size]);
  return { paginatedItems, setPage, totalPages, currentPage };
}

export default usePagination;
