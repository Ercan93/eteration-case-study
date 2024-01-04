import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Pagination = ({ totalPage, onChangePage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setMinPageLimit(minPageLimit + 1);
      setMaxPageLimit(maxPageLimit + 1);
    }

    if (currentPage + 3 > totalPages) {
      setMaxPageLimit(totalPages);
      setMinPageLimit(totalPages - 3);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setMaxPageLimit(maxPageLimit - 1);
      setMinPageLimit(minPageLimit - 1);
    }

    if (currentPage < 4) {
      setMinPageLimit(0);
      setMaxPageLimit(3);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextLimit = () => {
    if (maxPageLimit + 2 <= totalPages) {
      setCurrentPage(maxPageLimit + 1);
      setMaxPageLimit(maxPageLimit + 3);
      setMinPageLimit(minPageLimit + 3);
    } else {
      setCurrentPage(totalPages);
      setMaxPageLimit(totalPages);
      setMinPageLimit(totalPages - 3);
    }
  };

  const handlePrevLimit = () => {
    if (minPageLimit > 2) {
      setCurrentPage(currentPage - 3);
      setMinPageLimit(minPageLimit - 3);
      setMaxPageLimit(maxPageLimit - 3);
    } else {
      setCurrentPage(currentPage - minPageLimit);
      setMinPageLimit(0);
      setMaxPageLimit(3);
    }
  };

  const createPages = () => {
    const pagesClone = [];
    for (let i = 1; i <= totalPage; i++) {
      pagesClone.push(i);
    }
    setPages(pagesClone);
  };

  useEffect(() => {
    onChangePage(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setTotalPages(totalPage);
    createPages();

    if (totalPage < 2) setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPage]);

  return (
    <div className="pagination d-flex justify-content-center cursor-pointer">
      <div
        className={`page-item-prev me-4
          ${currentPage === 1 ? "disabled" : ""}`}
      >
        <div className="page-link rounded" onClick={handlePrev}>
          Prev
        </div>
      </div>
      {minPageLimit > 0 && (
        <div className="page-item mx-2">
          <div className="page-link rounded" onClick={() => handlePrevLimit()}>
            ...
          </div>
        </div>
      )}
      {pages.length > 0 &&
        pages.map(
          (page, index) =>
            index < maxPageLimit &&
            index >= minPageLimit && (
              <div className="page-item mx-2" key={index}>
                <div
                  className={`page-link rounded ${
                    currentPage === page ? "active text-white" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </div>
              </div>
            )
        )}
      {maxPageLimit < pages.length && (
        <div className="page-item mx-2">
          <div className="page-link rounded" onClick={() => handleNextLimit()}>
            ...
          </div>
        </div>
      )}
      <div
        className={`page-item-next ms-4
          ${currentPage === totalPages || totalPages === 0 ? "disabled" : ""}`}
      >
        <div className="page-link rounded" onClick={handleNext}>
          Next
        </div>
      </div>
    </div>
  );
};

Pagination.defaultProps = {
  totalPage: 0,
  onChangePage: () => {},
};

Pagination.propTypes = {
  totalPage: PropTypes.number,
  onChangePage: PropTypes.func,
};

export default Pagination;
