import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { featchDepartment, deleteDepartment } from "../../api";

const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const list = async () => {
      try {
        const response = await featchDepartment();
        setDepartments(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Departments:", error);
        setLoading(false);
      }
    };
    list();
  }, []);

  const handleDeleteDepartment = async (name) => {
    try {
      await deleteDepartment(name);
      setDepartments(departments.filter((department) => department.department_name !== name));
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  if (loading) {
    return <p>Loading Courses...</p>;
  }

  return (
    <div className="manage-instructors container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Manage Departments
      </h1>
      <div className="mb-4 text-right">
        <Link
          to="/admin/add-department"
          className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Add Department
        </Link>
      </div>

      {/* Scrollable Table Wrapper */}
      <div className="overflow-auto max-h-96 rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b font-semibold text-left">Department</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Head ID</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Head Name</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.department_name}>
                <td className="py-3 px-4 border-b">{department.department_name}</td>
                <td className="py-3 px-4 border-b">{department.head_id !== null ? department.head_id : 'N/S'}</td>
                <td className="py-3 px-4 border-b">{department.head_name !== null ? department.head_name : 'N/S'}</td>
                <td className="py-3 px-4 border-b flex items-center space-x-2">
                  <Link
                    to={`/admin/edit-department/${department.department_name}`} // Pass the ID in the URL
                    className="bg-gradient-to-r from-green-400 to-blue-400 text-white py-1 px-3 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition-all"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteDepartment(department.department_name)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-1 px-3 rounded-lg shadow-md hover:from-red-700 hover:to-pink-700 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDepartment;
