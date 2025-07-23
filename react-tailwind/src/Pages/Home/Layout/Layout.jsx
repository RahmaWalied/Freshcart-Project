import React, { useContext } from 'react';
import Navbar from '../../../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../../Components/Footer/Footer';
import { authContext } from '../../../Context/AuthContext';

export default function Layout() {
  const { token } = useContext(authContext);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* محتوى الصفحة */}
      <div className="flex-1 container mx-auto px-4 py-4">
        <Outlet />
      </div>

      {/* Footer يظهر بس لو فيه Token */}
      {token && <Footer />}
    </div>
  );
}

