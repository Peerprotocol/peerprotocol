import Icon from "./Icons/Icon";

const Pagination = ({
  setPage,
  currentPage,
  lastPage,
}: {
  setPage: (page: number) => void;
  currentPage: number;
  lastPage: number;
}) => {
  const handlePrev = () => currentPage > 1 && setPage(currentPage - 1);
  const handleNext = () => currentPage < lastPage && setPage(currentPage + 1);

  return (
    <div className="flex gap-3 items-center">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <Icon name="chevron_left" />
      </button>
      <PaginationRange
        currentPage={currentPage}
        lastPage={lastPage}
        setPage={setPage}
      />
      <button
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5"
        onClick={handleNext}
        disabled={currentPage >= lastPage}
      >
        <Icon name="chevron_right" />
      </button>
    </div>
  );
};

const PaginationRange = ({
  currentPage,
  setPage,
  lastPage,
}: {
  currentPage: number;
  lastPage: number;
  setPage: (page: number) => void;
}) => {
  let firstEllipseRendered = false;
  let lastEllipseRendered = false;

  return (
    <div className="flex gap-2 items-center">
      {Array(lastPage)
        .fill(null)
        .map((_, index) => {
          const page = index + 1;
          if (page === currentPage) {
            return (
              <button
                onClick={() => setPage(page)}
                className="w-10 h-10 flex items-center justify-center rounded-xl  bg-green"
              >
                {page}
              </button>
            );
          }
          if (page === 1)
            return (
              <button
                onClick={() => setPage(page)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5"
              >
                1
              </button>
            );
          if (page === lastPage)
            return (
              <button
                onClick={() => setPage(page)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5"
              >
                {lastPage}
              </button>
            );

          if (Math.abs(page - currentPage) <= 2) {
            return (
              <button
                onClick={() => setPage(page)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5"
              >
                {page}
              </button>
            );
          }
          if (page - currentPage < 0 && !firstEllipseRendered) {
            firstEllipseRendered = true;
            return <div>...</div>;
          }
          if (
            Math.abs(page - currentPage) > 2 &&
            page === lastPage - 1 &&
            !lastEllipseRendered
          ) {
            lastEllipseRendered = true;
            return <div>...</div>;
          }
        })}
    </div>
  );
};

export default Pagination;
