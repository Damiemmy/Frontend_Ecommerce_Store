// "use client";
// import React, { useState, useContext, Suspense } from "react";
// import Api from "@/Api/Api";
// import Spinner from "@/Components/Spinner";
// import { useRouter, useSearchParams } from "next/navigation";
// import { AuthContext } from "@/Components/context/AuthContext";
// import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

// const LoginContent = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectPath = searchParams.get("redirect") || "/";
//   const { setIsAuthenticated, setUsernames } = useContext(AuthContext);

//   const Login_info = { username, password };

//   const Handlesubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const Response = await Api.post("token/", Login_info);
//       if (Response.status === 200) {
//         localStorage.setItem("access", Response.data.access);
//         localStorage.setItem("refresh", Response.data.refresh);
//         setUsername("");
//         setPassword("");
//         setError("");
//         setIsAuthenticated(true);
//         setUsernames(username);
//         router.push(redirectPath);
//       }
//     } catch (err) {
//       setError(`Error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <Spinner />;
//   }

//   return (
//     <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 px-4">
//       <div className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-8">
//         {/* Title */}
//         <h2 className="text-3xl font-extrabold text-purple-700 text-center mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-gray-500 text-center mb-6">
//           Please login into your account
//         </p>

//         {/* Error */}
//         {error && (
//           <div className="mb-4 text-center text-sm text-red-600 font-medium">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={Handlesubmit} className="space-y-5">
//           {/* Username */}
//           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//             <span className="bg-purple-600 text-white px-3 py-2">
//               <FaUser />
//             </span>
//             <input
//               type="text"
//               className="flex-1 px-3 py-2 outline-none text-gray-700"
//               placeholder="Enter your Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           {/* Password */}
//           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//             <span className="bg-purple-600 text-white px-3 py-2">
//               <FaLock />
//             </span>
//             <input
//               type="password"
//               className="flex-1 px-3 py-2 outline-none text-gray-700"
//               placeholder="Enter your Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
//           >
//             <FaSignInAlt /> Login
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="mt-6 text-sm text-gray-500 text-center">
//           Don’t have an account?{" "}
//           <a
//             href="/Register"
//             className="text-purple-600 font-semibold hover:underline"
//           >
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// const Page = () => {
//   return (
//     <Suspense fallback={<Spinner />}>
//       <LoginContent />
//     </Suspense>
//   );
// };

// export default Page;
"use client";

import React, { useState, useContext, Suspense } from "react";
import Api from "@/Api/Api";
import Spinner from "@/Components/Spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "@/Components/context/AuthContext";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const LoginContent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const { setIsAuthenticated, setUsernames } = useContext(AuthContext);

  const Handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const Response = await Api.post("token/", { username, password });
      if (Response.status === 200) {
        localStorage.setItem("access", Response.data.access);
        localStorage.setItem("refresh", Response.data.refresh);
        setIsAuthenticated(true);
        setUsernames(username);
        router.push(redirectPath);
      }
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/60 to-black/70" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-purple-700 text-center"
          >
            Welcome Back 🛒
          </motion.h2>
          <p className="text-center text-gray-500 mt-2 mb-8">
            Login to continue shopping smart
          </p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-center text-sm text-red-600 font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={Handlesubmit} className="space-y-6">
            {/* Username */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-12 pr-4 py-3  text-black rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-500 outline-none transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 text-black pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-500 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition"
            >
              <FaSignInAlt />
              Login
            </motion.button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/Register"
              className="text-purple-600 font-semibold hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<Spinner />}>
    <LoginContent />
  </Suspense>
);

export default Page;
