import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "./../../../Components/ProductCard/ProductCard";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./../../../Components/Loader/Loader";
import { cartContext } from "../../../Context/CartContext";
import { WishlistContext } from "../../../Context/WishlistContext";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductDetails() {
  // contexts
  const { addProductToCart } = useContext(cartContext);
  const { wishlist, toggleWishlist, isInWishlist } = useContext(WishlistContext);

  // routing
  const navigate = useNavigate();

  // route param
  const { id } = useParams();

  // product query
  const {
    data,
    isLoading: productLoading,
    isError: productError,
    error: productErrorMessage,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
  });

  const product = data?.data?.data;

  // related query
  const categoryId = product?.category?._id || null;
  const {
    data: relatedData,
    isLoading: relatedLoading,
    isError: relatedError,
    error: relatedErrorMessage,
  } = useQuery({
    queryKey: ["related", categoryId],
    queryFn: () =>
      axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      ),
    enabled: !!categoryId,
  });

  // selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // buy now state
  const [buying, setBuying] = useState(false);

  async function handleBuyNow() {
    if (!product?._id) return;
    try {
      setBuying(true);
      await addProductToCart(product._id);
      navigate("/cart");
    } finally {
      setBuying(false);
    }
  }

  // discount (demo fixed 10%)
  const discount = 0.1;
  const originalPrice = product
    ? Math.round(product.price / (1 - discount))
    : 0;

  const isWishlisted = isInWishlist(product?._id);

  // loading / error
  if (productLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  if (productError) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Error: {productErrorMessage?.message || "Failed to load product."}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-500 font-semibold mt-10">
        Product not found.
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center md:flex-row">
        <div className="md:w-1/3 p-4 relative">
          <img
            className="max-h-80 object-contain mx-auto"
            src={selectedImage || product?.imageCover}
            alt={product?.title}
          />

          {/* Heart */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-2 right-2 focus:outline-none"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={24}
              strokeWidth={1.8}
              color={isWishlisted ? "#dc2626" : "#ef4444"}
              fill={isWishlisted ? "#dc2626" : "none"}
              className="hover:scale-110 transition-transform duration-150"
            />
          </button>

          <div className="mt-3">
            <Swiper spaceBetween={20} slidesPerView={3}>
              {product?.images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`product image ${index}`}
                    className="h-24 w-full object-contain cursor-pointer transition duration-300 hover:scale-105"
                    onClick={() => setSelectedImage(image)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="md:w-2/3 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product?.title}</h1>
          <p className="text-sm text-gray-600 mb-4">{product?.description}</p>

          <div className="flex items-center mb-4">
            <span className="bg-primary text-white text-sm font-semibold px-2.5 py-0.5 rounded">
              {product?.ratingsAverage} ★
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {product?.ratingsQuantity} Reviews
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-3xl font-bold text-gray-900">
                {product?.price} EGP
              </span>
              <span className="ml-2 text-sm font-medium text-red-700 line-through">
                {originalPrice} EGP
              </span>
            </div>
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Save 10%
            </span>
          </div>

          <p className="text-darkPrimary mb-4 hover:font-semibold cursor-pointer transition-all duration-200 ease-in-out">
            Free Delivery
          </p>

<div className="flex gap-3 mt-6">
  {/* BUY NOW */}
  <button
    onClick={handleBuyNow}
    disabled={buying}
    className="flex-1 relative overflow-hidden bg-gradient-to-r from-primary to-gray-600
               text-white font-semibold py-2.5 px-5 rounded-full shadow-md
               transition-all duration-300 ease-in-out
               hover:shadow-lg hover:scale-105
               disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
  >
    <span className="relative z-10">
      {buying ? "Processing..." : "Buy Now"}
    </span>
    <span className="absolute inset-0 bg-white opacity-10 blur-xl"></span>
  </button>

  {/* ADD TO CART */}
  <button
    onClick={() => addProductToCart(product?._id)}
    className="flex-1 relative flex items-center justify-center gap-2
               bg-gradient-to-r from-primary to-gray-600 text-white font-semibold 
               py-2.5 px-5 rounded-full shadow-md transition-all duration-300 ease-in-out
               hover:shadow-lg hover:scale-105 cursor-pointer"
  >
    {/* أيقونة سلة جديدة */}
   <ShoppingCart/>
    Add to Cart
  </button>
</div>



        </div>
      </div>

      {/* Related Products */}
      <div className="my-12 text-center">
              <h2 className="relative text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
  Related Products
  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-16 h-[3px] bg-gradient-to-r from-primary to-gray-800 rounded"></span>
</h2>
        {relatedLoading ? (
          <Loader />
        ) : relatedError ? (
          <p className="text-red-500 font-semibold">
            Error: {relatedErrorMessage?.message}
          </p>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {relatedData?.data?.data?.map((item) => (
              <motion.div
                key={item._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProductCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
