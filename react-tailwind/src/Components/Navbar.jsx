import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { authContext } from "./../Context/AuthContext";
import { cartContext } from "../Context/CartContext";
import { ShoppingCart, Heart } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { WishlistContext } from "../Context/WishlistContext";

export default function Navbar() {
  const { wishlist } = useContext(WishlistContext);
  const { token, setToken } = useContext(authContext);
  const { cart } = useContext(cartContext);
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const totalItems =
    cart?.products?.reduce((acc, item) => acc + item.count, 0) || 0;

  return (
    <div className="bg-mainLight shadow-lg py-5 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
<div className="flex items-center space-x-2 group">
  {/* أيقونة متحركة */}
  <div className="w-10 h-10 bg-gradient-to-tr from-primary to-darkPrimary rounded-full flex items-center justify-center shadow-md 
                  transform transition-transform duration-500 group-hover:rotate-[360deg] animate-pulse-slow">
    <i className="fa-brands fa-opencart text-white text-xl"></i>
  </div>

  {/* اسم الموقع بجراديانت */}
  <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-primary to-darkPrimary bg-clip-text text-transparent transition-all duration-500 group-hover:brightness-110">
    FreshCart
  </h1>
</div>


        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center space-x-3 text-gray-600">
          {token && (
            <>
              <li><Link to="/" className="links">Home</Link></li>
              <li><Link to="/products" className="links">Products</Link></li>
              <li><Link to="/allorders" className="links">Orders</Link></li>
              <li><Link to="/categories" className="links">Categories</Link></li>
              <li><Link to="/brands" className="links">Brands</Link></li>
            </>
          )}
        </ul>

        {/* Auth Links & Cart */}
        <ul className="hidden lg:flex items-center space-x-4">
          {token && (
            <li className="relative text-xl">
              <Link to="/cart">
                <ShoppingCart className="w-6 h-6 text-darkPrimary fill-darkPrimary" />
              </Link>
              {cart?.products?.length > 0 && (
                <div className="bg-red-600 size-5 text-center rounded-full absolute -top-2 -left-3 text-sm text-white">
                  {totalItems}
                </div>
              )}
            </li>
          )}

          {/* Social Icons */}
          {token && (
            <>
              <Link
                to="https://facebook.com/your-profile"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 text-l transition-transform hover:scale-110 hover:-translate-y-1 duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link
                to="https://www.instagram.com/"
                target="_blank"
                className="text-pink-500 hover:text-pink-700 text-l transition-transform hover:scale-110 hover:-translate-y-1 duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link
                to="https://x.com"
                target="_blank"
                className="text-darkPrimary text-l transition-transform hover:scale-110 hover:-translate-y-1 duration-300"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </Link>
              <Link
                to="https://linkedin.com/in/your-profile"
                target="_blank"
                className="text-blue-500 hover:text-blue-700 text-l transition-transform hover:scale-110 hover:-translate-y-1 duration-300"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
            </>
          )}

          {/* Heart / Wishlist */}
          {token && (
            <li className="relative text-xl">
              <Link to="/wishlist">
                <Heart
                  className={`w-6 h-6 cursor-pointer hover:animate-wiggle ${
                    wishlist.length > 0 ? "text-red-600 fill-red-600" : "text-red-500"
                  }`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </li>
          )}

          {!token ? (
            <>
              <li><Link to="/login" className="text-xl">Login</Link></li>
              <li><Link to="/register" className="text-xl">Register</Link></li>
            </>
          ) : (
            <li
              className="font-semibold text-gray-600 cursor-pointer"
              onClick={logout}
            >
              <Link>Log Out</Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Icon */}
       {/* Mobile Icons: Menu + Cart + Heart */}
<div className="lg:hidden flex items-center space-x-4">
  {/* Wishlist Icon */}
  {token && (
    <Link to="/wishlist" className="relative">
      <Heart
        className={`w-5 h-5 hover:animate-wiggle ${
          wishlist.length > 0 ? "text-red-600 fill-red-600" : "text-red-500"
        }`}
      />
      {wishlist.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {wishlist.length}
        </span>
      )}
    </Link>
  )}

  {/* Cart Icon */}
  {token && (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-5 h-5 text-darkPrimary fill-darkPrimary" />
      {cart?.products?.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  )}

  {/* Toggle Menu Icon */}
  <button onClick={() => setIsOpen(!isOpen)}>
    <Menu size={26} />
  </button>
</div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden px-4 pt-4 pb-6 bg-mainLight text-center space-y-2">
          {token && (
            <>
              <Link to="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/products" className="block py-2" onClick={() => setIsOpen(false)}>Products</Link>
              <Link to="/allorders" className="block py-2" onClick={() => setIsOpen(false)}>Orders</Link>
              <Link to="/categories" className="block py-2" onClick={() => setIsOpen(false)}>Categories</Link>
              <Link to="/brands" className="block py-2" onClick={() => setIsOpen(false)}>Brands</Link>

              {/* Social Icons + Wishlist */}
              <div className="flex justify-center space-x-4 pt-3">
                <Link to="https://facebook.com/your-profile" target="_blank" className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110 hover:-translate-y-1 duration-300">
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link to="https://www.instagram.com/" target="_blank" className="text-pink-500 hover:text-pink-700 transition-transform hover:scale-110 hover:-translate-y-1 duration-300">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link to="https://x.com" target="_blank" className="text-darkPrimary transition-transform hover:scale-110 hover:-translate-y-1 duration-300">
                  <FontAwesomeIcon icon={faXTwitter} />
                </Link>
                <Link to="https://linkedin.com/in/your-profile" target="_blank" className="text-blue-500 hover:text-blue-700 transition-transform hover:scale-110 hover:-translate-y-1 duration-300">
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
              </div>
            </>
          )}

          {!token ? (
            <>
              <Link to="/login" className="block py-2" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="block py-2" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          ) : (
            <button
              onClick={() => { logout(); setIsOpen(false); }}
              className="block py-2 w-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
