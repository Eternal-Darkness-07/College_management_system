import React, { useEffect, useState } from "react";
import { getStudentCourses } from "../../api"; // Import the API function
import { useParams } from "react-router-dom";

const StudentMyCourses = () => {
    const { id } = useParams(); // Get the student ID from the URL if available
    const [studentId, setStudentId] = useState(id || localStorage.getItem("studentId")); // Retrieve the student ID from local storage
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getStudentCourses(studentId); // Fetch courses enrolled by the student
        setCourses(response);
      } catch (err) {
        setError("Failed to load courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [studentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
        My Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                {course.course_name}
              </h2>
              <p className="text-xl font-medium mb-6">Course ID: {course.course_id}</p>
            </div>
          ))
        ) : (
          <div className="p-6 bg-white shadow-lg rounded-xl text-center">
            <h2 className="text-2xl font-semibold mb-4">
              No courses enrolled.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMyCourses;
