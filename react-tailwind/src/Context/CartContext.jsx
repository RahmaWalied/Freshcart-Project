import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';


export let cartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // Get user cart
  async function getLoggedUserCart() {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token },
      });

      const products = data.data.products || [];
      const totalCount = products.reduce((acc, item) => acc + item.count, 0);

      setCart({ ...data.data, totalCount });
    } catch (err) {
      console.error("Error loading cart:", err);
    }
    setLoading(false);
  }

  // Add product to cart
  async function addProductToCart(productId) {

    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      await getLoggedUserCart(); 
      toast.success("Product added to cart");
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Failed to add product");
    }
  }
  // Update quantity
  async function updateProductQuantity(productId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const products = data.data.products || [];
      const totalCount = products.reduce((acc, item) => acc + item.count, 0);

      setCart({ ...data.data, totalCount });
      toast.success("Quantity updated");
    } catch (err) {
      toast.error("Failed to update quantity");
      console.error(err);
    }
  }

  // Remove item
  async function removeItem(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      const products = data.data.products || [];
      const totalCount = products.reduce((acc, item) => acc + item.count, 0);

      setCart({ ...data.data, totalCount });
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error("Failed to remove item");
      console.error(err);
    }
  }

  // Clear cart
  async function clearCart() {
    try {
      await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      setCart({ products: [], totalCartPrice: 0, totalCount: 0 });
      toast.success("Cart cleared successfully");
    } catch (err) {
      toast.error("Failed to clear the cart");
      console.error(err);
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        cart,
        loading,
        addProductToCart,
        getLoggedUserCart,
        updateProductQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
