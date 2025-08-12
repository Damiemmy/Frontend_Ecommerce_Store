import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-co justify-center items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
      <div className='flex w-[80%] flex-col text-center h-screen justify-center items-center'>
        <h2 className='text-3xl w-full text-gray-400 font-bold mb-10'>Sign Up</h2>
    
        <form className='flex flex-col gap-4 w-full text-black'>
            <div className='text-center w-[70%] mx-auto border border-gray-300 rounded-md'>
                <input className='border-none  text-medium  w-[100%] mx-auto text-gray px-3 py-2 outline-none rounded-md' type='text' placeholder='Enter your Username'/>
            </div>
            <div className='text-center w-[70%] mx-auto border border-gray-300 rounded-md'>
                <input className='border-none  text-medium  w-[100%] mx-auto text-gray px-3 py-2 outline-none rounded-md' type='text' placeholder='Enter your Password'/>
            </div>
            <div className='text-center w-[70%] mx-auto border border-gray-300 rounded-md'>
                <input className='border-none  text-medium  w-[100%] mx-auto text-gray px-3 py-2 outline-none rounded-md' type='text' placeholder='Confirm Password'/>
            </div>
            
            <div>
                <button  className='border border-gray-300 text-large hover:cursor-pointer hover:bg-purple-600 text-white bg-purple-400 px-3 py-2 w-[40%] mx-auto outline-none rounded-md'  type='submit'>Sign Up</button>

            </div>
        </form>
    </div>
    </div>
  )
}

export default page
