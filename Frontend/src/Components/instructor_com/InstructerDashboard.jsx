import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInstructorbyid, countInstructorCourses } from "../../api"; // Import the API functions

const InstructorDashboard = () => {
  const { id } = useParams(); // Get the instructor ID from the URL if available
  const [instructorId, setInstructorId] = useState(id || localStorage.getItem("instructorId"));
  const [instructorName, setInstructorName] = useState("");
  const [courseCount, setCourseCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (instructorId) {
      // Save the ID in local storage if it's not there
      localStorage.setItem("instructorId", instructorId);

      // Fetch instructor details and courses
      setLoading(true);
      setError(null);
      const fetchInstructorDetails = async () => {
        try {
          // Fetch instructor details (name)
          const instructorData = await getInstructorbyid(instructorId);
          setInstructorName(instructorData.name);

          // Fetch the number of courses the instructor teaches
          const coursesCount = await countInstructorCourses(instructorId);
          setCourseCount(coursesCount);
        } catch (err) {
          setError("Failed to load instructor data.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchInstructorDetails();
    } else {
      // Handle the case where there is no ID
      setError("Instructor ID not found.");
      setLoading(false);
    }
  }, [instructorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
        Instructor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Instructor 
          </h2>
          <p className="text-xl font-medium mb-6">{instructorName}</p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Courses Taught
          </h2>
          <p className="text-xl font-medium mb-6">{courseCount} Courses</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
