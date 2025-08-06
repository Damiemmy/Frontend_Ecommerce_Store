'use client';
import React from 'react';

const Productslider = ({ page, setPage, itemsperPage, start, products }) => {
  const isLastPage = start + itemsperPage >= products.length;

  return (
    <div className="mt-10 w-full flex justify-center items-center">
      <div className="flex items-center gap-6 bg-purple-50 py-3 px-6 rounded-full shadow-md">
        {/* Prev Button */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 shadow-sm ${
            page === 1
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-700 to-purple-500 text-white hover:shadow-lg hover:scale-105'
          }`}
        >
          Prev
        </button>

        {/* Page Indicator */}
        <span className="text-purple-800 text-sm font-semibold tracking-wide">
          Page <span className="font-bold text-purple-900">{page}</span>
        </span>

        {/* Next Button */}
        <button
          onClick={() => setPage(page + 1)}
          disabled={isLastPage}
          className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 shadow-sm ${
            isLastPage
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-700 to-purple-500 text-white hover:shadow-lg hover:scale-105'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Productslider;
