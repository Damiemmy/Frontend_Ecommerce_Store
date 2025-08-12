"use client"
import React from 'react'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const protectedlayout = () => {
    const [isAuthenticated,setIsAuthenticated]=useState(null)
    token=localStorage.getItem('access')

    const refresh=async()=>{
        

    }

    const Auth=async()=>{    
        if(!token){
            setIsAuthenticated(false)
        }
        const decode=jwtDecode(token)
        const expiry_date=decode.exp
        current_time=Date.now()/1000
        
        if(current_time>expiry_date){
            await refresh()
        }
    }



  return (
    <div>

      
    </div>
  )
}

export default protectedlayout
