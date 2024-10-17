import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { featchInstructors, deleteInstructor } from "../../api";

const ManageInstructor = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const list = async () => {
      try {
        const response = await featchInstructors();
        setInstructors(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instructors:", error);
        setLoading(false);
      }
    };
    list();
  }, []);

  const handleDeleteInstructor = async (id) => {
    try {
      await deleteInstructor(id);
      setInstructors(
        instructors.filter((instructor) => instructor.instructor_id !== id)
      );
    } catch (error) {
      console.error("Error deleting instructor:", error);
    }
  };

  if (loading) {
    return <p>Loading instructors...</p>;
  }

  return (
    <div className="manage-instructors container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Manage Instructors
      </h1>
      <div className="mb-4 text-right">
        <Link
          to="/admin/add-instructor"
          className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Add Instructor
        </Link>
      </div>

      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b font-semibold text-left">ID</th>
            <th className="py-3 px-4 border-b font-semibold text-left">Name</th>
            <th className="py-3 px-4 border-b font-semibold text-left">
              Email
            </th>
            <th className="py-3 px-4 border-b font-semibold text-left">
              Department Name
            </th>
            <th className="py-3 px-4 border-b font-semibold text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.instructor_id}>
              <td className="py-3 px-4 border-b">{instructor.instructor_id}</td>
              <td className="py-3 px-4 border-b">{instructor.name}</td>
              <td className="py-3 px-4 border-b">{instructor.email}</td>
              <td className="py-3 px-4 border-b">
                {instructor.department_name}
              </td>
              <td className="py-3 px-4 border-b flex items-center space-x-2">
                <Link
                  to={`/admin/edit-instructor/${instructor.instructor_id}`} // Pass the ID in the URL
                  className="bg-gradient-to-r from-green-400 to-blue-400 text-white py-1 px-3 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition-all"
                >
                  Edit
                </Link>
                <button
                  onClick={() =>
                    handleDeleteInstructor(instructor.instructor_id)
                  }
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
  );
};

export default ManageInstructor;
