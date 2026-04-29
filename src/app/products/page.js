// 'use client';
// import React, { useContext, useState,useEffect } from 'react';
// import { ProductContext } from '@/Components/context/ProductContext';
// import { BaseUrl } from '@/Api/Api';
// import Api from '@/Api/Api';
// import Link from 'next/link';
// import ShopProducts from '@/Components/productcomp/ShopProducts';


// const ShopPage = () => {
//   const { products } = useContext(ProductContext);

//   // Pagination Setup
//   const itemsPerPage = 12;
//   const [page, setPage] = useState(1);
//   const startIndex = (page - 1) * itemsPerPage;
//   const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

//   const totalPages = Math.ceil(products.length / itemsPerPage);





//   return (
//     <section className="w-full bg-white py-20 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
//       <div className="max-w-7xl mx-auto flex flex-col items-center">
//         <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-10 tracking-tight border-b-2 border-purple-300 pb-2">
//           Shop
//         </h1>

//         {/* Product Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
//           {currentItems.map((product) => (
//             <ShopProducts key={product.id} product={product} />
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="mt-10 flex items-center justify-center gap-4">
//           <button
//             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//             disabled={page === 1}
//             className="px-4 py-2 rounded-full border text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="text-sm font-medium text-purple-700">Page {page} of {totalPages}</span>
//           <button
//             onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={page === totalPages}
//             className="px-4 py-2 rounded-full border text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ShopPage;

"use client";

import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "@/Components/context/ProductContext";
import Link from "next/link";
import Api, { BaseUrl } from "@/Api/Api";
import { useSearchParams } from "next/navigation";


export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  
  const { AddtoCart, incart } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl ||'all');
  const [page, setPage] = useState(1);

  

  const productsPerPageMobile = 10; // 2 columns x 5 rows
  const productsPerPageDesktop = 20; // 4 columns x 5 rows
  const [windowWidth, setWindowWidth] = useState(0);

  // Responsive columns
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const productsPerPage = windowWidth >= 1024 ? productsPerPageDesktop : productsPerPageMobile;

  const categories = [
    { name: "All Products", slug: "all", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80" },
    { name: "For Men", slug: "1", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
    { name: "For Women", slug: "2", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80" },
    { name: "Skincare", slug: "4", image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=300&q=80" },
    { name: "Electronics", slug: "3", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&w=300&q=80" },
  ];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const endpoint = selectedCategory === "all" ? "products/" : `products/?category=${selectedCategory}`;
        console.log("Current Category",selectedCategory)
        const response = await Api.get(endpoint);
        setProducts(response.data);
        setPage(1); // reset page on category change
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Pagination
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-28">
      <div className="max-w-7xl mx-auto px-6 lg:grid lg:grid-cols-[220px_1fr] gap-8">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col gap-6 sticky top-32">
  <h3 className="text-lg font-bold text-purple-700 mb-4">
    Categories
  </h3>

  {categories.map((cat) => (
    <div
      key={cat.slug}
      onClick={() => setSelectedCategory(cat.slug)}
      className={`relative group cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        selectedCategory === cat.slug
          ? "border-purple-600 shadow-lg scale-105"
          : "border-gray-200"
      }`}
    >
      {/* IMAGE */}
      <img
        src={cat.image}
        alt={cat.name}
        className="w-full h-20 object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* ALWAYS VISIBLE TEXT (NEW DESIGN) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm">
          <span className="text-white text-sm font-semibold tracking-wide group-hover:text-purple-200 transition">
            {cat.name}
          </span>
        </div>
      </div>

      {/* TOP LEFT ACTIVE DOT */}
      {selectedCategory === cat.slug && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
      )}
    </div>
  ))}
</aside>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {loading
            ? Array.from({ length: productsPerPage }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow animate-pulse p-4 h-[300px] flex flex-col items-center justify-center" />
              ))
            : paginatedProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-[300px]"
                >
                  <Link href={`/Shop/${product.slug}`} className="flex flex-col items-center h-full justify-between">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-2 transition-transform duration-500 hover:scale-105"
                    />
                    <div className="flex flex-col items-center justify-end h-full">
                      <h3 className="text-sm font-medium text-gray-700 line-clamp-1">{product.name}</h3>
                      <p className="text-purple-600 font-semibold mt-1 text-sm">${product.price}</p>
                    </div>
                  
                  <button
                    className={`mt-2 px-4 py-1 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition`}
                  >
                    View
                  </button>
                  </Link>
                </div>
              ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8 col-span-full">
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>
            <span className="text-purple-700 font-medium">Page {page} of {totalPages}</span>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
