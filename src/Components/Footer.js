'use client';
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" w-full bg-gradient-to-br from-purple-800 to-purple-600 text-white pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Branding */}
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-2xl font-bold tracking-widest">BUY-IT</h1>
          <p className="text-white/80 text-sm max-w-sm">
            Discover premium collections, style that fits, and trends that make a statement. Shop confidently.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <Link href="/" className="hover:text-purple-200 text-sm transition">Home</Link>
          <Link href="/shop" className="hover:text-purple-200 text-sm transition">Shop</Link>
          <Link href="/collection" className="hover:text-purple-200 text-sm transition">Collection</Link>
          <Link href="/contact" className="hover:text-purple-200 text-sm transition">Contact</Link>
          <Link href="/about" className="hover:text-purple-200 text-sm transition">About Us</Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-purple-200 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-purple-200 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-purple-200 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-purple-200 transition">
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-purple-500 pt-4 text-center text-sm text-white/70">
        &copy; {new Date().getFullYear()} BUY-IT. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
