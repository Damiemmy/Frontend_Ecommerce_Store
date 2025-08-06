'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ noOfCartItems}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Profile', path: '/Profile' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/About' },
    {name:'Checkout',path: '/Checkout'}
  ];

  return (
    <header className="w-full bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 text-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">BUY-IT</h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          {navLinks.map(link => (
            <li key={link.name} className="hover:text-purple-200 transition duration-300">
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart Icon with default badge */}
          <Link href="/Cart" className="relative">
            <FaShoppingCart size={22} className="hover:text-purple-200 transition" />
            <span className="absolute -top-2 -right-2 bg-white text-purple-700 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
              {noOfCartItems}
            </span>
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
        <div className="md:hidden bg-purple-600 px-6 py-4 space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className="block text-white hover:text-purple-300 text-sm font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
