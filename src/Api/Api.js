import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:8000/"
const Api=axios.create({
        baseURL:BaseUrl
    })
Api.interceptors.request.use(
    (config)=>{
        const token =localStorage.getItem("access")
        if(token){
            const decode=jwtDecode(token)
            const expiry_date=decode.exp
            const current_time=Date.now()/1000
            if(expiry_date>current_time){
                config.headers.Authorization=`Bearer ${token}`
            }
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)
    
export default Api 