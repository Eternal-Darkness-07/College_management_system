import React, { useState, useEffect } from 'react';
import { addDepartment, featchInstructors } from '../../api'; 

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    department_name: '',
    head_id: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [instructors, setInstructors] = useState([]); // State to store the instructors
  const [isLoading, setIsLoading] = useState(true);  // New loading state

  useEffect(() => {
    const list = async () => {
      try {
        const response = await featchInstructors();
        setInstructors(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching instructors:", error);
        setIsLoading(false);
      }
    };
    list();
  }, []);

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
    setSuccessMessage('');
    try {
      const response = await addDepartment(formData);
      setSuccessMessage('Department added successfully!');
      console.log(response.data);

      // Clear the form after successful submission
      setFormData({
        department_name: '',
        head_id: ''
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Department already exists. Please try a different one.');
      } else {
        console.error('Error adding department:', error);
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-lg">
      <h1 className="text-4xl font-bold text-center mb-10">Add Department</h1>

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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department_name">
            Department Name
          </label>
          <input
            id="department_name"
            type="text"
            name="department_name"
            value={formData.department_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="head_id">
            Head ID (Select Instructor)
          </label>
          {isLoading ? (
            <p>Loading instructors...</p>
          ) : (
            <select
              id="head_id"
              name="head_id"
              value={formData.head_id}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select an Instructor</option>
              {instructors.length > 0 ? (
                instructors.map((instructor) => (
                  <option key={instructor.instructor_id} value={instructor.instructor_id}>
                    {`${instructor.instructor_id} - ${instructor.name}`}
                  </option>
                ))
              ) : (
                <option value="" disabled>No instructors available</option>
              )}
            </select>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all focus:outline-none focus:shadow-outline"
          >
            Add Department
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
