'use client';
import React, { useState } from 'react';

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  }

  return (
    <div className="flex space-x-2 justify-center items-center mt-4">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border-1 border-black text-black disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 rounded border ${
            page === currentPage ? 'bg-blue-500 text-white' : ' border-black text-black'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border  border-black text-black disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
