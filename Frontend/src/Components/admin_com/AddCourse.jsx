import React, { useState } from 'react';
import { addCourse } from '../../api';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    course_id: '',
    course_name: '', // course_name is the correct field in the state
    instructor_id: '' 
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
      // Send formData to your backend API for adding a course
      const response = await addCourse(formData);
      setSuccessMessage('Course added successfully!'); // Set success message
      console.log(response.data);

      // Clear the form after successful submission
      setFormData({
        course_id: '',
        course_name: '',
        instructor_id: '' 
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display error if course_id already exists
        setErrorMessage('Course ID already exists. Please try a different one.');
      } else {
        console.error('Error adding course:', error);
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-lg">
      <h1 className="text-4xl font-bold text-center mb-10">Add Course</h1>

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
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_id">
              Course ID
          </label>
          <input
            id="course_id"
            type="text"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {/* Course Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_name">
            Course Name
          </label>
          <input
            id="course_name"
            type="text"
            name="course_name" // Changed this to course_name to match the formData key
            value={formData.course_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructor_id">
            Instructor ID 
          </label>
          <input
            id="instructor_id"
            type="text"
            name="instructor_id"
            value={formData.instructor_id}
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
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
