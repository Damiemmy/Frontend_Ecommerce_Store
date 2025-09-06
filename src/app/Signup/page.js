"use client";
import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaUserPlus,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Api from "@/Api/Api";
import { useRouter } from "next/navigation";

const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const Router=useRouter()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const newUser = {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        city,
        state,
        address,
        phone,
        password,
        password2,
      };

      const response = await Api.post("register/", newUser);

      if (response.status === 201) {
        setMessage("✅ Account created successfully. You can now log in.");
        Router.push('/Login')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(
          "❌ " +
            (error.response.data.username?.[0] ||
              error.response.data.email?.[0] ||
              "Registration failed. Please check your inputs.")
        );
      } else {
        setMessage("❌ Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-purple-700 text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Please fill in the details to sign up
        </p>

        {/* Status Message */}
        {message && (
          <p className="text-center mb-4 text-sm font-medium text-red-500">
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaUser />
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Enter your Username"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaEnvelope />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Enter your Email"
              required
            />
          </div>

          {/* First Name */}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
            placeholder="First Name"
          />

          {/* Last Name */}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
            placeholder="Last Name"
          />

          {/* City */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
            placeholder="City"
          />

          {/* State */}
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
            placeholder="State"
          />

          {/* Address */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaMapMarkerAlt />
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Address"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaPhone />
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Phone"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaLock />
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Enter your Password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <span className="bg-purple-600 text-white px-3 py-2">
              <FaLock />
            </span>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="flex-1 px-3 py-2 outline-none text-gray-700"
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            onClick={()=>handleSubmit()}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-50"
          >
            <FaUserPlus /> {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

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
