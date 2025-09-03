"use client";
import Api from '@/Api/Api';
import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { ProductContext } from '@/Components/context/ProductContext';
import { useSearchParams } from 'next/navigation';

const PaymentStatusContent = () => {
  const { setNoOfCartItems } = useContext(ProductContext);
  const [statusMessage, setStatusMessage] = useState('Verifying Payment!');
  const [statusSubMessage, setStatusSubMessage] = useState('Give us a moment, we are verifying your payment!');
  const queryParams = useSearchParams();

  useEffect(() => {
    const paymentId = queryParams.get("paymentId");
    const payId = queryParams.get("PayerID");
    const ref = queryParams.get("ref");

    if (paymentId && payId && ref) {
      Api.post(`paypal_payment_callback/?paymentId=${paymentId}&PayerID=${payId}&ref=${ref}`)
        .then(res => {
          setStatusMessage(res.data.message);
          setStatusSubMessage(res.data.subMessage);
          setNoOfCartItems(0);
          localStorage.removeItem("cart_code");
        })
        .catch(err => console.log(err.message));
    }
  }, [queryParams, setNoOfCartItems]);

  useEffect(() => {
    const status = queryParams.get('status');
    const txRef = queryParams.get('tx_ref');
    const transactionId = queryParams.get('transaction_id');

    if (status && txRef && transactionId) {
      Api.post(`payment_callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`)
        .then(res => {
          setStatusMessage(res.data.message);
          setStatusSubMessage(res.data.subMessage);
          setNoOfCartItems(0);
          localStorage.removeItem("cart_code");
        })
        .catch(err => console.log(err.message));
    }
  }, [queryParams, setNoOfCartItems]);

  return (
    <div className="w-full min-h-screen bg-purple-600 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="w-full max-w-3xl flex flex-col items-center gap-4 text-center">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          {statusMessage}
        </h1>
        <p className="text-white text-sm sm:text-base md:text-lg">
          {statusSubMessage}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-4">
          <Link href='/Profile'>
            <button className="bg-white text-black text-base sm:text-lg font-semibold py-3 px-6 rounded-md shadow hover:bg-gray-200 transition">
              View Order Details
            </button>
          </Link>
          <Link href='/products'>
            <button className="bg-white text-black text-base sm:text-lg font-semibold py-3 px-6 rounded-md shadow hover:bg-gray-200 transition">
              Continue Shopping 🛒
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusContent;
