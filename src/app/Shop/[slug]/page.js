'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const{setNoOfCartItems,AddtoCart,incart,setIncart}=useContext(ProductContext)
  const cart_code=localStorage.getItem('cart_code')


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

   useEffect(()=>{
          const GetiteminCart=async()=>{
           
            if(!cart_code || !product.id) return;
              
                  try{
                  Response=await Api(`in_cart/?cart_code=${cart_code}&product_id=${product.id}`)
                  console.log(Response.data)
                  setIncart(Response.data.product_in_cart)
      
                  }catch(err){
                      console.log(err.message)
                      console.log(product.id)
                  }
      
              } 
          GetiteminCart()
        },[cart_code,product.id])

  
  

  return (
    <section className="w-full bg-white text-gray-800 py-10 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* Product Info Section */}
      <Productpage product={product} incart={incart} setIncart={setIncart} AddtoCart={AddtoCart}/>

      {/* Related Products Carousel */}
      <div className="mt-20 relative">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">You may also like</h2>

        {/* Arrow Buttons */}
        <button
          className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-white/80 hover:bg-white text-purple-700 hover:text-purple-900 rounded-full p-3 shadow-lg transition-all duration-300 backdrop-blur-md hover:scale-110"
        >
          <FaArrowLeft size={20} />
        </button>

        <button
          className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-white/80 hover:bg-white text-purple-700 hover:text-purple-900 rounded-full p-3 shadow-lg transition-all duration-300 backdrop-blur-md hover:scale-110"
        >
          <FaArrowRight size={20} />
        </button>

        <Swiper
          modules={[Autoplay, Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className="w-full"
        >
          {related.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center text-center bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all">
                <Link href={`/Shop/${item.slug}`}>
                  <img
                    src={`${BaseUrl}${item.image}`}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-sm font-medium text-gray-700 line-clamp-1">{item.name}</h3>
                  <p className="text-purple-600 font-semibold mt-1 text-sm">${item.price}</p>
                  <button
                    onClick={() => router.push(`/Product/${item.slug}`)}
                    className="mt-2 text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full transition"
                  >
                    View
                  </button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Products;
