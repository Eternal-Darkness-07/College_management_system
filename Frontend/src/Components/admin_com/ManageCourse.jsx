import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { featchCourses, deleteCourse } from "../../api";

const ManageCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const list = async () => {
      try {
        const response = await featchCourses();
        setCourses(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Course:", error);
        setLoading(false);
      }
    };
    list();
  }, []);

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter((course) => course.course_id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  if (loading) {
    return <p>Loading Courses...</p>;
  }

  return (
    <div className="manage-instructors container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Manage Courses
      </h1>
      <div className="mb-4 text-right">
        <Link
          to="/admin/add-course"
          className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Add Course
        </Link>
      </div>

      {/* Scrollable Table Wrapper */}
      <div className="overflow-auto max-h-96 rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b font-semibold text-left">ID</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Name</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Instructor ID</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Instructor Name</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_id}>
                <td className="py-3 px-4 border-b">{course.course_id}</td>
                <td className="py-3 px-4 border-b">{course.course_name}</td>
                <td className="py-3 px-4 border-b">{course.instructor_id}</td>
                <td className="py-3 px-4 border-b">{course.instructor_name}</td>
                <td className="py-3 px-4 border-b flex items-center space-x-2">
                  <Link
                    to={`/admin/edit-course/${course.course_id}`} // Pass the ID in the URL
                    className="bg-gradient-to-r from-green-400 to-blue-400 text-white py-1 px-3 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition-all"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteCourse(course.course_id)}
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

export default ManageCourse;
