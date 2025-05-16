'use client';
import React, { useState } from 'react';

export default function ProductModal({ isOpen, onClose, product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!isOpen || !product) return null;
  const images = product.images || [];

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">✕</button>

        <div className="relative w-full h-60 overflow-hidden rounded">
          {images.length > 0 && (
            <img
              src={images[currentImageIndex] || '/public/default.png'}
              alt={`Product Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover rounded"
            />

          )}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full"
              >
                →
              </button>
            </>
          )}
        </div>

        <h2 className="text-xl text-black font-bold mt-4">{product.title}</h2>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-red-500 font-semibold mt-2">${product.price}</p>
        <p className="text-sm text-gray-500">Category: {product.category.name}</p>
      </div>
    </div>
  );
}