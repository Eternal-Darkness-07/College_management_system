import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { featchStudents, deleteStudent } from "../../api";

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const list = async () => {
      try {
        const response = await featchStudents();
        setStudents(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Students:", error);
        setLoading(false);
      }
    };
    list();
  }, []);

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student.student_id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  if (loading) {
    return <p>Loading Students...</p>;
  }

  return (
    <div className="manage-instructors container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Manage Students
      </h1>
      <div className="mb-4 text-right">
        <Link
          to="/admin/add-student"
          className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Add Student
        </Link>
      </div>

      {/* Scrollable Table Wrapper */}
      <div className="overflow-auto max-h-96 rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b font-semibold text-left">ID</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Name</th>
              <th className="py-3 px-4 border-b font-semibold text-left">email</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td className="py-3 px-4 border-b">{student.student_id}</td>
                <td className="py-3 px-4 border-b">{student.name}</td>
                <td className="py-3 px-4 border-b">{student.email}</td>
                <td className="py-3 px-4 border-b flex items-center space-x-2">
                  <Link
                    to={`/admin/edit-student/${student.student_id}`} // Pass the ID in the URL
                    className="bg-gradient-to-r from-green-400 to-blue-400 text-white py-1 px-3 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition-all"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteStudent(student.student_id)}
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

export default ManageStudent;
