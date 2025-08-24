"use client";
import React, { useState, useEffect, useContext } from "react";
import Api from "@/Api/Api";
import Spinner from "@/Components/Spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/Components/context/AuthContext";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const { isAuthenticated, setIsAuthenticated, usernames, setUsernames } =
    useContext(AuthContext);

  const Login_info = { username, password };

  const Handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const Response = await Api.post("token/", Login_info);
      if (Response.status === 200) {
        localStorage.setItem("access", Response.data.access);
        localStorage.setItem("refresh", Response.data.refresh);
        setUsername("");
        setPassword("");
        setError("");
        setIsAuthenticated(true);
        setUsernames(username);
        router.push(redirectPath);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-purple-700 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Please login into your account
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 text-center text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={Handlesubmit} className="space-y-5">
          {/* Username */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaUser />
            </span>
            <input
              type="text"
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaLock />
            </span>
            <input
              type="password"
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            <FaSignInAlt /> Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <a
            href="/Register"
            className="text-purple-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
