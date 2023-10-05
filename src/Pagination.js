import React from 'react';

function Pagination({ total, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(total / itemsPerPage);

    return (
        <div className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    key={index}
                    className={index + 1 === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

export default Pagination;
