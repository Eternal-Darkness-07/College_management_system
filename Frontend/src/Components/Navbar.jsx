import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ options, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <ul className="flex space-x-6">
              {/* Dynamic Links based on options */}
              {options.map((option, index) => (
                <li key={index}>
                  <Link
                    to={option.path}
                    className="text-white hover:bg-opacity-20 hover:bg-black px-4 py-2 rounded-lg text-lg font-semibold transition duration-300"
                  >
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-md transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
