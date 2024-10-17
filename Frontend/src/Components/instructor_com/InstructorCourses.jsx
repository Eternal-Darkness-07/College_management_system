import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCoursesByInstructor } from "../../api"; // Replace with your actual API function

const InstructorCourses = () => {
  const { id } = useParams(); // Get the instructor ID from the URL
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCoursesByInstructor(id);
        setCourses(response);
      } catch (error) {
        setError("Error fetching courses.");
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [id]);

  if (loading) {
    return <p>Loading Courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
        Courses Taught by Instructor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.course_id}
              className="p-6 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                {course.course_name}
              </h2>
              <p className="text-lg font-medium mb-2">Course ID: {course.course_id}</p>
              <p className="text-lg font-medium mb-2">Instructor ID: {course.instructor_id}</p>
              {/* Additional course details can be displayed here */}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-6 bg-white rounded-lg shadow-md">
            <p className="text-xl font-medium">No courses found for this instructor.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCourses;
