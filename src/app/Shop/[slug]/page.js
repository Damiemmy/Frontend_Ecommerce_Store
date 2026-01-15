'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Api, { BaseUrl } from '@/Api/Api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import Link from 'next/link';
import Productpage from '@/Components/productcomp/Productpage';
import { ProductContext } from '@/Components/context/ProductContext';

const Products = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [related, setRelated] = useState([]);
  const [product, setProduct] = useState([]);
  const { AddtoCart, incart, setIncart } = useContext(ProductContext);
  const cart_code = typeof window !== 'undefined'
    ? localStorage.getItem('cart_code')
    : null;

  useEffect(() => {
    const GetRelatedProducts = async () => {
      try {
        const response = await Api.get(`related_Products/${slug}`);
        setProduct(response.data);
        setRelated(response.data.related_Products);
      } catch (err) {
        console.log(err.message);
      }
    };
    GetRelatedProducts();
  }, [slug]);

  useEffect(() => {
    const GetiteminCart = async () => {
      if (!cart_code || !product?.id) return;
      try {
        const response = await Api(
          `in_cart/?cart_code=${cart_code}&product_id=${product.id}`
        );
        setIncart(response.data.product_in_cart);
      } catch (err) {
        console.log(err.message);
      }
    };
    GetiteminCart();
  }, [cart_code, product?.id]);

  return (
    <>
      {/* ================= SHOP HERO ================= */}
      <section
        className="relative h-[45vh] md:h-[55vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082349566-1870d5fc6f41')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/70 to-purple-700/60" />
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Shop
          </h1>
          <p className="mt-4 text-lg md:text-xl text-purple-100 max-w-xl mx-auto">
            Discover quality products curated just for you
          </p>
          <div className="mt-6 text-sm text-purple-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="capitalize">{slug}</span>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT CONTENT WITH BOUNDARY ================= */}
      <section className="w-full bg-gray-100 py-16 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        {/* PRODUCT CONTAINER */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* PRODUCT DETAILS */}
          <Productpage
            product={product}
            incart={incart}
            setIncart={setIncart}
            AddtoCart={AddtoCart}
          />

          {/* ================= RELATED PRODUCTS ================= */}
          <div className="mt-24 relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-purple-700 text-center">
              You may also like
            </h2>

            {/* NAV BUTTONS */}
            <button className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-white/80 hover:bg-white text-purple-700 rounded-full p-3 shadow-lg backdrop-blur hover:scale-110 transition">
              <FaArrowLeft />
            </button>

            <button className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-white/80 hover:bg-white text-purple-700 rounded-full p-3 shadow-lg backdrop-blur hover:scale-110 transition">
              <FaArrowRight />
            </button>

            <Swiper
              modules={[Autoplay, Navigation]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              autoplay={{ delay: 7000, disableOnInteraction: false }}
              loop
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 12 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 6, spaceBetween: 24 },
              }}
            >
              {related.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition group">
                    <Link href={`/Product/${item.slug}`}>
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src={`${BaseUrl}${item.image}`}
                          alt={item.name}
                          className="w-full h-36 object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>

                      <h3 className="mt-4 text-sm font-medium text-gray-800 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-purple-600 font-semibold mt-1">
                        ${item.price}
                      </p>

                      <span className="inline-block mt-3 text-xs text-purple-600 font-semibold group-hover:underline">
                        View Product →
                      </span>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
