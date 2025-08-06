'use client'
import { createContext, use } from "react";
import { useEffect,useState } from "react";
import Api from '../../Api/Api';
import { Randomvalue } from "../GenerateCode";

export const ProductContext=createContext()

export const ProductContextProvider=({children})=>{
    const [products, setProducts] = useState([]);
    const [isloading, setIsloading] = useState(true);
    const[noOfCartItems,setNoOfCartItems]=useState(0);
    const[incart,setIncart]=useState([]);

    useEffect(() => {
    const FetchProduct = async () => {
      try {
        const response = await Api.get('products/');
        setProducts(response.data);
        console.log(response.data)
      } catch (err) {
        console.log(err.message);
      } finally {
        setTimeout(() => setIsloading(false), 1000); // Smooth load
      }
    };

    FetchProduct();
  }, []);

useEffect(()=>{
  const GetCartCode=()=>{
    if(localStorage.getItem('cart_code')===null){
      localStorage.setItem('cart_code',Randomvalue)
    }

  }
  GetCartCode()
  },[])
  const AddtoCart=async(product)=>{
      const cart_code=localStorage.getItem('cart_code')
        try{
          Response=await Api.post('additem/',{'product_id':product,'cart_code':cart_code})
          console.log(Response.data)
          setIncart(true)
          setNoOfCartItems((curr)=>curr+1)
          }catch(err){
          console.log(err.message)
          }
      }
  

 
  return(
    <ProductContext.Provider value={{products,setProducts,isloading,setIsloading,incart,setIncart,noOfCartItems,setNoOfCartItems,AddtoCart}}>
        {children}
    </ProductContext.Provider>
  )

}
 
