import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInstructorbyid, updateInstructor } from "../../api"; // Ensure this API function is defined

const EditInstructor = () => {
  const { id } = useParams(); // Get the instructor ID from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    instructor_id: '',
    name: '',
    email: '',
    department_name: '',
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Fetch the instructor data when the component mounts
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const instructorData = await getInstructorbyid(id); // Fetch data by ID
        setFormData(instructorData); // Set the fetched data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching instructor:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchInstructor();
  }, [id]);

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
      await updateInstructor(id, formData); // Update the instructor using the API
      setSuccessMessage('Instructor updated successfully!'); // Set success message
      navigate("/admin/manage-instructor"); // Redirect after updating
    } catch (error) {
      console.error("Error updating instructor:", error);
      setErrorMessage('An error occurred while updating the instructor. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading instructor data...</p>; // Display loading message
  }

  return (
    <div className="edit-instructor container mx-auto mt-10 max-w-lg">
      <h1 className="text-4xl font-bold text-center mb-10">Edit Instructor</h1>
      
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructor_id">
            ID
          </label>
          <input
            id="instructor_id"
            type="text"
            name="instructor_id"
            value={formData.instructor_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

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

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all focus:outline-none focus:shadow-outline"
          >
            Update Instructor
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInstructor;