"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";


/* ================= DATA ================= */

const heroImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80",
];

const categories = [
  { name: "For Men", slug: "1", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" },
  { name: "For Women", slug: "2", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80" },
  { name: "Skincare", slug: "4", image: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=1200&q=80" },
  { name: "Electronics", slug: "3", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80" },
];

const infiniteCategories = [...categories, ...categories];

/* ================= COMPONENT ================= */

export default function HomeLanding() {
  const router = useRouter();

  /* HERO SLIDER */
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setHeroIndex((p) => (p + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  /* CATEGORY SLIDER */
  const [catIndex, setCatIndex] = useState(0);
  const autoSlideRef = useRef(null);
  const sliderRef = useRef(null);
  const visibleCount = 3;

  const resetAutoSlide = () => {
    if (autoSlideRef.current) clearTimeout(autoSlideRef.current);
    autoSlideRef.current = setTimeout(() => {
      setCatIndex((p) => p + 1);
    }, 7000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => autoSlideRef.current && clearTimeout(autoSlideRef.current);
  }, [catIndex]);

  useEffect(() => {
    if (catIndex === categories.length) {
      setTimeout(() => {
        sliderRef.current.style.transition = "none";
        setCatIndex(0);
      }, 800);
    } else {
      sliderRef.current.style.transition = "transform 0.8s ease-in-out";
    }
  }, [catIndex]);

  const next = () => setCatIndex((p) => p + 1);
  const prev = () =>
    setCatIndex((p) => (p === 0 ? categories.length - 1 : p - 1));

  return (
    <main className="pt-28 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 mb-10">

        {/* SIDEBAR */}
        <aside className="hidden lg:block bg-white rounded-2xl shadow-md p-6 sticky top-32 h-fit">
          <h3 className="text-lg font-bold text-purple-700 mb-6">
            Shop Categories
          </h3>
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-purple-700 transition"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN */}
        <section className="flex flex-col gap-16">

          {/* HERO */}
          <div className="relative overflow-hidden rounded-3xl min-h-[460px] text-white shadow-xl">
            <AnimatePresence>
              <motion.div
                key={heroIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={heroImages[heroIndex]}
                  alt="Hero"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.2 } },
              }}
              className="relative z-10 px-8 py-28 text-center flex flex-col items-center gap-6"
            >
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                className="text-4xl md:text-6xl font-extrabold"
              >
                Shop Smart. <span className="text-yellow-300">Live Stylish.</span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="max-w-2xl text-lg text-white/90"
              >
                Premium fashion, skincare essentials, and modern electronics.
              </motion.p>

              {/* CTA BUTTONS */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="flex flex-col sm:flex-row gap-4 mt-6"
              >
                <button
                  onClick={() => router.push("/products")}
                  className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold
                             hover:scale-105 transition shadow-lg"
                >
                  Shop Now
                </button>

                <button
                  onClick={() => router.push("/Signup")}
                  className="border border-white/60 px-8 py-3 rounded-full font-semibold
                             hover:bg-white/10 transition"
                >
                  Join Us
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* CATEGORY CAROUSEL */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
            >
              <ChevronLeft className="text-purple-700"  />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
            >
              <ChevronRight className="text-purple-700" />
            </motion.button>

            <div className="overflow-hidden px-10">
              <div
                ref={sliderRef}
                style={{
                  transform: `translateX(-${(catIndex * 100) / visibleCount}%)`,
                }}
                className="flex"
              >
                {infiniteCategories.map((cat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8 }}
                    className="w-full md:w-1/2 lg:w-1/3 px-3 flex-shrink-0"
                  >
                    <div
                      onClick={() =>
                        router.push(`/products?category=${cat.slug}`)
                      }
                      className="relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                    >
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                        <h3 className="text-white text-2xl font-bold">
                          {cat.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
