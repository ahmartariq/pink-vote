import React, { useState } from "react";

export const Pagination = ({ perPage, totalData, paginate, currentPage }) => {

    const pageNumber = []

    const style = 'bg-primary-100 text-secondary-300'

    for (let i = 1; i <= Math.ceil(totalData / perPage); i++) {
        pageNumber.push(i)
    }

    const prevPage = () => {
        if (currentPage !== 1) {
            paginate(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage !== pageNumber.length) {
            paginate(currentPage + 1)
        }
    }

    // if()

    return (
        <nav className="flex flex-row justify-center mr-12 mt-4">
            <ul className="pagination flex flex-row justify-between gap-4">
                <div className={` ${currentPage === 1 ? "cursor-not-allowed" : ""} flex justify-center items-center cursor-pointer border-2 rounded-md border-primary py-1 px-3 hover:text-white bg-transparent text-primary hover:bg-primary  hover:transition-colors `}
                    onClick={prevPage}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                {pageNumber.map(number => (
                    <li onClick={() => paginate(number)} key={number} className={`flex justify-center items-center cursor-pointer border-2 rounded-md border-primary py-1 px-3 hover:text-white bg-transparent text-primary hover:bg-primary  hover:transition-colors ${currentPage === number ? style : ""}`}>
                        <a>
                            {number}
                        </a>
                    </li>
                ))}
                <div className={`${currentPage === pageNumber.length ? "cursor-not-allowed" : ""} flex justify-center items-center cursor-pointer border-2 rounded-md border-primary py-1 px-3 hover:text-white bg-transparent text-primary hover:bg-primary  hover:transition-colors`} onClick={nextPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </ul>
        </nav>
    )
}