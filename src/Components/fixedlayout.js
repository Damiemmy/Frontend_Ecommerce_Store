'use client';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Api from '@/Api/Api';
import { useEffect,useState } from 'react';
import { useContext } from 'react';
import { ProductContext } from './context/ProductContext';
import { ToastContainer, toast } from 'react-toastify';


const Fixedlayout = ({ children }) => {
  const{noOfCartItems,setNoOfCartItems}=useContext(ProductContext)
  
  useEffect(()=>{
    
    const GetCartQuantity=async()=>{
      const cart_code=localStorage.getItem('cart_code')
      if(cart_code){
        try{
            Response=await Api.get(`get_cart_stat/?cart_code=${cart_code}`)
            console.log(Response.data)
            setNoOfCartItems(Response.data.number_of_items)
        }catch(err){
          console.log(err.message)
          console.log(cart_code)
        }
      }
      
    }
    GetCartQuantity()

  },[])
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header noOfCartItems={noOfCartItems}/>
      <ToastContainer />

      {/* Page Content */}
      <main className="flex-grow w-full">
        {children}
      </main>

      {/* Footer (sticks to bottom if content is short) */}
      <Footer />
    </div>
  );
};

export default Fixedlayout;
