"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Hero = () => {
    const Router=useRouter()
  return (
    <div className="w-full py-24 px-6 bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white text-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-white opacity-10 rounded-full blur-2xl -bottom-20 -right-10 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center items-center gap-6 z-10 relative"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide drop-shadow-xl">
          Step Into Style
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-white/90">
          Discover the latest drops, handpicked collections, and timeless trends — all in one place.
        </p>
        <button onClick={()=>Router.push('/products')} className="bg-white text-purple-700 hover:bg-purple-100 hover:scale-105 font-semibold rounded-full px-8 py-3 transition-all duration-300 shadow-lg">
          Shop the Collection
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;
