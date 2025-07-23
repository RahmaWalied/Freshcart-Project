import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
  // Fetch products
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorMsg,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/products"),
  });

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesErrorMsg,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios.get("https://ecommerce.routemisr.com/api/v1/categories"),
  });

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (productsError) {
    return (
      <p className="text-center text-red-500">
        Error: {productsErrorMsg.message}
      </p>
    );
  }

  if (categoriesError) {
    return (
      <p className="text-center text-red-500">
        Error: {categoriesErrorMsg.message}
      </p>
    );
  }

  const products = (productsData?.data?.data || []).slice(0, 12);
  const categories = categoriesData?.data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* HERO SECTION */}
      <div className="grid gap-4 md:grid-cols-2 mb-10">
        {/* Slider Images */}
        <div className="overflow-hidden rounded-lg shadow-md">
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="rounded-lg"
          >
            <SwiperSlide>
              <img
                src="/images/slider-image-1.jpeg"
                alt="Slider 1"
                className="w-full h-[400px] object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/slider-image-2.jpeg"
                alt="Slider 2"
                className="w-full h-[400px] object-cover"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/images/slider-image-3.jpeg"
                alt="Slider 3"
                className="w-full h-[400px] object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Blog Images */}
        <div className="grid gap-4">
          <img
            src="/images/blog-img-1.jpeg"
            alt="Blog 1"
            className="w-full h-[195px] rounded-lg shadow-md object-cover"
          />
          <img
            src="/images/blog-img-2.jpeg"
            alt="Blog 2"
            className="w-full h-[195px] rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* CATEGORY SLIDER */}
<h2 className="relative text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
  Shop By Category
  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-16 h-[3px] bg-gradient-to-r from-primary to-gray-800 rounded"></span>
</h2>


      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        navigation={true} // arrows
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="mb-10"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <Link to={`/category/${cat._id}`}>
              <div className="text-center cursor-pointer">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-32 object-cover rounded-lg shadow-md mb-2"
                />
                <p className="text-sm font-semibold text-gray-700">
                  {cat.name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* POPULAR PRODUCTS */}
<h2 className="relative text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
  Popular Products
  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-16 h-[3px] bg-gradient-to-r from-primary to-gray-800 rounded"></span>
</h2>


      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
