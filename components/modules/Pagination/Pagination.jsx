import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="my-8 flex items-center justify-center gap-2">
      {/* قبلی */}
      <button
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        className="cursor-pointer rounded px-2 py-1 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* اعداد صفحات */}
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`cursor-pointer rounded px-3 py-1 text-sm ${
              page === currentPage
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* بعدی */}
      <button
        onClick={() => {
          if (currentPage < totalPages) onPageChange(currentPage + 1);
        }}
        className="cursor-pointer rounded px-2 py-1 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    </div>
  );
}
