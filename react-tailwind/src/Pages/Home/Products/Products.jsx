import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import Loader from "./../../../Components/Loader/Loader";
import FilterSidebar from "../../../Components/FilterSidebar/FilterSidebar";
import { SlidersHorizontal } from "lucide-react"; 
export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filters
  const [priceRange, setPriceRange] = useState(50000);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    brands: [],
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch all products
  const fetchProducts = async (page = 1) => {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    );
    return data;
  };

  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => fetchProducts(currentPage),
    keepPreviousData: true,
  });

  const products = productsData?.data || [];
  const totalPages = productsData?.metadata?.numberOfPages || 1;

  // Fetch Categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch Brands
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => setBrands(res.data.data))
      .catch((err) => console.error("Error fetching brands:", err));
  }, []);

  // Filter & Sort
  useEffect(() => {
    let updatedProducts = [...products];

    // Search Filter
    if (searchTerm.trim()) {
      updatedProducts = updatedProducts.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price Filter
    updatedProducts = updatedProducts.filter((p) => p.price <= priceRange);

    // Categories Filter
    if (selectedFilters.categories.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        selectedFilters.categories.includes(p.category._id)
      );
    }

    // Brands Filter
    if (selectedFilters.brands.length > 0) {
      updatedProducts = updatedProducts.filter((p) =>
        selectedFilters.brands.includes(p.brand._id)
      );
    }

    // Sort
    if (sortOrder === "asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, searchTerm, priceRange, sortOrder, selectedFilters]);

  // Loader & Error
  if (isLoading) return <Loader />;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 relative">
      {/* Search & Filter Toggle */}
      <div className="mb-6 flex justify-center items-center gap-3">
        <input
          type="text"
          placeholder="Search Products"
          className="w-72 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={toggleSidebar}
          className="p-3 bg-primary text-white rounded-lg hover:bg-darkPrimary transition"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <FilterSidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        categories={categories}
        brands={brands}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Products Grid */}
      <motion.div
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <motion.div
              key={item._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard item={item} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </motion.div>

      {/* Pagination */}
      {searchTerm === "" && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-2 rounded ${
                currentPage === pageNum
                  ? "bg-primary text-white font-bold"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
