// "use client";
// import React, { useState, useContext, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
// import { AuthContext } from "./context/AuthContext";
// import Spinner from "./Spinner";
// import {AiOutlineUser} from 'react-icons/ai'
// import { FaUser } from "react-icons/fa";


// const Header = ({ noOfCartItems }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const {usernames, setUsernames} = useContext(AuthContext);

//   const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
//   console.log(usernames)
//   const isActive = (path) =>
//     pathname === path
//       ? "text-yellow-300 font-semibold border-b-2 border-yellow-300"
//       : "hover:text-purple-200";


  

//   const LogOutFunction=()=>{
//     localStorage.removeItem('access')
//     localStorage.removeItem('refresh')
//     setIsAuthenticated(false)
//     router.push('/')
//   }
//   if(isAuthenticated===false){
//     <Spinner/>
//   }

//   return (
//     <header className="w-full bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 text-white shadow-md fixed top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
//           BUY-IT
//         </h1>

//         {/* Desktop Navigation */}
//         <ul className="hidden md:flex items-center gap-6 font-medium">
//           {/* Always visible */}
//           <li>
//             <Link href="/" className={isActive("/")}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link href="/products" className={isActive("/Products")}>
//               Shop
//             </Link>
//           </li>
//           <li>
//             <Link href="/contact" className={isActive("/contact")}>
//               Contact
//             </Link>
//           </li>
//           <li>
//             <Link href="/About" className={isActive("/About")}>
//               About
//             </Link>
//           </li>

//           {/* Show different menus based on authentication */}
//           {isAuthenticated ? (
//             <>
//               <li>
//                 <Link href="/Profile" className={isActive("/Profile")}>
//                   Profile
//                 </Link>
//               </li>
              
//               <li>
//                 <button
//                   onClick={LogOutFunction}
//                   className="hover:text-red-300 transition"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link href="/Login" className={isActive("/Login")}>
//                   Login
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/Signup" className={isActive("/Register")}>
//                   Register
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           {isAuthenticated && <Link href='/Profile'>
//             <div className="flex justify-center items-center md:gap-2 gap-2">
//               <b><p className="hidden md:flex">Hi {usernames}</p></b>
//               <FaUser className="text-white" size={22}/>
//             </div>
            
          
//           </Link>}
//           {/* Cart Icon */}
//           <Link href="/Cart" className="relative">
//             <FaShoppingCart
//               size={22}
//               className="hover:text-purple-200 transition"
//             />
//             {noOfCartItems >= 1 && (
//               <span className="absolute -top-2 -right-2 bg-white text-purple-700 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
//                 {noOfCartItems}
//               </span>
//             )}
//           </Link>
          

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden focus:outline-none text-white"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <div className="md:hidden bg-purple-600 px-6 py-4">
//           <ul className="flex flex-col space-y-4 font-medium">
//             <li>
//               <Link
//                 href="/"
//                 onClick={() => setMenuOpen(false)}
//                 className={isActive("/")}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/products"
//                 onClick={() => setMenuOpen(false)}
//                 className={isActive("/Products")}
//               >
//                 Shop
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/"
//                 onClick={() => setMenuOpen(false)}
//                 className={isActive("/Contact")}
//               >
//                 Contact
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/"
//                 onClick={() => setMenuOpen(false)}
//                 className={isActive("/About")}
//               >
//                 About
//               </Link>
//             </li>

//             {isAuthenticated ? (
//               <>
//                 <li>
//                   <Link
//                     href="/Profile"
//                     onClick={() => setMenuOpen(false)}
//                     className={isActive("/Profile")}
//                   >
//                     Profile
//                   </Link>
//                 </li>
                
//                 <li className="font-semibold">Hi {usernames}</li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       LogOutFunction();
//                       setMenuOpen(false);
//                     }}
//                     className="w-full text-left hover:text-red-300 transition"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link
//                     href="/Login"
//                     onClick={() => setMenuOpen(false)}
//                     className={isActive("/Login")}
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/Signup"
//                     onClick={() => setMenuOpen(false)}
//                     className={isActive("/Register")}
//                   >
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { AuthContext } from "./context/AuthContext";

const Header = ({ noOfCartItems = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, usernames } =
    useContext(AuthContext);

  const isActive = (path) =>
    pathname === path
      ? "text-yellow-300 font-semibold"
      : "hover:text-purple-200 transition";

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between text-white">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-extrabold tracking-wide">
            BUY-IT
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className={isActive("/")}>Home</Link>
            <Link href="/products" className={isActive("/products")}>Shop</Link>
            <Link href="/about" className={isActive("/about")}>About</Link>
            <Link href="/contact" className={isActive("/contact")}>Contact</Link>

            {!isAuthenticated ? (
              <>
                <Link href="/Login" className={isActive("/Login")}>Login</Link>
                <Link
                  href="/Signup"
                  className="bg-white text-purple-700 px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link href="/Profile" className="flex items-center gap-2">
                  <FaUser />
                  <span className="hidden lg:inline">Hi {usernames}</span>
                </Link>
                <button
                  onClick={logout}
                  className="hover:text-red-300 transition"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5">
            <Link href="/Cart" className="relative">
              <FaShoppingCart size={22} />
              {noOfCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-purple-700 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {noOfCartItems}
                </span>
              )}
            </Link>

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setShowCategories(false);
              }}
            >
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden fixed top-20 left-0 w-full bg-gradient-to-b from-purple-700 to-purple-600 text-white transition-all duration-300
          ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}
        >
          <ul className="flex flex-col gap-6 py-8 px-6 text-lg font-medium">

            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)}>Shop</Link>

            {/* CATEGORIES DROPDOWN */}
            <div>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="w-full flex justify-between items-center"
              >
                <span>Categories</span>
                <span
                  className={`transition-transform duration-300 ${
                    showCategories ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              <div
                className={`mt-3 overflow-hidden transition-all duration-300
                ${showCategories ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="flex flex-col gap-3 pl-4 text-base text-white/90">
                  <Link href="/products" onClick={() => setMenuOpen(false)}>All Products</Link>
                  <Link href="/products?category=men" onClick={() => setMenuOpen(false)}>For Men</Link>
                  <Link href="/products?category=women" onClick={() => setMenuOpen(false)}>For Women</Link>
                  <Link href="/products?category=clothing" onClick={() => setMenuOpen(false)}>Clothing</Link>
                  <Link href="/products?category=skincare" onClick={() => setMenuOpen(false)}>Skincare</Link>
                  <Link href="/products?category=electronics" onClick={() => setMenuOpen(false)}>Electronics</Link>
                </div>
              </div>
            </div>

            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            {!isAuthenticated ? (
              <div className="flex flex-col gap-4 pt-6">
                <Link
                  href="/Login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center border border-white/40 py-3 rounded-full hover:bg-white hover:text-purple-700 transition"
                >
                  Login
                </Link>
                <Link
                  href="/Signup"
                  onClick={() => setMenuOpen(false)}
                  className="text-center bg-white text-purple-700 py-3 rounded-full font-semibold"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pt-6">
                <Link
                  href="/Profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-center border border-white/40 py-3 rounded-full"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="py-3 rounded-full bg-red-500 hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </header>

      {/* HEADER SPACER */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;

