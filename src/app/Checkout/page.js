"use client";
import React, { useState, useEffect, useContext } from "react";
import { FaPaypal, FaMoneyCheckAlt } from "react-icons/fa";
import { SiFlutter } from "react-icons/si";
import ProtectedLayout from "@/Components/Protectedlayout";
import Spinner from "@/Components/Spinner";
import Api from "@/Api/Api";
import { CartContext } from "@/Components/context/CartContext";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [cartCode, setCartCode] = useState(null); // ✅ safely store cart_code
  const { incartProducts, getsubtotal, setIncartproducts, setGetsubtotal } =
    useContext(CartContext);

  // ✅ Only access localStorage on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const code = localStorage.getItem("cart_code");
      setCartCode(code);
    }
  }, []);

  const FlutterwavePayment = async () => {
    if (!cartCode) return;
    try {
      setLoading(true);
      const Response = await Api.post("initiate_payment/", { cart_code: cartCode });
      console.log(Response.data);
      window.location.href = Response.data.data.link;
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PaypalPayment = async () => {
    if (!cartCode) return;
    try {
      setLoading(true);
      const Response = await Api.post("initiate_paypal_payment/", {
        cart_code: cartCode,
      });
      console.log(Response.data);
      if (Response.data) {
        window.location.href = Response.data.approval_url;
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch products only after cartCode is available
  useEffect(() => {
    if (!cartCode) return;

    const FetchProducts = async () => {
      try {
        setLoading(true);
        const Response = await Api.get(`Fetch_in_cart/?cart_code=${cartCode}`);
        console.log(Response.data);
        setIncartproducts(Response.data.items);
        setGetsubtotal(Response.data.sum_total);
        console.log(Response.data.sum_total);
      } catch (err) {
        console.log(err.message);
      } finally {
        setTimeout(() => setLoading(false), 300); // delay to avoid flicker
      }
    };

    FetchProducts();
  }, [cartCode, setIncartproducts, setGetsubtotal]);

  const subtotal = getsubtotal.toFixed(2);
  const taxamount = 4.0;
  const total = (getsubtotal + taxamount).toFixed(2);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <ProtectedLayout>
      <div className="flex justify-center my-20 items-center w-full mx-auto font-[Inter]">
        <div className="w-[90%] grid md:grid-cols-5 grid-cols-1 md:gap-6 gap-10 mx-auto">
          {/* Cart Summary */}
          <div className="w-full col-span-3 shadow-lg rounded-xl h-full flex flex-col bg-white">
            <h1 className="w-full pl-4 bg-purple-600 text-xl md:text-2xl p-4 text-white font-bold rounded-t-xl">
              🛒 Cart Summary
            </h1>
            <div className="w-full flex flex-col gap-4 pt-6 pb-3 px-4">
              {incartProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-purple-700">
                    ${(item.product.price * item.quantity).toFixed(2)}
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

              <div
                onClick={() => PaypalPayment()}
                className="flex flex-col py-6 items-center gap-5 w-full"
              >
                <button className="flex items-center gap-3 justify-center py-3 px-4 rounded-md w-[90%] bg-blue-600 hover:bg-blue-700 text-white text-md font-semibold transition">
                  <FaPaypal size={22} />
                  Pay with PayPal
                </button>

                <button
                  onClick={() => FlutterwavePayment()}
                  className="flex items-center gap-3 justify-center py-3 px-4 rounded-md w-[90%] bg-yellow-500 hover:bg-yellow-600 text-white text-md font-semibold transition"
                >
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
    </ProtectedLayout>
  );
};

export default Checkout;
