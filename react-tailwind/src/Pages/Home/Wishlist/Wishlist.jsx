import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { WishlistContext } from "./../../../Context/WishlistContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 mt-3">
          Browse products and add them to your favourites.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-darkPrimary transition"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="relative text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
   My Wishlist ❤️
  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-16 h-[3px] bg-gradient-to-r from-primary to-gray-800 rounded"></span>
</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <article
            key={item._id}
            className="productCard group flex flex-col gap-3 shadow-md rounded-md overflow-hidden mt-7"
          >
            <header className="relative">
              <img src={item.imageCover} className="w-full" alt={item.title} />
              {/* Hover layer */}
              <div className="layer -translate-y-1/2 flex justify-center items-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2">
                {/* Remove icon */}
                <div
                  onClick={() => toggleWishlist(item)}
                  className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 cursor-pointer bg-red-500 flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                {/* Go to product details */}
                <Link
                  to={`/productDetails/${item._id}`}
                  className="icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-darkPrimary duration-1000 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </Link>
              </div>
            </header>

            {/* Card footer */}
            <footer className="py-6 px-5">
              <header>
                <h2 className="line-clamp-1 text-primary font-semibold">
                  <Link
                    className="hover:text-orange-500 duration-300"
                    to={`/productDetails/${item._id}`}
                  >
                    {item.title}
                  </Link>
                </h2>
                <h2 className="line-clamp-1 font-semibold my-1">
                  {item.category?.name}
                </h2>
                <div className="text-gray-500 text-sm">
                  <span>{item.brand?.name}</span>
                </div>
              </header>

              <footer className="flex justify-between mt-2 items-center">
                <span className="text-primary flex items-center">
                  {item.price} EGP
                </span>
                <span className="text-sm text-gray-600">
                  {item.ratingsAverage} ★
                </span>
              </footer>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
