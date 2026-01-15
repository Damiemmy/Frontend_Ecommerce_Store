// "use client";
// import React, { useState } from "react";
// import {
//   FaUser,
//   FaLock,
//   FaUserPlus,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import Api from "@/Api/Api";
// import { useRouter } from "next/navigation";

// const Page = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const Router=useRouter()


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const newUser = {
//         username,
//         email,
//         first_name: firstName,
//         last_name: lastName,
//         city,
//         state,
//         address,
//         phone,
//         password,
//         password2,
//       };

//       const response = await Api.post("register/", newUser);

//       if (response.status === 201) {
//         setMessage("✅ Account created successfully. You can now log in.");
//         Router.push('/Login')
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setMessage(
//           "❌ " +
//             (error.response.data.username?.[0] ||
//               error.response.data.email?.[0] ||
//               "Registration failed. Please check your inputs.")
//         );
//       } else {
//         setMessage("❌ Something went wrong. Try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 px-4">
//       <div className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-8">
//         <h2 className="text-3xl font-extrabold text-purple-700 text-center mb-2">
//           Create Account
//         </h2>
//         <p className="text-gray-500 text-center mb-6">
//           Please fill in the details to sign up
//         </p>

//         {/* Status Message */}
//         {message && (
//           <p className="text-center mb-4 text-sm font-medium text-red-500">
//             {message}
//           </p>
//         )}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Username */}
//           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//             <span className="bg-purple-600 text-white px-3 py-2">
//               <FaUser />
//             </span>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="flex-1 px-3 py-2 outline-none text-gray-700"
//               placeholder="Enter your Username"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//             <span className="bg-purple-600 text-white px-3 py-2">
//               <FaEnvelope />
//             </span>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="flex-1 px-3 py-2 outline-none text-gray-700"
//               placeholder="Enter your Email"
//               required
//             />
//           </div>

//           {/* First Name */}
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
//             placeholder="First Name"
//           />

//           {/* Last Name */}
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
//             placeholder="Last Name"
//           />

//           {/* City */}
//           <input
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
//             placeholder="City"
//           />

//           {/* State */}
//           <input
//             type="text"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             className="w-full border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
//             placeholder="State"
//           />

//           {/* Address */}
//           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//             <span className="bg-purple-600 text-white px-3 py-2">
//               <FaMapMarkerAlt />
//             </span>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="flex-1 px-3 py-2 outline-none text-gray-700"
//               placeholder="Address"
//             />
//           </div>

//           {/* Phone */}
//           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//             <span className="bg-purple-600 text-white px-3 py-2">
//               <FaPhone />
//             </span>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="flex-1 px-3 py-2 outline-none text-gray-700"
//               placeholder="Phone"
//             />
//           </div>

//           {/* Password */}
//           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//             <span className="bg-purple-600 text-white px-3 py-2">
//               <FaLock />
//             </span>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="flex-1 px-3 py-2 outline-none text-gray-700"
//               placeholder="Enter your Password"
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//             <span className="bg-purple-600 text-white px-3 py-2">
//               <FaLock />
//             </span>
//             <input
//               type="password"
//               value={password2}
//               onChange={(e) => setPassword2(e.target.value)}
//               className="flex-1 px-3 py-2 outline-none text-gray-700"
//               placeholder="Confirm Password"
//               required
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             onClick={()=>handleSubmit()}
//             className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-50"
//           >
//             <FaUserPlus /> {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-gray-500 text-center">
//           Already have an account?{" "}
//           <a
//             href="/Login"
//             className="text-purple-600 font-semibold hover:underline"
//           >
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Page;
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
import { motion } from "framer-motion";

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

  const router = useRouter();

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
        setMessage("✅ Account created successfully. Redirecting...");
        setTimeout(() => router.push("/Login"), 1200);
      }
    } catch (error) {
      setMessage(
        "❌ " +
          (error.response?.data?.username?.[0] ||
            error.response?.data?.email?.[0] ||
            "Registration failed. Please check your inputs.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/60 to-black/70" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl px-6"
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 text-center">
            Create Your Account ✨
          </h2>
          <p className="text-gray-500 text-center mt-2 mb-8">
            Join us and start shopping smarter
          </p>

          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-6 text-sm font-medium text-purple-700"
            >
              {message}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input icon={<FaUser />} value={username} onChange={setUsername} placeholder="Username" />
              <Input icon={<FaEnvelope />} value={email} onChange={setEmail} placeholder="Email" type="email" />
            </div>

            {/* Names */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input value={firstName} onChange={setFirstName} placeholder="First Name" />
              <Input value={lastName} onChange={setLastName} placeholder="Last Name" />
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input value={city} onChange={setCity} placeholder="City" />
              <Input value={state} onChange={setState} placeholder="State" />
            </div>

            <Input icon={<FaMapMarkerAlt />} value={address} onChange={setAddress} placeholder="Address" />
            <Input icon={<FaPhone />} value={phone} onChange={setPhone} placeholder="Phone" />

            {/* Passwords */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input icon={<FaLock />} value={password} onChange={setPassword} placeholder="Password" type="password" />
              <Input icon={<FaLock />} value={password2} onChange={setPassword2} placeholder="Confirm Password" type="password" />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
            >
              <FaUserPlus />
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          <p className="mt-8 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/Login" className="text-purple-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* Reusable Input */
const Input = ({ icon, value, onChange, placeholder, type = "text" }) => (
  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
    {icon && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600">{icon}</span>}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full ${icon ? "pl-12" : "pl-4"} pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-500 outline-none transition`}
      required={["Username", "Email", "Password", "Confirm Password"].includes(placeholder)}
    />
  </motion.div>
);

export default Page;
