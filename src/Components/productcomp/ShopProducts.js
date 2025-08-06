import React from 'react'
import { BaseUrl } from '@/Api/Api'
import { useEffect } from 'react'
import Link from 'next/link'
import Api from '@/Api/Api'
import { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
  
const ShopProducts = ({product}) => {
    const product_id=product.id
    const cart_code=localStorage.getItem('cart_code')
    const {incart,setIncart,AddtoCart}=useContext(ProductContext)
    useEffect(()=>{
              const GetiteminCart=async()=>{
               
                if(!cart_code || !product.id) return;
                  
                      try{
                      Response=await Api(`in_cart/?cart_code=${cart_code}&product_id=${product.id}`)
                      console.log(Response.data)
                      setIncart(Response.data.product_in_cart)
          
                      }catch(err){
                          console.log(err.message)
                          console.log(product.id)
                      }
          
                  } 
              GetiteminCart()
            },[cart_code,product.id])
    

  return (
    <div
              key={product.id}
              className="flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-4"
            >
              <Link href={`/Shop/${product.slug}`}>
              <img
                src={`${BaseUrl}${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-sm text-gray-500 text-center uppercase tracking-wide line-clamp-2">
                {product.description}
              </p>
              <p className="mt-2 font-bold text-purple-700 text-md text-center">${product.price}</p>
              </Link>
              <button
                disabled={incart}
               onClick={()=>AddtoCart(product.id)} className={!incart?'mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-300 shadow-md':'mt-4 disabled: bg-purple-200 text-white px-6 py-2 rounded-full transition duration-300 shadow-md'}>
                 Add to Cart
              </button>
            </div>
  )
}

export default ShopProducts