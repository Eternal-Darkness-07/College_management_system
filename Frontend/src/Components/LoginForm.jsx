import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    // Validate the login here
    if (id && password) {
      const isValidAdmin = id === "admin" && password === "admin";
      const isValidInstructor = id.startsWith("FC");
      const isValidStudent = id.startsWith("BT");

      if (isValidAdmin || isValidInstructor || isValidStudent) {
        onLogin(id); // Update navbar options in App
        if (isValidAdmin) {
          navigate("/admin");
        } else if (isValidInstructor) {
          navigate(`/instructor/${id}`);
        } else if (isValidStudent) {
          navigate(`/student/${id}`);
        }
      } else {
        setError("Invalid ID or password. Please try again.");
      }
    } else {
      setError("Please enter both your ID and password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-10 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Login
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>} {/* Error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="Enter your ID"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg shadow-md font-semibold hover:from-blue-500 hover:to-green-400 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
