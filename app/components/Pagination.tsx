import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '../types/types';

const Pagination = ({ currentPage, setCurrentPage, total }: PaginationProps) => {
    const totalPages = Math.ceil(total / 20);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="flex items-center justify-between sm:justify-center sm:flex-row sm:gap-3 mt-4">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`flex items-center gap-2 rounded-xl p-2 pe-4 duration-200 text-gray-700 bg-white hover:bg-white/90 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                }`}>
                <ChevronLeft /> Anterior
            </button>
            <span className="px-4 py-2 text-white font-semibold">{currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`flex items-center gap-2 rounded-xl p-2 ps-4 duration-200 text-gray-700 bg-white hover:bg-white/90 ${(currentPage === totalPages || totalPages === 0) ? 'cursor-not-allowed opacity-50' : ''
                }`}>
                Siguiente
                <ChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
