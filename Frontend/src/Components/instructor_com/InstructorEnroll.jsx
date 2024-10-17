import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getStudentsByInstructor, removeStudentFromCourse } from "../../api"; // Replace with your actual API functions

const InstructorEnroll = () => {
  const { id } = useParams(); // Get the instructor ID from the URL
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudentsByInstructor(id); // Fetch students by instructor ID
        setStudents(response);
      } catch (error) {
        setError("Error fetching students.");
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [id]);

  // Handle Delete Student
  const handleDelete = async (student_id, course_id) => {
    try {
      await removeStudentFromCourse(student_id, course_id); // API call to remove student from course
      setStudents(students.filter((student) => student.student_id !== student_id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  if (loading) {
    return <p>Loading Students...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="instructor-enroll container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Enrolled Students
      </h1>
      <div className="mb-4 text-right">
        <Link
          to={`/instructor/addstudent/${id}`} // Assuming you have a route to add a student for the specific instructor
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
              <th className="py-3 px-4 border-b font-semibold text-left">Email</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Course</th>
              <th className="py-3 px-4 border-b font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.student_id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{student.student_id}</td>
                  <td className="py-3 px-4 border-b">{student.student_name}</td>
                  <td className="py-3 px-4 border-b">{student.student_email}</td>
                  <td className="py-3 px-4 border-b">{student.course_name}</td>
                  <td className="py-3 px-4 border-b flex items-center space-x-2">
                    <button
                      onClick={() => handleDelete(student.student_id, student.course_id)}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-1 px-3 rounded-lg shadow-md hover:from-red-700 hover:to-pink-700 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-4 border-b text-center">
                  No students enrolled in this instructor's courses.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorEnroll;
