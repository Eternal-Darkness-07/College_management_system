import React, { useState, useEffect } from 'react';
import { fetchDepartments } from '../../api'; // Import your API function

const StudentSeeDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeptData = async () => {
      try {
        const response = await fetchDepartments();
        setDepartments(response);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setErrorMessage('Error fetching departments.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeptData();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto mt-10 text-center text-gray-500">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="container mx-auto mt-10 text-center text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
        Departments
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {departments.length > 0 ? (
          departments.map((department) => (
            <div key={department.department_id} className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                {department.department_name}
              </h2>
              <p className="text-xl font-medium mb-6">Head: {department.head_name}</p>
            </div>
          ))
        ) : (
          <div className="p-6 bg-white shadow-lg rounded-xl text-center">
            <h2 className="text-2xl font-semibold mb-4">
              No departments available.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSeeDepartments;
