
import React from "react"
import { Pagination } from "react-bootstrap"
const usePaginationhook = ({ totalItems, perPage = 9, currentPage = 1, onPageChange }) => {
    const pageCount = Math.ceil(totalItems / perPage)

    const handlePageClick = page => {
        onPageChange(page)
    }

    const renderPageNumbers = () => {
        const pageNumbers = []
        const maxVisiblePages = 5
        const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2)
        let startPageIndex = Math.max(1, currentPage - halfMaxVisiblePages)
        let endPageIndex = Math.min(pageCount, currentPage + halfMaxVisiblePages)

        if (endPageIndex - startPageIndex < maxVisiblePages - 1) {
            if (startPageIndex === 1) {
                endPageIndex = Math.min(pageCount, startPageIndex + maxVisiblePages - 1)
            } else {
                startPageIndex = Math.max(1, endPageIndex - maxVisiblePages + 1)
            }
        }

        for (let i = startPageIndex; i <= endPageIndex; i++) {
            pageNumbers.push(
                <li
                    key={i}
                    className={`page-item ${currentPage === i ? "active" : ""}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </li>
            )
        }

        return pageNumbers
    }


    return (
        <Pagination className="custom-pagination">
            {/* <Pagination.First
                disabled={currentPage === 1}
                onClick={() => handlePageClick(1)}
            /> */}
            <Pagination.Prev
                disabled={pageCount === 0 || currentPage === 1}
                onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
                className="custom-page-arrow"
            />
            {renderPageNumbers()}
            <Pagination.Next
                disabled={pageCount === 0 || currentPage === pageCount}
                onClick={() => handlePageClick(Math.min(pageCount, currentPage + 1))}
                className="custom-page-arrow"
            />
            {/* <Pagination.Last
                disabled={currentPage === pageCount}
                onClick={() => handlePageClick(pageCount)}
            /> */}
        </Pagination>

    )
}

export default usePaginationhook
