import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const visibleCount = 30;

  async function getBrands() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const visibleBrands = showAll ? brands : brands.slice(0, visibleCount);

  return (
    <div className="container p-6 text-center">
<h2 className="relative text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
  Shop By Brands
  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-16 h-[3px] bg-gradient-to-r from-primary to-gray-800 rounded"></span>
</h2>

      {loading ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {Array.from({ length: visibleCount }).map((_, index) => (
            <div
              key={index}
              className="w-40 h-40 rounded-full bg-gray-200 animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-7 justify-center">
            {visibleBrands.map((brand, index) => (
              <Link
                key={brand._id}
                to={`/brandProducts/${brand._id}`}
                className="relative transition-transform hover:scale-110 hover:-translate-y-7 duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-30 h-30 object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>

          {brands.length > visibleCount && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-6 px-5 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-opacity-90 transition  cursor-pointer"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          )}
        </>
      )}
    </div>
  );
}

