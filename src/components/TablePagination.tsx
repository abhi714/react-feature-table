import React from 'react';

export interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    displayCount: number;
    showTotal?: boolean;
    onPageChange: (page: number) => void;
    className?: string;
}

export function TablePagination({
    currentPage,
    totalPages,
    totalItems,
    displayCount,
    showTotal = true,
    onPageChange,
    className = '',
}: TablePaginationProps) {
    return (
        <div className={`rft-pagination ${className}`}>
            <div>
                {showTotal && (
                    <span>
                        Showing {displayCount} of {totalItems} entries
                    </span>
                )}
            </div>
            <div>
                <button
                    className="rft-pagination-btn"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>
                    {' '}Page {currentPage} of {totalPages}{' '}
                </span>
                <button
                    className="rft-pagination-btn"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
