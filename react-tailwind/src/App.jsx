import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Home/Layout/Layout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Home/Products/Products";
import Cart from "./Pages/Home/Cart/Cart";
import Brands from "./Pages/Home/Brands/Brands";
import Login from "./Pages/Home/Authentication/Login/Login";
import Register from "./Pages/Home/Authentication/Login/Register/Register";
import ForgetPassword from "./Pages/Home/Authentication/Login/ForgetPassword/ForgetPassword";
import VerifyCode from "./Pages/Home/Authentication/Login/VerifyCode/VerifyCode";
import ResetPassword from "./Pages/Home/Authentication/Login/ResetPassword/ResetPassword";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./Pages/Home/Protected/ProtectedRoutes";
import { Navigate } from "react-router-dom";
import ProductDetails from "./Pages/Home/ProductDetails/ProductDetails";
import AuthContextProvider from "./Context/AuthContext";
import LoginProtected from "./Pages/Home/Protected/LoginProtected";
import CartContextProvider from "./Context/CartContext";
import Categories from "./Pages/Home/Categories/Categories";
import CategoriesDetails from "./Pages/Home/Categories/CategoriesDetails";
import BrandProducts from "./Pages/Home/Brands/BrandProducts";
import AllOrders from "./Pages/Home/AllOrders/AllOrders";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishlistContextProvider, { WishlistContext } from './Context/WishlistContext';
import Wishlist from './Pages/Home/Wishlist/Wishlist';

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Navigate to="/home" /> },
        {
          path: "/home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
                {
          path: "/allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders/>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/category/:id",
          element: (
            <ProtectedRoutes>
              <CategoriesDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
                {
          path: "/wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist/>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/brandProducts/:id",
          element: (
            <ProtectedRoutes>
              <BrandProducts />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/productDetails/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/login",
          element: (
            <LoginProtected>
              <Login />
            </LoginProtected>
          ),
        },
        {
          path: "/register",
          element: (
            <LoginProtected>
              <Register />
            </LoginProtected>
          ),
        },
        { path: "/forgetpassword", element: <ForgetPassword /> },
        { path: "/verifycode", element: <VerifyCode /> },
        { path: "/resetpassward", element: <ResetPassword /> },
      ],
    },
  ]);

  let client = new QueryClient()
  return (
    <>
<QueryClientProvider client={client}>
        <AuthContextProvider>
<WishlistContextProvider>
            <CartContextProvider>
            <RouterProvider router={routes} />
            <Toaster/>
          </CartContextProvider>
</WishlistContextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
    </>
  );
}

export default App;
