"use client"
import React, { useEffect } from 'react';
import Api, { BaseUrl } from '@/Api/Api';


const Productpage = ({ product,AddtoCart,incart,setIncart }) => {
   
    

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pt-10 gap-12 items-center">
      <div className="w-full">
        <img
          src={`${BaseUrl}${product.image}`}
          alt={product.name}
          className="rounded-xl w-full h-auto object-cover shadow-lg"
        />
      </div>
      <div className="space-y-4">
        <span className="text-sm text-gray-400">SKU: 1374903</span>
        <h1 className="text-3xl font-bold text-purple-700">{product.name}</h1>
        <p className="text-gray-600 text-md">{product.description}</p>
        <p className="text-2xl font-bold text-purple-600 mt-2">${product.price}</p>
        <button
          onClick={()=>AddtoCart(product.id)}
          className={!incart?'mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300 shadow-md':'mt-4 disabled: bg-purple-200 text-white px-6 py-2 rounded-full transition duration-300 shadow-md'}
        >
          {!incart?"Add to Cart":"Product Added to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Productpage;
