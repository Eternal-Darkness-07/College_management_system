import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { countCourses, countInstructors, countStudents } from "../../api";

const AdminDashboard = () => {
  const [instructorCount, setInstructorCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  // Fetch instructor count
  useEffect(() => {
    const count = async () => {
      try {
        const data = await countInstructors();
        setInstructorCount(data);
      } catch (error) {
        console.error("Error counting instructors", error);
      }
    };
    count();
  }, []);

  // Fetch student count
  useEffect(() => {
    const count = async () => {
      try {
        const data = await countStudents();
        setStudentCount(data);
      } catch (error) {
        console.error("Error counting students", error);
      }
    };
    count();
  }, []);

  // Fetch course count
  useEffect(() => {
    const count = async () => {
      try {
        const data = await countCourses();
        setCourseCount(data);
      } catch (error) {
        console.error("Error counting courses", error);
      }
    };
    count();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
        Welcome to the Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gradient-to-r from-green-400 to-blue-500">Instructors</h2>
          <p className="text-xl font-medium mb-6">{instructorCount} Instructors</p>
          <Link
            to="/admin/manage-instructor"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow hover:from-blue-500 hover:to-green-500 transition-all duration-300"
          >
            Manage Instructors
          </Link>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gradient-to-r from-blue-400 to-purple-500">Students</h2>
          <p className="text-xl font-medium mb-6">{studentCount} Students</p>
          <Link
            to="/admin/manage-student"
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-4 rounded-lg shadow hover:from-purple-500 hover:to-blue-400 transition-all duration-300"
          >
            Manage Students
          </Link>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gradient-to-r from-purple-400 to-pink-500">Courses</h2>
          <p className="text-xl font-medium mb-6">{courseCount} Courses</p>
          <Link
            to="/admin/manage-courses"
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-lg shadow hover:from-pink-500 hover:to-purple-400 transition-all duration-300"
          >
            Manage Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
