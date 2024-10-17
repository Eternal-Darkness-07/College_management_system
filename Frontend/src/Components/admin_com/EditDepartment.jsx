import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDepartmentbyid, updateDepartment, featchInstructors } from "../../api"; // Ensure this API function is defined

const EditDepartment = () => {
  const { name } = useParams(); // Get the instructor ID from the URL
  console.log(name);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    department_name:'',
    head_id:''
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [instructors, setInstructors] = useState([]); // State to store the instructors
  const [isLoading, setIsLoading] = useState(true);  // New loading state

  // Fetch the instructor data when the component mounts
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const departmentdata = await getDepartmentbyid(name); // Fetch data by ID
        setFormData(departmentdata); // Set the fetched data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching instructor:", error);
        setLoading(false); // Stop loading on error
      }
    };

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

    fetchDepartment();
    list();
  }, [name]);


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
      await updateDepartment(name, formData); // Update the instructor using the API
      setSuccessMessage('Instructor updated successfully!'); // Set success message
      navigate("/admin/manage-departments"); // Redirect after updating
    } catch (error) {
      console.error("Error updating department:", error);
      setErrorMessage('An error occurred while updating the department. Please try again.');
    }
  };

  if (loading) {
    return <p>Loading department data...</p>; // Display loading message
  }

  return (
    <div className="edit-instructor container mx-auto mt-10 max-w-lg">
      <h1 className="text-4xl font-bold text-center mb-10">Edit Department</h1>
      
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
              Department
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
            Update Department
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDepartment;
