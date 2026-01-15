"use client";

import React from "react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-28 mb-10">
      
      {/* Hero Section */}
      <section className="relative w-full h-[400px]">
        <Image
          src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80'

          alt="Contact Hero"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">Contact Us</h1>
          <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl">
            We’d love to hear from you! Reach out with questions, ideas, or just to say hi.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Form */}
          <div className="bg-white p-10 rounded-3xl shadow-2xl hover:shadow-purple-400 transition-all duration-500">
            <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">Get In Touch</h2>
            <form className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none transition resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-500 hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-purple-700">Reach Us</h2>
            <p className="text-gray-700 text-lg">
              We’re always here for you. Drop us a message anytime or use the contact details below.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-purple-600 text-2xl">📍</span>
                <p className="text-gray-700">123 Purple Street, Lagos, Nigeria</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-purple-600 text-2xl">📧</span>
                <p className="text-gray-700">contact@yourbrand.com</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-purple-600 text-2xl">📞</span>
                <p className="text-gray-700">+234 800 123 4567</p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-6 mt-8">
              <a href="#" className="text-purple-600 hover:text-purple-400 text-3xl transition-transform hover:scale-125">🐦</a>
              <a href="#" className="text-purple-600 hover:text-purple-400 text-3xl transition-transform hover:scale-125">📘</a>
              <a href="#" className="text-purple-600 hover:text-purple-400 text-3xl transition-transform hover:scale-125">📸</a>
            </div>
          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="mt-20 max-w-7xl mx-auto px-6 rounded-3xl overflow-hidden shadow-2xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.429151245081!2d3.380452675631472!3d6.524379395295712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfccf0c9270e5%3A0xcba08f53d8a25de8!2sLagos!5e0!3m2!1sen!2sng!4v1705248532730!5m2!1sen!2sng"
          className="w-full h-96 border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      {/* Call to Action */}
      <section className="mt-20 py-20 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 text-center text-white rounded-3xl mx-6 shadow-lg relative overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Connect?</h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8">
          Fill the form above or reach us via email/phone. Let's make something amazing together!
        </p>
        <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-purple-700 font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300">
          Say Hello!
        </button>
      </section>

    </main>
  );
}
