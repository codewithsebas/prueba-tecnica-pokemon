"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '../types/types';
import { useState, useEffect } from 'react';

const Pagination = ({ currentPage, setCurrentPage, total }: PaginationProps) => {
    const itemsPerPage = 20;
    const totalPages = Math.ceil(total / itemsPerPage);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        const savedPage = localStorage.getItem('paginationPage');
        if (savedPage) {
            const pageNumber = parseInt(savedPage, 10);
            if (!isNaN(pageNumber)) {
                setCurrentPage(pageNumber);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('paginationPage', currentPage.toString());
    }, [currentPage]);

    if (!hydrated) return null;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 3;

        let start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, start + maxPagesToShow - 1);

        if (end - start < maxPagesToShow - 1) {
            start = Math.max(1, end - maxPagesToShow + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center md:justify-between gap-1 mt-4 text-white">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 rounded-md md:rounded-xl p-2 px-2 md:px-3 duration-200 bg-white/40 hover:bg-white/30 justify-center w-fit ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                <ChevronLeft size={18} />  <span className='hidden md:block'>Anterior</span>
            </button>

            <div className='flex flex-col gap-2 w-full items-center md:flex-row md:w-fit'>
                <div className="flex items-center gap-1">
                    {pageNumbers[0] > 1 && (
                        <>
                            <button onClick={() => handlePageChange(1)} className="px-3 py-1 rounded-lg hover:bg-white/20">1</button>
                            {pageNumbers[0] > 2 && <span className="px-2">...</span>}
                        </>
                    )}

                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded-lg ${currentPage === page ? 'bg-white/30 font-bold' : 'hover:bg-white/20'}`}
                        >
                            {page}
                        </button>
                    ))}

                    {pageNumbers[pageNumbers.length - 1] < totalPages && (
                        <>
                            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
                            <button onClick={() => handlePageChange(totalPages)} className="px-3 py-1 rounded-lg hover:bg-white/20">{totalPages}</button>
                        </>
                    )}
                </div>
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`flex items-center gap-2 rounded-md md:rounded-xl p-2 px-2 md:px-3 duration-200 bg-white/40 hover:bg-white/30 justify-center w-fit ${currentPage === totalPages || totalPages === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                <span className='hidden md:block'>Siguiente</span> <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default Pagination;
