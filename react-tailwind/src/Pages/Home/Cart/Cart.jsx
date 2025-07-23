import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from "../../../Context/CartContext";
import  {motion}  from 'framer-motion';
import ChechOut from '../../../Components/CheckOut/ChechOut';

export default function Cart() {
  const { cart, getLoggedUserCart, updateProductQuantity, removeItem, clearCart } = useContext(cartContext);   
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      await getLoggedUserCart();
      setLoading(false);
    }
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart?.products?.length) {
      const initialCounts = {};
      cart.products.forEach((item) => {
        initialCounts[item._id] = item.count;
      });
      setCounts(initialCounts);
    }
  }, [cart]);

  const handleBlur = (item) => {
    let newCount = parseInt(counts[item._id]) || 1; 
    if (newCount < 1) newCount = 1;

    setCounts((prev) => ({ ...prev, [item._id]: newCount }));

    if (newCount !== item.count) {
      updateProductQuantity(item.product._id, newCount);
    }
  };

  const handleKeyDown = (e, item) => {
    if (e.key === 'Enter') {
      handleBlur(item);
      e.target.blur();
    }
  };

  if (loading || !cart) {
    return (
      <div className="p-10 max-w-4xl mx-auto animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-24 bg-gray-200 rounded mb-4"></div>
      </div>
    );
  }

  return (
    <motion.div className="h-screen pt-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
     <h2 className="relative text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
 Cart Items
  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-16 h-[3px] bg-gradient-to-r from-primary to-gray-800 rounded"></span>
</h2>

      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart Items Section */}
        <div className="rounded-lg md:w-1/2">
          {cart.products?.map((item) => (
            <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img src={item.product.imageCover} alt={item.product.title} className="w-full rounded-lg sm:w-40" />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-700">{item.product.title}</h2>
                  <p className="mt-1 text-sm text-darkPrimary font-semibold">Price: {item.price} EGP</p>
                </div>

                <div className="mt-4 flex flex-col sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100 mb-3">
                    <button
                      className="px-3 py-1 rounded-l bg-primary hover:bg-darkPrimary text-white font-semibold cursor-pointer"
                      onClick={() => {
                        if ((counts[item._id] ?? 1) > 1) {
                          const newCount = (counts[item._id] ?? 1) - 1;
                          setCounts({ ...counts, [item._id]: newCount });
                          updateProductQuantity(item.product._id, newCount);
                        }
                      }}
                    >-</button>

                    <input
                      className="h-8 w-12 border border-darkPrimary bg-white text-center text-xs outline-none"
                      value={counts[item._id] ?? 1}
                      onChange={(e) =>
                        setCounts({ ...counts, [item._id]: e.target.value })
                      }
                      onBlur={() => handleBlur(item)}
                      onKeyDown={(e) => handleKeyDown(e, item)}
                    />

                    <button
                      className="px-3 py-1 rounded-r bg-primary hover:bg-darkPrimary text-white font-semibold cursor-pointer"
                      onClick={() => {
                        const newCount = (counts[item._id] ?? 1) + 1;
                        setCounts({ ...counts, [item._id]: newCount });
                        updateProductQuantity(item.product._id, newCount);
                      }}
                    >+</button>
                  </div>

                  <button
                    className="text-red-700 font-semibold hover:underline transition-all ease-in cursor-pointer"
                    onClick={() => removeItem(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side Checkout Summary */}
        <div className="mt-6 h-full rounded-lg border border-darkPrimary bg-white p-6 shadow-xl md:mt-0 md:w-1/2">
          <div className="flex justify-center items-center">
            <button
              onClick={clearCart}
              className="my-4 p-2 text-white bg-red-700 hover:bg-red-800 w-25 rounded-2xl text-sm font-semibold cursor-pointer transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <hr className="my-4 text-darkPrimary" />
          <ChechOut totalPrice={cart?.totalCartPrice}/>
        </div>
      </div>
    </motion.div>
  );
}
