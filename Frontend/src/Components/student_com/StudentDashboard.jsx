import React, { useEffect, useState } from "react";
import { getStudentbyid, countStudentCourses } from "../../api"; // Import the API functions
import { useParams } from "react-router-dom"; // Assuming you want to get the student ID from the URL

const StudentDashboard = () => {
  const { id } = useParams(); // Get the student ID from the URL if available
  const [studentId, setStudentId] = useState(id || localStorage.getItem("studentId"));
  const [studentName, setStudentName] = useState("");
  const [courseCount, setCourseCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (studentId) {
      // Save the ID in local storage if it's not there
      localStorage.setItem("studentId", studentId);

      // Fetch student details and courses
      setLoading(true);
      setError(null);
      const fetchStudentDetails = async () => {
        try {
          // Fetch student details (name)
          const studentData = await getStudentbyid(studentId);
          setStudentName(studentData.name);

          // Fetch the number of courses the student is enrolled in
          const coursesCount = await countStudentCourses(studentId);
          setCourseCount(coursesCount);
        } catch (err) {
          setError("Failed to load student data.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchStudentDetails();
    } else {
      // Handle the case where there is no ID
      setError("Student ID not found.");
      setLoading(false);
    }
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
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Student
          </h2>
          <p className="text-xl font-medium mb-6">{studentName}</p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Enrolled Courses
          </h2>
          <p className="text-xl font-medium mb-6">{courseCount} Courses</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
