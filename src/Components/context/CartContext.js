"use client"
import { createContext,useState } from 'react'
export const CartContext=createContext()
export const CartContextProvider = ({children}) => {
    const [incartProducts, setIncartproducts] = useState([]);
    const [getsubtotal,setGetsubtotal]=useState(0)
  return (
    <CartContext.Provider value={{incartProducts,getsubtotal,setIncartproducts,setGetsubtotal}}>
      {children}
    </CartContext.Provider>
  )
}

