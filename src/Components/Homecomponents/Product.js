'use client';
import React, { useState, useContext } from 'react';
import Productslider from './Productslider';
import { BaseUrl } from '@/Api/Api';
import { ProductContext } from '../context/ProductContext';
import Link from 'next/link';

const Products = () => {
  const { products, isloading } = useContext(ProductContext);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const start = (page - 1) * itemsPerPage;
  const currentItems = products.slice(start, start + itemsPerPage);

  return (
    <section className="w-full bg-white py-20 px-6" id="shop">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-10 tracking-tight border-b-2 border-purple-300 pb-2">
          Our Products
        </h2>

        {isloading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {currentItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-4"
                >
                 <Link href={`/Shop/${item.slug}`}> 
                  <img
                      src={`${BaseUrl}${item.image}`}
                      alt={item.name || "Product image"}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <p className="text-sm text-gray-500 text-center uppercase tracking-wide line-clamp-2">
                      {item.description}
                    </p>
                    <p className="mt-2 font-bold text-purple-700 text-md text-center">${item.price}</p>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Productslider
                products={products}
                start={start}
                itemsperPage={itemsPerPage}
                setPage={setPage}
                page={page}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
