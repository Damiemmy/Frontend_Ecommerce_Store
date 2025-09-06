'use client';
import React, { useState,useEffect } from "react";
import Api from "@/Api/Api";
import { AuthContext } from "@/Components/context/AuthContext";
import { useContext } from "react";
import Spinner from "@/Components/Spinner";
import { CartContext } from "@/Components/context/CartContext";
import { FormatDate } from "@/Components/FormatDate";
import Link from "next/link";
import { BaseUrl } from "@/Api/Api";



const Profile = () => {
  const[userinfo,setUserinfo]=useState({})
  const{usernames,setUsernames}=useContext(AuthContext)
  const[loading,setLoading]=useState(false)
  const[orderitem,setOrderitem]=useState([])
  const[userimage,setUserimage]=useState(null)

  useEffect(()=>{
    const GetUserinfo=async()=>{
      try{
        const Response=await Api.get("getuserimg/")
        console.log(Response.data)
        setUserimage(Response.data.image)
        console.log(Response.data.image)
      }catch(err){
        console.log(err.message)

      }
      
    }
    GetUserinfo()
    
  },[])


  useEffect(()=>{
  const GetUserBio=async()=>{
    try{
      setLoading(true)
      const Response=await Api.get("UserBio")
      console.log(Response.data)
      setUserinfo(Response.data)
      setOrderitem(Response.data.items)
      console.log(userinfo)
      console.log(Response.data.items)
      setLoading(false);
    }catch(err){
      console.log(err.message)
      setLoading(false)
    }
    
  }
  GetUserBio();
  },[])

 
 
 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPageMobile = 4;
  const totalPages = Math.ceil(orderitem.length / itemsPerPageMobile);
  const paginatedOrders = orderitem.slice((currentPage - 1) * itemsPerPageMobile, currentPage * itemsPerPageMobile);
  const currentYear = new Date().getFullYear();
  console.log(currentYear); // e.g., 2025

  if (loading) {
     return (<Spinner loading={loading}/>)
  }

  return (
    <div className="w-full px-4 md:px-12 py-10 bg-gray-50 min-h-screen text-gray-800 font-[Inter]">
      {/* Profile Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 mb-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/4 flex flex-col items-center">
          <img
            src={`${BaseUrl}${userimage}`}
            alt="Profile"
            className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full object-cover border-4 border-purple-300 shadow-sm"
          />
          <p className="mt-4 text-lg font-semibold uppercase">{userinfo.username}</p>
          <span className="text-gray-500 text-sm">{userinfo.email}</span>
          <Link href='/EditProfile'>
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md shadow">
              Edit Profile
          </button>
          </Link>
        </div>

        <div className="w-full md:w-3/4">
          <h2 className="text-xl font-semibold text-white px-4 py-2 rounded-t-md bg-purple-600">
            Account Overview
          </h2>
          <div className="bg-white border rounded-b-md px-6 py-4 space-y-4">
            <div className="flex flex-col md:flex-row justify-between">
              <p><strong>Full Name:</strong> {userinfo.first_name} {userinfo.last_name}</p>
              <p><strong>City:</strong> {userinfo.city}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p><strong>Email:</strong> {userinfo.email}</p>
              <p><strong>State:</strong> {userinfo.state}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p><strong>Phone:</strong> {userinfo.phone}</p>
              <p><strong>Member Since:</strong> {currentYear}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white px-4 py-2 rounded-t-md bg-purple-600">
          Order History
        </h2>

        {/* Mobile View */}
        <div className="block md:hidden mt-4 space-y-4">
          {paginatedOrders.map((order, i) => (
            <div key={i} className="bg-white border rounded-md p-4 shadow-sm">
              <p><strong>Product:</strong> {order.product.name}</p>
              <p><strong>Order Date:</strong> {order.order_date}</p>
              <p><strong>Order ID:</strong> {order.order_id}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Price:</strong> {order.product.price}</p>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4 text-sm">
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-600 font-medium">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block mt-6 overflow-y-auto" style={{ maxHeight: "400px" }}>
          <div className="grid grid-cols-6 gap-4 font-semibold border-b py-2 text-purple-700 text-sm">
            <div className="col-span-2">Product</div>
            <div className="col-span-2">Order Info</div>
            <div>Qty</div>
            <div>Total</div>
          </div>
          {orderitem.map((order, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 items-center border-b py-4">
              <div className="col-span-2">{order.product.name}</div>
              <div className="col-span-2 text-sm">
                <p><strong>Date:</strong> {FormatDate(order.order_date)}</p>
                <p><strong>ID:</strong> {order.order_id}</p>
              </div>
              <div>{order.quantity}</div>
              <div className="font-semibold">{order.product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
