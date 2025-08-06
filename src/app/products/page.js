'use client';
import React, { useContext, useState,useEffect } from 'react';
import { ProductContext } from '@/Components/context/ProductContext';
import { BaseUrl } from '@/Api/Api';
import Api from '@/Api/Api';
import Link from 'next/link';
import ShopProducts from '@/Components/productcomp/ShopProducts';


const ShopPage = () => {
  const { products } = useContext(ProductContext);

  // Pagination Setup
  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(products.length / itemsPerPage);





  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-10 tracking-tight border-b-2 border-purple-300 pb-2">
          Shop
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {currentItems.map((product) => (
            <ShopProducts key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-full border text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-purple-700">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-full border text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
