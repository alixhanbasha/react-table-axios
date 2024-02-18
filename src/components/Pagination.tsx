import React from 'react';

interface PropTypes {
  postsPerPage: number;
  length: number;
  handlePress: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({ postsPerPage, length, handlePress, currentPage }: PropTypes) => {
  console.log( {postsPerPage, length, handlePress, currentPage});
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    console.log({i});
    paginationNumbers.push(i);
  }

  return (
    <div className="d-flex gap-2 justify-content-end">
      {paginationNumbers.map((pageNumber) => (
        <button
        className={currentPage === pageNumber ? "btn btn-outline-secondary" : "btn btn-secondary"}
        type="button"
        onClick={handlePress.bind(this, pageNumber)}
    >
        {pageNumber}
    </button>
      ))}
    </div>
  );
};

export default Pagination;