"use client"
import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import Api from '@/Api/Api'
import { useRouter } from 'next/navigation'
import Spinner from './Spinner'
import { usePathname } from 'next/navigation'

const ProtectedLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const router = useRouter()
  const Path=usePathname()


  useEffect(() => {
    Auth().catch(() => setIsAuthenticated(false))
  }, [])

  const refresh = async () => {
    const Refresh = localStorage.getItem('refresh')

    try {
      const Res = await Api.post('token/refresh/', { refresh: Refresh })
      if (Res.status === 200) {
        localStorage.setItem('access', Res.data.access)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (err) {
      console.log("Refresh error:", err.message)
      setIsAuthenticated(false)
    }
  }

  const Auth = async () => {
    const token = localStorage.getItem('access')

    if (!token) {
      setIsAuthenticated(false)
      return
    }

    try {
      const decode = jwtDecode(token)
      const expiry_date = decode.exp
      const current_time = Date.now() / 1000

      if (current_time > expiry_date) {
        await refresh()
      } else {
        setIsAuthenticated(true)
      }
    } catch (err) {
      console.log("Decode error:", err.message)
      setIsAuthenticated(false)
    }
  }

  // redirect if not authenticated
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push(`/Login?redirect=${Path}`) // 👈 make sure it matches your actual route folder
    }
  }, [isAuthenticated, router,Path])

  if (isAuthenticated === null) {
    return <Spinner />
  }

  if (!isAuthenticated) {
    return null // don’t render children while redirecting
  }

  return <>{children}</>
}

export default ProtectedLayout
