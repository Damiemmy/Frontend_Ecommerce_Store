'use client';
import React from 'react';
import Link from 'next/link';
import Api from '@/Api/Api';
import { useState } from 'react';
import { useEffect } from 'react';
import { BaseUrl } from '@/Api/Api';
import InCart from '@/Components/Cartcomponents/InCart';
import Spinner from '@/Components/Spinner';

const Cart = () => {
  const [incartProducts, setIncartproducts] = useState([]);
  const [loading,setLoading]=useState(false)
  
  const [getsubtotal,setGetsubtotal]=useState(0)
  useEffect(() => {
    const FetchProducts = async () => {
      const cart_code = localStorage.getItem('cart_code');
      try {
        setLoading(true)
        const Response = await Api.get(`Fetch_in_cart/?cart_code=${cart_code}`);
        console.log(Response.data);
        setIncartproducts(Response.data.items);
        setGetsubtotal(Response.data.sum_total);
        console.log(Response.data.sum_total)
        setLoading(false)
      } catch (err) {
        console.log(err.message);
        setLoading(false)
      }finally {
      setTimeout(() => setLoading(false), 300); // delay to avoid flicker
    }
    };
    FetchProducts();
  }, []);

 if (loading) {
  return (<Spinner loading={loading}/>)
}
  if(incartProducts.length === 0){
    return <div className="text-center text-gray-600 text-xl flex justify-center items-center h-screen">You haven't added any item to your Cart   🛒.</div>
  }



  const subtotal = getsubtotal.toFixed(2)
  const taxamount = 4.00
  const tax=taxamount.toFixed(2)
  const total = (getsubtotal + taxamount).toFixed(2)

  return (
    <div className="w-full px-4 md:px-12 lg:px-20 py-16 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        🛒 Your Shopping Cart
      </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {incartProducts.map((item) => (
        
                <InCart incartProducts={incartProducts} getsubtotal={getsubtotal} setGetsubtotal={setGetsubtotal} key={item.id} item={item} setIncartproducts={setIncartproducts}/>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-lg rounded-xl p-6 sticky top-24 h-fit">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2 border-gray-200">
              Order Summary
            </h3>

            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="font-medium">${tax}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-3">
                <span>Total:</span>
                <span className="text-purple-700">${total}</span>
              </div>
            </div>

            <Link href="/Checkout">
              <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md shadow transition duration-200">
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </div>
    </div>
  );
};

export default Cart;
