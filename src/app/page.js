import fixedlayout from '@/Components/fixedlayout'
import React from 'react'
import Hero from '@/Components/Homecomponents/Hero'
import Products from '@/Components/Homecomponents/Product'

const HomePage = () => {
  return (
    
    <div className='w-full flex flex-col'>
      <Hero/>
     <Products/>
    </div>
  )
}

export default HomePage