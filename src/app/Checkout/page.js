'use client';
import React, { useState } from 'react';
import { FaPaypal, FaMoneyCheckAlt } from 'react-icons/fa';
import { SiFlutter } from 'react-icons/si';

const Checkout = () => {
  // Dummy cart data
  const [cartitems] = useState([
    { id: 1, name: 'Product A', price: 45.99, quantity: 2 },
    { id: 2, name: 'Product B', price: 30.0, quantity: 1 },
  ]);

  const subtotal = cartitems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const carttax = +(subtotal * 0.05).toFixed(2); // 5% tax
  const total = +(subtotal + carttax).toFixed(2);

  return (
    <div className="flex justify-center my-20 items-center w-full mx-auto font-[Inter]">
      <div className="w-[90%] grid md:grid-cols-5 grid-cols-1 md:gap-6 gap-10 mx-auto">
        {/* Cart Summary */}
        <div className="w-full col-span-3 shadow-lg rounded-xl h-full flex flex-col bg-white">
          <h1 className="w-full pl-4 bg-purple-600 text-xl md:text-2xl p-4 text-white font-bold rounded-t-xl">
            🛒 Cart Summary
          </h1>
          <div className="w-full flex flex-col gap-4 pt-6 pb-3 px-4">
            {cartitems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <h4 className="font-semibold text-gray-700">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-purple-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <hr className="my-6 border-t border-gray-200 w-[90%] mx-auto" />

          <div className="w-[90%] pb-6 mx-auto flex justify-between text-lg font-semibold text-gray-700">
            <p>Total:</p>
            <p className="text-purple-700">${total}</p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="col-span-2 md:w-full w-[90%] mx-auto h-full">
          <div className="flex flex-col w-full gap-6 shadow-lg rounded-xl bg-white h-full">
            <h1 className="w-full pl-4 bg-purple-600 text-xl md:text-2xl p-4 text-white font-bold rounded-t-xl">
              💳 Payment Options
            </h1>

            <div className="flex flex-col py-6 items-center gap-5 w-full">
              <button className="flex items-center gap-3 justify-center py-3 px-4 rounded-md w-[90%] bg-blue-600 hover:bg-blue-700 text-white text-md font-semibold transition">
                <FaPaypal size={22} />
                Pay with PayPal
              </button>

              <button className="flex items-center gap-3 justify-center py-3 px-4 rounded-md w-[90%] bg-yellow-500 hover:bg-yellow-600 text-white text-md font-semibold transition">
                <SiFlutter size={22} />
                Pay with Flutterwave
              </button>

              <button className="flex items-center gap-3 justify-center py-3 px-4 rounded-md w-[90%] bg-gray-800 hover:bg-black text-white text-md font-semibold transition">
                <FaMoneyCheckAlt size={22} />
                Pay with Paystack
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
