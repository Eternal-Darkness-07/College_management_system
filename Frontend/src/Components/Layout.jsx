import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const Layout = ({ options, isLoggedIn, onLogout }) => {
  const location = useLocation();

  return (
    <>
      {isLoggedIn && location.pathname !== "/" && <Navbar options={options} onLogout={onLogout} />}
      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
