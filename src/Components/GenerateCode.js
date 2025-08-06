import React from 'react'

const GenerateCode = () => {
    const character='ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwxyz1234567890'
    let result='';
    for(let i=0; i<10; i++){
        const random=Math.floor(Math.random()*character.length)
        result+=character[random];
    }
    
   
  return result
}

export const Randomvalue=GenerateCode();