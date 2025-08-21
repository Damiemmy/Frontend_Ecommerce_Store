"use client"
import React from 'react'
import { useState,useEffect} from 'react'
import Api from '@/Api/Api'
import Spinner from '@/Components/Spinner'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'


const page = () => {
  const [username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState('');
  const router=useRouter();
  const searchParams=useSearchParams()
  const redirectPath=searchParams.get("redirect") || "/";


  const Login_info={username,password}

  const Handlesubmit=async(e)=>{
    e.preventDefault();
    setLoading(true)
    try{
      const Response= await Api.post("token/",Login_info)
      console.log(Response.data)
      if(Response.status===200){}
      localStorage.setItem('access',Response.data.access)
      localStorage.setItem('refresh',Response.data.refresh)
      setUsername('')
      setPassword('')
      setError('')
      setLoading(false)
      router.push(redirectPath);
    }catch(err){
      console.log(err.message)
      setLoading(false)
      setError(`Error: ${err.message}`)
      
    }
  
  }
  
  if(loading){
    return <Spinner/>
  }

  
  
  

  return (
    <div className='w-full flex flex-co justify-center items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
      <div className='flex w-[80%] flex-col text-center h-screen justify-center items-center'>
        <h2 className='text-3xl w-full text-gray-400 font-bold mb-2'>Welcome Back!</h2>
        <p className='mb-10 text-gray-400'>please login into your account</p>
        {error && (<h4 className='text-sm text-red-600 text-center mb-10'>{error}</h4>)}
    
        <form className='flex flex-col gap-4 w-full text-black' onSubmit={Handlesubmit}>
            <div className='text-center w-[70%] mx-auto border border-gray-300 rounded-md'>
                <input className='border-none  text-medium  w-[100%] mx-auto text-gray px-3 py-2 outline-none rounded-md' type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your Username'/>
            </div>
            <div className='text-center w-[70%] mx-auto border border-gray-300 rounded-md'>
                <input className='border-none  text-medium  w-[100%] mx-auto text-gray px-3 py-2 outline-none rounded-md' type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password'/>
            </div>
            
            <div>
                <button  className='border border-gray-300 text-large text-white bg-purple-600 px-3 py-2 w-[40%] mx-auto outline-none rounded-md'  disabled={loading} type='submit'>Login</button>

            </div>
        </form>
    </div>
    </div>
  )
}

export default page
