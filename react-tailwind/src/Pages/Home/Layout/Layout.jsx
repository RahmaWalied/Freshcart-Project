import React, { useContext } from 'react';
import Navbar from '../../../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../Components/Footer/Footer';
import { authContext } from '../../../Context/AuthContext';
import ScrollToTopButton from '../../../Components/ScrollToTop/ScrollToTop';

export default function Layout() {
  const { token } = useContext(authContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-4">
        <Outlet />
      </div>
      {token && <ScrollToTopButton/>}
      {token && <Footer />}
    </div>
  );
}

