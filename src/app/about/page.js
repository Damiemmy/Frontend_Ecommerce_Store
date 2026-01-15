"use client";

import React from "react";
import Image from "next/image";

const teamMembers = [
  { name: "Dami Emmanuel", role: "Founder & CEO", image: "/damisa.jpg" },
  { name: "Glow Queen", role: "Lead Designer", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=400&q=80" },
  { name: "John Doe", role: "Marketing Head", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80" },
  { name: "Jane Smith", role: "Developer", image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80" }, 
];


export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-28 pb-10">
      {/* Hero Section */}
      <section className="relative w-full h-[450px]">
        <Image
          src="https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1600&q=80"
          alt="About Hero"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">About Us</h1>
          <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl">
            Discover our story, our vision, and our passionate team driving innovation every day.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 mt-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Our Story"
            width={600}
            height={400}
            className="rounded-3xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700">Our Story</h2>
          <p className="text-gray-700 text-lg">
            We started with a vision to bring quality fashion, skincare, and electronics closer to our customers.
            Our team is dedicated to creating a seamless online shopping experience with a personal touch.
          </p>
          <p className="text-gray-700 text-lg">
            With years of experience and a passion for innovation, we’ve built a brand that stands for style, reliability, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 mt-20 grid md:grid-cols-2 gap-12">
        <div className="bg-purple-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">Our Mission</h3>
          <p className="text-gray-700">
            To provide our customers with high-quality products and an unforgettable shopping experience. We aim to empower every individual to live stylishly and confidently.
          </p>
        </div>
        <div className="bg-purple-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">Our Vision</h3>
          <p className="text-gray-700">
            To become the leading online destination for fashion, skincare, and electronics by combining innovative technology with unparalleled customer service.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <div key={member.name} className="flex flex-col items-center bg-white rounded-3xl shadow-lg p-4 hover:shadow-2xl transition-all duration-500">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mb-4 hover:scale-105 transition-transform duration-500"
              />
              <h3 className="text-lg font-semibold text-gray-700">{member.name}</h3>
              <p className="text-purple-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="mt-20 py-20 bg-purple-600 rounded-3xl mx-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 opacity-70" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-extrabold">Join Our Journey</h2>
          <p className="max-w-2xl text-lg md:text-xl">
            Subscribe to our newsletter and be the first to know about our latest products, promotions, and updates.
          </p>
          <button className="mt-4 px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-purple-700 font-bold rounded-full transition-all duration-300 shadow-lg">
            Subscribe Now
          </button>
        </div>
      </section>
    </main>
  );
}
