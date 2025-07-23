import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle wishlist
  function toggleWishlist(product) {
    const isExist = wishlist.some((p) => p._id === product._id);
    if (isExist) {
      setWishlist((prev) => prev.filter((p) => p._id !== product._id));
      toast.error("Product removed from Favourite");
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success("Product added to Favourite");
    }
  }

  // Check if product is in wishlist
  function isInWishlist(productId) {
    return wishlist.some((p) => p._id === productId);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
