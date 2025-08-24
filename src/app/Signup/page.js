"use client";
import React from "react";
import { FaUser, FaLock, FaUserPlus } from "react-icons/fa";

const Page = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-purple-700 text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Please fill in the details to sign up
        </p>

        {/* Form */}
        <form className="space-y-5">
          {/* Username */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaUser />
            </span>
            <input
              type="text"
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Enter your Username"
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
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaLock />
            </span>
            <input
              type="password"
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Confirm Password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            <FaUserPlus /> Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <a
            href="/Login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
