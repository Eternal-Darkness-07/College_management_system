import React, { useState } from 'react';
import { addStudent } from '../../api';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage(''); // Clear any previous success message
    try {
      // Send formData to your backend API for adding an instructor
      const response = await addStudent(formData);
      setSuccessMessage('Student added successfully!'); // Set success message
      console.log(response.data);

      // Clear the form after successful submission
      setFormData({
        student_id: '',
        name: '',
        email: '',
        password: ''
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display error if instructor_id already exists
        setErrorMessage('Student ID already exists. Please try a different one.');
      } else {
        console.error('Error adding instructor:', error);
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-lg">
      <h1 className="text-4xl font-bold text-center mb-10">Add Student</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center font-bold">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 text-green-500 text-sm text-center font-bold">
            {successMessage}
          </div>
        )}
        
        {/* Instructor ID */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="student_id">
            Student ID
          </label>
          <input
            id="student_id"
            type="text"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all focus:outline-none focus:shadow-outline"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
