"use client";
import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "./context/AuthContext";
import Spinner from "./Spinner";


const Header = ({ noOfCartItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {usernames, setUsernames} = useContext(AuthContext);

  const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
  console.log(usernames)
  const isActive = (path) =>
    pathname === path
      ? "text-yellow-300 font-semibold border-b-2 border-yellow-300"
      : "hover:text-purple-200";


  

  const LogOutFunction=()=>{
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setIsAuthenticated(false)
    router.push('/')
  }
  if(isAuthenticated===false){
    <Spinner/>
  }

  return (
    <header className="w-full bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
          BUY-IT
        </h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          {/* Always visible */}
          <li>
            <Link href="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className={isActive("/Products")}>
              Shop
            </Link>
          </li>
          <li>
            <Link href="/Contact" className={isActive("/Contact")}>
              Contact
            </Link>
          </li>
          <li>
            <Link href="/About" className={isActive("/About")}>
              About
            </Link>
          </li>

          {/* Show different menus based on authentication */}
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/Profile" className={isActive("/Profile")}>
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/Checkout" className={isActive("/Checkout")}>
                  Checkout
                </Link>
              </li>
              <li className="font-semibold">
                <Link href="/Profile">
                  Hi {usernames}
                </Link> 
                </li>
              <li>
                <button
                  onClick={LogOutFunction}
                  className="hover:text-red-300 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/Login" className={isActive("/Login")}>
                  Login
                </Link>
              </li>
              <li>
                <Link href="/Signup" className={isActive("/Register")}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link href="/Cart" className="relative">
            <FaShoppingCart
              size={22}
              className="hover:text-purple-200 transition"
            />
            {noOfCartItems >= 1 && (
              <span className="absolute -top-2 -right-2 bg-white text-purple-700 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {noOfCartItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-purple-600 px-6 py-4">
          <ul className="flex flex-col space-y-4 font-medium">
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={isActive("/")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className={isActive("/Products")}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/Contact"
                onClick={() => setMenuOpen(false)}
                className={isActive("/Contact")}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/About"
                onClick={() => setMenuOpen(false)}
                className={isActive("/About")}
              >
                About
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    href="/Profile"
                    onClick={() => setMenuOpen(false)}
                    className={isActive("/Profile")}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Checkout"
                    onClick={() => setMenuOpen(false)}
                    className={isActive("/Checkout")}
                  >
                    Checkout
                  </Link>
                </li>
                <li className="font-semibold">Hi {usernames}</li>
                <li>
                  <button
                    onClick={() => {
                      LogOutFunction();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left hover:text-red-300 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/Login"
                    onClick={() => setMenuOpen(false)}
                    className={isActive("/Login")}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Signup"
                    onClick={() => setMenuOpen(false)}
                    className={isActive("/Register")}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
