"use client"
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Api from "@/Api/Api";

export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const[isAuthenticated,setIsAuthenticated]=useState(false)
    const [usernames, setUsernames] = useState(undefined);

    useEffect(() => {
    const FetchUserinfo = async () => {
      try {
        const Response = await Api.get("userinfo");
        setUsernames(Response.data.username);
        console.log(usernames)
      } catch (err) {
        console.log(err.message);
      }
    };
    FetchUserinfo();
  }, []);
    
    const Auth=()=>{
        const token=localStorage.getItem("access")

        if(token){
            const decode=jwtDecode(token)
            const expiry_date=decode.exp
            const date=Date.now()/1000
            if(expiry_date>=date){
                setIsAuthenticated(true)
            }
        }
    }

    useEffect(()=>{
        Auth();
    },[])


return(
    <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,usernames,setUsernames}}>
        {children}
    </AuthContext.Provider>
)
}