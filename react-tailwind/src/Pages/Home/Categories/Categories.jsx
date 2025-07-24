import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";

// كارت واحد (Category Card)
function CategoryCard({ cat }) {
  return (
    <Link
      to={`/category/${cat._id}`}
      key={cat._id}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-xl"
      title={cat.name}
    >
      <div className="relative w-full h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
        {/* الصورة */}
        <img
          src={cat.image}
          alt={cat.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-2">
        </div>
      </div>
      <h4 className="mt-3 text-xs sm:text-sm font-semibold text-darkPrimary truncate">
        {cat.name}
      </h4>
    </Link>
  );
}

export default function Categories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["category"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/categories"),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-semibold mt-10">
        Error: {error.message}
      </p>
    );
  }

  const categories = data?.data?.data || [];

  return (
    <div className="container p-6 text-center">
<h2 className="relative text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
  Shop By Category
  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-16 h-[3px] bg-gradient-to-r from-primary to-gray-800 rounded"></span>
</h2>

      <div
        className="
          grid
          grid-cols-1
          xs:grid-cols-
          md:grid-cols-4
          lg:grid-cols-6
          gap-4 sm:gap-5
          max-w-7xl mx-auto
        "
      >
        {categories.map((cat) => (
          <CategoryCard key={cat._id} cat={cat} />
        ))}
      </div>
    </div>
  );
}
