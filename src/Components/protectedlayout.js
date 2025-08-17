"use client"
import React from 'react'
import { useState,useEffect} from 'react'
import { jwtDecode } from 'jwt-decode'
import Api from '@/Api/Api'
import { redirect } from 'next/navigation'

const protectedlayout = ({children}) => {
    
   const [isAuthenticated,setIsAuthenticated]=useState(null)
   useEffect(()=>{
        Auth().catch(()=>setIsAuthenticated(false))

   },[])
    const refresh=async()=>{
        const Refresh=localStorage.getItem('refresh')

        try{
            const Res=await Api.post('token/refresh/',{refresh:Refresh})
            if(Res===200){
            localStorage.setItem('access',Res.data.access)
            setIsAuthenticated(true)
        }else{
            setIsAuthenticated(false)
        }
        

        } catch(err){
            console.log(err.message)
        }
    
        

    }

    const Auth=async()=>{  
        token=localStorage.getItem('access')
  
        if(!token){
            setIsAuthenticated(false)
            return;
        }
        const decode=jwtDecode(token)
        const expiry_date=decode.exp
        current_time=Date.now()/1000
        
        if(current_time>expiry_date){
            await refresh()
        }else{
            setIsAuthenticated(true)
        }
    }

   

  return (
    <div>
         {isAuthenticated ? children : redirect('/login')}
      
    </div>
  )
}

export default protectedlayout
