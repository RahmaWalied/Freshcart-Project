import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAllOrders() {
    const userId = localStorage.getItem('userId');
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );

      const uniqueOrders = Array.from(new Map(data.map(order => [order._id, order])).values());

      uniqueOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setOrders(uniqueOrders);
    } catch (error) {
      console.error("Error fetching orders:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("orderSuccess") === "true") {
      toast.success("Order placed successfully🎉");
      localStorage.removeItem("orderSuccess");
    }
    getAllOrders();
  }, []);

  // Skeleton Loader
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-5 mb-6"
          >
            <div className="h-5 w-32 bg-gray-300 rounded mb-4"></div>
            <div className="h-5 w-40 bg-gray-300 rounded mb-4"></div>
            <div className="h-5 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary text-white py-10 shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center">My Orders</h1>
        <p className="text-center mt-2 text-sm opacity-90">
          All your recent orders
        </p>
      </div>

      <div className="container mx-auto px-4 py-10">
        {orders.length === 0 ? (
          <motion.p className="text-center text-gray-600">No orders yet.</motion.p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const totalQuantity = order.cartItems.reduce((sum, item) => sum + item.count, 0);

              return (
                <motion.div
                  key={order._id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <div className="flex flex-wrap gap-3 justify-between items-center m-4">
                    <h2 className="text-lg font-bold text-darkPrimary">
                      Transaction Number: #{order._id.slice(-5)}
                    </h2>
                    <h2 className="text-lg font-bold text-darkPrimary">
                      Placed on:{" "}
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h2>
                    <h2 className="text-lg font-bold text-darkPrimary">
                      Payment: {order.paymentMethodType}
                    </h2>
                  </div>

                  <hr className="text-gray-300 my-3"/>

                  <div className="grid md:grid-cols-3 gap-4 hover:cursor-pointer">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex gap-4 items-center p-3 hover:bg-gray-50 transition"
                      >
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-40 h-40 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-sm font-semibold text-darkPrimary">{item.product.title}</h3>
                          <p className="text-primary font-semibold">Price: {item.price} EGP</p>
                          <p className="text-xs text-primary">Quantity: {item.count}</p>
                          <p className="text-xs text-gray-500">{item.product.brand.name}</p>
                          <p className="text-xs text-gray-500">{item.product.category.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr className="text-gray-300 my-3"/>
                  <div className="mt-6 flex justify-end">
                    <div className="bg-gray-50 rounded-lg shadow p-3 md:w-1/4 text-lg hover:bg-gray-100 transition-all duration-300 hover:cursor-pointer">
                      <p className="text-darkPrimary mt-2 font-semibold">
                        Total: <span className='text-sm text-red-800'>{order.totalOrderPrice} EGP</span>
                      </p>
                      <p className="text-darkPrimary mt-2 font-semibold">
                        Total Quantity: <span className='text-sm text-red-800'>{totalQuantity}</span>
                      </p>
                      <p className="text-darkPrimary mt-2 font-semibold">
                        Shipping Price: <span className='text-sm text-red-800'>{order.shippingPrice} EGP</span>
                      </p>
                      <p className="text-darkPrimary mt-2 font-semibold">
                        Taxes: <span className='text-sm text-red-800'>{order.taxPrice} EGP</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
