import { usePagination } from "@/hooks/usePagination";

type PaginationTypes = {
  total: number;
  from?: number;
  to?: number;
  lastPage: number;
  current: number;
  setCurrent: (page: number) => void;
};

export function Pagination({
  total,
  lastPage,
  current,
  setCurrent,
}: PaginationTypes) {
  const [canNextPage, canPrevPage] = usePagination({
    currentPage: current,
    totalPage: total,
  });

  const goToNext = () => {
    if (canNextPage) {
      setCurrent(current + 1);
    }
  };

  const goToPrev = () => {
    if (canPrevPage) {
      setCurrent(current - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrent(pageNumber);
  };

  return (
    <div className="bg-white py-3 flex items-center justify-between rounded-md   ">
      <div className="flex-1 flex w-full justify-between sm:hidden">
        {current > 0 && (
          <a
            className="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={goToPrev}
          >
            Previous
          </a>
        )}
        {current < lastPage && (
          <a
            className="cursor-pointer ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={goToNext}
          >
            Next
          </a>
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div></div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md -space-x-px"
            aria-label="Pagination"
          >
            <button
              className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={goToPrev}
              disabled={current === 1}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="fil-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
              </svg>
            </button>

            {current - 2 > 0 && (
              <button
                className="cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                onClick={() => goToPage(current - 2)}
              >
                {current - 2}
              </button>
            )}

            {current - 1 > 0 && (
              <button
                className="cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                onClick={() => goToPage(current - 1)}
              >
                {current - 1}
              </button>
            )}

            <button
              aria-current="page"
              className="z-10 bg-blue-100 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {current}
            </button>

            {current + 1 <= lastPage && (
              <button
                className="cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                onClick={() => goToPage(current + 1)}
              >
                {current + 1}
              </button>
            )}

            {current + 2 <= lastPage && (
              <button
                className="cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                onClick={() => goToPage(current + 2)}
              >
                {current + 2}
              </button>
            )}
            <button
              className="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              disabled={current === lastPage}
              onClick={goToNext}
            >
              <span className="sr-only">Next</span>
              <svg
                className="fill-current h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
