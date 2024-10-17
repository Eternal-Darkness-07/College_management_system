import React, { useState, useEffect } from 'react';
import { enrollStudent, getCoursesByInstructor, featchStudents } from '../../api';
import { useParams } from 'react-router-dom';

const EnrollStudent = () => {
  const { id } = useParams(); // Get the instructor ID from the URL if available
  const [instructorId, setInstructorId] = useState(id || localStorage.getItem("instructorId"));
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Combined loading state

  useEffect(() => {
    const fetchCoursesAndStudents = async () => {
      try {
        const [coursesResponse, studentsResponse] = await Promise.all([
          getCoursesByInstructor(instructorId),
          featchStudents()
        ]);
        setCourses(coursesResponse);
        setStudents(studentsResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage('Error fetching courses or students.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoursesAndStudents();
  }, [instructorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await enrollStudent(formData);
      setSuccessMessage('Student enrolled successfully!');
      console.log(response.data);
      setFormData({ course_id: '', student_id: '' });
    } catch (error) {
      const errorMsg = error.response && error.response.data.error
        ? error.response.data.error
        : 'An error occurred. Please try again.';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-lg">
      <h1 className="text-4xl font-bold text-center mb-10">Enroll Student</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center font-bold" role="alert" aria-live="assertive">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 text-green-500 text-sm text-center font-bold" role="alert" aria-live="assertive">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_id">
            Course (Select Course Taught by You)
          </label>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <select
              id="course_id"
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select a Course</option>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {`${course.course_id} - ${course.course_name}`}
                  </option>
                ))
              ) : (
                <option value="" disabled>No courses available</option>
              )}
            </select>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="student_id">
            Student (Select Student)
          </label>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <select
              id="student_id"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Select a Student</option>
              {students.length > 0 ? (
                students.map((student) => (
                  <option key={student.student_id} value={student.student_id}>
                    {`${student.student_id} - ${student.name}`}
                  </option>
                ))
              ) : (
                <option value="" disabled>No students available</option>
              )}
            </select>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all focus:outline-none focus:shadow-outline"
          >
            Enroll Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollStudent;
