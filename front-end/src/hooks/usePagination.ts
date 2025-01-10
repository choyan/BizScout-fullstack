import { useEffect, useState } from "react";

type UsePaginationTypes = {
  currentPage: number;
  totalPage: number;
};

export function usePagination({ currentPage, totalPage }: UsePaginationTypes) {
  const [nextPage, setNextPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPrevPage, setCanPrevPage] = useState(false);

  useEffect(() => {
    if (currentPage < totalPage) {
      setNextPage(currentPage + 1);
      setCanNextPage(true);
    }

    if (currentPage === 1) {
      setPrevPage(0);
      setCanPrevPage(false);
    } else {
      setPrevPage(currentPage - 1);
      setCanPrevPage(true);
    }
  }, [currentPage]);
  return [nextPage, canNextPage, prevPage, canPrevPage];
}
