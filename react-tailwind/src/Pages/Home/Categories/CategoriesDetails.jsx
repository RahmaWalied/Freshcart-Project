import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../../../Components/ProductCard/ProductCard';
import Loader from './../../../Components/Loader/Loader';

export default function CategoriesDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCategoryProducts() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
      );
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategoryProducts();
  }, [id]);

  // دالة للرجوع لأعلى الصفحة
  function handleBack() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="p-6">
      <div className="m-6">
        <Link
          to="/categories"
          onClick={handleBack}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-darkPrimary transition"
        >
          ← Back to Categories
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard item={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <img src="/productimg.jpg" alt="placeholder" />
        </div>
      )}
    </div>
  );
}
